
#CouchDB

CouchDB 1.6.1 is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs CouchDB.

To start CouchDB, include the following in your shippable.yml:

```
services:
  - couchdb
```

When started, CouchDB binds to the default localhost 127.0.0.1 and runs on default port 5984. 

Before using it, you should create a database in the `ci` section of your yml:

```
build:
  ci:
    - curl -X PUT localhost:5984/mytestdb
```

###Custom startup command 

To customize the startup command, you should define the SHIPPABLE_COUCHDB_CMD environment variable in your yml. 

For example, the following yml snippet overrides the default startup command for CouchDB:

```
env:
  global:
    - SHIPPABLE_COUCHDBCouchDB_CMD="<command>"
```


