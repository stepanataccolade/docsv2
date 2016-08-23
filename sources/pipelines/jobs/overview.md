page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Jobs
Jobs are the executable units of your pipelines. Eg. deploy, runSh, release etc. 
Jobs operate with resources or jobs as inputs and can output to other resources or act as inputs to other jobs. 

Every run of a job creates a unique build object which stores the console 
output of the run. Each run is therefore a new version of the job. This is a very 
important concept as jobs could be used as an input to other jobs. This is used
in cases where you want to build complex apps/services which are made up of other
smaller apps/services/microservices. 

There are many types of pre-canned jobs that come out of the box. Every job performs one unique function. Together with [resources](../resources/overview/) they become a very powerful concept that can be used to model any pipeline from simple to complex ones. 

These are the job types that are available out of the box:

- [manifest](manifest/): job for creating an app/service/microservice definition
- [deploy](deploy/): job for deploying to Amazon Elastic Compute Service (ECS), Google Container Engine (GKE), Joyent Triton, Azure Container Service (ACS), Docker Cloud and Docker Data Center
- [release](release/): job for release management
- [runSh](runSh/): job for executing a set of shell scripts

---
## Adding Jobs
Jobs are defined in a configuration file `shippable.jobs.yml` present in a source control repository. Any repo can contain this file but only one of it can be used. If more than 1 job file is present in the repository, the first one is used. This is done in order to reduce conflict due to the same job being defined in multiple places.

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
 - IN: "some job"
```
`steps` is an array of instructions made up of `IN`, `OUT` & `TASK` objects.

`IN` is the name of the resource or job that is required to run this job.

`OUT` is the name of the resource which is output from this job.

`TASK` is an operation that is executed as part of this job.

---
## Sending job status notifications

You can send notifications about job status by adding the `on_start`, `on_success`, or `on_failure` tags to any job of any type. 

You will first need to define a [notification resource](resources/notification/) in your `shippable.resources.yml`.

Then, you can use that resource in your `shippable.jobs.yml` to configure when notifications are sent:

```
  - name: jobName
    type: jobType
    on_start:
      - NOTIFY: <notification resource name>
    on_success:
      - NOTIFY: <notification resource name>
    on_failure:
      - NOTIFY: <notification resource name>
```

* `on_start` specifies that notifications are sent when the job starts.
* `on_success` specifies that notifications are sent when the job completes successfully.
* `on_failure` specifies that notifications are sent when the job fails.
