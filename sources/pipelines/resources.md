page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

<br>
# Resources
Resources are the basic building blocks of your pipelines. Eg. git repos, docker images etc. 

A key characteristic of resources is that they can be versioned and are immutable. A specific version of a resource is idempotent. i.e. it returns thesame result every single time it is fetched. eg. git commit sha.

Shippable internally maintains its own version numbers for every resource so that different resources can be normalized internally. Docker images have tags as a way to version and git repos use commit shas. Both of these have a version number for every tag or sha making it easy to abstract it out.

There are many types of resources that come out of the box. Every resource does one thing and one thing only. Together with [jobs](jobs.md) and [triggers](triggers.md), they are a very powerful concept that can be used to model any pipeline from simple to complex ones. 

---
## Adding Resources
Resources are stored in a resource file `shippable.resources.yml` in a git 
repository. Any repo can contain this file but only one of it can be used. If 
more than 1 resource file is present, the first one is used. This is done in order
to reduce conflict due to the same resource being defined in multiple places.

To learn how to add this file and connect it to pipelines, 
[click here](../../tutorials/how_to_add_syncRepos)

---
## Deleting Resources

Since pipelines are all about dependencies and deployable units are flowing through these pipelines at all times, deleting a resource can significantly alter or irreversibly change the pipeline in unexpected ways. To avoid accidental deletion of resource(s) in ymls, we have made deletion of resources a 2 step process. 

First, you need to soft-delete a resource by removing it from your `shippable.resources.yml` file. This removes it from the pipeline, but does not remove it from the database. You can see a list of soft-deleted resources at the bottom of the `Resources` tab. If soft-deleted resources are added back to the resources yml, the system will undelete them and you will retain version history for the undeleted resource. 

To completely remove a resource from the system, you need to hard delete it through the UI. To do this:

* Go to your Subscription page and click on the `Pipelines` tab
* Click on the `Resources` pill
* You will find a list of soft deleted resources at the bottom of the page. To hard delete, just click the 	`Delete` button for the resource you want to delete

A resource must be soft deleted before it can be hard deleted.

---
<a name="integration"></a>
## Integrations
Shippable is designed to separate out sensitive authentication information from resources. 
This is done to ensure there are no encryption/decryption or permissions issues when you move things around i.e. moving resource definitions from one repository to another, or if the person who created the pipeline is no longer the member of the team etc. Integrations are specified as a property in the YML definition for resources that connect to third party services. 

To learn how to create integration and map them to your org, 
[click here](../../tutorials/how_to_add_integrations)

---
## Resource Types
These are the resources that are predefined and work as documented in the sections below:

- [syncRepo](#syncRepo): Source repository for resources & jobs
- [gitRepo](#gitRepo): Source repository for your code
- [image](#image): Docker image definition 
- [dockerOptions](#dockerOptions): Options for docker images
- [params](#params): Parameters for your apps/services/microservices
- [replicas](#replicas): Number of copies of the service to run
- [version](#version): Semantic versions
- [cluster](#cluster): Cluster that defines a container service
- [notification](#notification): Notifications for job success or failure

At this time, we do not support definition of custom resources. If you need a resource that is not listed above, send us an email at [support@shippable.com](mailto:support@shippable.com)

<a name="syncRepo"></a>
### syncRepo
The `syncRepo` resource is at the heart of your deployment pipelines. This resource is a pointer to the source control repository containing the files that define your pipelines:  `shippable.resources.yml` and `shippable.jobs.yml`.

When you add a `syncRepo`, Shippable will read the jobs and resources ymls and create your pipeline. We also add a webhook on the source repository that notifies Shippable each time anything in the repository is changed. This webhook notification will automatically sync any changes you make to the jobs and resources ymls and reflect them in your pipeline. 

You need to add at least one syncRepo resource from the Shippable UI. Additional syncRepo resources can be added through the UI or by specifying them in the shippable.resources.yml file in the first syncRepo that was added.

This is the only resource type that can be added from the UI. You should not add the same repository as a sync repo more than once. This can lead to unexpected behavior.

#### Adding a syncRepo from the UI

* Go to your Subscription's page and click on `Pipelines`
* Click on the `Resources` pill and then click on `Add resource` at the right
* You will first need to select a subscription integration. This should point to the source control system where the repository containing your pipeline definitions is located. To learn how to create subcription integrations for source control, read the [SCM section of integrations overview page](../integrations/overview.md#scm). 
* Once you add the integration, you will see a list of repositories in your subscription.
* Select the repository and branch that contains your shippable.jobs.yml and shippable.resources.yml files
* Name your sync repository and click on `Save`. This should seed your pipeline.

If you click on the SPOG tab, you should see a visualization of the the jobs and resources from your pipeline.

#### Adding a syncRepo through the yml
You will always need to add at least one syncRepo through the UI. Subsequent syncRepos can be either added through the UI or you can include them in the `shippable.resources.yml`of the first syncRepo:

```
- name: prod-repo                           #required
  type: syncRepo                            #required
  integration: avinci-gh                    #required, source control integration
  pointer:
    sourceName: avinci/prod                 #required, org/repo
    branch: master                          #optional, default master
```

This will create a resource of type `syncRepo` with the name `prod-repo`. It uses an scm integration named `avinci-gh` which is an integration of type scm. To learn how to create subcription integrations for source control, read the [SCM section of integrations overview page](../integrations/overview.md#scm). The repo name is `prod` and belongs to `avinci` org. The branch to look for resource and job definitions is `master`

Your sync repository can be in any supported source control platforms.

#### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs.

```
type: string
```
This defines the type of resource. In this case this will always be *syncRepo*. This cannot be 
changed once set. 

```
integration: string
```
This defines the integration that we need to connect to the repo. This integration should point to the source control system where the repository containing your pipeline definitions is located. To learn how to create subcription integrations for source control, read the [SCM section of integrations overview page](../integrations/overview.md#scm)

We support the following source control platforms:
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
`name` is the fully qualified name of the repo i.e. **org/repo** containing the jobs and resources ymls.

`branch` should be set to the branch where the files are located. It defaults to `master` if not specified.

<br>
<a name="gitRepo"></a>
### gitRepo
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

#### YML properties
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
### image
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

#### YML properties
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
### dockerOptions
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

#### YML properties
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
### params
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

#### YML properties
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
### replicas
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

#### YML properties
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
### version
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

#### YML properties
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
### cluster
This resource type is used to specify a cluster in any Container Service to which you can deploy your apps/services/microservices. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: env-test                            #required
  type: cluster                             #required
  integration: avinci-aws
  pointer:
    sourceName : "test-aws"                 #required
    region: "us-east-1"                     #required for some container services
```
This will create a resource of type `cluster` with the name `env-test`. It uses an integration `avinci-aws` which contains credentials to connect to the Container Service. The cluster name is `test-aws` and on the aws region  to `us-east-1`. 

#### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory since this is used as a reference in your shippable.jobs.yml and also to represent this resource in the SPOG view.

```
type: string
```
This defines the type of resource. For a resource of type cluster, this is always set to **cluster**. 

```
integration: string
```
This value should be set to the name of the integration that contains your credentials to connect to the Container Service of your choice. To learn how to create integrations for a specific Container Service, please select from the list below and read the **Adding the Account Integration** section:

* [AWS Elastic Container Service (ECS)](../integrations/containerServices/ecs/)
* [Google Container Engine (GKE)](../integrations/containerServices/gke/)
* [Joyent Triton](../integrations/containerServices/triton/)
* [Microsoft Azure Container Service](../integrations/containerServices/azure/)
* [Docker Cloud](../integrations/containerServices/dcl/)

```
pointer:
  sourceName: string 
  region: string
```
`sourceName` is the name of the cluster that this resource represents.

`region` is the region where the cluster resides. The values are dependent on the
integration. This is required for the following types of integrations and will take
in the values that the provider supports

- AWS Elastic Container Service
- Google KContainer Engine 
- Joyent Triton container  
- Azure Container Service  

<br>

<a name="notification"></a>
### notification
This resource type is used to add a notification type so that you can send our notifications for the following events:

* Job starts
* Job is completed successfully
* Job failed 

This resource type is only supported for jobs of type `runSh`. Email and Slack notifications are supported as of now.

You can create a notification resource by adding it to `shippable.resources.yml`

```
- name: mySlack								#required
  type: notification						#required
  integration: trriplejay slack				#required
  pointer:									
    recipients:
      - "#beta"								#required
      - "@trriplejay"						#optional
```
The events for which this notification is sent out are configured in the jobs yml.

#### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used as a reference for this resource in your jobs yml.

```
type: string
```
This defines the type of resource. In this case, this is always *notification*. This cannot 
be changed once set. 

```
integration: string
```
**This is only required for sending Slack notifications**. The value should be set to the name of the integration that contains your credentials to connect to Slack. To learn how to add a Slack integration to your subscription, read the **Adding the Account Integration** section on our [Slack integrations page](../integrations/notifications/slack/)  

```
pointer:	
  method: email								#required for email only
  recipients:
    - john@shippable.com					#required
    - abc@foo.com							#optional
```
`method` is required for **email only** and should always be set to `email`. 

`recipients` is an array specifying who should receive notifications. For email notifications, include email addresses where you want to send notifications. For Slack notifications, include channel names or slack usernames where notifications should be sent. Slack channels/users should be entered in double quotes, with a leading # for channels and @ for users. For example



Any time any of these options changes, a new version is created

