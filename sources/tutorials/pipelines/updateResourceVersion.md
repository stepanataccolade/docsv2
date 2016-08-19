page_title: Using integrations with your runSh job
page_description: Continuous deployment tutorials
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, Tokens, account settings

#Updating versions for an output resource
The `runSh` job type is a custom job that lets you run custom scripts as part of your deployment pipeline. 

Resource updates for `OUT` resources are automatically handled by managed jobs, but custom jobs need to update these resources as part of their custom scripts. Updating these `OUT` resources is essential to trigger subsequent portions of your deployment pipeline.

Updating the `versionName` for `OUT` resources will trigger a new version of the resource and any jobs that depend on the resource will be triggered.


###Example: Updating an output image resource 

Let us assume you have a custom job `myCustomJob` that takes two input resources: a gitRepo resource `myRepo` and a Docker registry integration resource `myIntegration`. It builds a Docker image `myImage` as part of the custom script `doSomething.sh` and wants to push the image to a Docker registry. The next job in the pipeline, `nextJob` depends on myImage, so every time myImage changes, the version needs to be updated. Visually, it looks like this:

<img src="../../images/pipelines/runShUpdateResource.png" alt="Updating a custom job's resource" style="width:700px;"/> 
<br>

Let us define the resources in `shippable.resources.yml`:

```
resources:
  #define gitRepo: myRepo
  
  #define docker registry integration: myIntegration
  
  #define image resource
  - name: myImage							#required
    type: image								#required
    integration: myIntegration				#required
    pointer:
      sourceName: "myRepo/myImage"			#required
    seed:
      versionName: 1.1						#required

```


The custom job will be defined in `shippable.jobs.yml` as shown below. myRepo and myIntegration are `IN` values and `myImage` is the `OUT` value:

```
jobs:

  - name: myCustomJob
    type: runSh
    steps:
      - IN: myRepo
      - IN: myIntegration
      - TASK:
        - script: ./IN/mexec-repo/gitRepo/doSomething.sh
      - OUT: myImage
```

In order to increment resource version for `myImage` and ensure that `nextJob` is triggered each time the image is updated, you will need to update the `versionName` of the image resource after building and pushing the image in doSomething.sh:


```
#build image command

#push image command

#update output image
createOutState() {
  echo versionName=$IMAGE_TAG > /build/state/myImage.env
  cat /build/state/myImage.env
}

```

When you update the `versionName`, Shippable creates a new version for this resource and this triggers the rest of your deployment pipeline. 

**This method of updating versions works for all types of resources.**

###Adding custom information to a resource version
If needed, you can add key value pairs to versions of a resource. This helps you store any additional per-version information that is required for your custom scripts.

Let us assume you want to set an additional key `branch` for each version of your resource. You would need to use the following script:

```
#build image command

#push image command

#update output image
createOutState() {
  echo versionName=$IMAGE_TAG > /build/state/myImage.env
  echo branch=master > /build/state/myImage.env
  cat /build/state/myImage.env
}

```
###Extracting version information from a resource

For information on how to extract data from a version of a resource, [read our tutorial](extractVersionInformation.md) on this subject.




