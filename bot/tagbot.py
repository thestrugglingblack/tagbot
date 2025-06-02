import os

from datetime import timedelta
from discord.ext import commands
from dotenv import load_dotenv


from db.redisdb import RedisDB
from db.couchbasedb import CouchbaseDB
from couchbase.exceptions import (
    DocumentNotFoundException
)

load_dotenv()

COUCHBASE_USERNAME = os.getenv('COUCHBASE_USERNAME')
COUCHBASE_PASSWORD = os.getenv('COUCHBASE_PASSWORD')
COUCHBASE_BUCKET_NAME = os.getenv('COUCHBASE_BUCKET_NAME')

if not COUCHBASE_USERNAME or not COUCHBASE_PASSWORD or not COUCHBASE_BUCKET_NAME: # Update add this functionality as a utils function.
    raise ValueError("Couchbase environment variables are not properly set. Please check COUCHBASE_USERNAME, COUCHBASE_PASSWORD, and COUCHBASE_BUCKET_NAME.")

class TagBot(commands.Cog):
    def __init__(self,bot, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.bot = bot
        self.redis_db = RedisDB()

        try:
            self.redis_db = RedisDB()
            self.redis_db.connection.ping()
            print('Connected to Redis DB')
        except Exception as e:
            print(f'Failed to connect to Redis DB: {e}')
            self.redis_db = None

        try:
            self.couchbase_db = CouchbaseDB(
                COUCHBASE_USERNAME,
                COUCHBASE_PASSWORD,
                COUCHBASE_BUCKET_NAME
            )
            self.couchbase_db.cluster.wait_until_ready(timedelta(seconds=10))
            print('Connected to Couchbase DB')
        except Exception as e:
            print(f'Failed to connect to Couchbase DB: {e}')
            self.couchbase_db = None



    @commands.Cog.listener()
    async def on_ready(self):
        print(f'Logged on as {self.user}!')

    @commands.Cog.listener()
    async def on_message(self, message):
        # if message.author.bot:
        #     return
        print(f'Message from {message.author}: {message.content}')

    @commands.command(name='tag')
    async def tag(self,ctx):
        mention_user = ctx.message.mentions[0]
        user_id = mention_user.id
        server_id = ctx.guild.id

        if not ctx.message.mentions:
            await ctx.send('Please mention the player when using tagbot. Example: tagbot tag @thestrugglingblack ')

        try:
            print(f'Checking Redis for user {user_id}....')
            redis_tag = self.redis_db.get(server_id,user_id)
            print(f'The key being sent to Redis {redis_tag}...')

            if not redis_tag:
                print(f'{ctx.author} or {user_id} is not found in redis database going to couchbasedb')
                if not self.couchbase_db:
                    print('Couchbase DB is not initialized')

                try:
                    print(f'Retrieving {user_id} tag information from Couchbase DB...')
                    check_for_tag = self.couchbase_db.get_item_in_collection(
                        collection_name='mortal_kombat_1',
                        item_name=f'{user_id}'
                    )
                    tag_data = check_for_tag.content_as[str]
                    print(f'Tag found in couchbase DB for {user_id}: {tag_data}')

                    self.redis_db.set(server_id, user_id, tag_data, ex=1800)
                    print(f'Tag cached in Redis for 30 minutes: {tag_data}')

                    await ctx.send(f'Here is {mention_user} tag information : {tag_data}')

                except DocumentNotFoundException:
                    await ctx.send(f'Looks like {user_id} is not within Tagbot. Add your tag! Example: tagbot tag @thestrugglingblack ')
                except Exception as e:
                    print(f'Failed to retrieve tag from Couchbase DB: {e}')

            else:
                print(f'Tag found in Redis: {redis_tag}')
                await ctx.send(f'Tag found in Redis: {redis_tag}')
        except Exception as e:
            print(f'Failed to retrieve tag from Redis: {e}')


    @commands.command(name='add')
    async def add(self,ctx):
        # Update that only want the person who makes the call add their tag or admin to add their name (later release)
        user_id = ctx.author.id
        server_id = ctx.guild.id
        msg = ctx.message.content.strip().lower()
        tag_to_add = {}

        platforms = {
            "psn": "Please enter a valid Playstation tag. For example: tagbot add psn thestrugglingblack ",
            "wb": "Please enter a valid Warner Brothers tag. For example: tagbot add wb thestrugglingblack ",
        }

        # Update logic to account for mistypes or complete misses. i.e. tagbot add wbbbb or tagbot add psssnnn
        # Update logic where it ends the message if they didnt enter the correct add command.
        print('Determining which tag to add between psn and wb...')
        for platform, error_message in platforms.items():
            print('Checking which platform')
            print(f'the platform: {platform}')
            print(f'error msg: {error_message}')
            print(platforms.items())
            print(f'the message: {msg}')
            print('the logic returns')
            print(msg.startswith(f'tagbot add {platform}'))
            print('the tag returns')
            print(msg[len(f'tagbot add {platform}'):].strip())

            if msg.startswith(f'tagbot add {platform}'):
                print(f'{user_id} is trying to add {platform} tag...')
                tag = msg[len(f'tagbot add {platform}'):].strip()
                print(f'Tag found is: {tag}')
                if not tag:
                    print(f'{user_id} failed to add {platform} tag correctly')
                    await ctx.send(error_message)

                try:
                    if not self.couchbase_db:
                        print('Couchbase DB is not initialized.')
                        return

                    print(f'Checking if {user_id} exists...')
                    existing_user = self.couchbase_db.get_item_in_collection(
                        collection_name='mortal_kombat_1',
                        item_name=f'{user_id}'
                    )
                    print(f'Found {user_id} in database.')

                    if platform not in existing_user.content_as[dict] or not existing_user.content_as[dict][platform]:
                        print(f'{platform} tag is empty for {user_id}. Updating...')
                        self.couchbase_db.update_item_in_collection(
                            collection_name='mortal_kombat_1',
                            item_name=f'{user_id}',
                            item_key=platform,
                            item_value=tag,
                        )
                        print(f'{platform} tag updated for user {user_id}')
                        await ctx.send(f'{platform} tag updated for user {user_id} : {tag}')
                    else:
                        if existing_user.content_as[dict][platform] == tag:
                            print(f'{platform} tag already exists for user {user_id} and is the same provided tag.')
                            await ctx.send(f'{platform} tag already exists for user {user_id} and is the same provided tag. No update needed.')
                        else:
                            print(f'{platform} tag already exists for {user_id} but different from provided tag. Performing update')
                            self.couchbase_db.update_item_in_collection(
                                collection_name='mortal_kombat_1',
                                item_name=f'{user_id}',
                                item_key=platform,
                                item_value=tag,
                            )
                            print(f'{platform} tag updated for user {user_id} : {tag}')
                except Exception as e:
                    if 'not found' in str(e).lower():
                        print(f'{user_id} was not found in Couchbase DB...going to add now')
                        try:
                            print(f'User {user_id} not found in Couchbase DB. Creating new entry...')
                            self.couchbase_db.add_item_in_collection(
                                collection_name='mortal_kombat_1',
                                item_name=f'{user_id}',
                                item_data={platform: tag},
                            )
                            print(f'User {user_id} added to Couchbase DB with {platform} tag.')
                            await ctx.send(f'{platform} tag added for user {user_id}')
                        except Exception as e:
                            print(f'Query to add user {user_id} to Couchbase DB failed: {e}')
                            await ctx.send(
                                f'Error occurred while adding {platform} tag for user {user_id}. Please contact support.')


                    else:
                        print(f'A huge error occurred while adding {user_id}: {e}')
                        await ctx.send(f'Error occurred while adding you to tagbot. Please contact tagbot administrator thestrugglingblack@gmail.com')

            else:
                await ctx.send(
                    'Please enter a valid tag. For example: tagbot add psn thestrugglingblack or tagbot add wb thestrugglingblack.')




    @commands.command(name='update')
    async def update(self,ctx):
        print('Updating tags')
        await ctx.send('Updating tag')

    @commands.command(name='remove')
    async def remove(self,ctx):
        print('Removing tags')
        await ctx.send('Removing tag')