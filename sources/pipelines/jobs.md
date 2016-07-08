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
This job is used to define an app/service/microservice. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: env-test                            #required
  type: dclCluster                          #required
  integration: avinci-dcl                   #required
  source:
    name : "test-dcl"                       #required
```
This will create a resource of type `dclCluster` with the name `env-test`. It is 
using an integration `avinci-dcl` which is the name of the integration defined, 
[learn more here](#integration). The cluster name is `test-dcl`. 

### YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *dclCluster*. This cannot 
be changed once set. 

```
integration: string
```
This defines the integration that we are using to connect to the cluster. 

```
source:
  name: string 
  region: string
```
`name` is the name of the cluster that this resource represents.

<br>