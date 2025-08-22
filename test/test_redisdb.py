import pytest
from unittest.mock import MagicMock, patch
from db.redisdb import RedisDB


@pytest.fixture
@patch('db.redisdb.SimpleLogger')
def redis_db():
    with patch("db.redisdb.redis.StrictRedis") as MockRedis:
        mock_connection = MockRedis.return_value
        db = RedisDB(host="test_host", port=1234, db=0)
        db.connection = mock_connection
        yield db


def test_init():
    with patch("db.redisdb.redis.StrictRedis") as MockRedis:
        db = RedisDB(host="test_host", port=1234, db=5)
        MockRedis.assert_called_once_with(
            host="test_host", port=1234, db=5, decode_responses=True
        )


def test_set(redis_db):
    server_id = 123
    user_id = 456
    tags = {"psn": "foo", "wb": "bar"}
    expiration = 3600

    redis_db.set(server_id, user_id, tags, expiration)

    expected_key = f"user:{server_id}:{user_id}:tags"
    redis_db.connection.hmset.assert_called_once_with(expected_key, tags)
    redis_db.connection.expire.assert_called_once_with(expected_key, expiration)


def test_get(redis_db):
    server_id = 123
    user_id = 456
    expected_result = {"psn": "foo", "wb": "bar"}
    redis_db.connection.hgetall.return_value = expected_result

    result = redis_db.get(server_id, user_id)

    expected_key = f"user:{user_id}:{server_id}:tags"
    redis_db.connection.hgetall.assert_called_once_with(expected_key)
    assert result == expected_result


def test_close(redis_db):
    redis_db.close()
    redis_db.connection.close.assert_called_once()
