from discord.ext import commands


def get_prefix(bot, message):
    """
    Determines the command prefixes for the bot, including mentions.

    This function defines the prefixes that the bot will respond to,
    including both direct mentions and text prefixes like "tagbot " and "Tagbot ".

    Args:
        bot (commands.Bot): The bot instance for which to determine prefixes.
        message (discord.Message): The message object to determine prefixes for.
                                  This allows for context-specific prefixes.

    Returns:
        List[str]: A list of valid prefixes for the given message context.
                  Includes both direct mentions of the bot and the string prefixes.
    """
    prefixes = ["tagbot ", "Tagbot "]
    return commands.when_mentioned_or(*prefixes)(bot, message)
