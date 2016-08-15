page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

<br>
# Resources
Resources are the building blocks of your pipelines. Eg. git repos, docker 
images etc. 

A key characteristic of resources is that it can be versioned and its immutable. 
Picking specific version of a resource should be idempotent. i.e. it returns the
same result every single time it is fetched. eg. git commit sha

Shippable internally maintains its own version numbers for every resource so that
different resources can be normalized internally. Docker images have tags as a way
to version and git repos use commit shas. Both of these have a version number for 
every tag or sha making it easy to abstract it out

There are many types of resources that come out of the box. Every resource does
one thing and one thing only. Together with [integrations]() they become a very
powerful concept that can be used to model any pipeline from simple to complex 
ones. 

<br>
# Adding Resources
Resources are stored in a resource file `shippable.resources.yml` in a git 
repository. Any repo can contain this file but only one of it can be used. If 
more than 1 resource file is present, the first one is used. This is done in order
to reduce conflict due to the same resource being defined in multiple places.

To learn how to add this file and connect it to pipelines, 
[click here](../../tutorials/how_to_add_syncRepos)

<br>
# Deleting Resources
Deleting a resource is a 2 step process. Pipelines are all about dependencies and
deployable units are flowing through these pipelines. Hard deleting resources from 
pipelines is a non reversible operation and you will lose the version history. As a result, we only soft delete resources when they are removed from the YML file. If it was done mistakenly, you just add it back and the system will un-delete the resource. 

You can hard delete a resource through the UI. To do this:

* Go to your Subscription page and click on the `Pipelines` tab
* Click on the `Resources` pill
* You will find a list of soft deleted resources at the bottom of the page. To hard delete, just click the 	`Delete` button for the resource you want to delete

A resource must be soft deleted before it can be hard deleted.

<br>
<a name="integration"></a>
# Integrations
Shippable is designed to separate out auth information from resources. The reason
for this is that there is no encryption/decryption issues when you move things
around i.e. moving resource definitions from one repo to another or if the person
who created it is no longer the member of the team etc. Integration property in the 
YML definition is a reference to this integration.

To learn how to create integration and map them to your org, 
[click here](../../tutorials/how_to_add_integrations)

<br>
# Resource Types
These are the resources that come straight out of the box.

- [syncRepo](#syncRepo): source for resources & jobs
- [gitRepo](#gitRepo): source for your code
- [image](#image): docker image definition 
- [dockerOptions](#dockerOptions): options for docker images
- [params](#params): parameters for your apps/services/microservices
- [replicas](#replicas): number of copies of the service to run
- [version](#version): semantic versions
- [cluster](#cluster): Cluster that defines a container service

<a name="syncRepo"></a>
## syncRepo
Using this resource type you can instruct Shippable's internal sync system to 
look for `shippable.resources.yml` and `shippable.jobs.yml`. This is the only 
resource that can be added from the UI or `shippable.resources.yml`. *Note: You 
should not add the same repository in both places. This can lead to unexpected 
behavior*

Adding this resource will create a webhook on the source repo server pointing to 
Shippable. With this, future commits to the repo will automatically sync changes
into your pipeline.

Integrations allow you to add repos on any of the [supported git servers](#repoTypes1) 
using the same resource type.

You can add a syncRepo from the UI by following these instructions 
TODO : 

Alternatively you can add it to `shippable.resources.yml`
```
- name: prod-repo                           #required
  type: syncRepo                            #required
  integration: avinci-gh                    #required
  pointer:
    sourceName: avinci/prod                 #required
    branch: master                          #optional
```
This will create a resource of type `syncRepo` with the name `prod-repo`. It is 
using an integration `avinci-gh` which is the name of the integration defined, 
[learn more here](#integration). The repo name is `prod` and belongs to `avinci` 
org. The branch to look for resource and job definitions is `master`

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *syncRepo*. This cannot be 
changed once set. 

```
integration: string
```
This defines the integration that we are using to connect to the repo. Shippable 
supports multiple types of git repository providers and they can be defined as 
integrations[learn more](#integration)). We support the following types of 
repository providers
<a name="repoTypes1"></a>

- github
- bitbucket
- github enterprise
- bitbucket server (stash)
- gitlab
- gitlab server

```
pointer:
  sourceName: string 
  branch: string
```
`name` is the fully qualified name of the repo i.e. **org/repo**

`branch` defaults to `master` if its not provided 

<br>
<a name="gitRepo"></a>
## gitRepo
Using this resource you can hook your source code to pipelines. 

Adding this resource type will create a webhook on the source repo server pointing 
to Shippable. With this, future commits to the repo will automatically create a 
new version for this resource with the new commit sha.

Integrations allow you to add repos on any of the [supported git servers](#repoTypes2) 
using the same resource type.

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-repo                            #required
  type: gitRepo                             #required
  integration: avinci-gh                    #required
  pointer:
    sourceName: avinci/box                  #required
    branch: master                          #optional
```
This will create a resource of type `gitRepo` with the name `box-repo`. It is 
using an integration `avinci-gh` which is the name of the integration defined, 
[learn more here](#integration). The repo name is `box` and belongs to `avinci` 
org. The branch to look for resource and job definitions is `master`

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *gitRepo*. This cannot be changed 
once set. 

```
integration: string
```
This defines the integration that we are using to connect to the repo. 
Shippable supports multiple types of git repository providers and they can be 
defined as integrations[learn more](#integration)). We support the following 
types of repository providers
<a name="repoTypes2"></a>

- github
- bitbucket
- github enterprise
- bitbucket server (stash)
- gitlab
- gitlab server

```
pointer:
  sourceName: string 
  branch: string
```
`sourceName` is the fully qualified name of the repo i.e. **org/repo**

`branch` defaults to `master` if its not provided 

<br>
<a name="image"></a>
## image
This resource type is used to add a docker image to your pipeline. 

Integrations allow you to add images on any of the [supported image registries](#regTypes) 
using the same resource type.

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-image                           #required
  type: image                               #required
  integration: avinci-dh                    #required
  pointer:
    sourceName: "avinci/box"                #required
  seed:
    versionName: "master.35"                #required
```
This will create a resource of type `image` with the name `box-image`. It is using 
an integration `avinci-dh` which is the name of the integration defined, 
[learn more here](#integration). The image name is `box` and belongs to `avinci` 
org. The branch to look for resource and job definitions is `master`. This image 
tag is being set to `master.35` as the initial seed version.

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *image*. This cannot 
be changed once set. 

```
integration: string
```
This defines the integration that we are using to connect to the repo. Shippable 
supports multiple types of registries and they can be defined as 
integrations[learn more](#integration)). We support the following types of registries

<a name="regTypes"></a>

- Docker hub
- Docker private registry
- Docker trusted registry
- Google container registry
- Amazon Elastic Container Registry
- Quay.io

```
pointer:
  sourceName: string 
```
`sourceName` is the fully qualified name of the image i.e. **org/repo**

```
seed:
  versionName: string
```
`versionName` since this is an image, this will take in the tag of the image

<br>
<a name="dockerOptions"></a>
## dockerOptions
This resource type is used to add a list of docker options that can be appended 
to a docker image. This resource on its own does not mean anything unless used
in conjunction with an image.

This resource can also be used to override options that are already set in 
another stage of the pipeline. A common use case for this would be a scenario in 
which you want to run different memory settings for the same service in test vs
production. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-opts                            #required
  type: dockerOptions                       #required
  version:
    memory: 64                              #optional
    cpu-shares: 256                         #optional TODO camelcase
    portMappings:                           #optional
      - "80:80"
    TODO : add rest of the options to docs
```
This will create a resource of type `dockerOptions` with the name `box-opts`. 
The following options are being set in this example. Memory of 64mb, 
CPU shares of 256 and host port 80 is being mapped to container port 80.

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *dockerOptions*. This cannot 
be changed once set. 

```
version:
  memory: integer 
  cpu-shares: integer
  portMappings: [elements with integer:integer format]
```
`memory` is the amount of memory the container is allocated. It is set in 
megabytes and is an integer. defaults to 0 if not provided which means let the 
host node manage it dynamically. 

`cpu-shares` is the relative % of CPU that is allocated 
[more info](http://stackoverflow.com/questions/26841846/how-to-allocate-50-cpu-resource-to-docker-container)
This defaults to 0 if its not provided which means let the host node manage it 
dynamically.

`portMappings` is an array of port mappings. Host port is always the first 
element and the container port is the second element separated by a `:`. Port
numbers are always integers. If not provided, no container port is exposed, even
if your Dockerfile had the `EXPOSE` statement.

Any time any of these options changes, a new version is created

<br>
<a name="params"></a>
## params
This resource type is used to add a list of environment params that will be 
appended to app/service/microservice. This resource on its own does not mean 
anything unless used in conjunction with a service.

This resource can also be used to override environment variables that are already 
set in another stage of the pipeline. A common use case for this would be a scenario 
in  which you want to run different DB connection for the same service in test vs
production. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-params                          #required
  type: params                              #required
  version:
    params:                                 
      DB_HOST: "ds015700"                   #required atleast 1
      DB_NAME: "ayeaye"                     #optional
      DB_PORT: "15700"                      #optional
      secure: <encrypted value>  			 #optional
```
This will create a resource of type `params` with the name `box-params`. The 
following params are being set in this example: DB_HOST, DB_NAME, DB_PORT, and a secure variable containing an encrypted value.

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *params*. This cannot 
be changed once set. 

```
version:
  params: 
    key1: value1
    key2: value2
    secure: encrypted value
```
`params` is basically an object of key value pairs that will be set as environment
variables when the app/service/microservice starts at the target. A new version is
created everytime any of the values of the params changes. 

You can use secure variables to encrypt any key value pairs that contain sensitive information you don't want to include as plain text. To encrypt one or more key value pairs, [follow the instructions in the Subscription Settings guide](../navigatingUI/subscriptions/settings.md#encrypt). Copy the encrypted value and include it in your resource file as shown in the snippet above.


<br>
<a name="replicas"></a>
## replicas
This resource type is used to control the number of copies of the app/service/microservice
that will be started at the target. This resource on its own does not mean 
anything unless used in conjunction with a service.

This resource can also be used to override environment variables that are already 
set in another stage of the pipeline. A common use case for this would be a scenario 
in  which you want to run different number of copies for the same service in test 
vs production. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-scaler                          #required
  type: replicas                            #required
  version:
    count: 1                                #required
```
The above YML when added to `shippable.resources.yml` will create a resource of 
type `replicas` with the name `box-scaler`. Currently only 1 copy of the service
to which this is attached is started when deployed.

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *replicas*. This cannot be changed 
once set. 

```
version:
  count: 1
```
`count` is an integer that represents the number of copies to run. This is versioned
and everytime the counter is changed, a new version is created.

<br>
<a name="version"></a>
## version
This resource type is used to create version numbers. It uses semantic version
methodology to increment versions.

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-version                         #required
  type: version                             #required
  seed:
    versionName: "0.0.1"                    #required
```
This will create a resource of type `version` with the name `box-version`. The 
seed version is being set to 0.0.1

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *version*. This cannot be changed 
once set. 

```
seed:
  versionName: string with format "0.0.0"
```
`versionName` is an string integer that represents a semantic version that is used 
as a starting point. This will get incremented in the IN operations of [jobs](#jobs). 
You can also use `0.0.0-alpha`, `0.0.0-beta` & `0.0.0-rc` formats too

<br>
<a name="cluster"></a>
## cluster
This resource type is used to add a container service that can be used for deploying
your apps/services/microservices. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: env-test                            #required
  type: cluster                             #required
  integration: avinci-aws
  pointer:
    sourceName : "test-aws"                 #required
    region: "us-east-1"                     #required for some container services
```
This will create a resource of type `cluster` with the name `env-test`. It is 
using an integration `avinci-aws` which is the name of the integration defined, 
[learn more here](#integration). The cluster name is `test-aws` and on the aws 
region  to `us-east-1`. 

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *ecsCluster*. This cannot 
be changed once set. 

```
integration: string
```
This defines the integration that we are using to connect to the container service. 
Shippable supports multiple types of container services and they can be defined as 
integrations[learn more](#integration)). We support the following types of container
services 

- ecsCluster: AWS Elastic container service
- gkeCluster: Google Kubernetes container cluster
- tripubCluster: Joyent Triton container cluster 
- acsCluster: Azure Ccntainer Service cluster 
- dclCluster: Docker cloud container cluster 


```
pointer:
  sourceName: string 
  region: string
```
`sourceName` is the name of the cluster that this resource represents.

`region` is the region where the cluster resides. The values are dependent on the
integration. This is required for the following types of integrations and will take
in the values that the provider supports

- ecsCluster: AWS Elastic container service
- gkeCluster: Google Kubernetes container cluster
- tripubCluster: Joyent Triton container cluster 
- acsCluster: Azure Ccntainer Service cluster 

<br>