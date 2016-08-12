
#Postgres

Postgres 9.4 is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Postgres.

To start postgres, include the following in your shippable.yml:

```
services:
  - postgres
```

When started, Postgres binds to 127.0.0.1 by default. You should create a user and the database before using it for your application:

```
build:
  ci:
    - psql -c 'create role shippable with superuser;' -U postgres
    - psql -c 'create database myapp_test;' -U postgres

``` 

If your test setup uses different credentials or settings to access the test database, you should put these settings in a config file in your repository (config/database.shippable.yml for example) and copy it over in the ci section:

```
build:
  ci:
    - cp config/database.shippable.yml config/database.yml

```

###Custom startup command 

To customize the startup command, you should define the SHIPPABLE_POSTGRES_CMD environment variable in your yml. 

For example, the following yml snippet overrides the default startup command for postgres:

```
env:
  global:
    - SHIPPABLE_POSTGRES_VERSION="9.4"
    - SHIPPABLE_POSTGRES_BINARY="/usr/lib/postgresql/$SHIPPABLE_POSTGRES_VERSION/bin/postgres"
    - SHIPPABLE_POSTGRES_CMD="sudo -u postgres $SHIPPABLE_POSTGRES_BINARY -c \"config_file=/etc/postgresql/$SHIPPABLE_POSTGRES_VERSION/main/postgresql.conf\" -c \"fsync=off\" -c \"synchronous_commit=off\""
```

###Using Postgis
We do not have Postgis installed on our official build images. If you want to use it for your build, you will need to install and activate it in your yml:

```
build:
  ci:
    - sudo apt-get install postgresql-9.3-postgis
    - psql -U postgres -c "create extension postgis"
```


###Using other versions of Postgres
We no longer support multiple versions of Postgres with our official build images, so you can't use the addons tag to specify a different version.

If you want to use other versions of Postgres for your build, you will need to install it during your build or use a custom build image for your CI.