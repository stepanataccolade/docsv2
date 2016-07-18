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
one thing and one thing only. Together with [resources](resources) they become 
a very powerful concept that can be used to model any pipeline from simple to 
complex ones. 

# Adding Jobs
Jobs are stored in a jobs file `shippable.jobs.yml` present in a git 
repository. Any repo can contain this file but only one of it can be used. If 
more than 1 job file is present, the first one is used. This is done in order
to reduce conflict due to the same job being defined in multiple places.

To learn how to add this file and connect it to pipelines, 
[click here](../../tutorials/how_to_add_syncRepos)

# Deleting Jobs
Deleting a job is a 2 step process. Pipelines are all about dependencies and
deployable units are flowing through these pipelines. Hard deleting jobs from 
pipelines is a non reversible operation and you will lose all the version history 
etc. As a result of this, we only soft delete jobs when they are removed from
the YML file. If it was done mistakenly, you just add it back and the system will
un-delete the job. 

To hard delete a job, it will have to be done from the UI. 
(TODO : add instructions)

# Anatomy of a Job YML 
Jobs are defined through the YML and they all follow a similar format irrespective
of the type of pre-canned job

## A Simple Job
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

## Pinning specific versions
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

## Selectively overriding INs
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

### YML properties
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

# Job Types
These are the job types that come straight out of the box.

- [manifest](#manifest): job for creating an app/service/microservice definition
- [release](#release): job for release management
- [ecsDeploy](#ecsDeploy): job for deploying to Amazon Elastic Compute Service
- [gkeDeploy](#gkeDeploy): job for deploying to Google Kubernetes
- [tripubDeploy](#tripubDeploy): job for deploying to Joyent Triton
- [acsDeploy](#acsDeploy): job for deploying to Azure Container Service
- [dclDeploy](#dclDeploy): job for deploying to Docker Cloud
- [runSh](#runSh): job for executing a set of shell scripts

<a name="manifest"></a>
## Manifest
This job is used to define an app/service/microservice. The idea behind creating 
manifests is to create a versioned immutable design time definition of how your
app/service/microservice is made. 

A manifest is an unit of deployment. This means the entire manifest is deployed 
as a whole on to a single node(vm, physical machine etc). Creating multiple 
replicas of this means that you will get more copies of the whole manifest. If 
you need your apps/service/microservice to be separately deployed, you need to 
create different manifests.

### Single container manifest pattern
If your apps/services are decoupled and versioned, then you might want to independently
deploy and maange them. In those cases, the following manifest will help

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
      - IN: box-opts                        #optional
      - IN: box-params                      #optional
```
This will create a job of type `manifest` with the name `box-man`. Since only 1
(image)[../resources#image] `box-image` is being used, the other 2 addon resources
(dockerOptions)[../resources#dockerOptions] & (params)[../resources#params] and this 
manifest when deployed will create a single container app/service/microservice

### Multi container manifest pattern
There are some cases where your apps/services are not completely decoupled. For
example, your UI component might be tightly couple to your caching component. In
those cases, a single manifest with 2 different images might be required. This 
YML is a sample for that case

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
      - IN: dv-image                        #required
      - IN: all-opts                        #optional
      - IN: box-params                      #optional
        applyTo:
          - box-image
```
This will create a job of type `manifest` with the name `box-man`. This manifest 
has 2 (image)[../resources#image] `box-image` and `dv-image`. But the 2 addon resources 
are configured differently. Resource `all-opts` of type (dockerOptions)[../resources#dockerOptions] 
applies to both the images. But the resource `box-params` of type (params)[../resources#params] 
applies only to `box-image`. This manifest when deployed will create a 2 containers 
as part of this app/service/microservice

### Combining manifests into a manifest pattern
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
      
- name: comb-man                            #required
  type: manifest                            #required
  steps:
      - IN: box-man                         #required
      - IN: dv-man                          #optional
```
In the above example 2 independent manifests are being combined into a 3rd manifest.
With this approach, you get to scale them independently when you deploy. 

<a name="ecsDeploy"></a>
## ecsDeploy
This job is used to deploy a manifest to (AWS ECS cluster)[../resources#ecsCluster]. 

### Single manifest deploy

```
- name: box-test-deploy                     #required
  type: ecsDeploy                           #required
  steps:
    - IN: box-man                           #required
    - IN: test-cluster                      #required
    - IN: test-params                       #optional   
```
This will create a job of type `ecsDeploy` with the name `box-test-deploy`. A 
manifest is required for this job as `IN`. It also requires a resource of type 
(ecsCluster)[../resources#ecsCluster] which is used as a deployment target. In 
addition an optional `IN` of type (params)[../resources#params] is being supplied.
This is a very powerful pattern where the design time configs are being overridden
by test configs. For more details about how overrides work (click here)[../faq]

### Multi manifest deploy

```
- name: box-test-deploy                     #required
  type: ecsDeploy                           #required
  steps:
    - IN: box-man                           #required
    - IN: dv-man                            #optional
    - IN: test-cluster                      #required
    - IN: test-params                       #optional
      applyTo:
      - box-man
```
This will create a job of type `ecsDeploy` with the name `box-test-deploy`. A 
manifest is required for this job as `IN`. Second one is optional. It also requires 
a resource of type (ecsCluster)[../resources#ecsCluster] which is used as a 
deployment target. In addition an optional `IN` of type (params)[../resources#params] 
is being supplied but with the `applyTo` being set, only configs on `box-man` are 
overridden and `dv-man` is left untouched. For more details about how overrides 
work (click here)[../faq]

*Note:You can also use this instead assuming you created a combo manifest*

```
- name: box-test-deploy                     #required
  type: ecsDeploy                           #required
  steps:
    - IN: combo-man                         #required
    - IN: test-cluster                      #required
    - IN: test-params                       #optional
      applyTo:
      - box-man
```
Since we have created a combined manifest `combo-man`, all you need to do is supply 
that. You can still use `applyTo` but you will have to know which manifests were
used to create the combo.

### Triggering 1 deployment from another
Most teams need to create a deployment workflow i.e. go from test to production.
You might also need to not auto deploy to production. 

```
- name: box-prod-deploy                     #required
  type: ecsDeploy                           #required
  steps:
    - IN: box-test-deploy                   #required
      trigger: false                        #optional
    - IN: prod-cluster                      #required
    - IN: prod-params                       #optional
      applyTo:
      - box-man
```
This will create a job of type `ecsDeploy` with the name `box-prod-deploy`. This 
job is using another deploy job as `IN`. This means manifests that are currently 
deployed in `box-test-deploy` is going to be deployed here. But since `trigger` 
has been set to false, auto deploy will be turned off. It also requires 
a resource of type (ecsCluster)[../resources#ecsCluster] which is used as a 
deployment target. In addition an optional `IN` of type (params)[../resources#params] 
is being supplied but with the `applyTo` being set, only configs on `box-man` are 
overridden and `dv-man` is left untouched. For more details about how overrides 
work (click here)[../faq]

<a name="release"></a>
## release
This job is used to create/manage/increment semantic versions. You can create a
release on top of a single or multi manifests, combo manifest or even deploy jobs.
The idea is to create immutable, unique version numbers that be used as deployment 
inputs.

### Single manifest release

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
(version)[../resources#version] is required for this job as `IN`. It also requires 
a resource `box-man` of type (manifest)[resources#manifest] upon which a release 
is being cut. In addition to these, a `TASK` object with a property `bump` is required. 
`bump` takes in the following options `major`, `minor`, `patch`, `alpha`, `beta` 
& `rc`. 

In this example, a snapshot of the current image versions etc. are captured and 
a release is created. The version number is created by incrementing the minor of 
the previous release. If this is the first time a version is being created, then 
the base from `box-ver` (resource)[../resources#version] is taken in as a starting 
point. In the future if you would like to reset the base, you can just update the
version resource in your git resource file and all releases moving forward will
be from the new base.

### Multi manifest release

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
(version)[../resources#version] is required for this job as `IN`. It also requires 
a resource `box-man` of type (manifest)[resources#manifest] upon which a release 
is being cut. Since this is multi manifest release, another manifest `dv-man` is also
added. In addition to these, a `TASK` object with a property `bump` is required. 
`bump` takes in the following options `major`, `minor`, `patch`, `alpha`, `beta` 
& `rc`. 

In this example, a snapshot of the current image versions etc. from both the manifests 
are captured and a release is created. The version number is created by incrementing 
the minor of the previous release. For more information around release version numbers 
check out single manifest release

### Release from a app/service/microservice
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
a deploy job `box-test-deploy` of type (deploy)[#ecsDeploy] upon which a release 
is being cut. This example is assuming a release is being deployed to 
`box-test-deploy`and not a manifest. Hence the current running release is fetched 
from `box-test-deploy` and its bumped with a `beta` tag. So for e.g. if `1.23.450` 
is running on `box-test-deploy` then when this release job runs, we will get `1.23.450-beta.1`

In case you are not sure if `box-test-deploy` is doing release based deployments, 
then add a (version)[../resources#version] to create a base version and increment 
the beta tag. The hierarchy of how prior versions are fetched is as follows

- look to see if a deploy job has release based deployments, if so get the most 
recent version from there
- look to see if the release job has a prior release version, if so get the most 
recent version from the job itself
- if the above 2 options failed, get the base from the `version` resource, increment 
that and create it as the first release


<br>