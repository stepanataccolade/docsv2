page_title: Deploy a sample application using Shippable's continuous delivery pipelines
page_description: Quick start for getting up to speed with pipelines
page_keywords: getting started, formations, quick start, documentation, shippable

#Deploy your first Pipeline

This tutorial walks you through how to configure a demo pipeline using Shippable.

###Fork the demo projects to your account

* <a href="https://github.com/shippableSamples/samplePipelinesDemo" target="_blank">samplePipelinesDemo</a> repository contains code for the demo
* <a href="https://github.com/shippableSamples/samplePipelinesTest" target="_blank">samplePipelinesTest</a> contains the configuration for deploying dv to a Test cluster on ECS
* <a href="https://github.com/shippableSamples/samplePipelinesProd" target="_blank">samplePipelinesProd</a> contains the configuration for deploying dv to a Prod cluster on ECS

###Create necessary  integrations

You will need the following integrations:

* GitHub integration: Follow instructions on the [GitHub integration page](../../integrations/scm/github/) for the sections:
    * **Adding an Account Integration**
    * **Use your integration in your Pipeline configuration**
* Docker Hub integration: Follow instructions at on the [Docker Hub integration page](../../integrations/imageregistries/dockerHub/) for the sections:
    * **Adding an Account Integration**
    * **Adding integration to your subscription**
* An integration for the Container Service where your cluster is located. This example uses Amazon ECS. You can add an Amazon ECS integration by [following instructions here](../../integrations/containerServices/ecs/)

###Create a cluster
Cluster creation is not covered in this sample, since it assumes a cluster is already available. Create a cluster on your container service with at least one machine. There are no other constraints. Note down your cluster name and region.

###Edit configuration ymls

* Open up **samplePipelinesTest/shippable.resources.yml** and make the following edits:
    * dv-img resource
        * replace `integration: dh-manishas` for the dv-img resource with `integration: <your docker hub integration name>`
    * env-test-ecs resource
        * replace 'integration demo-manishas-ecs' for the env-test-ecs resource with `integration: <your ecs integration name>`
        * replace `demo-shippable-ecs-test` with your cluster name
        * replace `us-east-1` with the region where your cluster is located

### Understand the configuration

Before you proceed with setting up this pipeline on Shippable, let's take a moment to understand what it does.

The resources configured in shippable.resources.yml are:

* dv-img is an [image](../../pipelines/resources/image/) resource for the image to be deployed.
* dv-img-opts is a [dockerOptions](../../pipelines/resources/image/) resource which specifies options for the container, like memory, port mappings, etc.
* env-test-ecs is a [cluster](../../pipelines/resources/cluster/) resource specifying where the demo application should be deployed

The jobs configured in shippable.jobs.yml are:

* dv-man is a [manifest](../../pipelines/jobs/manifest/) job that creates a new service manifest each time the image dv-img is updated.
* dv-test-ecs is a [deploy](../../pipelines/jobs/deploy/) job that deploys the manifest dv-man to the Test cluster env-test-ecs

### Seed your pipeline in Shippable

* From the Shippable dashboard, go to the subscription where you forked the demo repositories
* Follow instructions on the Pipelines page to [seed your pipeline](../../pipelines/gettingStarted/#seedPipeline).
* Go to the SPOG pill menu of your Pipelines tab and voila! You should see your pipeline there:

<img src="../../images/pipelines/seedSamplePipeline.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;"/>

###Deploy to Test
Right click on the **dv-man** job in the SPOG view and click on `Run`. This will run the manifest job which creates a new service manifest. The deploy job is set up to run after manifest finishes, so it will be automatically triggered.

<img src="../../images/pipelines/samplePipelineTestDeploy.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;"/>

###Check out your deployed demo on ECS

You can now go to your AWS management console and navigate to the deployed application by following the steps below:

* Go to your ECS cluster by navigating to EC2 Container Service and clicking on the cluster name
* Click on the Service Name starting with dv. This will take you to the Tasks page
* Click on the Task to navigate to the containers page.
* Expand the container to view the IP address of your deployed application
* Click on the IP address will open up a new browser tab and show you the running application.

<img src="../../images/pipelines/demoApplication.png" alt="Shippable Continuous Integration and Delivery" style="width:800px;"/>

###Adding a release
[Coming soon]

###Adding a production deployment
[Coming soon]

###Connecting CI to your pipeline
[Coming soon]
