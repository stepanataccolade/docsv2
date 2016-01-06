page_title: Shippable Build Configuration
page_description: How to write your Shippable YML and Set up your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml

# Configure your build

All build configuration happens through shippable.yml which should be present at the root of the repository you want to build using Shippable.  

At a high level, the yml structure is as shown below -
TODO: Add yml structure picture


<a name="build_images"></a>
## Setting your build image

To run your build, we spin up Docker containers depending on the language specified in your yml. Our build images are available on Docker Hub under the [dry-dock repository](https://hub.docker.com/r/drydock) and the corresponding Dockerfiles are available in our [GitHub repository dry-dock](https://github.com/dry-dock). 

Our standard build images are named as follows:

* The first 3 letters of image name indicate the platform. `u14` denotes ubuntu 14.04, `u12` denotes ubuntu 12.04
* The next 3 letters indicate the language. `nod` for node.js, `sca` for scala, `pyt` for python, `gol` for golang, `rub` for ruby, `clo` for clojure, `jav` for java, and `php` for php.
* The last 3 letters, if present, indicate any additional services that are pre-installed. `pls` indicates that Cassandra, Elasticsearch, Memcached, MongoDB, MySQL, Neo4j, RabbitMQ, Redis, Selenium, SQLLite are already installed on the build minion. `all` indicates that in addition to all services available in pls images, CouchDB, Kestrel, RethinkDB, Riak are also installed.

Exact details on what is included in each image is available in the github repo for the image, as well as the image description on Docker Hub.

### Default build image
By default, we will spin up a build container based on the `all` version of an image for the language specified in your yml. For example, if you specify ```language: python``` in your yml, we will spin up a build minion based on the u12pytall:prod image. 

### Overriding the default build image
TODO: Rewrite since after yml is finalized

You can override which Docker image is used for your CI by specifying a different image in your yml -

```
pre_ci_boot:
    integration: manishas_dockerhub
    image_name: manishas/myImage
    image_tag: tip
    pull: true
    envs: FOO=BAR
    options: --privileged=true
```

The image you specify in this section should be available to Shippable when the build reaches this step. 

###Building your CI image
TODO: Rewrite since after yml is finalized

If you want to build your Docker image as part of your workflow for each CI run, you will need to do the followng in your shippable.yml-

```
pre_ci:
    docker build myrepo/Dockerfile -t manishas/myImage:tip  

pre_ci_boot:
    image_name: manishas/myImage
    image_tag: tip
    pull: false
    envs: FOO=BAR
    options: --privileged=true
```

This will ensure that manishas/myImage:tip is used to start the CI container with the option `--privileged=true` and with the environment variable FOO=BAR already set within the container.

TODO: Add sample project

###Pulling your CI image from a Docker registry
If you want to pull your CI image from a supported Docker registry, you will need to do the following-

1. Create an account integration for your registry ([Instructions here](int_docker_registries.md))
2. Add the integration to your project settings ([Instructions here](ci_projects.md#enable_integrations))
3. Add the following in your shippable.yml:

```
pre_ci_boot:
    integration: manishas_dockerhub
    image_name: manishas/myImage
    image_tag: tip
    pull: true
    envs: FOO=BAR
    options: --privileged=true
```

For your specific case:

* The `integration` tag should be set to the name of the account integration you added to your project settings in step 2 
* `image_name` is in the format (docker registry username)/(docker registry image repo). 
* In the `env` section, you can enter any environment variables you want to be set inside your CI container. 
* In the `options` tag, enter any docker options you want to use in the `docker run` command. 

The example yml above will pull the image manishas/myImage:tip using the integration manishas_dockerhub, and run the container with option `--privileged=true` and set env `FOO=BAR` inside the container.  

TODO: Add sample project


## Running multiple builds per commit

In most cases, you want to trigger one build for each commit/pull request to your repository. However, there are times when you might want to trigger multiple builds for a single code change. For example, you might want to test against multiple versions of Ruby, multiple aspect ratios for your Selenium tests, or multiple environment variables.

This scenario is handled by our matrix build feature. In simple terms, the following yml configs will trigger multiple builds -

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


## Specifying command collections
We support collections in every section of the yml and will run it one command at a time.

```
# collection scripts
script:
 - ./minions/do_something.sh
 - ./minions/do_something_else.sh
```

In the example above, our minions will run `./minions/do_something.sh`
and then run `./minions/do_something-else.sh`. The only requirement is
that all of these operations return a `0` exit code. Else the build will
fail.

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

## Test and Code Coverage Visualization

### Test Results

To set up test result visualization for a repository.

- Output test results to shippable/testresults folder.
- Make sure test results are in junit format.

For example, here is the .yml file for a Python repo -

```yaml
before_script: mkdir -p shippable/testresults
script:
  - nosetests python/sample.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml
```

Examples for other languages can be found in our
[Code Samples](languages/).

### Code Coverage

To set up code coverage result visualization for a repository.

- Output code coverage output to shippable/codecoverage folder.
- Make sure code coverage output is in cobertura xml format.

For example, here is the .yml file for a Python repo -

```yaml
before_script: mkdir -p shippable/codecoverage
script:
  - coverage run --branch python/sample.py
  - coverage xml -o shippable/codecoverage/coverage.xml python/sample.py
```

Examples for other languages can be found in our Code Samples.

---

## Notifications

TODO: Update this section.
Shippable primarily supports email and irc notifications and these can
can be configured in your yml file. To send Slack notifications, please
check out our [blog post](http://blog.shippable.com/devops-chat-a-simple-way-to-use-slack-notifications-with-shippable).
To send HipChat notifications, check out our [sample project for hipchat notifications](https://github.com/shippableSamples/sample-hipchat-notifications).

By default, we send email notifications to the last committer when a
build fails, or the status changes from failed to passed.

You can change the default settings for email notifications by
configuring the notifications section of your yml. You can specify the
email address(es) where you want to receive notification as well as the
criteria for when you want notifications to be sent.

### Email notifications

To send notifications to specific email addresses, replace the sample
email addresses below with the recipients' email ids in your
`shippable.yml` file.

```yaml
notifications:
    email:
        - exampleone@org.com
        - exampletwo@org.com
```

You can also specify when you want to get notified by setting the values
for on_success and on_failure keys to change|always|never. Change
means you want to be notified only when the build status changes on the
given branch. Always and never mean you want to be notified always or
never respectively.

```yaml
notifications:
     email:
         recipients:
             - exampleone@org.com
             - exampletwo@org.com
         on_success: change
         on_failure: always
```

If you do not want to get notified for any reason, you can configure
email notifications to false.

```yaml
notifications:
   email: false
```

### IRC notifications

You can also configure yml file to send build notifications to your IRC
channels.

- To specify single channel

```yaml
notifications:
   irc:  "chat.freenode.net#channel1"
```

- You can also specify multiple server channels in yml file. The
  following formats are supported:

```yaml
notifications:
  irc:
    - "chat.freenode.net#channel1"
    - "chat.freenode.net#channel2"
    - "server1#channel3"
```

```yaml
notifications:
  irc:
   channels:
     - "chat.freenode.net#channel1"
     - "chat.freenode.net#channel2"
     - "server1#channel3"
```

- By default, We will always send build notifications to the mentioned
  channels in yml. **on_success** and **on_failure** are not yet
  configurable.
- IRC notifications are turned off by default for pull request builds.
  However, you can change the default settings by adding
  **pull_requests: true** tag in your yml as shown below.

```yaml
notifications:
  irc:
   pull_requests: true
   channels:
```
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
# MySQL binds to 127.0.0.1 by default and is started on boot. Default username is shippable with no password
# Create a DB as part of before script to use it

before_script:
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
# Postgre binds to 127.0.0.1 by default and is started on boot. Default username is "postgres" with no password
# Create a DB as part of before script to use it

before_script:
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

before_script:
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

before_script:
  - "export DISPLAY=:99.0"
  - "/etc/init.d/xvfb start"
```

Sample javascript code using
[Selenium](https://github.com/shippableSamples/sample_node_selenium) .

---

## Pull requests

Shippable will integrate with github to show your pull request status on
CI. Whenever a pull request is opened for your repo, we will run the
build for the respective pull request and notify you about the status.
You can decide whether to merge the request or not, based on the status
shown. If you accept the pull request, Shippable will run one more build
for the merged repo and will send email notifications for the merged
repo. To rerun a pull request build, go to your project's page -\> Pull
Request tab and then click on the **Build this Pull Request** button.

* * * * *

## Build badge

Badges will display the status of your default branch. You can find the build badges on the project's page. Click on the **Badge** button and copy the markdown to your README file to display the status of most recent build on your Github or Bitbucket repo page.

* * * * *

## Build timeout

Builds will be timed out in the following scenarios:

-   If there has not been any log output or a command hangs for 10 minutes
-   If the build is still running after 60 minutes for Free minions or 120 minutes for Paid minions


* * * * *

## Skipping a build

Any changes to your source code will trigger a build automatically on
Shippable. So if you do not want to run build for a particular commit,
then add **[ci skip]** or **[skip ci]** to your commit message.

Our webhook processor will look for the string **[ci skip]** or **[skip
ci]** in the commit message and if it exists, then that particular
webhook build will not be executed.


