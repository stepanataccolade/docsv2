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


This list keeps growing so if you need something that you don't see
here, contact our [support alias](mailto:support@shippable.com) or open a support issue in our [GitHub support repo](https://github.com/Shippable/support/issues)

## Clojure

### Standard build image(s)
By default, we will run your Clojure build using our standard ubuntu 14.04 Clojure image pre-installed with all supported tools and services. The image is called u14cloall and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14cloall). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14cloall/)

The default build image for Go has the following versions installed:

* 1.3.0
* 1.4.0
* 1.5.1
* 1.6.0

In addition we have the following additional standard Clojure images:

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

You can use a custom build image for your project by following instructions in our [yml configuration section](ci_configure.md).


### yml config

You can use the `install` key to install the required dependencies for your project:

```
install: lein protobuf install
```

### Test scripts

Use `script` key in shippable.yml file to specify what command to run tests with. The default command to run leiningen test suite is `lein test2junit`:

```
script: lein test2junit
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



## Go

### Standard build image(s)
By default, we will run your Go build using our standard ubuntu 14.04 Go image pre-installed with all supported tools and services. The image is called u14golall and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14golall). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14golall/)

The default build image for Go has the following versions installed:

* 1.1
* 1.2
* 1.3
* 1.4
* 1.5
* tip

In addition we have the following additional standard Go images:

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

You can use a custom build image for your project by following instructions in our [yml configuration section](ci_configure.md).

### yml config

You can use any tagged version(s) of Go or use ```tip``` to get the latest version.
```
language: go

go:
  - 1.3
  - tip
```

You can install dependencies for your project using the **install** key:

```
install:
- go get github.com/onsi/gomega
- go get github.com/onsi/ginkgo
```

### Test scripts

Use the **script** key in the shippable.yml file to specify what command to run tests with:

```
# command to run tests
script: go test -v ./...
```

### Build Examples




## Java

### Standard build image(s)
By default, we will run your Java build using our standard ubuntu 14.04 Java image pre-installed with all supported tools and services. The image is called u14javall and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14javall). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14javall/)

The default build image for Java has the following versions installed:

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

You can use a custom build image for your project by following instructions in our [yml configuration section](ci_configure.md).

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

### Test Scripts

#### Maven

- If your repository root has pom.xml file, then our Java builder will use Maven 3 to build it. By default it will run the test using `mvn test`.
- Java builder will execute the below line to install project dependencies with Maven before it starts running tests.

```
mvn install -DskipTests=true
```

#### Gradle

- If your repository root has "build.gradle", then our Java builder will use gradle to build it. By default it will use `gradle check` to run the test.
- Java builder will execute the below line to install the project dependencies with gradle.

```
gradle assemble
```

#### Ant

- If your repository root does not have gradle or maven files, then our Java builder will use Ant to build it. By default it will use `Ant test` to run the test suite.
- Since there is no standard way to install Ant dependencies, you will need to specify the `install:` key to install your project dependencies with Ant.

```
language: java
install: ant deps
```

Save the test output in shippable/testresults and the codecoverage output in shippable/codecoverage folder to get the reports parsed. If the test and codecoverage output is not saved as specified, you will not find the reports in our CI.

### Build Examples


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
By default, we will run your Node.js build using our standard ubuntu 14.04 Node.js image pre-installed with all supported tools and services. The image is called u14nodall and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14nodall). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)

The default build image for Node.js has the following versions installed:

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

You can use a custom build image for your project by following instructions in our [yml configuration section](ci_configure.md). TODO: Add exact link

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

### Test scripts

-   To run your test suites using NPM, specify it using script key.

```
script: npm test
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
before_install: npm install -g grunt-cli
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

## PHP

### Standard build image(s)
By default, we will run your PHP build using our standard ubuntu 14.04 PHP image pre-installed with latest versions of all supported tools and services. The image is called u14PHPall and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14phpall). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14phpall/)

The default build image for PHP has the following versions installed:

* 5.3
* 5.4
* 5.5
* 5.6
* 

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

You can use any custom build image for your project by following instructions in our [yml configuration section](ci_configure.md).


### Test scripts

-   Use the script key in shippable.yml file to specify what command to run tests with.

```
script: phpunit UnitTest
```

> **Note**
>
> Runs the tests that are provided by the class UnitTest. This class is expected to be declared in the UnitTest.php sourcefile.

### Sample projects

TODO - update section


## Python

### Standard build image(s)
By default, we will run your Python build using our standard ubuntu 14.04 Python image pre-installed with latest versions of all supported tools and services. The image is called u14pytall and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14pytall). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)

The default build image for Python has the following versions installed:

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

You can use any custom build image for your project by following instructions in our [yml configuration section](ci_configure.md).

### yml config


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

- We support different versions of python like 2.6, 2.7, 3.2, 3.3, 3.4
  and pypy.
- Install dependencies for your project using the `install` key.

```
install: "pip install -r requirements.txt --use-mirrors"
```

### Test scripts

Use the `script` key in the shippable.yml file to specify what command to run tests with.

```
# command to run tests
script: nosetests
```

-   Test against multiple versions of Django by setting the **env** key and then install the required dependencies for it using the install key.

```
env:
- DJANGO_VERSION=1.2.7
- DJANGO_VERSION=1.3.7
- DJANGO_VERSION=1.4.10
- DJANGO_VERSION=1.5.5
- DJANGO_VERSION=1.6

install:
- pip install -q mock==0.8 Django==$DJANGO_VERSION
- pip install . --use-mirrors
```

> **Note**
>
> We are setting multiple versions here which means a single push to repo will trigger multiple builds.

### Sample projects




## Ruby

### Standard build image(s)
By default, we will run your Ruby build using our standard ubuntu 14.04 Ruby image pre-installed with latest versions of all supported tools and services. The image is called u14ruball and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14ruball). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14ruball/)

The default build image for Ruby has the following versions installed:

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

You can use any custom build image for your project by following instructions in our [yml configuration section](ci_configure.md).

### yml config

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

-  Though we pre-install only a few versions of Ruby, all versions of Ruby are supported. As long as they are available as a binary for Ubuntu 12.04, you can specify custom patchlevels.

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

- If you are using a custom gemfile thats not in default location you can specify it with the `gemfile` tag

```
# gemfile tag
gemfile: gemfiles/Gemfile.ci
```

> **Note**
>
> If you specify multiple gemfiles in the above tag, a matrix build is triggered for every version of the gemfile.

-  Additional arguments can be added to `bundle install` command and we will append them to the default command

```
# bundle_args
bundler_args: --binstubs
```

- If you want to run some other commands before install you can do this

```
# before_install tag
before_install: gem install bundler --pre
```

-   You can also set multiple environment variables and test against multiple different versions by using the env variable in your code. This will fire 3 different builds, one for each env variable

```
# env tag
env:
- CHEF_VERSION=0.9.18
- CHEF_VERSION=0.10.2
- CHEF_VERSION=0.10.4
```

-   You can also test against multiple `jdk` versions

```
# jdk tag
jdk:
  - openjdk7
  - oraclejdk7
  - openjdk6
```

-   You can also update the versions on your minion by running a simple command or even downgrade if you choose to. The script below demonstrates an upgrade and downgrade - .. code-block:: python

```
before_install:
- gem update --system
- gem --version
- gem update --system 2.1.11
- gem --version
```

### Sample projects




## Scala

### Standard build image(s)
By default, we will run your Scala build using our standard ubuntu 14.04 Scala image pre-installed with latest versions of all supported tools and services. The image is called u14scaall and the Dockerfile is in our [GitHub dry-dock repository](https://github.com/dry-dock/u14scaall). The Docker image will be pulled from our [drydock repo on Docker Hub](https://hub.docker.com/r/drydock/u14scaall/)

The default build image for Scala has the following versions installed:

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

You can use any custom build image for your project by following instructions in our [yml configuration section](ci_configure.md).

The Scala builder assumes dependency management based on projects like Maven, Gradle or SBT and it will pull down project dependencies automatically before running tests. To test against multiple JDKs, use jdk tags. For example, to test against the oraclejdk8, oraclejdk7, openjdk6 and openjdk7

```
jdk:
- oraclejdk8
- oraclejdk7
- openjdk6
- openjdk7
```

### Test Scripts

-   If your repository root has **Project** directory or build.sbt file, then our scala builder will run the test suite using

```
sbt ++$SHIPPABLE_SCALA_VERSION test
```

### Sample projects

