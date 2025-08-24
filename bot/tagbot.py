import os
import time
from datetime import timedelta
from typing import Optional, Dict
from discord.ext import commands
from discord import Embed
from dotenv import load_dotenv


from db.redisdb import RedisDB
from db.couchbasedb import CouchbaseDB
from couchbase.exceptions import DocumentNotFoundException
from utils.logger import SimpleLogger
from utils.default_msg import PLATFORMS

logger = SimpleLogger("tagbot")

load_dotenv()
TAG_EXPIRATION = os.getenv("TAG_EXPIRATION")
COUCHBASE_USERNAME = os.getenv("COUCHBASE_USERNAME")
COUCHBASE_PASSWORD = os.getenv("COUCHBASE_PASSWORD")
COUCHBASE_BUCKET_NAME = os.getenv("COUCHBASE_BUCKET_NAME")
COUCHBASE_COLLECTION = os.getenv("COUCHBASE_COLLECTION")
DISCORD_IMAGE = os.getenv("DISCORD_IMAGE")


class TagBot(commands.Cog):
    def __init__(self, bot, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.bot = bot
        self.redis_db = self._initialize_redis()
        self.couchbase_db = self._initialize_couchbase()

    def _initialize_redis(self) -> Optional[RedisDB]:
        try:
            logger.info("REDIS: Connecting to Redis.")
            redis_db = RedisDB()
            redis_db.connection.ping()
            logger.info("REDIS: Connected successfully to Redis.")
            return redis_db
        except Exception as e:
            logger.error(f"EXCEPTION: Failed to connect to Redis database, {e}")
            return None

    def _initialize_couchbase(self) -> Optional[CouchbaseDB]:
        try:
            logger.info("COUCHBASE: Connecting to Couchbase.")
            couchbase_db = CouchbaseDB(
                os.getenv("COUCHBASE_USERNAME"),
                os.getenv("COUCHBASE_PASSWORD"),
                os.getenv("COUCHBASE_BUCKET_NAME"),
            )
            couchbase_db.cluster.wait_until_ready(timedelta(seconds=10))
            logger.info("COUCHBASE: Connected successfully to Couchbase.")
            return couchbase_db
        except Exception as e:
            logger.error(f"EXCEPTION: Failed to connect to Couchbase DB, {e}")
            return None

    async def _send_error(self, ctx, message: str):
        await ctx.send(message)
        logger.error(f"TAGBOT ERROR: {message}")

    @commands.Cog.listener()
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.CommandOnCooldown):
            seconds = round(error.retry_after)
            logger.info(f"TAGBOT: {ctx.author.id} rate limited")
            await ctx.send(
                f"Please wait {seconds} seconds before using this command again."
            )

    def _cache_tag_in_redis(self, server_id: int, user_id: int, tag_data: Dict):
        if self.redis_db:
            self.redis_db.set(server_id, user_id, tag_data, expiration=TAG_EXPIRATION)
            logger.info(f"REDIS: Cached tag in Redis  {user_id} : {tag_data}")

    def _get_tag_from_couchbase(self, user_id) -> Optional[Dict]:
        try:
            logger.info(f"COUCHBASE: Retrieve {user_id} tag from Couchbase.")
            result = self.couchbase_db.get_item_in_collection(
                COUCHBASE_COLLECTION, str(user_id)
            )
            return result.content_as[dict]
        except DocumentNotFoundException:
            logger.error(
                f"DOCUMENT NOT FOUND EXCEPTION: {user_id} not found in Couchbase."
            )
            return None
        except Exception as e:
            logger.error(f"EXCEPTION: Error occurred in retrieving Couchbase DB, {e}")
            return None

    @commands.Cog.listener()
    async def on_ready(self):
        logger.info(f"Logged on as {self.bot.user}!")

    # TOGGLE ON AND OFF FOR DEBUGGING.
    # @commands.Cog.listener()
    # async def on_message(self, message):
    #     # if message.author.bot:
    #     #     return
    #     print(f'Message from {message.author}: {message.content}')
    #     # await self.bot.process_commands(message)

    @commands.command(name="healthcheck")
    async def healthcheck(self, ctx):
        logger.info(f"HEALTHCHECK: {ctx.author.id} called the command.")

        start_time = time.time()

        # Initialize status tracking
        bot_status = "🟢 Online"
        redis_status = "❌ Disconnected"
        couchbase_status = "❌ Disconnected"
        overall_status = "🔴 Degraded"
        status_details = []

        # Check Redis connection
        try:
            if self.redis_db:
                self.redis_db.connection.ping()
                redis_status = "🟢 Connected"
                status_details.append("✅ Redis: Operational")
            else:
                redis_status = "⚠️ Not Initialized"
                status_details.append("⚠️ Redis: Not initialized")
        except Exception as e:
            redis_status = "🔴 Connection Failed"
            status_details.append(f"❌ Redis: {str(e)[:50]}...")
            logger.error(f"HEALTHCHECK: Redis connection failed: {e}")

        # Check Couchbase connection
        try:
            if self.couchbase_db:
                self.couchbase_db.cluster.ping()
                couchbase_status = "🟢 Connected"
                status_details.append("✅ Couchbase: Operational")
            else:
                couchbase_status = "⚠️ Not Initialized"
                status_details.append("⚠️ Couchbase: Not initialized")
        except Exception as e:
            couchbase_status = "🔴 Connection Failed"
            status_details.append(f"❌ Couchbase: {str(e)[:50]}...")
            logger.error(f"HEALTHCHECK: Couchbase connection failed: {e}")

        if "🟢" in redis_status and "🟢" in couchbase_status:
            overall_status = "🟢 All Systems Operational"
            embed_color = 0x00FF00  # Green
        elif "🟢" in redis_status or "🟢" in couchbase_status:
            overall_status = "⚠️ Partial Service"
            embed_color = 0xFFFF00  # Yellow
        else:
            overall_status = "🔴 Service Degraded"
            embed_color = 0xFF0000  # Red

        response_time = round((time.time() - start_time) * 1000, 2)

        uptime_seconds = time.time() - getattr(self.bot, "start_time", time.time())
        hours, remainder = divmod(int(uptime_seconds), 3600)
        minutes, seconds = divmod(remainder, 60)
        uptime_str = f"{hours}h {minutes}m {seconds}s"

        health_embed = Embed(
            title="🏥 TagBot Health Status",
            description=overall_status,
            color=embed_color,
        )

        health_embed.add_field(name="🤖 Bot Status", value=bot_status, inline=True)

        health_embed.add_field(name="💾 Redis Status", value=redis_status, inline=True)

        health_embed.add_field(
            name="🗄️ Couchbase Status", value=couchbase_status, inline=True
        )

        health_embed.add_field(
            name="⏱️ Response Time", value=f"{response_time}ms", inline=True
        )

        health_embed.add_field(name="🕐 Uptime", value=uptime_str, inline=True)

        health_embed.add_field(
            name="🌐 Discord Latency",
            value=f"{round(self.bot.latency * 1000, 2)}ms",
            inline=True,
        )

        # Add detailed status if thre are issues
        if status_details and any(
            "❌" in detail or "⚠️" in detail for detail in status_details
        ):
            health_embed.add_field(
                name="🔍 Detailed Status",
                value="\n".join(status_details[-3:]),
                inline=False,
            )

        health_embed.set_footer(
            text=f"Health check requested by {ctx.author.name} • {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}",
            icon_url=ctx.author.avatar.url if ctx.author.avatar else None,
        )

        logger.info(
            f"HEALTHCHECK: Status - Bot: Online, Redis: {redis_status}, Couchbase: {couchbase_status}, Response: {response_time}ms"
        )
        await ctx.send(embed=health_embed)

    @commands.cooldown(3, 30, commands.BucketType.user)
    @commands.command(name="tag")
    async def tag(self, ctx):
        logger.info(f"TAG: {ctx.author.id} called the command.")
        if not ctx.message.mentions:
            logger.info(f"TAG: No mentions found in message.")
            await ctx.send(
                "Please mention the Discord user when using TagBot. _*Example*: tagbot tag @thestrugglingblack_ "
            )
            return

        mention_user = ctx.message.mentions[0]
        user_id = mention_user.id
        server_id = ctx.guild.id

        logger.info(
            f"TAG: Initiated by {ctx.author.id} for {mention_user.name} part of {server_id}..."
        )

        try:
            logger.info(f"REDIS: Checking Redis for user {user_id}.")
            redis_tag = self.redis_db.get(server_id, user_id) if self.redis_db else None

            if redis_tag:
                logger.info(f"REDIS: {user_id} found in Redis, {redis_tag}.")

                tag_lines = [
                    f"> **{platform}**: {tag}" for platform, tag in redis_tag.items()
                ]
                tag_block = f"**{mention_user.name}'s tags are:**\n" + "\n".join(
                    tag_lines
                )
                await ctx.send(tag_block)
                return

            logger.info(f"REDIS: {user_id} not found in Redis. Check in Couchbase now.")
            tag_data = self._get_tag_from_couchbase(user_id)

            if tag_data:
                logger.info(f"COUCHBASE: {user_id} found in Couchbase, {tag_data}")
                self._cache_tag_in_redis(server_id, user_id, tag_data)
                logger.info(f"REDIS: {user_id} cached in Redis.")
                tag_lines = [
                    f"> **{platform}**: {tag}" for platform, tag in tag_data.items()
                ]
                tag_block = f"**{mention_user.name}'s tags are**:\n" + "\n".join(
                    tag_lines
                )
                await ctx.send(tag_block)
            else:
                logger.info(f"COUCHBASE: {user_id} not found - no tags registered")
                await ctx.send(
                    f"{mention_user.name} doesn't have any tags set up yet. They can add tags using the `tagbot add` command."
                )
        except Exception as e:
            logger.error(f"EXCEPTION: Error in tag command, {e}")
            await ctx.send(
                f"An error occurred while retrieving tag information. Please try again later..."
            )

    @commands.cooldown(3, 30, commands.BucketType.user)
    @commands.command(name="add")
    async def add(self, ctx):
        logger.info(f"ADD: {ctx.author.id} called the command.")
        user_id = ctx.author.id

        parts = ctx.message.content.strip().split()

        if len(parts) < 3:
            await self._send_error(ctx, "Usage: `tagbot add <platform> <tag>`")
            return

        platform = parts[2].lower()
        tag = " ".join(parts[3:])

        if platform not in PLATFORMS:
            valid_platforms = ", ".join(PLATFORMS.keys())
            await self._send_error(
                ctx,
                f"Invalid platform '{platform}'. Valid platforms: {valid_platforms}",
            )
            return

        if not tag:
            await self._send_error(ctx, PLATFORMS[platform])
            return

        try:
            logger.info(f"ADD: Checking for {user_id} in Couchbase.")
            existing_user = self._get_tag_from_couchbase(user_id)
            if existing_user:
                logger.info(f"COUCHBASE: {user_id} exist.")
                self.couchbase_db.update_partial_item_in_collection(
                    COUCHBASE_COLLECTION, str(user_id), platform, tag
                )
                logger.info(
                    f"COUCHBASE: {user_id} set to {tag} on {platform} platform."
                )
                await ctx.send(
                    f"TagBot updated **{ctx.author.name}** tag on the **{platform}** to **{tag}**"
                )
            else:
                logger.info(f"COUCHBASE: {user_id} not found in Couchbase.")
                self.couchbase_db.add_item_in_collection(
                    COUCHBASE_COLLECTION, str(user_id), {platform: tag}
                )
                logger.info(f"COUCHBASE: Created tag information for {user_id}")
                await ctx.send(
                    f"Tagbot added **{ctx.author.name}** tag name **{tag}** for **{platform}** platform."
                )
        except Exception as e:
            logger.error(f"Exception: Error adding {user_id} in Couchbase DB, {e}")
            await self._send_error(
                ctx,
                "An error occurred while adding the tag. Please try again later...",
            )

    @commands.cooldown(3, 30, commands.BucketType.user)
    @commands.command(name="support")
    async def support(self, ctx):
        logger.info(f"SUPPORT: {ctx.author.id} called the command.")

        support_embed = Embed(
            title="📞 Need Help with TagBot?",
            description="We're here to help! Get support for bugs, feature requests, or general questions.",
            color=0xB4B4B4,
        )

        support_embed.add_field(
            name="🐛 Found a Bug?",
            value="Report it at **[tagbot.gg](https://tagbot.gg/bug-reports)** and we'll get it fixed!",
            inline=False,
        )

        support_embed.add_field(
            name="💡 Have a Feature Idea?",
            value="Share your suggestions at **[tagbot.gg](https://tagbot.gg/feature-request)** - we love hearing from our community!",
            inline=False,
        )

        support_embed.add_field(
            name="❓ Need General Help?",
            value="Visit **[tagbot.gg](https://tagbot.gg/faq-users)** for FAQs, guides, and support resources.",
            inline=False,
        )

        support_embed.add_field(
            name="🔗 Support Website",
            value="**[tagbot.gg](https://tagbot.gg)**",
            inline=True,
        )

        support_embed.add_field(
            name="⚡ Quick Help",
            value="Use `tagbot help` for command info",
            inline=True,
        )

        support_embed.set_footer(
            text="TagBot Support • We typically respond within 24 hours",
            icon_url=DISCORD_IMAGE,
        )

        logger.info(f"SUPPORT: Sent support information to {ctx.author.id}")
        await ctx.send(embed=support_embed)

    @commands.cooldown(3, 30, commands.BucketType.user)
    @commands.command(name="help")
    async def help_command(self, ctx):
        logger.info(f"HELP: {ctx.author.id} called command.")
        embedded_help_msg = Embed(title="Commands", color=0xB4B4B4)
        embedded_help_msg.set_thumbnail(url=DISCORD_IMAGE)
        embedded_help_msg.add_field(
            name="",
            value="**tagbot tag @user**\n\n**tagbot add <platform> <tag>**\n\n**tagbot help**\n\n**tagbot healthcheck**\n\n**tagbot support**",
            inline=True,
        )
        embedded_help_msg.add_field(
            name="",
            value="Get a user's gaming tags.\n\nSave user gaming tag to platform.\n\nDisplay available commands.\n\nDisplay status of TagBot.\n\nDisplay support information for Tagbot.",
            inline=True,
        )
        logger.info(f"HELP: Sent help command to channel.")
        await ctx.send(embed=embedded_help_msg)
