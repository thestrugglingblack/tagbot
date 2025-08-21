import redis
import os
from dotenv import load_dotenv

from utils.logger import SimpleLogger

logger = SimpleLogger("redisdb")
load_dotenv()

REDIS_HOST = os.getenv("REDIS_HOST") or "localhost"
REDIS_PORT = os.getenv("REDIS_PORT") or "6379"
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
REDIS_SSL = os.getenv("REDIS_SSL", "true").lower() == "true"

class RedisDB:
    def __init__(self, db: int = 0):

        self.connection = redis.StrictRedis(
            host=REDIS_HOST,
            port=REDIS_PORT,
            db=db,
            decode_responses=True,
            password=REDIS_PASSWORD,
            ssl=REDIS_SSL,
            ssl_cert_reqs=None,
        )

    def set(self, server_id: int, user_id: int, tags: dict, expiration):
        key = f"user:{server_id}:{user_id}:tags"
        logger.info(f"REDIS: Adding {user_id} information.")
        self.connection.hmset(key, tags)
        self.connection.expire(key, expiration)

    def get(self, server_id: int, user_id: int):
        key = f"user:{user_id}:{server_id}:tags"
        logger.info(f"REDIS: Retrieving {user_id} information.")
        return self.connection.hgetall(key)

    def close(self):
        logger.info("REDIS: Closed connection.")
        self.connection.close()
