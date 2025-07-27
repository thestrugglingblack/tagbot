import redis
from utils.logger import SimpleLogger

logger = SimpleLogger("redisdb")

class RedisDB:
    def __init__(self, host: str = "localhost", port: int = 6379, db: int = 0):
        self.connection = redis.StrictRedis(host=host, port=port, db=db, decode_responses=True)

    def set(self, server_id: int, user_id:int, tags: dict, expiration):
        key = f'user:{server_id}:{user_id}:tags'
        self.connection.hmset(key, tags)
        self.connection.expire(key, expiration)

    def get(self, server_id: int, user_id: int):
        key = f'user:{user_id}:{server_id}:tags'
        return self.connection.hgetall(key)

    def delete(self, server_id:int, user_id:int):
        key = f'user:{user_id}:{server_id}:tags'
        self.connection.delete(key)

    def close(self):
        self.connection.close()