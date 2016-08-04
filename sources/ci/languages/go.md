
# Go
This page explains yml configuration that is specific to Go projects. For a complete yml reference, please read the [Build configuration section](../shippableyml.md)

##yml configuration

The sections below explore sections of the yml that are specific to Go projects. 


###language 


For Go projects, this tag should always be set to go as show below:

```
language: go
```

### runtime
Our official build images for Go come pre-installed with the following versions:

* 1.1 (default if tag not included in yml)
* 1.2
* 1.3
* 1.4
* 1.5
* tip

You can set the runtime to any version(s) using the `go` tag:

```
go:
  - 1.2
```

If you want to test against several versions of Go, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
go:
  - 1.4
  - tip
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml.

### pre_ci and pre_ci_boot

Depending on the `language` and `services` tags in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. The default images for Go builds are explained below.

The pre_ci and pre_ci_boot sections are primarily used in one of the following scenarios:

* You want to use a custom Docker image for your CI 
* You want to override the default options that are used to boot up the default CI image

If you do not want to do either of the above, you should skip these tags in the yml.

#### Default Go images
We have 2 primary build images for Go projects, which should be sufficient for most projects: 

* [dry-dock/u14gol](https://github.com/dry-dock/u14gol) is used if you specify `language: go` in your yml and do not specify a `services` tag. This image contains the following:
	
	* Ubuntu 14.04
	* Go versions 1.1, 1.2, 1.3, 1.4, 1.5, tip
	* Packages autotools-dev, autoconf, bison, git, mercurial, cmake, scons, binutils
	* gvm
	* Git
	* Basic packages sudo, build-essential, curl, gcc, make, openssl, software-properties-common, wget, nano, unzip, libxslt-dev, libxml2-dev
	* Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7  
	* Python packages python-pip, python-software-properties, python-dev
	* Node version 0.10 
	* Python 2.7.6
	* Default Ruby version 
	* awscli
	* google-cloud-sdk 

* [dry-dock/u14golall](https://github.com/dry-dock/u14golall) is used if you specify one or more services and set the language to go in the yml. This image contains the following **in addition** to everything that is listed for the u14gol image above:

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
If needed, you can install your project dependencies using the `pip` command in this section:

```
build:
  ci:
    - go get github.com/onsi/gomega
    - go get github.com/onsi/ginkgo
```

#### Running tests
Include your test command in the ci section, after you've installed any required dependencies.

```
build:
  ci:
    - go test -v ./...
```

#### Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.


#### Retrying installation of dependencies
Your dependencies can sometimes fail to install due to network glitches or other external transient factors. You can harden the command for installing dependencies by using `shippable_retry`. We will then retry the command up to 3 times if it returns a non-zero code.


```
build:
  ci:
    - shippable_retry go get github.com/onsi/gomega
```

#### Default commands

If the `ci` section is blank, we will run some default commands. These have the same effect as the yml snippet below:

```
build:
  ci:
    - go get -d -v ./... && go build -v ./...
    - go test -v ./...
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.






