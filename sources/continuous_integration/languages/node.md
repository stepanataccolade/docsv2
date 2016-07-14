## Nodejs

Node.js is one of the most popular build languages on the Shippable platform. 

language tag
version
w






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
We have a [simple Node.js project](https://github.com/shippableSamples/sample_nodejs) that you can fork and enable on Shippable to help you get started.

In addition, check out the first installment of a stepwise, multi-part series of tutorials on [running CI on a node.js application](http://blog.shippable.com/get-started-with-continuous-integration-for-nodejs-app).


