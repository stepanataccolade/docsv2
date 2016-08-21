page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# release
This job is used to create/manage/increment semantic versions. You can create a
release on top of a single or multi manifests, combo manifest or even deploy jobs.
The idea is to create immutable, unique version numbers that be used as deployment 
inputs.

## Single manifest release

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
[version](../resources/version/) is required for this job as `IN`. It also requires 
a resource `box-man` of type [manifest](../resources/manifest/) upon which a release 
is being cut. In addition to these, a `TASK` object with a property `bump` is required. 
`bump` takes in the following options `major`, `minor`, `patch`, `alpha`, `beta` 
& `rc`. 

In this example, a snapshot of the current image versions etc. are captured and 
a release is created. The version number is created by incrementing the minor of 
the previous release. If this is the first time a version is being created, then 
the base from `box-ver` [version resource](../resources/version/) is taken in as a starting 
point. In the future if you would like to reset the base, you can just update the
version resource in your git resource file and all releases moving forward will
be from the new base.

## Multi manifest release

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
[version](../resources/version/) is required for this job as `IN`. It also requires 
a resource `box-man` of type (manifest)[../resources/manifest/] upon which a release 
is being cut. Since this is multi manifest release, another manifest `dv-man` is also
added. In addition to these, a `TASK` object with a property `bump` is required. 
`bump` takes in the following options `major`, `minor`, `patch`, `alpha`, `beta` 
& `rc`. 

In this example, a snapshot of the current image versions etc. from both the manifests 
are captured and a release is created. The version number is created by incrementing 
the minor of the previous release. For more information around release version numbers 
check out single manifest release

## Release from a app/service/microservice
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
a deploy job `box-test-deploy` of type [deploy](deploy/) upon which a release 
is being cut. This example is assuming a release is being deployed to 
`box-test-deploy`and not a manifest. Hence the current running release is fetched 
from `box-test-deploy` and its bumped with a `beta` tag. So for e.g. if `1.23.450` 
is running on `box-test-deploy` then when this release job runs, we will get `1.23.450-beta.1`

In case you are not sure if `box-test-deploy` is doing release based deployments, 
then add a [version](../resources/version/) to create a base version and increment 
the beta tag. The hierarchy of how prior versions are fetched is as follows

- look to see if a deploy job has release based deployments, if so get the most 
recent version from there
- look to see if the release job has a prior release version, if so get the most 
recent version from the job itself
- if the above 2 options failed, get the base from the `version` resource, increment 
that and create it as the first release

