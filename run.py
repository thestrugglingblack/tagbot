import os
import asyncio
from discord import Intents
from dotenv import load_dotenv
from discord.ext import commands
from bot.tagbot import TagBot
from utils.check_env import check_env
from utils.get_prefix import get_prefix
from utils.logger import SimpleLogger

logger = SimpleLogger(__name__, log_dir="logs")

logger.info(
    """
8888888 8888888888   .8.           ,o888888o.    8 888888888o       ,o888888o. 8888888 8888888888 
      8 8888        .888.         8888     `88.  8 8888    `88.  . 8888     `88.     8 8888       
      8 8888       :88888.     ,8 8888       `8. 8 8888     `88 ,8 8888       `8b    8 8888       
      8 8888      . `88888.    88 8888           8 8888     ,88 88 8888        `8b   8 8888       
      8 8888     .8. `88888.   88 8888           8 8888.   ,88' 88 8888         88   8 8888       
      8 8888    .8`8. `88888.  88 8888           8 8888888888   88 8888         88   8 8888       
      8 8888   .8' `8. `88888. 88 8888   8888888 8 8888    `88. 88 8888        ,8P   8 8888       
      8 8888  .8'   `8. `88888.`8 8888       .8' 8 8888      88 `8 8888       ,8P    8 8888       
      8 8888 .888888888. `88888.  8888     ,88'  8 8888    ,88'  ` 8888     ,88'     8 8888       
      8 8888.8'       `8. `88888.  `8888888P'    8 888888888P       `8888888P'       8 8888      

    """
)

# Preliminary check before running application
try:
    check_env()
except FileNotFoundError as e:
    logger.error(f"FileNotFoundError: Failed to find configuration file, {e}")
except ValueError as e:
    logger.error(f"ValueError: Missing configuration environment variables, {e}")

load_dotenv()


DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
intents = Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix=get_prefix, intents=intents, help_command=None)


async def main():
    logger.info("TagBot launching...")
    await bot.add_cog(TagBot(bot))
    logger.info("TagBot complete...")
    await bot.start(DISCORD_TOKEN)


if __name__ == "__main__":
    asyncio.run(main())
