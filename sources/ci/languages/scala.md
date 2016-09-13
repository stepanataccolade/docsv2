
# Continuous Integration with Scala
This page explains yml configuration that is specific to Scala projects. For a complete yml reference, please read the [Build configuration section](../shippableyml.md)

##yml configuration

The sections below explore sections of the yml that are specific to Scala projects.


###language


For Scala projects, this tag should always be set to scala as show below:

```
language: scala
```

### runtime
Our official build images for Scala come pre-installed with the following versions:

* 2.9.x
* 2.10.x
* 2.11.x

You can set the runtime to any version(s) using the `scala` tag:

```
scala:
  - 2.9.3
```

If you want to test against several versions of Scala, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
scala:
  - 2.9.3
  - 2.10.5
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml.

### pre_ci and pre_ci_boot

Depending on the `language` and `services` tags in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. The default images for Scala builds are explained below.

The pre_ci and pre_ci_boot sections are primarily used in one of the following scenarios:

* You want to use a custom Docker image for your CI
* You want to override the default options that are used to boot up the default CI image

If you do not want to do either of the above, you should skip these tags in the yml.

#### Default Scala images
We have 2 primary build images for Scala projects, which should be sufficient for most projects:

* [dry-dock/u14sca](https://github.com/dry-dock/u14sca) is used if you specify `language: scala` in your yml and do not specify a `services` tag. This image contains the following:

	* Ubuntu 14.04
	* Scala versions 2.9.x, 2.10.x, 2.11.x
	* sbt
	* Git
	* Basic packages sudo, build-essential, curl, gcc, make, openssl, software-properties-common, wget, nano, unzip, libxslt-dev, libxml2-dev
	* Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7  
	* Python packages python-pip, python-software-properties, python-dev
	* Node version 0.10
	* Default Ruby version
	* Python 2.7.6
	* awscli
	* google-cloud-sdk

* [dry-dock/u14scaall](https://github.com/dry-dock/u14scaall) is used if you specify one or more services and set the language to go in the yml. This image contains the following **in addition** to everything that is listed for the u14sca image above:

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
The Scala builder assumes dependency management based on projects like Maven, Gradle or SBT and it will pull down project dependencies automatically before running tests. You do not need to explicitly install dependencies in your yml.


#### Using sbt
If you are using sbt to test,you can include your custom sbt command in the `ci` section with any options you want:  

```
build:
  ci:
    - sbt -jvm-opts <path to compile options> ... compile  
    - sbt -jvm-opts <path to test options> ... test

```

####Using maven, gradle, ant
If you are not using sbt, your project behaves very much like a Java project. Please read our [Java page](java.md) to learn how to use these tools.

mvn example:

```
jdk: oraclejdk8
build:
  ci:
    - mvn install -DskipTests=true -Dmaven.javadoc.skip=true -B -V
    - shippable_retry mvn clean test

```

#### Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

#### Testing against multiple JDKs
You can test your projects against one or more supported JDKs: OpenJDK 7, Oracle JDK 7, Oracle JDK 8, OpenJDK 6.

Use the `jdk` flag to achieve this:

```
jdk:
  - openjdk7
  - oraclejdk7
  - oraclejdk8
  - openjdk6
```
The yml above will trigger 4 builds, one against each jdk version.


#### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
   - sbt ++$SHIPPABLE_SCALA_VERSION test
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
