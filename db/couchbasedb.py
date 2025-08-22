import os
from dotenv import load_dotenv
from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.subdocument import upsert
from couchbase.management.collections import CreateCollectionSettings
from couchbase.options import (
    ClusterOptions,
    ClusterTimeoutOptions,
)
from couchbase.exceptions import (
    CollectionAlreadyExistsException,
    ScopeNotFoundException,
)


from utils.logger import SimpleLogger

logger = SimpleLogger("couchbasedb")

load_dotenv()
COUCHBASE_SCOPE = os.getenv("COUCHBASE_SCOPE")
COUCHBASE_COLLECTION = os.getenv("COUCHBASE_COLLECTION")
COUCHBASE_CONNECTION = os.getenv("COUCHBASE_CONNECTION") or "couchbase://localhost"


class CouchbaseDB:
    def __init__(self, username, password, bucket_name):
        self.bucket_name = bucket_name
        auth = PasswordAuthenticator(username, password)
        self.cluster = Cluster(
            COUCHBASE_CONNECTION,
            ClusterOptions(
                auth,
                timeout_options=ClusterTimeoutOptions(kv_timeout=timedelta(seconds=5)),
            ),
        )
        self.cluster.wait_until_ready(timedelta(seconds=5))
        self.bucket = self.cluster.bucket(bucket_name)
        self.collection_manager = self.bucket.collections()

        collection_name = COUCHBASE_COLLECTION
        self.scope_name = COUCHBASE_SCOPE

        try:
            self.collection_manager.create_scope(self.scope_name)
            logger.info(f"COUCHBASE: {self.scope_name} scope created.")
        except Exception as e:
            if "already exists" in str(e):
                logger.info(f"COUCHBASE: {self.scope_name} scope already exists.")
            else:
                logger.warning(f"COUCHBASE: {self.scope_name} scope failed to create.")

        try:
            self.collection_manager.create_collection(
                self.scope_name, collection_name, settings=CreateCollectionSettings()
            )
            logger.info(
                f"COUCHBASE: Created collection called {collection_name} in {self.scope_name} scope."
            )
        except ScopeNotFoundException:
            logger.error(f"COUCHBASE: Failed to find scope {self.scope_name}.")
        except CollectionAlreadyExistsException:
            logger.error(f"COUCHBASE: Collection {collection_name} already exists.")
        except Exception as e:
            logger.error(
                f"COUCHBASE: Failed to create collection {collection_name} due to {e}"
            )

    def create_collection(self, collection_name):
        logger.info(f"COUCHBASE: Creating the collection {collection_name}.")
        self.collection_manager.create_collection(collection_name)

    def get_collection(self, collection_name):
        logger.info(f"COUCHBASE: Retrieving the collection {collection_name}")
        return self.bucket.scope(self.scope_name).collection(collection_name)

    def add_item_in_collection(self, collection_name, item_name, item_data):
        collection = self.get_collection(collection_name)
        logger.info(
            f"COUCHBASE: Adding an entry for {item_name} to collection {collection_name}."
        )
        collection.insert(item_name, item_data)

    def get_item_in_collection(self, collection_name, item_name):
        collection = self.get_collection(collection_name)
        logger.info(
            f"COUCHBASE: Retrieving {item_name} from {collection_name} collection."
        )
        return collection.get(item_name)

    def update_partial_item_in_collection(
        self, collection_name, item_name, item_key, item_data
    ):
        collection = self.get_collection(collection_name)
        logger.info(
            f"COUCHBASE: Updating part of {item_name} in the {collection_name} collection."
        )
        collection.mutate_in(item_name, [upsert(item_key, item_data)])

    def close(self):
        logger.info("COUCHBASE: Close cluster.")
        self.cluster.close()
        logger.info("COUCHBASE: Close bucket...")
        self.bucket.close()
