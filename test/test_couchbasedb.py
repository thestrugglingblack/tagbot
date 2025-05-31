from unittest.mock import MagicMock, patch

import pytest

from db.couchbasedb import CouchbaseDB


@pytest.fixture
def couchbase_db():
    with patch('db.couchbasedb.Cluster') as MockCluster:
        mock_cluster = MockCluster.return_value
        mock_bucket = mock_cluster.bucket.return_value
        mock_collection_manager = mock_bucket.collections.return_value
        mock_scope = mock_bucket.scope.return_value
        mock_collection = mock_scope.collection.return_value

        db = CouchbaseDB('testuser', 'testpassword', 'testbucket')
        db.cluster = mock_cluster
        db.bucket = mock_bucket
        db.collection_manager = mock_collection_manager
        db.get_collection = MagicMock(return_value=mock_collection)
        yield db

def test_create_collection(couchbase_db):
    couchbase_db.collection_manager.create_collection = MagicMock()
    couchbase_db.create_collection('testcollection')
    couchbase_db.collection_manager.create_collection.assert_called_once_with('testcollection')
