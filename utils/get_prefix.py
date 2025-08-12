from discord.ext import commands


def get_prefix(bot, message):
    prefixes = ["tagbot ", "Tagbot "]
    return commands.when_mentioned_or(*prefixes)(bot, message)
