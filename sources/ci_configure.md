page_title: Shippable Build Configuration
page_description: How to write your Shippable YML and Set up your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml

# Configure your build

All build configuration happens through shippable.yml which should be present at the root of the repository you want to build using Shippable. The following sections describe the overall structure of the shippable.yml file, as well as detailed descriptions of every section in it.

##shippable.yml structure

At a high level, the yml structure for CI is as shown below, along with an explanation of what belongs in each section. 
<img src="../images/ci_yml_structure.png" alt="Account Settings Subscription" style="width:700px;"/>

To get started, you can copy the following structure into your shippable.yml and then customize it based on instructions in the sections below.

```
#set your language below
language: python

#set language version. This is only required if you use the default Shippable image for your build
python:
    - 2.7

#specify which services you need. This is only valid if you use the default Shippable image for your build
services:
    
env:

matrix:

build:
    pre_ci: 
    pre_ci_boot:
        image_name:
        image_tag:
        pull:
        env:
        options:
    ci:
    post_ci:
    on_success:
    on_failure:
      
integrations:
    notifications:
        - integrationName:
          type:
          recipients:
          branches:
          on_start:
          on_success
          on_failure:
          on_changed:   
          
    hub:
        - integrationName:
          type:
          branches:
```

Details on what can be set in each section are in 

## Specifying language and runtime

The following language tags are supported at this time:

```clojure```

```go```

```java```

```node_js```

```php```

```python```

```ruby```

```scala```

You can set the language and runtime as shown below. Example is for node.js projects.

```
language: node_js

node_js:
  - "0.10"
```

Please note that you can specify language versions as number or string, i.e. as `0.10` or as `"0.10"`. In most cases the format is entirely interchangeable. However, in cases where the version number ends with a 0, such as `5.10`, it is safer to use a string to avoid the yml parser from transating the version to `5.1`.

Specific examples for each language are in our [Language guide](ci_languages.md)

## Preparing your environment
The `pre_ci` section lets you prepare your environment before your CI container is booted up. This could include building the docker image you want to use for CI, installing dependencies that your container needs, etc.

<a name="build_images"></a>
## Setting your build image

To run your build, we spin up Docker containers depending on the language specified in your yml. Our build images are available on Docker Hub under the [dry-dock repository](https://hub.docker.com/r/drydock) and the corresponding Dockerfiles are available in our [GitHub repository dry-dock](https://github.com/dry-dock). 

Our standard build images are named as follows:

* The first 3 letters of image name indicate the platform. `u14` denotes ubuntu 14.04, `u12` denotes ubuntu 12.04
* The next 3 letters indicate the language. `nod` for node.js, `sca` for scala, `pyt` for python, `gol` for golang, `rub` for ruby, `clo` for clojure, `jav` for java, and `php` for php.
* The last 3 letters, if present, indicate any additional services that are pre-installed. `pls` indicates that Cassandra, Elasticsearch, Memcached, MongoDB, MySQL, Neo4j, RabbitMQ, Redis, Selenium, SQLLite are already installed on the build minion. `all` indicates that in addition to all services available in pls images, CouchDB, Kestrel, RethinkDB, Riak are also installed.

Exact details on what is included in each image is available in the github repo for the image, as well as the image description on Docker Hub.

### Default build image
By default, we will spin up a build container based on the either the base version or the `all` version of an image for the language specified in your yml. For example, if you specify ```language: python``` in your yml, we will spin up a build minion based on u14pyt:prod. If your build also starts any services using the `services` tag in the yml, we will spin up a build minion based on  u14pytall:prod images. 

### Overriding the default build image

You can override which Docker image is used for your CI by specifying a different image in your yml -

```
pre_ci_boot:
    image_name: manishas/myImage
    image_tag: latest
    pull: true
    envs: FOO=BAR
    options: --privileged=true
```

The image you specify in this section should be available to Shippable when the build reaches this step. To learn how to build your CI image from a Dockerfile or pull from a registry, check out the sections below.

###Building your CI image

If you want to build your Docker image as part of your workflow for each CI run, you will need to do the followng in your shippable.yml-

```
pre_ci:
    - docker build -t myImage:tip .

pre_ci_boot:
    image_name: myImage
    image_tag: tip
    pull: false
    envs: FOO=BAR
    options: --privileged=true
```
For your specific case:

* `image_name` value is the name of the image that was built in the `pre_ci` step. 
*  `image_tag` is the tag for the image that was built in the `pre_ci` step.  
* set `pull` to `false` if you want to use the image you built during the `pre_ci` step instead of pulling from a docker registry.
* In the `env` section, you can enter any environment variables you want to be set inside your CI container. 
* In the `options` tag, enter any docker options you want to use in the `docker run` command. 

The example yml above will ensure that manishas/myImage:tip is used to start the CI container with the option `--privileged=true` and with the environment variable FOO=BAR already set within the container.


###Pulling your CI image from a Docker registry

You can pull any image you have access to from a Docker registry and use that to spin up your CI build container. 


To pull a private image from a registry, you will need to do the following-

1. Create an account integration for your registry ([Instructions here](int_docker_registries.md))
2. Add the integration to your project settings ([Instructions here](ci_projects.md#enable_integrations))
3. Add the following in your shippable.yml:

```
pre_ci_boot:
    image_name: manishas/myImage
    image_tag: latest
    pull: true
    envs: FOO=BAR
    options: --privileged=true

integrations:
    - integrationName: manishasDockerHub
      type: docker
      branches:
          only:
              - master

```

For your specific case:

* `image_name` value is in the format (docker registry username)/(docker registry image repo). 
* `image_tag` is the tag for the image that you want to pull.  
* set `pull` to `true` if you want to pull this image from a docker registry.
* In the `env` section, you can enter any environment variables you want to be set inside your CI container. 
* In the `options` tag, enter any docker options you want to use in the `docker run` command. 
* For `integrationName` tag, enter the name of the account integration you have added to your project settings. This account should have permissions to pull the the build image specified in the `image_name` setting.
* In the `type` tag, enter the type of registry. Options are `docker` for Docker Hub, `gcr` for Google container registry, `quay` for Quay.io, `aws` for Amazon EC2 Container registry, and `private` for a self hosted private registry.
* [optional]Using the `branches` section, specify the branches this account integration is applicable to. You can skip this if you want your integration to be applicable for all branches.

The example yml above will pull the image manishas/myImage:tip using the integration manishas_dockerhub, and run the container with option `--privileged=true` and set env `FOO=BAR` inside the container.  

## The `ci` section 

The `ci` section of your yml is where the bulk of your build commands should be included. All commands in this section are executed sequentially inside your build container in the order they appear in your yml.

In general, follow the guidelines below to write the `ci` section:

* First, install or update any required dependencies or packages. Commands like `npm installl` or `sudo apt-get update` should be at the top of this section.
* Next, create any databases or folders you need. For example, you could create a mysql database with a `- mysql -e 'create database myapp_test;'` or create folders for test results with the command `- mkdir -p shippable/testresults`
* Next, include commands for your builds and tests. This could be something like `- nosetests python/sample.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml` for a python project.

Depending on the whether your `ci` section is successful or not, the `on_success` or `on_failure` sections will be executed. You can include post build actions depending on your build result in these sections.

TODO: Complete this with a real world example


## Pushing an image to a registry 

After CI is complete, you might want to push your build image to a Docker registry and tag it appropriately. Or you might want to build a new 'production' image without any of your CI artifacts and push that to your Docker registry account.

You should do this in the `post_ci` section of your shippable.yml.

To push your CI build container image to a registry:

1. Create an account integration for your registry ([Instructions here](int_docker_registries.md))
2. Add the integration to your project settings ([Instructions here](ci_projects.md#enable_integrations))
3. Add the following in your shippable.yml:

```
build:
    post_ci:
        - docker push manishas/sample-node:tip
   
integrations:
    - integrationName: manishasDockerHub
      type: docker
      branches:
          only:
              - master
    
```

To build a new production image and then push to a registry, 

```
build:
    post_ci:
        - docker build -t manishas/sample-node-prod .
        - docker push manishas/sample-node-prod
   
integrations:
    - integrationName: manishasDockerHub
      type: docker
      branches:
          only:
              - master
    
```

### Pushing multiple tags
In most cases, you will push your image to a Docker registry with one tag. However, there are times when you need to add multiple tags. For example, you might want to tag a container with `tip` as well as the build number.

Here is an example of how to set this up in your yml:

```
build:
    post_ci:
       - docker tag -f manishas/sample-node:latest manishas/sample-node:tip
       - docker tag -f manishas/sample-node:latest manishas/sample-node:$BUILD_NUMBER
       - docker push manishas/sample-node:tip
       - docker push manishas/sample-node:$BUILD_NUMBER
```
In the above example, replace the repo/image name with your image name and the tags with the ones you need for your image. 

<a name="matrix_builds"></a>
## Running multiple builds per commit

In most cases, you want to trigger one build for each commit/pull request to your repository. However, there are times when you might want to trigger multiple builds for a single code change. For example, you might want to test against multiple versions of Ruby, multiple aspect ratios for your Selenium tests, or multiple environment variables.

This scenario is handled by our matrix build feature, so the following yml configs will trigger multiple builds -

- specifying more than one language version 
- specifying more than one variable in the ```env``` section
- specifying multiple gemfiles for ruby



```yaml
rvm:
  - 1.9.2
  - 1.9.3
  - rbx
  - jruby

gemfile:
  - gemfiles/Gemfile.rails-2.3.x
  - gemfiles/Gemfile.rails-3.0.x
env:
  - ISOLATED=true
  - ISOLATED=false
```

The above example will fire 16 different builds for each push. Whoa! Need more minions?

### including/excluding versions

You can also exclude a specific version by configuring your yml with an `exclude` tag: 

```
matrix:
  exclude:
    - rvm: 1.9.2
```

To include only specific combinations of a matrix build, use the `include` as shown below:
with include tag.

```
matrix:
  include:
    - rvm: 2.0.0
      gemfile: gemfiles/Gemfile.rails-3.0.x
      env: ISOLATED=false
```

### allowing failures

Allowed failures are items in your build matrix that are allowed to fail without causing the entire build to be shown as failed. You can define allowed failures in the build matrix as follows:

```yaml
matrix:
  allow_failures:
    - rvm: 1.9.3
```

Please note that you can specify language versions as number or string, i.e. as `0.10` or as `"0.10"`. In most cases the format is entirely interchangeable. However, in cases where the version number ends with a 0, such as `5.10`, it is safer to use a string to avoid the yml parser from transating the version to `5.1`.


## Using environment variables

### Standard variables

The following environment variables are available for every build. You can use these in your scripts if required:


| Env variable        | Description           | 
| ------------- |-------------| 
| BASE_BRANCH		 | Name of the target branch into which the pull request changes will be merged|
| BRANCH		 | Name of branch being built|
| BUILD_NUMBER		 | Build number for current build|
| BUILD_URL		 | Direct URL link to the build output|
| CI		 | true|
| 	CONTINUOUS_INTEGRATION	 |true |
| 	COMMIT	 |Commit id that is being built and tested |
| COMPARE_UR		 |A link to GitHub/BitBucket's comparision view for the push |
| DEBIAN_FRONTEND		 |noninteractive |
| HEAD_BRANCH		 | Name of the most recently committed branch|
| JOB_ID		 | id of job in Shippable|
| LANG		 |en_US.UTF-8 |
| LAST_SUCCESSFUL_BUILD_TIMESTAMP		 |Timestamp of the last successful build in seconds. This will be set to **false** for the first build or for the build with no prior successful builds |
|LC_ALL 		 |en_US.UTF-8 |
|LC_CTYPE 		 | en_US.UTF-8|
|MERB_ENV 		 |test |
| PATH		 | \$HOME/bin:\$PATH|
| PULL_REQUEST		 |Pull request number if the job is a pull request. If not, this will be set to **false** |
|RACK_ENV 		 | test|
| RAILS_ENV		 |test |
|REPO_NAME 		 | Name of the repository currently being built|
|REPOSITORY_URL 		 |URL of your Github or Bitbucket repository |
|SERVICE_SKIP 		 |false |
| SHIPPABLE		 | true|
|SHIPPABLE_ARCHIVE 		 | true|
|SHIPPABLE_BUILD_ID 		 |id of build in Shippable |
| SHIPPABLE_MYSQL_BINARY		 |"/usr/bin/mysqld_safe" |
| SHIPPABLE_MYSQL_CMD		 |"\$SHIPPABLE_MYSQL_BINARY" |
| SHIPPABLE_POSTGRES_VERSION		 | "9.2"|
| SHIPPABLE_POSTGRES_BINARY		 |"/usr/lib/postgresql/\$SHIPPABLE_POSTGRES_VERSION/bin/postgres" |
|SHIPPABLE_POSTGRES_CMD 		 | "sudo -u postgres \$SHIPPABLE_POSTGRES_BINARY -c "config_file=/etc/postgresql/\$SHIPPABLE_POSTGRES_VERSION/main/postgresql.conf""|
| SHIPPABLE_VE_DIR		 | "\$HOME/build_ve/python/2.7"|
| USER		 | shippable|

### Custom Variables

You can also set your own environment variables in the yml. Each statement under the ```env``` tag will trigger a separate build with that env variable, so specifying multiple environment variables will give you a build matrix for every commit. 

```yaml
# environment variable
env:
 - FOO=foo BAR=bar
 - FOO=bar BAR=foo
```

Env variables can create an exponential number of builds when combined with `jdk` & `rvm , node_js etc.` i.e. it is multiplicative. For an example, please check out the Build Matrix section above. To avoid a build matrix and kick off a single build with all environments, you can use the global tag as detailed in the 'Combining variables in a single build' section below.


### Secure variables

Shippable allows you to encrypt environment variables and keep your configurations private using `secure` tag. 

To do this,

1. Encrypt your environment variables ([Instructions here](ci_projects.md#encrypt_env_variables))
2. Copy the encrypted output string and add it to your yml file as shown below:

```
env:
  secure: <encrypted output>
```

### Multiple variables per build

You can combine multiple environment variables in the same build using the `global` tag. This will prevent a build matrix for being triggered and all your variables will be defined for one build.

```yaml
env:
  global:
    - FOO="bar"
    - secure: <encrypted output>
```

To encrypt multiple environment variables separately, configure your yml
file as shown below:

```
env:
  global:
    #encrypted output of first env variable
    - secure: <encrypted output>
    #encrypted output of second env variable
    - secure: <encrypted output>
  matrix:
    #encrypted output of third env variable
    - secure: <encrypted output>
```

> **Note**
>
> Due to the security risk of exposing your secure variables, we do not
> decrypt secure variables for pull request from the forks of public
> projects. Secure variable decryption is limited to the pull request
> triggered from the branches on the same repository. And the decrypted
> secured variables are also not displayed in the script tab for
> security reasons.

## Caching your container

We support two levels of caching for your build containers. You can either choose to cache your entire build container at the end of the build or use the command `shippable_cache_container` to cache your container at any point during the build. The latter allows you to avoid caching everything and only cache dependencies that are required for every build.

To cache your build container at the end of your build, include the line below in the build section of your yml:

```
build:
  cache: true
```

To cache your build container at any point during your build, you can do the following:

```
build:
    cache: true
    ci:
       - some_command
       - shippable_cache_container
       - another_command
```
In the example above, the container will be cached after `some_command` and before `another_command`.


### Clearing cache
You can clear cache in one of 2 ways:

* Including [reset minion] or [reset_minion] in your commit message. 
* Clicking on the `Clear cache` in your Project settings UI.

In both cases, your cached image will be deleted. If cache is still set to true in your yml, the build will generate a new cache which will be used for subsequent builds. This method is the best way to update your cache if required.

## Retrying a command

Sometimes, commands like `npm install` fail due to the intermittent network issues and this affects your build result. To avoid this, you can use `shippable_retry` in the yml to try the command up to 3 times if it returns a non-zero code.

`shippable_retry` functionality is available for all default installation commands. You can
also use it for any custom installation from external resources. For example:

```
before_install:
    - shippable_retry sudo apt-get update
    - shippable_retry sudo apt-get install something
```

## Using git submodules

TODO: rewrite

Shippable supports git submodules. This is a cool functionality of
breaking your projects down into manageable chunks. We automatically
initialize the `.gitmodules` file in the root of the repo.

> **Note**
>
> If you are using private repos, add the deploy keys so that our minion
> ssh keys are allowed to pull from the repo. This can be done via
> shippable.com

If its your own public repos then do this

```python
# for public modules use
git://github.com/someuser/somelibrary.git

# for private modules use
git@github.com:someuser/somelibrary.git
```

If you would like to turn submodules off completely -

```yaml
# for public modules use
git:
 submodules: false
```

## Including/excluding branches

By default, Shippable builds all branches for enabled repositories. If a branch does not have a shippable.yml at its root, we will create a build and show an error in the build console. 

You can choose to build specific branches by using the `branches` sections in your yml. The specific branch that is being included or excluded needs to have this configuration, and not just the master branch. When we get a webhook for an enabled repository, we read the shippable.yml from the branch that has changed and trigger a build using that yml. So unless the yml in the branch to be included/excluded has the right settings, we are not aware of it and will trigger a build as expected.  

Here are some examples of the include/exclude config -

```
# this config will build test1 and experiment2 and exclude all other branches
branches:
  except:
    - test1
    - experiment2
```
```
# this config will only build stage and prod
branches:
  only:
    - stage
    - prod
```


---

<a name="test_code_coverage"></a>
## Test and Code Coverage Reports

Shippable can show you test and code coverage results in a consumable format where you can drill down further and find out which tests failed or which sections of your code were not covered by your tests. 

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. 

### Test Results

To set up test result visualization for a repository, do the following:

- Run tests as part of your CI workflow using shippable.yml
- Make sure test results are in junit format.
- Output test results to shippable/testresults folder.

For example, here is a sample configuration for a Python project -

```yaml
ci: 
    - mkdir -p shippable/testresults
    - nosetests python/sample.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml
```

Examples for other languages can be found in our [Code Samples](languages/).

Once you have set this up, you can view your test results in the `Test` tab on your build page.

TODO: Add screenshot for test tab

### Code Coverage

To set up code coverage result visualization for a repository, do the following:

- Run your code coverage command(s) as part of your CI workflow using shippable.yml
- Make sure code coverage output is in cobertura xml format.
- Output code coverage output to shippable/codecoverage folder.

For example, here is a sample configuration for a Python project -

```yaml
ci: 
  - mkdir -p shippable/codecoverage
  - coverage run --branch python/sample.py
  - coverage xml -o shippable/codecoverage/coverage.xml python/sample.py
```

Examples for other languages can be found in our [Code Samples](languages/).

Once you have set this up, you can view your code coverage results in the `Code coverage` tab on your build page.

TODO: Add screenshot for code coverage tab

---

## Notifications

Shippable supports email, Slack, and IRC notifications and these can
can be configured in your yml file. 

To send HipChat notifications, check out our [sample project for hipchat notifications](https://github.com/shippableSamples/sample-hipchat-notifications).

By default, we send email notifications to the last committer when a
build fails, or the status changes from failed to passed.

You can change the notification settings by configuring the integrations section of your yml. Details for each supported provider are below.


### Email notifications

By default, we send email notifications to the last committer when a build fails, or the status changes from failed to passed.

To customize email notifications, use the yml structure below: 

```yaml
integrations:
    notifications:
        - integrationName: email
          type: email
          recipients:
            - exampleone@org.com
            - exampletwo@org.com
          branches:
            only:
                - master
                - dev
          on_success: always
          on_failure: always 
```

* `integrationName` is always `email` since you do not configure emails in account integrations or project settings.
* `type` is `email` 
* `recipients` specifies the email addresses you want to send build status notifications to. This overrides the default setting of 'last committer' and 'project owner(s)'. 
    - To specify 'last committer' and 'project owner(s)' as part of this list, you can use `--lastcommitter` and `--owners`. 
    - If there is a single recipient, you can use the format `recipients: example@org.com`
* [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches.
* [optional]You can set the following options for the `on_success`, `on_failure` tags :
    - `change` for `on_success` or `on_failure` means you will receive notifications only when the build status changes to success or failure respectively.
    - `always` means that you will always receive a notification for that build status
    - `never` means that you will never receive a notification for that build status
   By default, `on_success` is set to `change` and `on_failure` is set to `always`.
* [optional] You can set the following options for the `on_start`, `on_pull_request` tags :
    - `always` means that you will always receive a notification for build start/pull request
    - `never` means that you will never receive a notification for that build start/pull request
  By default, `on_start` is set to `never` and `on_pull_request` is set to `always`.     

If you do not want to get notified for any reason, you can turn off email notifications with the following in your yml:

```yaml
notifications:
        - integrationName: email
          type: email
          on_success: never
          on_failure: never 
          on_pull_request: never
```

### Slack notifications

To send Slack notifications, you will need to do the following:

1. Create an account integration for your Slack service ([Instructions here](int_notifications.md))
2. Add the integration to your project settings ([Instructions here](ci_projects.md#enable_integrations))
3. Add the following in your shippable.yml:


```yaml
integrations:
    notifications:
        - integrationName: my_slack_integration
          type: slack
          recipients:
            - channelOne
            - channelTwo
          branches:
              only:
                - master
                - dev
          on_success: never
          on_failure: always 
```
* `integrationName` value is the name of the account integration you added to project settings.
* `type` is slack 
* `recipients` specifies the channels you want to send the notification to. Please note that this overrides any channels you select while setting up the account integration.
    - If there is a single recipient, you can use the format `recipients: channelOne`
* [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches.
* [optional] You can set the following options for the `on_success`, `on_failure` tags :
    - `change` for `on_success` or `on_failure` means you will receive notifications only when the build status changes to success or failure respectively.
    - `always` means that you will always receive a notification for that build status
    - `never` means that you will never receive a notification for that build status
  By default, `on_success` is set to `change` and `on_failure` is set to `always` if Slack is configured in the yml but you do not specify these tags.
* [optional] You can set the following options for the `on_start`, `on_pull_request` tags :
    - `always` means that you will always receive a notification for build start/pull request
    - `never` means that you will never receive a notification for that build start/pull request
  By default, `on_start` is set to `never` and `on_pull_request` is set to `always` if Slack is configured in the yml but you do not specify these tags.     



### IRC notifications

You can send notifications to public and private IRC rooms using Shippable. 

To send notifications to private IRC channels, you will need to first do the following:

1. Create an account integration for your IRC channel ([Instructions here](int_notifications.md))
2. Add the integration to your project settings ([Instructions here](ci_projects.md#enable_integrations))

To send notifications to public IRC channels, you can skip the two steps above.

Use the following yml structure to send IRC notifications:

```yaml
integrations:
    notifications:
        - integrationName: irc
          type: irc
          recipients:
            - "chat.freenode.net#channel1"
            - "chat.freenode.net#channel2"
          branches:
            only:
                - master
                - test
          on_success: never
          on_failure: always 
```

* `integrationName` value is the name of the account integration you added to project settings. For public channels, just use `irc`.
* `type` is `irc` 
* `recipients` specifies the rooms you want to send the notification to. 
    - If there is a single recipient, you can use the format `recipients: "chat.freenode.net#channel2"`
* [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches.
* [optional] You can set the following options for the `on_success`, `on_failure` tags :
    - `change` for `on_success` or `on_failure` means you will receive notifications only when the build status changes to success or failure respectively.
    - `always` means that you will always receive a notification for that build status
    - `never` means that you will never receive a notification for that build status
  By default, `on_success` is set to `change` and `on_failure` is set to `always` if IRC is configured in the yml but you do not specify these tags.
* [optional] You can set the following options for the `on_start`, `on_pull_request` tags :
    - `always` means that you will always receive a notification for build start/pull request
    - `never` means that you will never receive a notification for that build start/pull request
  By default, `on_start` is set to `never` and `on_pull_request` is set to `always` if IRC is configured in the yml but you do not specify these tags.     


---

## Services

Shippable offers a host of pre-installed services to make it easy to run
your builds. In addition to these you can install other services also by
using the `install` tag of `shippable.yml`.

All the services are turned off by default and can be turned on by using
the `services:` tag.

### MongoDB

```yaml
# Mongo binds to 127.0.0.1 by default
services:
 - mongodb
```

Sample PHP code using
[mongodb](https://github.com/shippableSamples/sample_php_mongo) .

### MySQL

```yaml
# MySQL binds to 127.0.0.1 by default. Default username is shippable with no password
# Create a DB as part of the ci section before you use it

services:
    - mysql
ci:
    - mysql -e 'create database myapp_test;'
```

Sample javascript code using
[mysql](https://github.com/shippableSamples/sample_node_mysql).

### SQLite3

SQLite is a software library that implements a self-contained,
serverless, zero-configuration, transactional SQL database engine. So
you can use SQLite, if you do not want to test your code behaviour with
other databases.

Sample python code using
[SQLite](https://github.com/shippableSamples/sample_python_sqllite).

### Elastic Search

```yaml
# elastic search is on default port 9200
services:
    - elasticsearch
```

Sample python code using [Elastic Search](https://github.com/shippableSamples/sample_python_elasticsearch).

### Memcached

```yaml
# memcached runs on default port 11211
services:
    - memcached
```

Sample python code using
[Memcached](https://github.com/shippableSamples/sample_python_memcache) .

### Redis

```yaml
# redis runs on default port 6379
services:
    - redis
```

Sample python code using
[Redis](https://github.com/shippableSamples/sample_python_redis).

### Neo4j

```yaml
#neo4j runs on default port 7474
services:
 - neo4j
```

Sample javascript code using
[Neo4j](https://github.com/shippableSamples/sample_node_neo4j) .

### Cassandra

```yaml
# cassandra binds to the default localhost 127.0.0.1 and is not started on boot.
services:
  - cassandra
```

Sample ruby code using
[Cassandra](https://github.com/shippableSamples/sample_ruby_cassandra) .

### CouchDB

```yaml
# couchdb binds to the default localhost 127.0.0.1 and runs on default port 5984. It is not started on boot.
services:
  - couchdb
```

Sample ruby code using
[CouchDB](https://github.com/shippableSamples/sample-ruby-couchdb) .

### RethinkDB

```yaml
# rethinkdb binds to the default localhost 127.0.0.1 and is not started on boot.
services:
  - rethinkdb
```

Sample javascript code using
[RethinkDB](https://github.com/shippableSamples/sample-node-rethinkdb).

### RabbitMQ

```yaml
# rabbitmq binds to 127.0.0.1 and is not started on boot. Default vhost "/", username "guest" and password "guest" can be used.
services:
  - rabbitmq
```

Sample python code using
[RabbitMQ](https://github.com/shippableSamples/sample_python_rabbitmq) .

---

## Addons

### Firefox

We support different firefox versions like "18.0", "19.0", "20.0",
"21.0", "22.0", "23.0", "24.0", "25.0", "26.0", "27.0", "28.0", "29.0".
To select a specific firefox version, add the following to your
shippable.yml file.

```yaml
addons:
   firefox: "21.0"
```

### Custom Host Name

You can also set up custom hostnames using the **hosts** addons. To set
up the hostnames in /etc/hosts file, add the following to your
shippable.yml file.

```yaml
addons:
   hosts:
    - google.com
    - asdf.com
```

### PostgreSQL

```yaml
# Postgre binds to 127.0.0.1 by default. Default username is "postgres" with no password
# Create a DB as part of the ci section before using it

services:
    - mysql
    
ci:
  - psql -c 'create database myapp_test;' -U postgres
```

Sample java code using
[PostgreSQL](https://github.com/shippableSamples/sample_java_postgres).

We support PostgreSQL 9.1, 9.2 and 9.3 versions and by default, version
9.2 is installed on our minions. Configure your yml file using
**PostgreSQL** addons to select different versions. Add the following to
your yml file to select the version 9.3.

```yaml
addons:
 postgresql : "9.3"
```

PostGIS 2.1 packages are pre-installed in our minions along with the
PostgreSQL versions 9.1, 9.2 and 9.3.

### Selenium

Selenium is not started on boot. You will have to enable it using
**services** tag and start xvfb (X Virtual Framebuffer) on display port
99.0, so that all your test suites will run on the server without a
display. Configure your yml file as shown below to start selenium server
on firefox.

```yaml
addons:
  firefox: "23.0"

services:
  - selenium

ci:
  - "export DISPLAY=:99.0"
  - "/etc/init.d/xvfb start"
```

Selenium **2.40** is started by default. You can also select a different
version of selenium using **addons** tag. The following versions are
supported:

- 2.39
- 2.40
- 2.41
- 2.42
- 2.43
- 2.44

Choose the required version and add it to your shippable.yml file as
shown below

```yaml
addons:
  selenium: "2.43"
```

This will download the required version. You will have to include
**services** tag in your yml file to start the selenium server using the
downloaded version. Configure your yml file as shown below to start
selenium server **2.43** on firefox.

```yaml
#specify required selenium and firefox version
addons:
  selenium: "2.43"
  firefox: "27.0"

#start the selenium server
services:
  - selenium

ci:
  - "export DISPLAY=:99.0"
  - "/etc/init.d/xvfb start"
```

Sample javascript code using
[Selenium](https://github.com/shippableSamples/sample_node_selenium) .

---

## Pull requests

Shippable integrates with github to build your pull requests and show status inline on your GitHub page for the PR. 

Whenever a pull request is opened for a project that is enabled on Shippable, we will run a build for the respective pull request and send you a build status notification. You can also see this status on your GitHub page as shown below:

<img src="../images/ci_pr_status.png" alt="e2e pipeline" style="width:600px;"/>

You can then merge the PR confidently if the build passes, or fix any issues that cause a failed build. Each time your pull request is updated, we will kick off a new build and update status. 

After you accept the pull request, Shippable will run one more build for the merged repo and will send email notifications for the merged repo.  
* * * * *

## Build badge

TODO: how do we do badges?

* * * * *

## Build timeout

Your builds will time out in the following scenarios:

-   If there has not been any log output or a command hangs for 10 minutes
-   If the build is still running after 60 minutes for Free minions or 120 minutes for Paid minions

Please let us now if you belueve a build is timing out when it shouldn't do so and we will take a look. 

* * * * *

## Skipping a build

Any changes to your source code will trigger a build automatically on
Shippable. So if you do not want to run build for a particular commit,
then add **[ci skip]** or **[skip ci]** to your commit message.

Our webhook processor will look for the string **[ci skip]** or **[skip
ci]** in the commit message and if it exists, then that particular
webhook build will not be executed.

## Specifying command collections
We support collections in every section of the yml and will run it one command at a time.

```
# collection scripts
ci:
 - ./minions/do_something.sh
 - ./minions/do_something_else.sh
```

In the example above, our minions will run `./minions/do_something.sh`
and then run `./minions/do_something-else.sh`. The only requirement is
that all of these operations return a `0` exit code. Else the build will
fail.



