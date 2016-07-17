page_title: Shippable Build Configuration
page_description: How to write your Shippable YML and Set up your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml

# Configure your build

All configuration for CI happens through shippable.yml which should be present at the root of the repository you want to build using Shippable. The following sections describe the overall structure of the shippable.yml file, as well as detailed descriptions of every section in it.

* * * 

##Anatomy of shippable.yml

The structure of a basic shippable.yml is shown below. The sections below explore each section of the yml in greater detail.

```
language: #any supported language tag

node_js:
  - #language version

services:
  - #any supported service

env:
  - #env1=foo
  - #env2=bar

matrix:

build:
  pre_ci:   

  pre_ci_boot:
    image_name: 
    image_tag:
    pull:
    options:
  ci:
  post_ci:
  on_success:
  on_failure:
  cache:

  push:

integrations:
 notifications:
   - integrationName:
     type:
     recipients:
       - #recp1
       - #recp2

  hub:
    - integrationName:
      type:
      agent_only:
```


* * * 

## language 

This is a mandatory tag that tells us the language used for your project so that we can choose the right build image. 

```
language: node_js

```

You can set this tag to the following values depending on the language you need for your build: `clojure`, `go`, `java`, `node_js`, `php`, `python`, `ruby`, `scala`, `c`

Specifying ```language: none``` in your yml skips any default language specific processing and will require you to specify a custom image for your build. Details are in the [Building unsupported languages](#unsupported_languages) section.



## runtime
The runtime tag depends tells us the version of the language you want to run your build against. For example, you can set the following for node_js:

```
node_js:
  - 0.12
```
Similarly, you can use `rvm` for Ruby, `jdk` for Java and Scala, `go` for go, `python` for python, `php` for PHP versions.

**Things to remember**

- Setting the runtime only works if you are using our default build images or an image pulled from our [drydock repository on Docker Hub](https://hub.docker.com/u/drydock/) for CI.

- You can specify language versions as number or string, i.e. as `0.10` or as `"0.10"`. In most cases the format is entirely interchangeable. However, in cases where the version number ends with a 0, such as `5.10`, it is safer to use a string to avoid the yml parser from transating the version to `5.1`.

## services
Shippable offers a host of pre-installed services to make it easy to run your builds. 
All the services are turned off by default and can be turned on by using the `services:` tag if required.

**Please note that the `services` tag only works if you are using the default image for your builds, or if you're pulling an official image from our [drydock repository on Docker Hub](https://hub.docker.com/u/drydock/).**

The sample snippet below will make postgres available in your build. You will need to create a database and user before you can use it as shown below: 

```
# Postgres binds to 127.0.0.1 by default.
# Create a user and DB as part of the ci section before using it

services:
  - postgres

build:
  ci:
    - psql -c 'create role shippable with superuser;' -U postgres
    - psql -c 'create database myapp_test;' -U postgres
```

If you want to use a service that is not available out of the box with Shippable, you can install it in the `ci` section of shippable.yml.

The following pages describe how to use each service in greater detail:

[CouchDB](services/couchdb.md)

[Elastic Search](services/elasticsearch.md)

[Kestrel](services/kestrel.md)

[Memcached](services/memcached.md) 

[MongoDB](services/mongodb.md) 

[MySQL](services/mysql.md)
 
[Neo4j](services/neo4j.md) 

[Postgres](services/postgres.md) 

[RabbitMQ](services/rabbitmq.md) 

[Redis](services/redis.md)

[RethinkDB](services/rethinkdb.md) 

[Riak](services/riak.md) 

[Selenium](services/selenium.md) 

[SqlLite](services/sqllite.md) 


## env
You can customize your build workflow by using environment variables that are set at runtime and available during your build. Shippable provides [a standard list of environment variables](advanced_options/env_var.md) that are available during each build. For example, you can use the `$BRANCH` variable to call different scripts depending on which branch is being built.

You can also define your custom environment variables in the `env` section of your shippable.yml:

```
env:
  - TEST=1 FOO=foo
```
The yml snippet above makes the variables $TEST and $FOO available during your build workflow.

Please note that environment variables set in the pre_ci section are not available in the `ci`, `post_ci`, `after_success`, and `after_failure` sections since `pre_ci `commands are run on the build machine and not inside the ci container.`

###Advanced topics for environment variables 
Our [advanced topic guide for environment variables](advanced_options/env_var.md) covers more complex scenarios like: 

*List of standard environment variables*

*Creating a build matrix with custom environment variables*

*Protecting secsitive data with Secure variables*

*Defining global variables*


## matrix
In most cases, you want to trigger one build for each commit/pull request to your repository. However, there are times when you might want to trigger multiple builds for a single code change. For example, you might want to test against multiple versions of Ruby, multiple aspect ratios for your Selenium tests, or multiple environment variables. 

Shippable supports this scenario through the Build Matrix feature, where the following yml configs will trigger multiple builds - 

- specifying more than one language `runtime`
- specifying more than one variable in the `env` section
- specifying multiple gemfiles for ruby

For example, the yml snippet below will generate 6 builds, one for each combinations of language runtime and environment variable:
```
language: node_js

node_js:
  - "0.10"
  - "0.12""

env:
  - FOO = 1
  - BAR = 1
  - TEST=1
  
```

The `matrix` tag lets you refine the build matrix by including/excluding specific combinations, or allowing specific jobs to fail without affecting overall build status.

###including/excluding specific jobs

You can exclude a specific job from a matrix by configuring your yml with an `exclude` tag:

```
language: ruby

rvm:
  - 1.9.2
  - 1.9.3
  - 2.0.0


matrix:
  exclude:
    - rvm: 1.9.2
```
The snippet above excludes the job for runtime 1.9.2 from the build matrix. 

You can also include only specific combinations in a build matrix by using the `include` tag as shown below:

```
matrix:
  include:
    - rvm: 2.0.0
      gemfile: gemfiles/Gemfile.rails-3.0.x
      env: ISOLATED=false
```

### allowing failures

Allowed failures are items in your build matrix that are allowed to fail without causing the entire build to be shown as failed. You can define allowed failures in the build matrix as follows:

```
matrix:
  allow_failures:
    - rvm: 1.9.3
```

As an example, check out this tutorial on [testing a node.js app against multiple versions of node](http://blog.shippable.com/how-to-test-your-node.js-app-against-multiple-versions-of-node). 


## build
The build section 


### pre_ci
### pre_ci_boot
### ci
### post_ci

### on_success

The `on_success` section is provided for any actions you want to take if your CI is successful. For example, you might want to 



### on_failure
### push

## integrations

### notifications
### hub
### deploy
### source control
