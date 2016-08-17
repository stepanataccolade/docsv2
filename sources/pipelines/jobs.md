page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Jobs
Jobs are the executable units of your pipelines. Eg. deploy, runCI, release etc. 
Jobs operate with resources as inputs and can output to other resources. 

Every run of a job creates and unique build object which stores the console 
output of the run. Each run is therefore a new version of the job. This is a very 
important concept as jobs could be used as an input to other jobs. This is used
in cases where you want to build complex apps/services which are made up of other
smaller apps/services/microservices. 

There are many types of pre-canned jobs that come out of the box. Every job does
one thing and one thing only. Together with [resources](resources.md) they become 
a very powerful concept that can be used to model any pipeline from simple to 
complex ones. 

---
## Adding Jobs
Jobs are stored in a jobs file `shippable.jobs.yml` present in a git 
repository. Any repo can contain this file but only one of it can be used. If 
more than 1 job file is present, the first one is used. This is done in order
to reduce conflict due to the same job being defined in multiple places.

To learn how to add this file and connect it to pipelines, 
[click here](../../tutorials/how_to_add_syncRepos)

---

## Deleting Jobs
Since pipelines are all about dependencies and deployable units are flowing through these pipelines at all times, deleting a job can significantly alter or irreversibly change the pipeline in unexpected ways. To avoid accidental deletion of job(s) in ymls, we have made deletion of job a 2 step process. 

First, you need to soft-delete a job by removing it from your `shippable.jobs.yml` file. This removes it from the pipeline, but does not remove it from the database. You can see a list of soft-deleted jobs at the bottom of the `Jobs` tab. If soft-deleted jobs are added back to the jobs yml, the system will undelete them and you will retain version history for the undeleted jobs. 

To completely remove a job from the system, you need to hard delete it through the UI. To do this:

* Go to your Subscription page and click on the `Pipelines` tab
* Click on the `Jobs` pill
* You will find a list of soft deleted jobs at the bottom of the page. To hard delete, just click the `Delete` button for the job you want to hard delete.

A job must be soft deleted before it can be hard deleted.

---

## Anatomy of a Job YML 
Jobs are defined through the YML and they all follow a similar format irrespective
of the type of pre-canned job

### A Simple Job
```
jobs:
  - name: "Name of the job"
    type: "one of the job types"
    steps:
      - IN: "some resource"
      - IN: "some other resource"
      
```
This a very simple job which needs 2 INPUT resources to perform whatever that 
job is designed to do. 

### Pinning specific versions
Since no particular version was pinned to the resources defined above, by default
Shippable will use the most recent or latest version available in the system. 

You could also pin a specific that you would like Shippable to fetch by using this
YML.
```
jobs:
  - name: "Name of the job"
    type: "one of the job types"
    steps:
      - IN: "some resource"
        versionName: "user friendly version e.g tag or commitSha"
      - IN: "some other resource"
        versionNumber: "shippable's internal version number"
```
You can use either the `versionName` which is a user friendly value or a `versionNumber`
which is Shippable's internal incremental numbering system.

### Selectively overriding INs
In certain scenarios, you will want to change certain design time configs when
you thinking about runtime. This can be achieved by using this YML
```
jobs:
  - name: "Name of the job"
    type: "one of the job types"
    steps:
      - IN: "some resource"
        versionName: "user friendly version e.g tag or commitSha"
      - IN: "some other resource"
        versionNumber: "shippable's internal version number"
        applyTo:
          - "some resource"
```
`applyTo` is a property that takes in an array or `resource names`. If the 
IN resource elements are present in the apply to resource, the values will get 
replaced. This is very useful to change environment variables, runtime container
options etc.

#### YML properties
```
name: string
```
This is the name of the job. Keep it short but explanatory as this
is used as a dependency in other jobs

```
type: string
```
This defines the type of job. This cannot be changed once set. 

```
steps:
 - IN: "some resource"
 - IN: "some other resource"
```
`steps` is an array of instructions made up of `IN`, `OUT` & `TASK` objects.

`IN` is the name of the resource or job that is required to run this job.

`OUT` is the name of the resource which is output from this job.

`TASK` is an operation that is executed as part of this job.

---
## Job Types
These are the job types that come straight out of the box.

- [manifest](#manifest): job for creating an app/service/microservice definition
- [deploy](#deploy): job for deploying to Amazon Elastic Compute Service (ECS), Google Container Engine (GKE), Joyent Triton, Azure Container Service (ACS), Docker Cloud and Docker Data Center
- [release](#release): job for release management
- [runSh](#runSh): job for executing a set of shell scripts

<a name="manifest"></a>
### manifest
This job is used to define an app/service/microservice. The idea behind creating 
manifests is to create a versioned immutable design time definition of how your
app/service/microservice is made. 

A manifest is an unit of deployment. This means the entire manifest is deployed 
as a whole on to a single node(vm, physical machine etc). Creating multiple 
replicas of this means that you will get more copies of the whole manifest. If 
you need your apps/service/microservice to be separately deployed, you need to 
create different manifests.

#### Single container manifest pattern
If your apps/services are decoupled and versioned, then you might want to independently
deploy and maange them. In those cases, the following manifest will help

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
        versionName: "master.35"            #optional
      - IN: box-opts                        #optional
      - IN: box-params                      #optional
```
This will create a job of type `manifest` with the name `box-man`. Since only 1
[image](resources.md#image) `box-image` is being used, the other 2 addon resources
[dockerOptions](resources.md#dockerOptions) & [params](resources.md#params) and this 
manifest when deployed will create a single container app/service/microservice. 
Another key functionality is the ability to pin versions. By default, every 
resource when used in `IN` gets the most recent version in the system. There are
scenarios where you might not want this and get a static one. In those cases you
use the tag `versionName` or `versionNumber`. In the above scenario we are using
versionName for a resource of type image and this means its actually a docker tag. 
We want `box-image` with a tag `master.35`. Shippable internally maintains a 
sequential number for every version of the resource created. You can also refer 
to that number by using `versionNumber` see below for an example.

#### Multi container manifest pattern
There are some cases where your apps/services are not completely decoupled. For
example, your UI component might be tightly couple to your caching component. In
those cases, a single manifest with 2 different images might be required. This 
YML is a sample for that case

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
        versionName: "master.35"            #optional
      - IN: dv-image                        #required
        versionNumber: 10                   #optional
      - IN: all-opts                        #optional
      - IN: box-params                      #optional
        applyTo:
          - box-image
```
This will create a job of type `manifest` with the name `box-man`. This manifest 
has 2 [image](resources.md#image) `box-image` and `dv-image`. But the 2 addon resources 
are configured differently. Resource `all-opts` of type [dockerOptions](resources.md#dockerOptions) 
applies to both the images. But the resource `box-params` of type [params](resources.md#params) 
applies only to `box-image`. This manifest when deployed will create a 2 containers 
as part of this app/service/microservice. We are pinning the version of `box-image`
to the tag `master.35` and `dv-image` to whatever the tag Shippable versionNumber 
`10` points to

#### Combining manifests into a manifest pattern
The above example of multi container manifest will allow you to create a union of
tighly coupled apps/services into a single deployable unit. One limitation of the 
pattern is that you cannot scale them independently. They also get deployed on the 
same node/vm/machine as a single manifest will deploy together onto a single node.

If you still need tight coupling but still want to scale independently, the following
pattern will helo.

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
      - IN: box-opts                        #optional
      - IN: box-params                      #optional
      
- name: dv-man                              #required
  type: manifest                            #required
  steps:
      - IN: dv-image                        #required
      - IN: dv-opts                         #optional
      
- name: combo-man                            #required
  type: manifest                            #required
  steps:
      - IN: box-man                         #required
      - IN: dv-man                          #optional
```
In the above example 2 independent manifests are being combined into a 3rd manifest.
With this approach, you get to scale them independently when you deploy. 

<a name="deploy"></a>
### deploy
This job is used to deploy a manifest to [a cluster on any Container Service](resources.md#cluster). 

#### Single manifest deploy

```
- name: box-test-deploy                     #required
  type: deploy                           #required
  steps:
    - IN: box-man                           #required
    - IN: test-cluster                      #required
    - IN: test-params                       #optional   
```
This will create a job of type `deploy` with the name `box-test-deploy`. A 
manifest is required for this job as `IN`. It also requires a resource of type 
[cluster](resources.md#cluster) which is used as a deployment target. In 
addition, an optional `IN` of type [params](resources.md#params) is being supplied.
This is a very powerful pattern where the design time configs are being overridden
by test configs. For more details about how overrides work (click here)[../faq]

#### Multi manifest deploy

```
- name: box-test-deploy                     #required
  type: deploy                           #required
  steps:
    - IN: box-man                           #required
    - IN: dv-man                            #optional
    - IN: test-cluster                      #required
    - IN: test-params                       #optional
      applyTo:
      - box-man
```
This will create a job of type `deploy` with the name `box-test-deploy`. At least one 
manifest is required for this job as `IN`. Second one is optional. It also requires 
at least one resource of type [cluster](resources.md#cluster) which is used as a 
deployment target. In addition an optional `IN` of type [params](resources.md#params) 
is being supplied but with the `applyTo` being set, only configs on `box-man` are 
overridden and `dv-man` is left untouched. For more details about how overrides 
work [click here](../faq)

If you have a combined manifest, you can use that instead of specifying individual manifests.  You can still use `applyTo` but you will have to know which manifests were
used to create the combined manifest.

```
- name: box-test-deploy                     #required
  type: deploy                           #required
  steps:
    - IN: combo-man                         #required
    - IN: test-cluster                      #required
    - IN: test-params                       #optional
      applyTo:
      - box-man
```

#### Triggering 1 deployment from another
Most teams need to create a deployment workflow i.e. move code from from test to production.
You might also want to turn off automatic deployments to production. 

To daisy chain 2 deployment jobs, use the snippet below as an example: 

```
- name: box-prod-deploy                     #required
  type: deploy                              #required
  steps:
    - IN: box-test-deploy                   #required
      trigger: false                        #optional
    - IN: prod-cluster                      #required
    - IN: prod-params                       #optional
      applyTo:
      - box-man
```
This will create a job of type `deploy` with the name `box-prod-deploy`. This 
job is using another deploy job as `IN`. This means manifests that are currently 
deployed in `box-test-deploy` is going to be deployed here. But since `trigger` 
has been set to false, auto deploy will be turned off. It also requires 
a resource of type [cluster](resources.md#cluster) which is used as a 
deployment target. In addition an optional `IN` of type [params](resources.md#params) 
is being supplied but with the `applyTo` being set, only configs on `box-man` are 
overridden and `dv-man` is left untouched. For more details about how overrides 
work [click here](../faq).

<a name="release"></a>
### release
This job is used to create/manage/increment semantic versions. You can create a
release on top of a single or multi manifests, combo manifest or even deploy jobs.
The idea is to create immutable, unique version numbers that be used as deployment 
inputs.

#### Single manifest release

```
- name: box-rel								#required
  type: release								#required
  steps:
    - IN: box-ver							#required
    - IN: box-man							#required
    - TASK:									#required
      bump: minor							#required
```
This will create a job of type `release` with the name `box-rel`. A resource of type 
[version](resources.md#version) is required for this job as `IN`. It also requires 
a resource `box-man` of type [manifest](resources.md#manifest) upon which a release 
is being cut. In addition to these, a `TASK` object with a property `bump` is required. 
`bump` takes in the following options `major`, `minor`, `patch`, `alpha`, `beta` 
& `rc`. 

In this example, a snapshot of the current image versions etc. are captured and 
a release is created. The version number is created by incrementing the minor of 
the previous release. If this is the first time a version is being created, then 
the base from `box-ver` [version resource](resources.md#version) is taken in as a starting 
point. In the future if you would like to reset the base, you can just update the
version resource in your git resource file and all releases moving forward will
be from the new base.

#### Multi manifest release

```
- name: box-rel								#required
  type: release								#required
  steps:
    - IN: box-ver							#required
    - IN: box-man							#required
    - IN: dv-man							#optional
    - TASK:									#required
      bump: minor							#required
```
This will create a job of type `release` with the name `box-rel`. A resource of type 
[version](../resources.md#version) is required for this job as `IN`. It also requires 
a resource `box-man` of type (manifest)[resources#manifest] upon which a release 
is being cut. Since this is multi manifest release, another manifest `dv-man` is also
added. In addition to these, a `TASK` object with a property `bump` is required. 
`bump` takes in the following options `major`, `minor`, `patch`, `alpha`, `beta` 
& `rc`. 

In this example, a snapshot of the current image versions etc. from both the manifests 
are captured and a release is created. The version number is created by incrementing 
the minor of the previous release. For more information around release version numbers 
check out single manifest release

#### Release from a app/service/microservice
In certain workflows, there might be a need to cut a release from a running 
app/service/microservice. This workflow is typical when all versions are getting 
auto deployed to dev environment and from there you want to create a release that 
eventually flows through test and then production

```
- name: box-beta-rel						#required
  type: release								#required
  steps:
    - IN: box-test-deploy					#required
    - TASK:									#required
      bump: beta							#required
```
This will create a job of type `release` with the name `box-beta-rel`. It requires 
a deploy job `box-test-deploy` of type [deploy](#deploy) upon which a release 
is being cut. This example is assuming a release is being deployed to 
`box-test-deploy`and not a manifest. Hence the current running release is fetched 
from `box-test-deploy` and its bumped with a `beta` tag. So for e.g. if `1.23.450` 
is running on `box-test-deploy` then when this release job runs, we will get `1.23.450-beta.1`

In case you are not sure if `box-test-deploy` is doing release based deployments, 
then add a [version](resources.md#version) to create a base version and increment 
the beta tag. The hierarchy of how prior versions are fetched is as follows

- look to see if a deploy job has release based deployments, if so get the most 
recent version from there
- look to see if the release job has a prior release version, if so get the most 
recent version from the job itself
- if the above 2 options failed, get the base from the `version` resource, increment 
that and create it as the first release


<br>

<a name="runSh"></a>
### runSh
This job type lets you run any custom scripts as part of your deployment pipeline. Depending on what you want to achieve in your script(s), you can specify input and output resources. You can also send notifications for specific events, like job start, success, or failure.

This is the most powerful job type since it is not a *managed* job, i.e. you have to write the scripts yourself giving you unlimited flexibility. You should use this job type if there is no managed job that provides the functionality you need. For example, pushing to Heroku is not yet natively supported through a managed job type, so you can write the scripts needed to do this and add it to your pipeline as a job of type `runSh`. 

####Anatomy of a runSh job

The following sample shows the overall structure of a runSh job:

```
  - name: <name>								#required
    type: runSh									#required
    on_start:									#optional
      - script: echo 'This block executes when the TASK starts'
      - NOTIFY: slackNotification
    steps:										#required
      - IN: <resource>
      - IN: <resource>
      - TASK:
        - script: <command>
        - script: <command>
      - OUT: <resource>
      - OUT: <resource>      
      - IN: <resource>
      - TASK:
        - script: <command>
    on_success:									#optional
      - script: echo 'This block executes after the TASK section executes successfully'
      - NOTIFY: slackNotification
    on_failure:									#optional
      - script: echo 'This block executes if the TASK section fails'
      - NOTIFY: slackNotification
      
```

* `name` should be set to something that describes what the job does and is easy to remember. This will be the display name of the job in your pipeline visualization.
* `type` indicates type of job. In this case it is always `runSh`
* `on_start` can be used to send a notification indicating the job has started running. 
* `steps` section is where the steps of your custom job should be entered. You can have any number of `IN` and `OUT` resources depending on what your job needs. You can also have one or more `TASK` sections where you can enter one or more of your custom scripts. Keep in mind that everything under the `steps` section executes sequentially. Also, environment variables do not persist across `TASK` sections. Read our [advanced runSh documentation](#advancedRunSh) below to find out how to persists environment variables across `TASK` sections.
* `on_success` can be used to run scripts that only execute if the `TASK` section executes successfully. You can also use this to send a notification as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](resources.md#notification).
* `on_failure` can be used to run scripts that only execute if the `TASK` section fails. You can also use this to send a notification as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](resources.md#notification).
 
<a name="advancedRunSh"></a>
####runSh scenarios
<coming soon>
