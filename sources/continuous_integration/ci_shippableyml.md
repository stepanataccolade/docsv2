page_title: Shippable Build Configuration
page_description: How to write your Shippable YML and Set up your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml

# Configure your build

All configuration for CI happens through shippable.yml which should be present at the root of the repository you want to build using Shippable. The following sections describe the overall structure of the shippable.yml file, as well as detailed descriptions of every section in it.

* * * 

' of shippable.yml

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

In addition, we support the following languages:

```clojure```

```go```

```java```

```node_js```

```php```

```python```

```ruby```

```scala```

```none```

```c```

Specific examples for each language are in our [Language guide](ci_languages.md)

Specifying ```language: none``` in your yml skips any default language specific processing and will require you to specify a custom image for your build. Details are in the [Building unsupported languages](#unsupported_languages) section.


## runtime
The runtime tag depends tells us the version of the language you want to run your build against. For example, you can set the following for node_js:

```
node_js:
  - 0.12
```
Similarly, you can use ```rvm``` for Ruby, ```jdk``` for Java and Scala, ```go``` for go, ```python``` for python, ```php``` for PHP versions.

Setting the runtime only works if you are using our default build images or an image pulled from our [drydock repository on Docker Hub](https://hub.docker.com/u/drydock/).

Please note that you can specify language versions as number or string, i.e. as `0.10` or as `"0.10"`. In most cases the format is entirely interchangeable. However, in cases where the version number ends with a 0, such as `5.10`, it is safer to use a string to avoid the yml parser from transating the version to `5.1`.

## services
Shippable offers a host of pre-installed services to make it easy to run your builds. 
All the services are turned off by default and can be turned on by using the `services:` tag.

**Please note that the `services` tag only works if you are using the default image for your builds, or if you're pulling an official image from our [drydock repository on Docker Hub](https://hub.docker.com/u/drydock/).**



```yaml
# Postgres binds to 127.0.0.1 by default.
# Create a user and DB as part of the ci section before using it

services:
  - postgres

build:
  ci:
    - psql -c 'create role shippable with superuser;' -U postgres
    - psql -c 'create database myapp_test;' -U postgres
```

In addition to these you can install other services in the 'ci' section tag of `shippable.yml`.


## env

## matrix

## build

### pre_ci
### pre_ci_boot
### ci
### post_ci
### on_success
### on_failure
### push

## integrations

### notifications
### hub
### deploy
### source control
