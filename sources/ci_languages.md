page_title: Languages
page_description: supported languages on Shippable
page_keywords: languages, questions, documentation, shippable, ruby, node, java, .net, python, scala

# Languages

We support the following languages on Shippable CI:

-  [clojure](#clojure)
-  [go](#go)
-  [java](#java)
-  [nodejs](#nodejs)
-  [php](#php)
-  [python](#python)
-  [ruby](#ruby)
-  [scala](#scala)
-  [c](#c)


This list keeps growing so if you need something that you don't see
here, contact our [support alias](mailto:support@shippable.com) or open a support issue in our [GitHub support repo](https://github.com/Shippable/support/issues)

## Clojure

### Standard build image(s)
By default, we will run your Clojure build using one of our standard ubuntu 14.04 Clojure images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14clo image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14cloall image.  

The Dockerfile for u14clo is [here](https://github.com/dry-dock/u14clo) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14clo/).
The Dockerfile for u14cloall is [here](https://github.com/dry-dock/u14cloall) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14cloall/)

The default build images for Clojure have the following versions installed:

* 1.3.0
* 1.4.0
* 1.5.1
* 1.6.0

We have the following additional standard Clojure images available for you:

* u12clo    
    * [GitHub](https://github.com/dry-dock/u12clo)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12clo/)
* u14clo    
    * [GitHub](https://github.com/dry-dock/u14clo)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14clo/)
* u12clopls    
    * [GitHub](https://github.com/dry-dock/u12clopls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12clopls/)
* u14clopls    
    * [GitHub](https://github.com/dry-dock/u14clopls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14clopls/)
* u12cloall    
    * [GitHub](https://github.com/dry-dock/u12cloall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12cloall/)
* u14cloall    
    * [GitHub](https://github.com/dry-dock/u14cloall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14cloall/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).


### yml config

Specify the language and runtime with the following tags in your yml:

```
language: clojure

lein:
    - lein2
```

You can use the `install` key to install the required dependencies for your project:

```    
install: lein protobuf install
```

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command run is `lein test`:

```
ci:
    - lein test 
```

### Build Matrix
As with any JVM language, you can test Clojure builds against multiple JDKs.

`env`, `lein`, and `jdk` can be given as arrays to construct a build matrix. For example,

```
language: clojure
lein: lein2
jdk:
  - openjdk7
  - oraclejdk7
  - oraclejdk8
```

### Build Examples
We have a simple Clojure project that you can fork and enable on Shippable to help you get started:

[sample_clojure](https://github.com/shippableSamples/sampleClo)


## Go

### Standard build image(s)
By default, we will run your Go build using one of our standard ubuntu 14.04 Go images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14gol image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14golall image.  

The Dockerfile for u14gol is [here](https://github.com/dry-dock/u14gol) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14gol/).
The Dockerfile for u14golall is [here](https://github.com/dry-dock/u14golall) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14golall/)

The default build images for Go have the following versions installed:

* 1.1
* 1.2
* 1.3
* 1.4
* 1.5

We have the following additional standard Go images available for you:

* u12gol    
    * [GitHub](https://github.com/dry-dock/u12gol)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12gol/)
* u14gol    
    * [GitHub](https://github.com/dry-dock/u14gol)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14gol/)
* u12golpls    
    * [GitHub](https://github.com/dry-dock/u12golpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12golpls/)
* u14golpls    
    * [GitHub](https://github.com/dry-dock/u14golpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14golpls/)
* u12golall    
    * [GitHub](https://github.com/dry-dock/u12golall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12golall/)
* u14golall    
    * [GitHub](https://github.com/dry-dock/u14golall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14golall/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).

### yml config

You can use any tagged version(s) of Go with the folllowing config in your yml:
```
language: go

go:
  - 1.3
```

You can install dependencies for your project in the `ci` section:

```
ci:
- go get github.com/onsi/gomega
- go get github.com/onsi/ginkgo
```

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command run is shown below:

```
ci:
    - go get -d -v ./... && go build -v ./...
    - go test -v ./...
```

### Build Examples
We have a simple Go project that you can fork and enable on Shippable to help you get started:

[sample_go](https://github.com/shippableSamples/sampleGol)

## Java

### Standard build image(s)
By default, we will run your Java build using one of our standard ubuntu 14.04 Java images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14jav image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14javall image.  

The Dockerfile for u14jav is [here](https://github.com/dry-dock/u14jav) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14jav/).
The Dockerfile for u14javall is [here](https://github.com/dry-dock/u14javall) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14javall/)

The default build images for Java have the following versions installed:

* openjdk6
* openjdk7
* oraclejdk7
* oraclejdk8

In addition we have the following additional standard Java images:

* u12jav    
    * [GitHub](https://github.com/dry-dock/u12jav)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12jav/)
* u14jav    
    * [GitHub](https://github.com/dry-dock/u14jav)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14jav/)
* u12javpls    
    * [GitHub](https://github.com/dry-dock/u12javpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12javpls/)
* u14javpls    
    * [GitHub](https://github.com/dry-dock/u14javpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14javpls/)
* u12javall    
    * [GitHub](https://github.com/dry-dock/u12javall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12javall/)
* u14javall    
    * [GitHub](https://github.com/dry-dock/u14javall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14javall/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).

### yml config

Set the appropriate language and the jdk. You can test against Openjdk6, Openjdk7, Oraclejdk7 and Oraclejdk8 for a single push by adding more entries. Java minions use `jdk` by default to set the runtime platform:

```
# language setting
language: java
# jdk tag
jdk:
- openjdk7
- oraclejdk7
- openjdk6
- oraclejdk8
```

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command is shown below is executed:

#### Ant

- If your repository root does not have gradle or maven files, then our Java builder will use Ant to build it. By default, if the `ci` section is blank, it will use `Ant test` to run the test suite.

```
ci:
    - ant test
```


- Since there is no standard way to install Ant dependencies, you will need to install your project dependencies with Ant in the `ci` section.

```
language: java
ci: ant deps
```

#### Maven

- If your repository root has pom.xml file, then our Java builder will use Maven 3 to build it. By default, if the `ci` section is blank, it will use the default command, shown below.
- Java builder will execute the below line to install project dependencies with Maven before it starts running tests.

```
ci:
   - mvn install -DskipTests=true
```

#### Gradle

- If your repository root has "build.gradle", then our Java builder will use gradle to build it. By default, if the `ci` section is blank, it will use `gradle assemble` to run the test suite.
- Java builder will execute the below line to install the project dependencies with gradle.

```
ci:
   - gradle assemble
```

Save the test output in shippable/testresults and the codecoverage output in shippable/codecoverage folder to get the reports parsed. If the test and codecoverage output is not saved as specified, you will not find the reports in our CI.

### Build Examples
We have a simple Java project that you can fork and enable on Shippable to help you get started:

[sample_java](https://github.com/shippableSamples/sampleJav)


### Multi-module Maven builds

When using multi-module (Reactor) builds, please remember to output all
the coverage and tests reports to the (top-level) repository directory.
This can be tricky, as the Cobertura plugin resolves output directory
differently from Surefire plugin. The most straightforward way of
dealing with this issue is to define plugin configuration in the
top-level module, using `shippable/codecoverage` path for Cobertura
plugin and `../shippable/testresults` for Surefire plugin:

```xml
<plugin>
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>cobertura-maven-plugin</artifactId>
  <version>2.6</version>
  <configuration>
    <format>xml</format>
    <maxmem>256m</maxmem>
    <aggregate>true</aggregate>
    <outputDirectory>shippable/codecoverage</outputDirectory>
  </configuration>
</plugin>
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>2.17</version>
  <configuration>
    <redirectTestOutputToFile>true</redirectTestOutputToFile>
    <reportsDirectory>../shippable/testresults</reportsDirectory>
  </configuration>
  <dependencies>
    <dependency>
      <groupId>org.apache.maven.surefire</groupId>
      <artifactId>surefire-junit4</artifactId>
      <version>2.7.2</version>
    </dependency>
  </dependencies>
</plugin>
```

See [the following sample](https://github.com/shippableSamples/sample-java-maven-reactor)
for details.

## Nodejs

### Standard build image(s)
By default, we will run your Node.js build using one of our standard ubuntu 14.04 Node.js images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14nod image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14nodall image.  

The Dockerfile for u14nod is [here](https://github.com/dry-dock/u14nod) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14nod/).
The Dockerfile for u14nodall is [here](https://github.com/dry-dock/u14nodall) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14nodall/)

The default build images for Node.js have the following versions installed:

* 0.10
* 0.12
* 4.2.3
* iojs 1.0
* iojs 2.0

In addition we have the following additional standard Node.js images:

* u12nod    
    * [GitHub](https://github.com/dry-dock/u12nod)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12nod/)
* u14nod    
    * [GitHub](https://github.com/dry-dock/u14nod)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14nod/)
* u12nodpls    
    * [GitHub](https://github.com/dry-dock/u12javpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12javpls/)
* u14nodpls    
    * [GitHub](https://github.com/dry-dock/u14nodpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14nodpls/)
* u12nodall    
    * [GitHub](https://github.com/dry-dock/u12nodall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12nodall/)
* u14nodall    
    * [GitHub](https://github.com/dry-dock/u14nodall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)    

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).

### yml config

You can set the language and runtime for Node.js builds in your yml as shown below:

```
# language setting
language: node_js

# version numbers
node_js:
  - "0.11"
  - "0.10"
```

> **Note**
>
> Since multiple versions of node.js are specified in the sample config above, a single push to the repository will trigger multiple builds on Shippable.

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command run is `npm install`:

```
ci:
    - npm install
```

-   You can also add testing frameworks like Vows, Expresso in the
    package.json file.
-   To test using Vows:

```
"scripts": {
"test": "vows --spec"
}
```

-   To test using Expresso:

```
"scripts": {
"test": "expresso test "
}
```

-   You can also install your project dependencies using [NPM](http://npmjs.org/)

```
node_js:
  - "0.10"
ci:
    - npm install -g grunt-cli
```

-   If you want to build a project with node versions like 0.6, 0.8, 0.10, and 0.11 and want to use the same package.json, add the following line to your yml file, which will upgrade the npm to v.1.4 for node versions 0.6 and 0.8.

```
if [[ $SHIPPABLE_NODE_VERSION =~ [0].[6-8] ]]; then npm install -g npm@~1.4.6; fi
```

-   Keep the output of test and code coverage generated in the Shippable
    folders to get the visualization of your reports.
-   If your test runner uses the junit format, then you can save the
    output in shippable/testresults folder so that shippable can parse
    the test reports. You can also save the output of code coverage in
    shippable/codecoverage folder so that shippable can parse the
    coverage reports.

### Build Examples
We have a simple Node.js project that you can fork and enable on Shippable to help you get started:

[sample_node](https://github.com/shippableSamples/sampleNod)

## PHP

### Standard build image(s)
By default, we will run your PHP build using one of our standard ubuntu 14.04 PHP images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14php image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14phpall image.  

The Dockerfile for u14php is [here](https://github.com/dry-dock/u14php) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14php/).
The Dockerfile for u14phpall is [here](https://github.com/dry-dock/u14phpall) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14phpall/)

The default build images for PHP have the following versions installed:

* 5.4
* 5.5
* 5.6
* 7.0

In addition we have the following additional standard PHP images:

* u12php    
    * [GitHub](https://github.com/dry-dock/u12php)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12php/)
* u14php    
    * [GitHub](https://github.com/dry-dock/u14php)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14php/)
* u12phppls    
    * [GitHub](https://github.com/dry-dock/u12phppls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12phppls/)
* u14phppls    
    * [GitHub](https://github.com/dry-dock/u14phppls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14phppls/)
* u12phpall    
    * [GitHub](https://github.com/dry-dock/u12phpall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12phpall/)
* u14phpall    
    * [GitHub](https://github.com/dry-dock/u14phpall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14phpall/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command run is `phpunit`:

```
ci:
    - phpunit
```

> **Note**
>
> Runs the tests that are provided by the class UnitTest. This class is expected to be declared in the UnitTest.php sourcefile.

### Sample projects
We have a simple PHP project that you can fork and enable on Shippable to help you get started:

[sample_php](https://github.com/shippableSamples/samplePhp)

### Running builds with PHP7

Our official PHP images cannot connect to the services when using PHP7. To get your builds running with PHP7 you can use our `u14php7all` image. PHP version on this image defaults to `PHP 7.0.5` and no other PHP versions are installed on this image. We have pre-installed all the services in this image similar to all our other official images.

Since this is not an official image and only specific to PHP7, you will have to explicitly start the services you need. You can do so by specifying the start command in the `ci` section of your yml.

### yml config

Use the following to configure image, language and services in your yml:

```
# specifying build image
build_image: drydock/u14php7all:tip

# language setting
language: php

# specifying runtime
php:
   '7.0'

# specifying services
services: mysql

# version numbers
build:
   ci:
      - $cmd to start a service

```
### Sample projects
We have a simple PHP project that you can fork and enable on Shippable to help you get started with this PHP7 image:

[sample_php_memcached](https://github.com/chetantarale/sample_php_memcached)

## Python

### Standard build image(s)
By default, we will run your Python build using one of our standard ubuntu 14.04 Python images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14pyt image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14pytall image.  

The Dockerfile for u14pyt is [here](https://github.com/dry-dock/u14pyt) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14pyt/).
The Dockerfile for u14pytall is [here](https://github.com/dry-dock/u14pytall) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14pytall/)

The default build images for Python have the following versions installed:

* 2,7
* 2.7
* 3.2
* 3.3
* 3.4
* 3.5
* pypy

In addition we have the following additional standard Python images:

* u12pyt    
    * [GitHub](https://github.com/dry-dock/u12pyt)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12pyt/)
* u14pyt    
    * [GitHub](https://github.com/dry-dock/u14pyt)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14pyt/)
* u12pytpls    
    * [GitHub](https://github.com/dry-dock/u12pytpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12pytpls/)
* u14pytpls    
    * [GitHub](https://github.com/dry-dock/u14pytpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14pytpls/)
* u12pytall    
    * [GitHub](https://github.com/dry-dock/u12pytall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12pytall/)
* u14pytall    
    * [GitHub](https://github.com/dry-dock/u14pytall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).


### yml config

Use the following to configure language and runtime in your yml:

```
# language setting
language: python

# version numbers
python:
  - "2.7"
  - "3.2"
  - "3.3"
  - "pypy"
```

You can install dependencies for your project in the `ci` section.

```
ci:
    - "pip install -r requirements.txt --use-mirrors"
```

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command shown below is executed:

```
ci:
    - if [ -f $SHIPPABLE_BUILD_DIR/requirements.txt ]; then pip install -r $SHIPPABLE_BUILD_DIR/requirements.txt; fi
```

-   Test against multiple versions of Django by setting the `env` key and then install the required dependencies for it in the `ci` section.

```
env:
- DJANGO_VERSION=1.2.7
- DJANGO_VERSION=1.3.7
- DJANGO_VERSION=1.4.10
- DJANGO_VERSION=1.5.5
- DJANGO_VERSION=1.6

ci:
    - pip install -q mock==0.8 Django==$DJANGO_VERSION
    - pip install . --use-mirrors
```

> **Note**
>
> We are setting multiple versions here which means a single push to repo will trigger multiple builds.

### Sample projects
We have a simple Python project that you can fork and enable on Shippable to help you get started:

[sample_python](https://github.com/shippableSamples/samplePyt)



## Ruby

### Standard build image(s)
By default, we will run your Ruby build using one of our standard ubuntu 14.04 Ruby images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14rub image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14ruball image.  

The Dockerfile for u14rub is [here](https://github.com/dry-dock/u14rub) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14rub/).
The Dockerfile for u14ruball is [here](https://github.com/dry-dock/u14ruball) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14ruball/)

The default build images for Ruby have the following versions installed:

* 1.8,7
* 1.9.2
* 1.9.3
* 2.0
* 2.1.x
* 2.2.x

In addition we have the following additional standard Ruby images:

* u12rub    
    * [GitHub](https://github.com/dry-dock/u12rub)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12rub/)
* u14rub    
    * [GitHub](https://github.com/dry-dock/u14rub)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14rub/)
* u12rubpls    
    * [GitHub](https://github.com/dry-dock/u12rubpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12rubpls/)
* u14rubpls    
    * [GitHub](https://github.com/dry-dock/u14rubpls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14rubpls/)
* u12ruball    
    * [GitHub](https://github.com/dry-dock/u12ruball)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12ruball/)
* u14ruball    
    * [GitHub](https://github.com/dry-dock/u14ruball)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).

### yml config

Use the following config in your yml to set language and runtime:

```
# language setting
language: ruby

# version numbers
rvm:
  - 1.8.7
  - 1.9.2
  - 1.9.3
  - 2.0.0
  - 2.1.0
  - 2.1.1
  - 2.1.2
  - jruby-18mode
  - jruby-19mode
  - rbx
  - ruby-head
  - jruby-head
  - ree
```

> **Note**
>
> Since multiple versions of Ruby are specified in the above example, a single push to the repository will trigger multiple builds.

Though we pre-install only a few versions of Ruby, all versions of Ruby are supported. As long as they are available as a binary for Ubuntu 12.04, you can specify custom patchlevels.

```
language: ruby
rvm: 2.0.0-p247
```

> **Note**
>
> This binds you to potentially unsupported releases of Ruby. It also extends your build time as downloading and installing a custom Ruby can add an extra 60 seconds or more to your build the first time it installs.

We are using Bundler, `bundle install` to install all your gems. We also
use `rake` by default to run your build and hence you need to specify it
in your gemfile

If you are using a custom gemfile thats not in default location you can specify it with the `gemfile` tag

```
# gemfile tag
gemfile: gemfiles/Gemfile.ci
```

> **Note**
>
> If you specify multiple gemfiles in the above tag, a matrix build is triggered for every version of the gemfile.

Additional arguments can be added to `bundle install` command and we will append them to the default command

```
# bundle_args
bundler_args: --binstubs
```

You can also set multiple environment variables and test against multiple different versions by using the env variable in your code. This will fire 3 different builds, one for each env variable

```
# env tag
env:
- CHEF_VERSION=0.9.18
- CHEF_VERSION=0.10.2
- CHEF_VERSION=0.10.4
```

You can also test against multiple `jdk` versions

```
# jdk tag
jdk:
  - openjdk7
  - oraclejdk7
  - openjdk6
```

You can also update the versions on your minion by running a simple command or even downgrade if you choose to. The script below demonstrates an upgrade and downgrade - .. code-block:: python

```
ci:
- gem update --system
- gem --version
- gem update --system 2.1.11
- gem --version
```

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command shown below is executed:

```
ci:
    - bundle install --gemfile=$SHIPPABLE_GEMFILE $SHIPPABLE_BUNDLER_ARGS
```


### Sample projects
We have a simple Ruby project that you can fork and enable on Shippable to help you get started:

[sample_ruby](https://github.com/shippableSamples/sampleRub)

## Scala

### Standard build image(s)
By default, we will run your Scala build using one of our standard ubuntu 14.04 Scala images, depending on whether you need any services pre-installed in your container. If you do not need services, we will spin up a container with our u14sca image. If you've specified any services using the `services` key in your yml, your build container will be spun up using our u14scaall image.  

The Dockerfile for u14sca is [here](https://github.com/dry-dock/u14sca) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14sca/).
The Dockerfile for u14scaall is [here](https://github.com/dry-dock/u14scaall) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14scaall/)

The default build images for Scala have the following versions installed:

* 2.9.x
* 2.10.x
* 2.11.x

In addition we have the following additional standard Scala images:

* u12sca    
    * [GitHub](https://github.com/dry-dock/u12sca)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12sca/)
* u14sca    
    * [GitHub](https://github.com/dry-dock/u14sca)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14sca/)
* u12scapls    
    * [GitHub](https://github.com/dry-dock/u12scapls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12scapls/)
* u14scapls    
    * [GitHub](https://github.com/dry-dock/u14scapls)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14scapls/)
* u12scaall    
    * [GitHub](https://github.com/dry-dock/u12scaall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u12scaall/)
* u14scaall    
    * [GitHub](https://github.com/dry-dock/u14scaall)    
    * [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).

The Scala builder assumes dependency management based on projects like Maven, Gradle or SBT and it will pull down project dependencies automatically before running tests. To test against multiple JDKs, use jdk tags. For example, to test against the oraclejdk8, oraclejdk7, openjdk6 and openjdk7

```
jdk:
- oraclejdk8
- oraclejdk7
- openjdk6
- openjdk7
```

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command shown below, is executed:

```
ci:
   - sbt ++$SHIPPABLE_SCALA_VERSION test
```

### Sample projects
We have a simple Scala project that you can fork and enable on Shippable to help you get started:

[sample_scala](https://github.com/shippableSamples/sampleSca)

## C

### Standard build image(s)
By default, we will run your C build using our standard ubuntu 14.04 C image u14cpp. This image has gcc and clang C compilers.

The Dockerfile for u14cpp is [here](https://github.com/dry-dock/u14cpp) while the image on Docker Hub can be found [here](https://hub.docker.com/r/drydock/u14cpp/).

We have the following standard C images:

* u12cpp
    * compilers:
        * gcc: v5.2.1
        * clang: v3.4.2
    * [GitHub](https://github.com/dry-dock/u12cpp)
    * [Docker Hub](https://hub.docker.com/r/drydock/u12cpp/)
* u14cpp
    * compilers:
        * gcc: v5.3.0
        * clang: v3.8.0
    * [GitHub](https://github.com/dry-dock/u14cpp)
    * [Docker Hub](https://hub.docker.com/r/drydock/u14cpp/)

You can override the default build image for your project by following instructions in our [yml configuration section](ci_configure/#setting-your-build-image).

The default compiler for C builder is gcc. To test against different compiler(s), use compiler tags. For example, to test against clang compiler.

```
compiler:
  - clang
```

You can also test against multiple compilers. For example, to test against gcc and clang compilers.
```
compiler:
  - gcc
  - clang
```

### Default Commands

Use the `ci` section in shippable.yml file to specify commands to run tests with. If this section is blank, then the default command shown below, is executed:

```
ci:
   - ./configure && make && make test
```

### Sample projects
We have a simple C project that you can fork and enable on Shippable to help you get started, for u12cpp image fork `u12cpp` branch of this project.

[sample_c](https://github.com/shippableSamples/sample_c)

*****

## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-dc6f934b-c3f7-4203-8f94-a6800c964434">
      <span class="hs-cta-node hs-cta-dc6f934b-c3f7-4203-8f94-a6800c964434" id="hs-cta-dc6f934b-c3f7-4203-8f94-a6800c964434">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/dc6f934b-c3f7-4203-8f94-a6800c964434"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-dc6f934b-c3f7-4203-8f94-a6800c964434" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/dc6f934b-c3f7-4203-8f94-a6800c964434.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, 'dc6f934b-c3f7-4203-8f94-a6800c964434', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-53ece3d3-aafd-4855-8c63-78bf84c82781">
      <span class="hs-cta-node hs-cta-53ece3d3-aafd-4855-8c63-78bf84c82781" id="hs-cta-53ece3d3-aafd-4855-8c63-78bf84c82781">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/53ece3d3-aafd-4855-8c63-78bf84c82781"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-53ece3d3-aafd-4855-8c63-78bf84c82781" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/53ece3d3-aafd-4855-8c63-78bf84c82781.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '53ece3d3-aafd-4855-8c63-78bf84c82781', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

*****