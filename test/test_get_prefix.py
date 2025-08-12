import pytest
from unittest.mock import Mock, patch
from utils.get_prefix import get_prefix


@pytest.fixture
def mock_bot():
    """Create a mock bot with a user ID."""
    bot = Mock()
    bot.user = Mock()
    bot.user.id = 123456789
    return bot


@pytest.fixture
def mock_message():
    """Create a mock message object."""
    return Mock()


def test_get_prefix_returns_expected_prefixes(mock_bot, mock_message):
    """Test that get_prefix returns a function that provides the expected prefixes."""
    # Call the get_prefix function and returns a callable
    prefix_callable = get_prefix(mock_bot, mock_message)

    # Verify the result is a list containing our prefixes
    assert isinstance(prefix_callable, list)
    assert "tagbot " in prefix_callable or any(
        "tagbot " in str(p).lower() for p in prefix_callable
    )
    assert "Tagbot " in prefix_callable or any(
        "Tagbot " in str(p).lower() for p in prefix_callable
    )

    # Should also include the bot mention formats
    mention_formats = [f"<@{mock_bot.user.id}>", f"<@!{mock_bot.user.id}>"]
    for mention in mention_formats:
        assert any(mention in str(p) for p in prefix_callable)


def test_get_prefix_calls_when_mentioned_or_correctly():
    """Test that get_prefix calls commands.when_mentioned_or with correct arguments."""
    with patch("utils.get_prefix.commands.when_mentioned_or") as mock_when_mentioned:
        # Set up the mock to return a simple list
        mock_when_mentioned.return_value = lambda bot, msg: [
            "<@123>",
            "tagbot ",
            "Tagbot ",
        ]

        get_prefix(Mock(), Mock())

        # Verify when_mentioned_or was called with correct prefixes
        mock_when_mentioned.assert_called_once_with("tagbot ", "Tagbot ")


def test_get_prefix_handles_multiple_prefixes():
    """Test that get_prefix correctly handles all the defined prefixes."""
    with patch("utils.get_prefix.commands.when_mentioned_or") as mock_when_mentioned:
        # Define the expected prefixes
        expected_prefixes = ["tagbot ", "Tagbot "]

        get_prefix(Mock(), Mock())

        # Check that all expected prefixes were passed to when_mentioned_or
        args, _ = mock_when_mentioned.call_args
        assert all(prefix in args for prefix in expected_prefixes)
