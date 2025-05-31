from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import (ClusterOptions, ClusterTimeoutOptions,
                               QueryOptions)

class CouchbaseDB:
    def __init__(self, username, password, bucket_name, host="localhost"):
        self.bucket_name = bucket_name
        auth = PasswordAuthenticator(username, password)
        self.cluster = Cluster(
            f"couchbase://{host}",
            ClusterOptions(auth, timeout_options=ClusterTimeoutOptions(kv_timeout=timedelta(seconds=5))),
        )
        self.cluster.wait_until_ready(timedelta(seconds=5))
        self.bucket = self.cluster.bucket(bucket_name)
        self.collection_manager = self.bucket.collections()

    def create_collection (self, collection_name):
        self.collection_manager.create_collection(collection_name)

    def get_collection (self, scope_name, collection_name):
        return self.bucket.scope(scope_name).collection(collection_name)

    def add_item_in_collection (self, collection_name, item_name, item_data):
        collection = self.get_collection(collection_name)
        collection.insert(item_name, item_data)

    def get_item_in_collection (self, collection_name, item_name):
        collection = self.get_collection(collection_name)
        return collection.get(item_name)

    def update_item_in_collection (self, collection_name, item_name, item_data):
        collection = self.get_collection(collection_name)
        collection.upsert(item_name, item_data)

        # Doc NOT exist
        # upsert
        # Doc DO exist
        # replace

    def update_partial_item_in_collection (self, collection_name, item_name, item_key, item_data):
        collection = self.get_collection(collection_name)
        collection.mutate_in(item_name,[subdocument.upsert(item_key, item_data)])

    def remove_item_in_collection (self, collection_name, item_name):
        collection = self.get_collection(collection_name)
        collection.remove(item_name)

    def remove_partial_item_in_collection (self, collection_name, item_name, item_key):
        collection = self.get_collection(collection_name)
        collection.mutate_in(item_name, [subdocument.remove(item_key)])

    def close(self):
        self.cluster.close()
        self.bucket.close()