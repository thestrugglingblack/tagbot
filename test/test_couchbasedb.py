import sys
from unittest.mock import MagicMock, patch, ANY

import pytest

# Import ethe modules before my Couchbase class
couchbase_mock = MagicMock()
sys.modules["couchbase"] = couchbase_mock
sys.modules["couchbase.auth"] = MagicMock()
sys.modules["couchbase.options"] = MagicMock()
sys.modules["couchbase.subdocument"] = MagicMock()
sys.modules["couchbase.cluster"] = MagicMock()
sys.modules["couchbase.management.collections"] = MagicMock()
sys.modules["couchbase.exceptions"] = MagicMock()

from db.couchbasedb import CouchbaseDB


@pytest.fixture
def couchbase_db():
    with patch("db.couchbasedb.Cluster") as MockCluster:
        mock_cluster = MockCluster.return_value
        mock_bucket = mock_cluster.bucket.return_value
        mock_collection_manager = mock_bucket.collections.return_value
        mock_scope = mock_bucket.scope.return_value
        mock_collection = mock_scope.collection.return_value

        db = CouchbaseDB("testuser", "testpassword", "testbucket")
        db.cluster = mock_cluster
        db.bucket = mock_bucket
        db.collection_manager = mock_collection_manager
        yield db


def test_create_collection(couchbase_db):
    couchbase_db.collection_manager.create_collection = MagicMock()
    couchbase_db.create_collection("testcollection")
    couchbase_db.collection_manager.create_collection.assert_called_once_with(
        "testcollection"
    )


def test_get_collection(couchbase_db):
    # Create mock scope and collection
    mock_scope = couchbase_db.bucket.scope.return_value
    mock_collection = mock_scope.collection.return_value
    collection_name = "test_collection"

    result = couchbase_db.get_collection(collection_name)

    couchbase_db.bucket.scope.assert_called_once_with(couchbase_db.scope_name)
    mock_scope.collection.assert_called_once_with(collection_name)
    assert result == mock_collection


def test_add_item_in_collection(couchbase_db):
    collection_name = "test_collection"
    item_name = "test_item"
    item_data = {"key": "value"}

    # Create mock item in collection
    mock_collection = MagicMock()
    couchbase_db.get_collection = MagicMock(return_value=mock_collection)
    couchbase_db.add_item_in_collection(collection_name, item_name, item_data)

    couchbase_db.get_collection.assert_called_once_with(collection_name)
    mock_collection.insert.assert_called_once_with(item_name, item_data)


def test_get_item_in_collection(couchbase_db):
    # Create mock item in collection
    collection_name = "test_collection"
    item_name = "test_item"
    expected_result = {"key": "value"}
    mock_collection = MagicMock()
    mock_collection.get.return_value = expected_result
    couchbase_db.get_collection = MagicMock(return_value=mock_collection)

    result = couchbase_db.get_item_in_collection(collection_name, item_name)

    couchbase_db.get_collection.assert_called_once_with(collection_name)
    mock_collection.get.assert_called_once_with(item_name)
    assert result == expected_result


def test_update_partial_item_in_collection(couchbase_db):
    # Create mock item in collection
    collection_name = "test_collection"
    item_name = "test_item"
    item_key = "field1"
    item_data = "new_value"
    mock_collection = MagicMock()
    couchbase_db.get_collection = MagicMock(return_value=mock_collection)

    # Replace upsert function with my mock value
    with patch("db.couchbasedb.upsert") as mock_upsert:
        mock_upsert.return_value = "upsert_spec"
        couchbase_db.update_partial_item_in_collection(
            collection_name, item_name, item_key, item_data
        )

        couchbase_db.get_collection.assert_called_once_with(collection_name)
        mock_upsert.assert_called_once_with(item_key, item_data)
        mock_collection.mutate_in.assert_called_once_with(item_name, ["upsert_spec"])


def test_close(couchbase_db):
    couchbase_db.close()
    couchbase_db.cluster.close.assert_called_once()
    couchbase_db.bucket.close.assert_called_once()


def test_init_creates_scope_and_collection(couchbase_db):
    with patch.dict(
        "os.environ",
        {"COUCHBASE_SCOPE": "test_scope", "COUCHBASE_COLLECTION": "test_collection"},
    ):
        with patch("db.couchbasedb.COUCHBASE_SCOPE", "test_scope"):
            with patch("db.couchbasedb.COUCHBASE_COLLECTION", "test_collection"):
                with patch("db.couchbasedb.Cluster") as MockCluster:
                    mock_cluster = MockCluster.return_value
                    mock_bucket = mock_cluster.bucket.return_value
                    mock_collection_manager = mock_bucket.collections.return_value

                    db = CouchbaseDB("testuser", "testpassword", "testbucket")

                    mock_collection_manager.create_scope.assert_called_once_with(
                        "test_scope"
                    )

                    mock_collection_manager.create_collection.assert_called_once_with(
                        "test_scope", "test_collection", settings=ANY
                    )
