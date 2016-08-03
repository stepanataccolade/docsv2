
# Node
Node.js is the number one language used to build projects on Shippable. This page explains yml configuration that is specific to node.js projects. For a complete yml reference, please read the [Build configuration section](../shippableyml.md)


###language 


For Node.js projects, this tag should always be set to node_js as show below:

```
language: node_js
```

### runtime
Our official build images for Node.js come pre-installed with the following versions:

* 0.10
* 0.12 (default if no runtime specified)
* 4.2.3
* iojs 1.0
* iojs 2.0

You can set the runtime to any version(s) using the `node_js` tag:

```
node_js:
  - 4.2.3
```

If you want to test against several versions of Node, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
node_js:
  - "0.10"
  - 0.12
```
Please note that the `0.10` version is inside double quotes. This is to prevent our parser from incorrectly interpreting the language version to be `0.1`. For any version ending with a 0, remember to use double quotes around the version number.

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml with the `nvm use <version>` command.

### pre_ci and pre_ci_boot

Depending on the `language` and `services` tags in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. The default images for Node.js builds are explained below.

The pre_ci and pre_ci_boot sections are primarily used in one of the following scenarios:

* You want to use a custom Docker image for your CI 
* You want to override the default options that are used to boot up the default CI image

If you do not want to do either of the above, you should skip these tags in the yml.

#### Default Node.js image
We have 2 primary build images for Node.js projects, which should be sufficient for most Node.js projects: 

* [dry-dock/u14nod](https://github.com/dry-dock/u14nod) is used if you specify `language: node_js` in your yml and do not specify a `services` tag. This image contains the following:
	
	* Ubuntu 14.04
	* Node versions 4.23, 0.12, 0.10, io.js 2.0, io.js 1.0 
	* Node.js packages grunt-cli, mocha, vows, phantomjs, casperjs
	* Selenium 2.48.2
	* Bower
	* Git
	* Basic packages sudo, build-essential, curl, gcc, make, openssl, software-properties-common, wget, nano, unzip, libxslt-dev, libxml2-dev
	* Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7  
	* Default Ruby version  
	* Python packages python-pip, python-software-properties, python-dev
	* awscli
	* google-cloud-sdk 

* [dry-dock/u14nodall](https://github.com/dry-dock/u14nodall) is used if you specify one or more services and set the language to node_js in the yml. This image contains the following in addition to everything that is listed for the u14nod image above:

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


If the official images do not satisfy your requirements, you can do one of 2 things:

- Include commands to install any missing dependencies or packages in your yml
- Use a custom build image that contains exactly what you need for yout CI
	
#### Using a custom build image
If you do decide to use a custom CI image, you will need to configure the `pre_ci_boot` section and optionally, the `pre_ci` section if you're also building the CI image as part of the workflow. Details on how to configure this are available in the [`pre_ci` and `pre_ci_boot` sections of the Build configuration page](../shippableyml.md#build). 

### ci
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

#### Default commands

If the `ci` section is blank, then we will run the default command `npm install`, so it has the same effect the same as the yml snippet below:

```
ci:
    - npm install
```

#### Installing dependencies
If needed, you can install your project dependencies using [NPM](http://npmjs.org/) in this section:

```
ci:
    - npm install -g grunt-cli
```

#### Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

Sample yml snippet:

```yaml
env:
  # Set environment variable for test results output 
  - XUNIT_FILE=shippable/testresults/result.xml
  
build:
  ci:
    #Create folders for test and code coverage
    - mkdir -p shippable/codecoverage
    - mkdir -p shippable/codecoverage
    
    #Run tests
    - npm test
    
    #Generate coverage report with istanbul
    - ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --ui=bdd --reporter=xunit-file
    - ./node_modules/.bin/istanbul report cobertura --dir shippable/codecoverage/
```

#### Testing with older versions of node

If you want to build a project with node versions like 0.6, 0.8, 0.10, and 0.11 and want to use the same package.json, add the following line to your yml file, which will upgrade the npm to v.1.4 for node versions 0.6 and 0.8.

```
if [[ $SHIPPABLE_NODE_VERSION =~ [0].[6-8] ]]; then npm install -g npm@~1.4.6; fi

## Sample projects

[Basic Node.js sample project](https://github.com/shippableSamples/sample_nodejs)

## Related blogs

* [Getting staryed with CI for a node.js application](http://blog.shippable.com/get-started-with-continuous-integration-for-nodejs-app)
* [Testing against multiple versions of Node.js](http://blog.shippable.com/how-to-test-your-node.js-app-against-multiple-versions-of-node)
* [Setting up test results visualizations](http://blog.shippable.com/setting-up-continuous-integration-test-result-visualization)
* [Setting up code coverage](http://blog.shippable.com/setting-up-code-coverage-visualization-for-tests-in-ci)
* [Containerized microservices with Docker and Node.js](http://blog.shippable.com/microtizing-monoliths-containerized-microservices-with-docker-and-nodejs)
* [Configuring a build status badge](http://blog.shippable.com/configuring-a-visual-indicator-for-a-node.js-project-status)






