import os

from datetime import timedelta
from discord.ext import commands
from dotenv import load_dotenv


from db.redisdb import RedisDB
from db.couchbasedb import CouchbaseDB

load_dotenv()

COUCHBASE_USERNAME = os.getenv('COUCHBASE_USERNAME')
COUCHBASE_PASSWORD = os.getenv('COUCHBASE_PASSWORD')
COUCHBASE_BUCKET_NAME = os.getenv('COUCHBASE_BUCKET_NAME')

if not COUCHBASE_USERNAME or not COUCHBASE_PASSWORD or not COUCHBASE_BUCKET_NAME:
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
        print(f'Message from {message.author}: {message.content}')

    @commands.command(name='tag')
    async def tag(self,ctx):
        mention_user = ctx.message.mentions[0]
        user_id = mention_user.id
        server_id = ctx.guild.id

        if not ctx.message.mentions:
            await ctx.send('Please mention the player when using tagbot. Example: tagbot tag @thestrugglingblack ')
        print('Retrieving tags')






        # Check is
        print(mention_user)
        print(user_id)
        print(server_id)

        # Check into Redis Cache

        # If not in Redis Cache query for username using the discord server id and the user id
            # If user exist return user tags for playstation and warner brothers
            # If user does not exist return user does not exist please at them in channel.
        print(ctx)


        await ctx.send('Retrieving tags')

    @commands.command(name='add')
    async def add(self,ctx):
        if not ctx.message.mentions:
            await ctx.send('Please mention the user discord name when using tagbot.')


        mention_user = ctx.message.mentions[0]
        user_id = mention_user.id
        server_id = ctx.guild.id

        if not self.redis_db:
            print('Redis DB is not initialized')


        try:
            redis_tag = self.redis_db.get(server_id,user_id)
            print(redis_tag)
            if not redis_tag:
                print(f'{mention_user.id} or {mention_user} is not found in redis database going to couchbasedb')
                try:
                    couchbase_tag = self.couchbase_db.get(server_id,user_id)


            else:
                print(f'{mention_user.id} is found in redis database no need to add to database.')
                await ctx.send(f'Tagbot already have {mention_user} tag information it is {redis_tag}')
        except Exception as e:
            print(f'Failed to retrieve tags: {e}')



    @commands.command(name='update')
    async def update(self,ctx):
        print('Updating tags')
        await ctx.send('Updating tag')

    @commands.command(name='remove')
    async def remove(self,ctx):
        print('Removing tags')
        await ctx.send('Removing tag')