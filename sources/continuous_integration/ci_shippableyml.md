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

* * * 

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

* * * 

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

* * * 

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

* * * 

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

* * * 

## build
The build section is where you specify commands and options for your actual CI build. 

### pre_ci

### pre_ci_boot
This section is optional and lets you override the default build image used for your CI workflow. You should include this section in your yml only if:
- You want to use your own custom Docker image for your build 
- You want to customize some options while starting up your CI container

The following snippet shows how to override the default CI image and instead use your own custom image:

```
build:
  pre_ci_boot:
    image_name: my_registry_repo/my_image
    image_tag: latest
    pull: true
    env: FOO=bar
    options: "-e HOME=/root"

```
In the snippet above, replace the following:

* `image_name` value is in the format (docker-registry-username)/(docker-registry-image-repo). For GCR and ECR, you will to specify image_name in the right format:
    *  GCR: gcr.io/(docker-registry-username)/(docker-registry-image-repo)
    *  ECR: aws_account_id.dkr.ecr.us-east-1.amazonaws.com/repo-name
* `image_tag` is the tag for the image that you want to pull.  
* set `pull` to `true` if you want to pull this image from a docker registry and `false` if the image is already on the build machine and doesn't need to be pulled from a registry. 
* In the `env` section, you can enter any environment variables you want to be set inside your CI container.
* In the `options` tag, enter any docker options you want to use in the `docker run` command. You also need to include the HOME environment variable as shown if it is not already set in your image.

**Things to remember**

- If you are pulling a private image from a registry, you will also need to specify a hub integration in your yml. Please check out the [integrations section](#integrations) to see how to do this.
- If you set `pull` to false, the image and tag you specify in `image_name` and `image_tag` should be available on the build machine. This means that you must either build the image from a Dockerfile or pull the image in the `pre_ci` section.
- Minimum requirements for custom CI images are documented TBD: Update Link  

### ci

### post_ci



### on_success

The `on_success` section is provided for any actions you want to take if your CI is successful. The commands in this section are executed only if the `ci` section exits with 0, indicating success.

For example, you can execute a script if CI succeeds with the following yml snippet:

```
build:
  on_success:
    - ./doSomething.sh

```  

### on_failure

The `on_failure` section is provided for any actions you want to take if your CI fails for any reason. The commands in this section are executed only if the `ci` section does not exits with 0, indicating failure. 

For example, you can execute a script if CI fails with the following yml snippet:

```
build:
  on_failure:
    - ./doSomething.sh

```
**Things to remember**

- The `on_failure` section will not be executed for timed out, unstable builds.
- This section is also not executed if the build fails because code coverage does not meet the minimum threshold value.
  
### cache
You can turn on caching for your builds by including `cache: true` in the `build` section of your shippable.yml. This will cache contents of the build directory $SHIPPABLE_BUILD_DIR.

```
build:
  cache: true
```

You can also choose to cache specific folders instead of the entire build directory by using the `cache_dir_list` tag. The cache_dir_list is an array of **absolute path** of the folders that needs to be cached. Please note that you still need the `cache: true` in your yml:

```
build:
  cache: true
  cache_dir_list:
    - absolute path of dir1
    - absolute path of dir2
    - absolute path of dir3
```
For example, to cache node modules and the .git folder, you would specify the following:

```
build:
  cache: true
  cache_dir_list:
    - $SHIPPABLE_BUILD_DIR/node_modules
    - $SHIPPABLE_BUILD_DIR/.git
```

Cache is updated for every build and is available to subsequent builds.

**Advanced caching topics** like clearing cache, removing unwanted files when caching is enabled, etc are covered on our [caching page](advanced_options/caching.md)

### push

* * * 

## integrations
The integrations section lets you specify what third party services you want to interact with a part of your build. 

### Notifications
Shippable supports sedning email, Slack, HipChat and IRC notifications and these can be configured in your yml file.

####Default behavior
By default, email notifications are sent to the committer and commit author if they are 'members' of the repository, i.e. they have admin or push permissions to the repository. These default notifications are sent if:
- a build fails
- a previously failing build is successful 

To send Slack, HipChat, or IRC notifications or to modify the default setting for email notifications, you will need to add some config your yml.


####Example: Sending Slack notifications
As an example, let's see how to send a Slack notification for successful and failing builds:

1. Add a Slack integration to your subscription

	- Go to your Subscription page on Shippable and click on the `Settings` tab
	- Click on `Integrations` in the sidebar menu. This will show you the list of currently configured integrations.
	- If you see the integration you want to use, skip to step 2.
	- If you want to add a new integration, click on `Add integration`. Enter a name for your integration and then click on the dropdown and click on 'Add integration'. Select `Slack` and follow directions to add your integration.
	
2. Add the snippet below in your yml and then customize:

```
integrations:
  notifications:
    - integrationName: my_slack_integration
      type: slack
      recipients:
        - "#channelOne"
        - "#channelTwo"
      branches:
        only:
          - master
          - dev
      on_success: always
      on_failure: always
      on_pull_request: never
      on_start: never
```
In the snippet above, replace the following:

- `my_slack_integration` with the integration name you want to use.
- `recipients` with the names of the rooms you want to send notifications to
	- If there is a single recipient, you can use the format `recipients: "#channelOne"`
- [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches.
- [optional] You can set the following options for the `on_success`, `on_failure` tags :
    - `change` for `on_success` or `on_failure` means you will receive notifications only when the build status changes to success or failure respectively.
    - `always` means that you will always receive a notification for that build status
    - `never` means that you will never receive a notification for that build status
  By default, `on_success` is set to `change` and `on_failure` is set to `always` if Slack is configured in the yml but you do not specify these tags.
* [optional] You can set the following options for the `on_start`, `on_pull_request` tags :
    - `always` means that you will always receive a notification for build start/pull request
    - `never` means that you will never receive a notification for that build start/pull request
    
    By default, `on_start` is set to `never` and `on_pull_request` is set to `always` if Slack is configured in the yml but you do not specify these tags.  
    
For advanced Slack notification handling, please read our [Slack notifications page](notifications/slack.md) .

#### Additional notification integrations

[HipChat notifications](integrations/notifications/hipchat.md)  
[Email notifications](integrations/notifications/email.md)  
[IRC notifications](integrations/notifications/irc.md)  
[Slack notifications](integrations/notifications/slack.md)  

### hub
Hub integrations allow you to integrate with any Docker registry such as Docker Hub, Amazon ECR, Google Container Registry (GCR), CoreOS's Quay.io, Docker Trusted Registry, or any self hosted private Docker registry. 

You need to add a hub integration to your project settings if you want to do the following:

- Pull an image from a private Docker repository
- Build a Docker image which has a `FROM` that pulls an image from a private Docker repository
- Push to a Docker repository

#### Example: Add a Docker Hub integration
As an example, let's see how we can specify a Docker Hub integration:

1. Add a Hub integration to your subscription

	- Go to your Subscription's page on Shippable and click on the `Settings` tab
	- Click on `Integrations` in the sidebar menu. This will show you the list of currently configured integrations.
	- If you see the integration you want to use, skip to step 2.
	- If you want to add a new integration, click on `Add integration`. Enter a name for your integration and then click on the dropdown and click on 'Add integration'. Select `Docker` from the dropdown, and follow directions to add your integration.

2. Add the snippet below in your yml and then customize:

```
integrations:
  hub:
    - integrationName: my_docker_integration
      type: docker

```
And that's it. You can now use docker commands under the `build` section of your yml to push or pull images from this registry. Advanced options like configuring this integration to only apply to specific branches are discussed in the [Docker Hub integration](integrations/image_registries/docker_hub.md)

#### Additional Hub integrations
Please visit the following pages for details on how to add hub integrations for other image registries:

[Docker Trusted Registry](integrations/image_registries/docker_trusted_registry.md)
[Amazon ECR](integrations/image_registries/amazon_ecr.md)
[Google Container Registry](integrations/image_registries/google_gcr.md)
[Quay.io](integrations/image_registries/quay.md)
[Private Docker Registry](integrations/image_registries/private_registry.md)
[Docker Hub](integrations/image_registries/docker_hub.md)

### deploy





 


### keys