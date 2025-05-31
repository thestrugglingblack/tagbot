import os
import asyncio
from discord import (
    Intents
)
from dotenv import load_dotenv
from discord.ext import commands
from bot.tagbot import TagBot

load_dotenv()
DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')


intents = Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="tagbot ", intents=intents)


async def main():
    await bot.add_cog(TagBot(bot))
    await bot.start(DISCORD_TOKEN)

if __name__ == '__main__':
    asyncio.run(main())