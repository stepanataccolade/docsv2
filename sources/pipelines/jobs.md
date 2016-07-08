page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

<br>
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
a verybpowerful concept that can be used to model any pipeline from simple to 
complex ones. 

<br>
# Adding Jobs
Jobs are stored in a jobs file `shippable.jobs.yml` present in a git 
repository. Any repo can contain this file but only one of it can be used. If 
more than 1 job file is present, the first one is used. This is done in order
to reduce conflict due to the same job being defined in multiple places.

To learn how to add this file and connect it to pipelines, 
[click here](../../tutorials/how_to_add_syncRepos)

<br>
# Deleting Jobs
Deleting a job is a 2 step process. Pipelines are all about dependencies and
deployable units are flowing through these pipelines. Hard deleting jobs from 
pipelines is a non reversible operation and you will lose all the version history 
etc. As a result of this, we only soft delete jobs when they are removed from
the YML file. If it was done mistakenly, you just add it back and the system will
un-delete the job. 

To hard delete a job, it will have to be done from the UI. 
(TODO : add instructions)

<br>
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

## Selectively overiding INs
In certain scenarios, you will want to change certain designtime configs when
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
replaced. This is very useful to change environmente variables, runtime container
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

<br>
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

<br>
<a name="manifest"></a>
## manifest
This job is used to define an app/service/microservice. The idea behind creating 
manifests is to create a versioned immutable design time definition of how your
app/service/microservice is made. 

A manifest is an unit of deployment. This means the entire manifest is deployed 
as a whole on to a single node(vm, physical machine etc). Creating multiple 
replicas of this means that you will get more copies of the whole manifest. If 
you need your apps/service/microservice to be separately deployed, you need to 
create different manifests.

## Single container manifest
You can create this job by adding it to `shippable.jobs.yml`
```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
      - IN: box-opts                        #optional
      - IN: box-params                      #optional
```
This will create a job of type `manifest` with the name `box-man`. Since only 1
(image)[resources#image] `box-image` is being used, the other 2 addon resources
(dockerOptions)[resources#dockerOptions] & (params)[resources#params] and this 
manifest when deployed will create a single container app/service/microservice

## Multi container manifest
You can create this job by adding it to `shippable.jobs.yml`

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
has 2 (image)[resources#image] `box-image` and `dv-image`. But the 2 addon resources 
are configured differently. Resource `all-opts` of type (dockerOptions)[resources#dockerOptions] 
applies to both the images. But the resource `box-params` of type (params)[resources#params] 
applies only to `box-image`. This manifest when deployed will create a 2 containers 
as part of this app/service/microservice

<br>
<a name="release"></a>
## release
This job is used to define an app/service/microservice. The idea behind creating 
manifests is to create a versioned immutable design time definition of how your
app/service/microservice is made. 

A manifest is an unit of deployment. This means the entire manifest is deployed 
as a whole on to a single node(vm, physical machine etc). Creating multiple 
replicas of this means that you will get more copies of the whole manifest. If 
you need your apps/service/microservice to be separately deployed, you need to 
create different manifests.

You can create this job by adding it to `shippable.jobs.yml`

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
(version)[resources#version] is required for this job as `IN`. It also requires a resource 
of type (manifest)[resources#manifest] upon which a release is being cut. In addition 
to these, a `TASK` object with a property `bump` is required. `bump` takes in the following 
options `major`, `minor`, `patch`, `alpha`, `beta` & `rc`

<br>