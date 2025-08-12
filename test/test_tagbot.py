import pytest
from unittest.mock import MagicMock, patch
from discord.ext import commands


try:
    from unittest.mock import AsyncMock
except ImportError:

    class AsyncMock(MagicMock):
        async def __call__(self, *args, **kwargs):
            return super(AsyncMock, self).__call__(*args, **kwargs)


from bot.tagbot import TagBot


@pytest.fixture
def mock_bot():
    return MagicMock()


@pytest.fixture
def tagbot(mock_bot):
    with patch("bot.tagbot.RedisDB") as MockRedisDB, patch(
        "bot.tagbot.CouchbaseDB"
    ) as MockCouchbaseDB, patch("bot.tagbot.TAG_EXPIRATION", "3600"), patch(
        "bot.tagbot.COUCHBASE_COLLECTION", "tags"
    ):

        # Mock Redis
        mock_redis = MagicMock()
        mock_redis.connection.ping.return_value = True
        MockRedisDB.return_value = mock_redis

        # Mock Couchbase
        mock_couchbase = MagicMock()
        mock_couchbase.cluster.wait_until_ready.return_value = True
        MockCouchbaseDB.return_value = mock_couchbase

        # Create TagBot instance
        bot = TagBot(mock_bot)

        yield bot


@pytest.fixture
def mock_ctx():
    ctx = MagicMock()
    ctx.author.id = 12345
    ctx.author.name = "TestUser"
    ctx.guild.id = 67890
    ctx.message = MagicMock()
    ctx.message.mentions = []
    ctx.message.content = ""

    ctx.send = AsyncMock()

    return ctx


class TestTagBot:
    # Initialization Tests
    def test_init(self, mock_bot):
        with patch("bot.tagbot.TagBot._initialize_redis") as mock_init_redis, patch(
            "bot.tagbot.TagBot._initialize_couchbase"
        ) as mock_init_couchbase:
            mock_init_redis.return_value = "redis_instance"
            mock_init_couchbase.return_value = "couchbase_instance"

            tagbot = TagBot(mock_bot)

            assert tagbot.bot == mock_bot
            assert tagbot.redis_db == "redis_instance"
            assert tagbot.couchbase_db == "couchbase_instance"
            mock_init_redis.assert_called_once()
            mock_init_couchbase.assert_called_once()

    def test_initialize_redis_success(self):
        with patch("bot.tagbot.RedisDB") as MockRedisDB:
            mock_redis = MagicMock()
            mock_redis.connection.ping.return_value = True
            MockRedisDB.return_value = mock_redis

            tagbot = TagBot(MagicMock())

            assert tagbot.redis_db is not None
            MockRedisDB.assert_called_once()

    def test_initialize_redis_failure(self):
        with patch("bot.tagbot.RedisDB") as MockRedisDB:
            MockRedisDB.side_effect = Exception("Redis connection failed")

            tagbot = TagBot(MagicMock())

            assert tagbot.redis_db is None

    def test_initialize_couchbase_success(self):
        with patch("bot.tagbot.CouchbaseDB") as MockCouchbaseDB:
            mock_couchbase = MagicMock()
            MockCouchbaseDB.return_value = mock_couchbase

            tagbot = TagBot(MagicMock())

            assert tagbot.couchbase_db is not None
            MockCouchbaseDB.assert_called_once()

    def test_initialize_couchbase_failure(self):
        with patch("bot.tagbot.CouchbaseDB") as MockCouchbaseDB:
            MockCouchbaseDB.side_effect = Exception("Couchbase connection failed")

            tagbot = TagBot(MagicMock())

            assert tagbot.couchbase_db is None

    @pytest.mark.asyncio
    async def test_send_error(self, tagbot, mock_ctx):
        error_message = "Test error message"
        await tagbot._send_error(mock_ctx, error_message)
        mock_ctx.send.assert_called_once_with(error_message)

    def test_cache_tag_in_redis(self, tagbot):
        server_id = 12345
        user_id = 67890
        tag_data = {"psn": "test_psn", "wb": "test_wb"}

        tagbot._cache_tag_in_redis(server_id, user_id, tag_data)

        tagbot.redis_db.set.assert_called_once_with(
            server_id, user_id, tag_data, expiration="3600"
        )

    def test_cache_tag_in_redis_no_redis(self, tagbot):
        tagbot.redis_db = None
        server_id = 12345
        user_id = 67890
        tag_data = {"psn": "test_psn", "wb": "test_wb"}

        # Should not raise an exception
        tagbot._cache_tag_in_redis(server_id, user_id, tag_data)

    def test_get_tag_from_couchbase_success(self, tagbot):
        user_id = 12345
        expected_result = {"psn": "test_psn", "wb": "test_wb"}

        mock_result = MagicMock()
        mock_result.content_as.__getitem__.return_value = expected_result
        tagbot.couchbase_db.get_item_in_collection.return_value = mock_result

        result = tagbot._get_tag_from_couchbase(user_id)

        tagbot.couchbase_db.get_item_in_collection.assert_called_once_with(
            "tags", str(user_id)
        )
        assert result == expected_result

    def test_get_tag_from_couchbase_not_found(self, tagbot):
        user_id = 12345

        # Create a proper exception class that inherits from BaseException
        class MockDocNotFoundException(Exception):
            pass

        # Patch DocumentNotFoundException at the module level where it's being caught
        with patch("bot.tagbot.DocumentNotFoundException", MockDocNotFoundException):
            # Set up the mock to raise our custom exception
            with patch.object(
                tagbot.couchbase_db, "get_item_in_collection"
            ) as mock_get:
                mock_get.side_effect = MockDocNotFoundException("Document not found")

                # Now when the code runs, it will catch our mocked exception class
                result = tagbot._get_tag_from_couchbase(user_id)
                assert result is None

    def test_get_tag_from_couchbase_exception(self, tagbot):
        user_id = 12345

        # Create a proper exception class for DocumentNotFoundException
        class MockDocNotFoundException(Exception):
            pass

        # Patch DocumentNotFoundException at the module level
        with patch("bot.tagbot.DocumentNotFoundException", MockDocNotFoundException):
            # Set up the mock to raise a standard exception (different from DocumentNotFoundException)
            with patch.object(
                tagbot.couchbase_db, "get_item_in_collection"
            ) as mock_get:
                mock_get.side_effect = RuntimeError("Test error")

                result = tagbot._get_tag_from_couchbase(user_id)
                assert result is None


    @pytest.mark.asyncio
    async def test_on_command_error_cooldown(self, tagbot, mock_ctx):
        error = commands.CommandOnCooldown(commands.BucketType.user, 5.5, 1)
        await tagbot.on_command_error(mock_ctx, error)
        mock_ctx.send.assert_called_once_with(
            "Please wait 6 seconds before using this command again."
        )

    @pytest.mark.asyncio
    async def test_on_command_error_other(self, tagbot, mock_ctx):
        error = commands.CommandNotFound()
        await tagbot.on_command_error(mock_ctx, error)
        mock_ctx.send.assert_not_called()

    # Command Tests
    @pytest.mark.asyncio
    async def test_healthcheck(self, tagbot, mock_ctx):
        await tagbot.healthcheck(tagbot, mock_ctx)
        mock_ctx.send.assert_called_once_with("Healthcheck Status: ✅ ")

    @pytest.mark.asyncio
    async def test_tag_no_mentions(self, tagbot, mock_ctx):
        mock_ctx.message.mentions = []
        await tagbot.tag(tagbot, mock_ctx)
        mock_ctx.send.assert_called_once_with(
            "Please mention the Discord user when using TagBot. _*Example*: tagbot tag @thestrugglingblack_ "
        )

    @pytest.mark.asyncio
    async def test_tag_from_redis(self, tagbot, mock_ctx):
        mentioned_user = MagicMock()
        mentioned_user.id = 54321
        mentioned_user.name = "MentionedUser"
        mock_ctx.message.mentions = [mentioned_user]

        redis_tag = {"psn": "test_psn", "wb": "test_wb"}
        tagbot.redis_db.get.return_value = redis_tag

        await tagbot.tag(tagbot, mock_ctx)

        tagbot.redis_db.get.assert_called_once_with(
            mock_ctx.guild.id, mentioned_user.id
        )
        mock_ctx.send.assert_called_once()
        assert "MentionedUser's tags are" in mock_ctx.send.call_args[0][0]
        assert "test_psn" in mock_ctx.send.call_args[0][0]
        assert "test_wb" in mock_ctx.send.call_args[0][0]

    @pytest.mark.asyncio
    async def test_tag_from_couchbase(self, tagbot, mock_ctx):
        mentioned_user = MagicMock()
        mentioned_user.id = 54321
        mentioned_user.name = "MentionedUser"
        mock_ctx.message.mentions = [mentioned_user]

        tagbot.redis_db.get.return_value = None
        couchbase_tag = {"psn": "couchbase_psn", "wb": "couchbase_wb"}

        with patch.object(
            tagbot, "_get_tag_from_couchbase", return_value=couchbase_tag
        ) as mock_get_tag, patch.object(
            tagbot, "_cache_tag_in_redis"
        ) as mock_cache_tag:
            await tagbot.tag(tagbot, mock_ctx)

            mock_get_tag.assert_called_once_with(mentioned_user.id)
            mock_cache_tag.assert_called_once_with(
                mock_ctx.guild.id, mentioned_user.id, couchbase_tag
            )
            mock_ctx.send.assert_called_once()
            assert "MentionedUser's tags are" in mock_ctx.send.call_args[0][0]
            assert "couchbase_psn" in mock_ctx.send.call_args[0][0]
            assert "couchbase_wb" in mock_ctx.send.call_args[0][0]

    @pytest.mark.asyncio
    async def test_tag_not_found(self, tagbot, mock_ctx):
        mentioned_user = MagicMock()
        mentioned_user.id = 54321
        mentioned_user.name = "MentionedUser"
        mock_ctx.message.mentions = [mentioned_user]

        tagbot.redis_db.get.return_value = None
        with patch.object(tagbot, "_get_tag_from_couchbase", return_value=None):
            await tagbot.tag(tagbot, mock_ctx)
            mock_ctx.send.assert_called_once()
            assert "doesn't have any tags" in mock_ctx.send.call_args[0][0]

    @pytest.mark.asyncio
    async def test_tag_exception(self, tagbot, mock_ctx):
        mentioned_user = MagicMock()
        mentioned_user.id = 54321
        mentioned_user.name = "MentionedUser"
        mock_ctx.message.mentions = [mentioned_user]

        tagbot.redis_db.get.side_effect = Exception("Test exception")
        await tagbot.tag(tagbot, mock_ctx)
        mock_ctx.send.assert_called_once()
        assert "An error occurred" in mock_ctx.send.call_args[0][0]

    @pytest.mark.asyncio
    async def test_add_command_success_update(self, tagbot, mock_ctx):
        mock_ctx.message.content = "tagbot add psn test_psn_id"
        with patch.object(
            tagbot, "_get_tag_from_couchbase", return_value={"wb": "existing_tag"}
        ):
            await tagbot.add(tagbot, mock_ctx)

            tagbot.couchbase_db.update_partial_item_in_collection.assert_called_once_with(
                "tags", str(mock_ctx.author.id), "psn", "test_psn_id"
            )
            assert "updated" in mock_ctx.send.call_args[0][0]

    @pytest.mark.asyncio
    async def test_add_command_success_new(self, tagbot, mock_ctx):
        mock_ctx.message.content = "tagbot add psn test_psn_id"
        with patch.object(tagbot, "_get_tag_from_couchbase", return_value=None):
            await tagbot.add(tagbot, mock_ctx)

            tagbot.couchbase_db.add_item_in_collection.assert_called_once_with(
                "tags", str(mock_ctx.author.id), {"psn": "test_psn_id"}
            )
            assert "added" in mock_ctx.send.call_args[0][0]

    @pytest.mark.asyncio
    async def test_add_command_missing_tag(self, tagbot, mock_ctx):
        mock_ctx.message.content = "tagbot add psn "
        mock_ctx.send.reset_mock()

        from utils.default_msg import PLATFORMS

        expected_error_msg = PLATFORMS.get("psn")

        # Mock couchbase to prevent duplicate calls
        with patch.object(tagbot, "_get_tag_from_couchbase", return_value=None):
            await tagbot.add(tagbot, mock_ctx)

            # Assert error sent
            assert mock_ctx.send.call_args_list[0][0][0] == expected_error_msg

    @pytest.mark.asyncio
    async def test_add_command_invalid_platform(self, tagbot, mock_ctx):
        mock_ctx.message.content = "tagbot add invalid test_id"
        await tagbot.add(tagbot, mock_ctx)
        mock_ctx.send.assert_called_once_with("Invalid platform. Use 'psn' or 'wb'.")

    @pytest.mark.asyncio
    async def test_add_command_exception(self, tagbot, mock_ctx):
        mock_ctx.message.content = "tagbot add psn test_psn_id"
        with patch.object(tagbot, "_get_tag_from_couchbase") as mock_get_tag:
            mock_get_tag.side_effect = Exception("Test exception")
            await tagbot.add(tagbot, mock_ctx)
            mock_ctx.send.assert_called_once()
            assert "An error occurred" in mock_ctx.send.call_args[0][0]

    @pytest.mark.asyncio
    async def test_help_command(self, tagbot, mock_ctx):
        with patch("bot.tagbot.Embed", return_value=MagicMock()) as mock_embed_class:
            mock_embed = mock_embed_class.return_value

            await tagbot.help_command(tagbot, mock_ctx)

            mock_embed_class.assert_called_once()
            mock_embed.set_thumbnail.assert_called_once()
            assert mock_embed.add_field.call_count == 2
            mock_ctx.send.assert_called_once()
