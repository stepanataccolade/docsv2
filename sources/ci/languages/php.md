
# PHP
This page explains yml configuration that is specific to PHP projects. For a complete yml reference, please read the [Build configuration section](../shippableyml.md)

##yml configuration

The sections below explore sections of the yml that are specific to PHP projects. 


###language 


For PHP projects, this tag should always be set to php as show below:

```
language: php
```

### runtime
Our official build images for PHP come pre-installed with the following versions:

* 5.4
* 5.5
* 5.6
* 7

You can set the runtime to any version(s) using the `php` tag:

```
php:
  - 5.5
```

If you want to test against several versions of PHP, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
php:
  - 5.4
  - 5.5
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml.

### pre_ci and pre_ci_boot

Depending on the `language` and `services` tags in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. The default images for PHP builds are explained below.

The pre_ci and pre_ci_boot sections are primarily used in one of the following scenarios:

* You want to use a custom Docker image for your CI 
* You want to override the default options that are used to boot up the default CI image

If you do not want to do either of the above, you should skip these tags in the yml.

#### Default PHP images
We have 2 primary build images for PHP projects, which should be sufficient for most projects: 

* [dry-dock/u14php](https://github.com/dry-dock/u14php) is used if you specify `language: php` in your yml and do not specify a `services` tag. This image contains the following:
	
	* Ubuntu 14.04
	* PHP versions 5.4, 5.5, 5.6 with extensions memcache, memcached, mongo, amqp-1.6.8, zmq-beta, redis
	* PHP version 7 with no extensions
	* phpUnit
	* composer
	* phpenv
	* pickle
	* librabbitmq
	* Packages wget cmake, libmcrypt-dev, libreadline-dev, libzmq-dev, wget, cmake, libmcrypt-dev, libreadline-dev, libzmq-dev, php5-dev
	* Git
	* Basic packages sudo, build-essential, curl, gcc, make, openssl, software-properties-common, wget, nano, unzip, libxslt-dev, libxml2-dev
	* Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7  
	* Python packages python-pip, python-software-properties, python-dev
	* Node version 0.10 
	* Default Ruby version
	* Python 2.7.6
	* awscli
	* google-cloud-sdk 

* [dry-dock/u14phpall](https://github.com/dry-dock/u14phpall) is used if you specify one or more services and set the language to go in the yml. This image contains the following **in addition** to everything that is listed for the u14php image above:

	* couchdb 1.6
	* elasticsearch 1.5
	* neo4j 2.2
	* memcached 1.4
	* mongodb 3.0
	* mysql 5.6
	* postgres 9.4
	* rabbitmq 3.5
	* redis 3.0
	* rethinkdb 2.0
	* riak
	* selenium 2.52
	* sqllite 3


If these official images do not satisfy your requirements, you can do one of 2 things:

- Continue using official images and include commands to install any missing dependencies or packages in your yml
- Use a custom build image that contains exactly what you need for yout CI
	
#### Using a custom build image
If you do decide to use a custom CI image, you will need to configure the `pre_ci_boot` section and optionally, the `pre_ci` section if you're also building the CI image as part of the workflow. Details on how to configure this are available in the [`pre_ci` and `pre_ci_boot` sections of the Build configuration page](../shippableyml.md#build). 

### ci
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

#### Installing dependencies
If needed, you can download and install any dependencies needed for your build. This can be done using a PHP script, a shell script or with any series of commands. For example:

```
build:
  ci:
    - ./bin/ci/install_deps.sh
    - php vendor/vendors.php

```

#### Running tests
Include your test command(s) in the ci section, after you've installed any required dependencies.  


```
build:
  ci:
    - phpunit <path to test file>
```

#### Enabling pre-installed extensions
Your build container comes pre-installed with the following extensions for versions 5.4, 5.5, 5.6: memcache, memcached, mongo, amqp-1.6.8, zmq-beta, redis
 
You need to enable the extensions you need in your yml. Replace the <extension> in the yml snippet below by the extension you need to enable: 

```
build:
  ci:
    - echo "extension=<extension>.so" >> $HOME/.phpenv/versions/$(phpenv version-name)/etc/php.ini;
```

#### Installing extensions
If you need to install an extension that is not pre-installed in your build container, you can use pickle to install and enable it as shown below:

```
build:
  ci:
    - pickle install intl
    - echo "extension=intl.so" >> $HOME/.phpenv/versions/$(phpenv version-name)/etc/php.ini;

```

#### Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

For example, you can enable test and code coverage visualizations while using phpunit as shown below:

```
build:
  ci:  
    - mkdir -p shippable/testresults
    - mkdir -p shippable/codecoverage
    - phpunit  --log-junit shippable/testresults/junit.xml --coverage-xml shippable/codecoverage test.php
```

#### Caching PHP extensions
If you are installing php extensions s part of your build, you might want to cache the extensions folder to speed up your build. This will avoid instaling the extention each time:

```
build:
  cache: true
  cache_dir_list:
    - $HOME/.phpenv/versions/$(phpenv version-name)/lib/php/extensions/   
```

#### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
    - phpunit
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.







