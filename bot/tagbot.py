import os

from datetime import timedelta
from typing import Optional, Dict
from discord.ext import commands
from discord import Embed
from discord.ui import View, Button
from dotenv import load_dotenv


from db.redisdb import RedisDB
from db.couchbasedb import CouchbaseDB
from couchbase.exceptions import (
    DocumentNotFoundException
)
from utils.logger import SimpleLogger
from utils.default_msg import PLATFORMS

logger = SimpleLogger("tagbot")

load_dotenv()
TAG_EXPIRATION=os.getenv("TAG_EXPIRATION")
COUCHBASE_USERNAME = os.getenv('COUCHBASE_USERNAME')
COUCHBASE_PASSWORD = os.getenv('COUCHBASE_PASSWORD')
COUCHBASE_BUCKET_NAME = os.getenv('COUCHBASE_BUCKET_NAME')
COUCHBASE_COLLECTION = os.getenv('COUCHBASE_COLLECTION')

class TagBot(commands.Cog):
    def __init__(self,bot, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.bot = bot
        self.redis_db = self._initialize_redis()
        self.couchbase_db = self._initialize_couchbase()

    def _initialize_redis(self) -> Optional[RedisDB]:
        try:
            logger.info('REDIS: Connecting to Redis.')
            redis_db = RedisDB()
            redis_db.connection.ping()
            logger.info('REDIS: Connected successfully to Redis.')
            return redis_db
        except Exception as e:
            logger.error(f'EXCEPTION: Failed to connect to Redis database, {e}')
            return None

    def _initialize_couchbase(self) -> Optional[CouchbaseDB]:
        try:
            logger.info('COUCHBASE: Connecting to Couchbase.')
            couchbase_db = CouchbaseDB(
                os.getenv('COUCHBASE_USERNAME'),
                os.getenv('COUCHBASE_PASSWORD'),
                os.getenv('COUCHBASE_BUCKET_NAME')
            )
            couchbase_db.cluster.wait_until_ready(timedelta(seconds=10))
            logger.info('COUCHBASE: Connected successfully to Couchbase.')
            return couchbase_db
        except Exception as e:
            logger.error(f'EXCEPTION: Failed to connect to Couchbase DB, {e}')
            return None

    async def _send_error (self, ctx, message:str):
        await ctx.send(message)
        logger.error(f'TAGBOT ERROR: {message}')

    @commands.Cog.listener()
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.CommandOnCooldown):
            seconds = round(error.retry_after)
            logger.info(f'TAGBOT: {ctx.author.id} ratelimited')
            await ctx.send(f'Please wait {seconds} seconds before using this command again.')

    def _cache_tag_in_redis(self, server_id:int, user_id: int, tag_data: Dict):
        if self.redis_db:
            self.redis_db.set(
                server_id,
                user_id,
                tag_data,
                expiration=TAG_EXPIRATION
            )
            logger.info(f"REDIS: Cached tag in Redis  {user_id} : {tag_data}")

    def _get_tag_from_couchbase(self, user_id) -> Optional[Dict]:
        try:
            logger.info(f'COUCHBASE: Retrieve {user_id} tag from Couchbase.')
            result = self.couchbase_db.get_item_in_collection(COUCHBASE_COLLECTION, str(user_id))
            return result.content_as[dict]
        except DocumentNotFoundException:
            logger.error(f'DOCUMENT NOT FOUND EXCEPTION: {user_id} not found in Couchbase.')
            return None
        except Exception as e:
            logger.error(f'EXCEPTION: Error occurred in retrieving Couchbase DB, {e}')
            return None

    @commands.Cog.listener()
    async def on_ready(self):
        print(f'Logged on as {self.bot.user}!')

    @commands.Cog.listener()
    async def on_message(self, message):
        # if message.author.bot:
        #     return
        print(f'Message from {message.author}: {message.content}')
        # await self.bot.process_commands(message)

    @commands.command(name='healthcheck')
    async def healthcheck(self,ctx):
        await ctx.send('Healthcheck Status: ✅ ')

    @commands.cooldown(3, 30, commands.BucketType.user)
    @commands.command(name='tag')
    async def tag(self,ctx):
        logger.info(f'TAG: {ctx.author.id} called the command.')
        if not ctx.message.mentions:
            logger.info(f'TAG: No mentions found in message.')
            await ctx.send('Please mention the Discord user when using TagBot. _*Example*: tagbot tag @thestrugglingblack_ ')
            return

        mention_user = ctx.message.mentions[0]
        user_id = mention_user.id
        server_id = ctx.guild.id

        logger.info(f'TAG: Initiated by {ctx.author.id} for {mention_user.name} part of {server_id}...')

        try:
            logger.info(f'REDIS: Checking Redis for user {user_id}.')
            redis_tag = self.redis_db.get(server_id, user_id) if self.redis_db else None

            if redis_tag:
                logger.info(f'REDIS: {user_id} found in Redis, {redis_tag}.')

                tag_lines = [f"> **{platform}**: {tag}" for platform, tag in redis_tag.items()]
                tag_block = f'**{mention_user.name}\'s tags are:**\n' + '\n'.join(tag_lines)
                await ctx.send(tag_block)
                return

            logger.info(f'REDIS: {user_id} not found in Redis. Check in Couchbase now.')
            tag_data = self._get_tag_from_couchbase(user_id)

            if tag_data:
                logger.info(f'COUCHBASE: {user_id} found in Couchbase, {tag_data}')
                self._cache_tag_in_redis(server_id, user_id, tag_data)
                logger.info(f'REDIS: {user_id} cached in Redis.')
                tag_lines = [f"> **{platform}**: {tag}" for platform, tag in tag_data.items()]
                tag_block = f'**{mention_user.name}\'s tags are**:\n' + '\n'.join(tag_lines)
                await ctx.send(tag_block)
            else:
                logger.info(f'COUCHBASE: {user_id} not found - no tags registered')
                await ctx.send(f'{mention_user.name} doesn\'t have any tags set up yet. They can add tags using the `tagbot add` command.')
        except Exception as e:
            logger.error(f'EXCEPTION: Error in tag command, {e}')
            await ctx.send(f'An error occurred while retrieving tag information. Please try again later...')

    @commands.cooldown(3, 30, commands.BucketType.user)
    @commands.command(name='add')
    async def add(self,ctx):
        print('Add commmand')
        user_id = ctx.author.id
        msg = ctx.message.content.strip().lower()

        valid_platform_found = False

        for platform, error_message in PLATFORMS.items():
            if msg.startswith(f"tagbot add {platform}"):
                valid_platform_found = True
                tag = msg[len(f"tagbot add {platform}"):].strip()
                if not tag:
                    logger.error(f'ADD: No user "tag" in command.')
                    await self._send_error(ctx, error_message)

                try:
                    logger.info(f'ADD: Checking for {user_id} in Couchbase.')
                    existing_user = self._get_tag_from_couchbase(user_id)
                    if existing_user:
                        logger.info(f'COUCHBASE: {user_id} exist.')
                        self.couchbase_db.update_partial_item_in_collection(
                            COUCHBASE_COLLECTION,
                            str(user_id),
                            platform,
                            tag
                        )
                        logger.info(f'COUCHBASE: {user_id} set to {tag} on {platform} platform.')
                        await ctx.send(f'TagBot updated **{ctx.author.name}** tag on the **{platform}** to **{tag}**')
                    else:
                        logger.info(f'COUCHBASE: {user_id} not found in Couchbase.')
                        self.couchbase_db.add_item_in_collection(
                            COUCHBASE_COLLECTION,
                            str(user_id),
                            {platform: tag}
                        )
                        logger.info(f'COUCHBASE: Created tag information for {user_id}')
                        await ctx.send(f'Tagbot added **{ctx.author.name}** tag name **{tag}** for **{platform}** platform.')
                except Exception as e:
                    logger.error(f'Exception: Error adding {user_id} in Couchbase DB, {e}')
                    await self._send_error(ctx, 'An error occurred while adding the tag. Please try again later...')
                break

        if not valid_platform_found:
            await self._send_error(ctx, "Invalid platform. Use 'psn' or 'wb'.")

    @commands.cooldown(3, 30, commands.BucketType.user)
    @commands.command(name='help')
    async def help_command(self, ctx):
        logger.info(f'HELP: {ctx.author.id} called command.')
        embedded_help_msg = Embed(title="Commands", color=0xB4B4B4)
        embedded_help_msg.set_thumbnail(url="https://cdn.discordapp.com/avatars/1273113791709843496/dceb2f34289f6320d4582e47a117d2b4?size=64")
        embedded_help_msg.add_field(
            name="",
            value="**tagbot tag @user**\n\n**tagbot add <platform> <tag>**\n\n**tagbot help**\n\n**tagbot healthcheck**",
            inline=True
        )
        embedded_help_msg.add_field(
            name="",
            value="Get a user's gaming tags.\n\nSave user gaming tag to platform.\n\nDisplay available commands.\n\nDisplay status of TagBot.",
            inline=True
        )
        logger.info(f'HELP: Sent help command to channel.')
        await ctx.send(embed=embedded_help_msg)