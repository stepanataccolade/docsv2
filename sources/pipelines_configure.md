page_title: Configuring and managing pipelines
page_description: This page describes how users can configure and manage services in their dockerized applications
page_keywords: deploy, multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Configuring and managing your deployments

This section walks you through the workflow for configuring your application pipelines. We think of pipelines as the flow of your application from your build environment->ci->deployable units with different versions->deploy into single or multiple environments.

<img src="../images/pipeline_basic_flow.png" alt="Pipelines flow" style="width:700px;"/>

At a high level, you need to follow the steps below:

**Create your environment** You can choose an existing cluster on a supported deployment endpoint or create a new one using a config file in Terraform format.

**Create your pipelines** Configure your cell manifest, tag patterns that increment available cell manifest versions, and the projects that trigger your pipeline.

**Deploy your Cell** Configure how a cell (aka deployable unit) is deployed to an environment and deploy it.

Detailed explanations for Environments, Pipelines, and Cells are provided below.

##Environments
An environment on Shippable is a group of machines on which your application will be deployed. An environment is created by either provisioning a new cluster or pointing to an existing cluster on supported Container Services, i.e. Amazon's ECS and Google Container Engine (GKE). Your application will be deployed to the cluster associated with your environment.

Please note that you can currently limited to creating one environment per Subscription.

###Creating an environment

<a name="gke_cluster"></a>
####Using an existing GKE cluster

To create an environment on Shippable, you must first create a cluster using your Google Cloud Platform Console. Instructions for this are given in the Google Container Engine documentation for [Creating a Container Cluster](https://cloud.google.com/container-engine/docs/clusters/operations#creating_a_container_cluster)

After you have a cluster on GKE, follow the steps below to create your environment:

* Create an account integration: Follow our [instructions on how to add a GKE account integration](int_container_services.md#gke-integration). This will save your GKE JSON key in your account integrations on Shippable.

* Go to your Subscription page on Shippable where you want to set up your deployment pipelines. You can get to your Subscription by going to the [Shippable home page](https://app.shippable.com), clicking on the `Subscriptions` dropdown and selecting your subscription.

* On your Subscription page, click on the `Pipelines` tab and then click on `Add environment`

* Name your environment. In the `Deployment integration` dropdown, choose the cluster you just created and click on `Confirm`.

* In the `Cluster` section, select your GKE cluster from the dropdown. If you cannot see your cluster, you can click on `Sync` and check the dropdown again.

* Click on `Confirm`.

* Click on `Done`. This will return you to your Pipelines status page.


<img src="../images/pipelines_add_gke_env.png" alt="Adding a GKE cluster to Shippable" style="width:700px; margin:0px auto; display:block"/>

You have created your environment and you're now ready to start creating your pipelines.

#### Using an existing Amazon ECS cluster

To create an environment on Shippable, you must first create a cluster using your AWS Management Console or supplying us with a configuration file in a supported format.

Instructions for creating a cluster on Amazon's ECS can be found in their documentation. Some useful links to get started are:  
[Amazon EC2 Container Service overview](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)  
[Amazon ECS clusters](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_clusters.html)

After you have a cluster, follow the steps below to create your environment:

* Create an account integration: Follow our [instructions on how to add an Amazon ECS account integration](int_container_services.md#ecs-integration). This will save your access ID and secret keys in your account integrations on Shippable.

* Go to your Subscription page on Shippable where you want to set up your deployment pipelines. You can get to your Subscription by going to the [Shippable home page](https://app.shippable.com), clicking on the `Subscriptions` dropdown and selecting your subscription.

* On your Subscription page, click on the `Pipelines` tab and then click on `Add environment`

* Name your environment. In the `Deployment integration` dropdown, choose the cluster you just created and click on `Confirm`.

* In the `Cluster Source` section that shows up, select the `Choose an existing cluster` radio button.

* In the `Cluster` section, select your ECS cluster from the dropdown. If you cannot see your cluster, you can click on `Sync` and check the dropdown again.

* Click on `Confirm`.

* Click on `Done`. This will return you to your Pipelines status page.

#### Using an existing Docker Cloud Cluster

To create an environment on Shippable, you should have already created [node clusters in Docker Cloud](https://cloud.docker.com/node/cluster/list/).

* Create an account integration: Follow our [instructions on how to add an Docker Cloud account integration](int_container_services.md#docker-cloud). This will save your username and API token in your account integrations on Shippable.

* Go to your Subscription page on Shippable where you want to set up your deployment pipelines. You can get to your Subscription by going to the [Shippable home page](https://app.shippable.com), clicking on the `Subscriptions` dropdown and selecting your subscription.

* On your Subscription page, click on the `Pipelines` tab and then click on `Add environment`

* Name your environment. In the `Deployment integration` dropdown, choose the integration that you just created and click on `Confirm`.

* In the `Cluster` section, select the desired cluster from the dropdown. If you cannot see your cluster, you can click on `Sync` and check the dropdown again.

* Click on `Confirm`.

* Click on `Done`. This will return you to your Pipelines status page.

#### Using an existing Docker Datacenter

To create an environment on Shippable, you should have installed the Universal Control Plane of Docker Datacenter and have valid credentials to provide during this process.

* Create an account integration: Follow our [instructions on how to add an Docker Datacenter account integration](int_container_services.md#docker-datacenter). This will save your username, password and UCP URL in your account integrations on Shippable.

* Go to your Subscription page on Shippable where you want to set up your deployment pipelines. You can get to your Subscription by going to the [Shippable home page](https://app.shippable.com), clicking on the `Subscriptions` dropdown and selecting your subscription.

* On your Subscription page, click on the `Pipelines` tab and then click on `Add environment`

* Name your environment. In the `Deployment integration` dropdown, choose the integration that you just created and click on `Confirm`.

* In the `Cluster` section, select the default cluster from the dropdown. If you cannot see your cluster, you can click on `Sync` and check the dropdown again.

* Click on `Confirm`.

* Click on `Done`. This will return you to your Pipelines status page.

You have created your environment and you're now ready to start creating your pipelines.

#### Using a config file in Terraform format
Coming soon....

###Updating an environment
TODO

###Deleting an environment
You can delete an environment by going to the environment `Settings` page and clicking on `Delete. Please note that you will first need to delete all pipelines before you delete the environment.

## Pipelines
A pipeline defines the flow of a 'Unit of Deployment', which we call 'Cell', from source control or image registry to your Environment. A Cell is deployed at one time and on the same node. It is specific to each application and can be a micro-service, a service, an application tier, or even the entire application.

TODO - Define the following - cell manifest, auto-increment, pipeline triggers


###Creating a pipeline

You can create your pipeline by following the steps below:

* From the `Pipelines` tab on your Subscription page, click on `Add pipeline`

* Name your pipeline.

* The `Cell manifest` section includes all components that change the version of your cell manifest. This includes images and a list of environment variables. Click on `Add image`.   

* On the `Add image` page:
    * Click on the dropdown for `Image` and select the image you want to deploy. You can also click on `Create image` to add any image from a Docker registry. If you choose `Create image`, you will need to enter the image name and an account integration for the Docker registry you want to pull this image from.
    * Select the image tag you want to deploy. You can `Sync` tags if you don't see the one you want in the dropdown.
    * Select the Docker registry integration that will be used to pull this image.
    * Next, add any ports you need for the image.
    * Specify the memory you need to run this image in MB. Default is 400 MB.  
    * Add Volume mounts for your container, if required.
    * Click on `Save image` This will take you back to the `New pipeline` page.

* In the `Environment configuration name list`, enter a list of environment variables you will need for this Cell. You should not enter actual values for the variables, but only the variable names at this point. eg: API_URL, LOG_LEVEL

* In the `Auto increment` section, check the `Auto increment` checkbox if you want your Pipeline version to be automatically incremented each time a new image tag is detected for the images in your pipeline. If you check this box, you also need to enter a tag pattern that will increment the version, e.g. master.* if you're using $BRANCH.$BUILD_NUMBER as recommended to tag your images.

 * In the `Pipeline triggers` section, select the project(s) that trigger an update for the images in your pipeline. These projects should be enabled for CI on Shippable. Each time these projects are built, we will check to see if there is a new tag available for your images.

* Click on `Save`. You have created your first pipeline!

As an example, here are a couple of screenshots for setting up the [api service of our demo project](https://github.com/aye0aye/micro-api).

**Adding an image:**
<img src="../images/pipelines_add_image.png" alt="Adding a GKE cluster to Shippable" style="width:700px; margin:0px auto; display:block"/>


**Add pipeline page:**
<img src="../images/pipelines_add.png" alt="Adding a GKE cluster to Shippable" style="width:700px; margin:0px auto; display:block"/>

###Update a pipeline
TODO

###Delete a pipeline
You can delete a pipeline by going to the Pipeline `Settings` page and clicking on `Delete`. Please note that you will need to `Stop` the corresponding Cell in all environments before being allowed to delete a pipeline.


## Cells


###Deploy a Cell
If you have created an environment and a pipeline as described in the sections above, your Pipelines tab on the Subscription page should look like this:

<img src="../images/pipelines_status.png" alt="Adding a GKE cluster to Shippable" style="width:700px; margin:0px auto; display:block"/>

The first column shows your pipeline trigger(s), the second one shows the latest version of your Cell Manifest, and the third shows the status of your service in an environment (ayeayeDemo in the picture above).

To deploy:

* Click on the pipeline name in the environment column. This will redirect you to a page that shows the status of the pipeline in that environment.
* Click on the `Settings` tab. This lets you configure the instance of your service, like specifying values for environment variables, adding routing, etc.
*  In the `Settings` section, check the `Auto Deploy` checkbox if you want your service to be deployed automatically every time a new Cell Manifest version is detected. If you do not choose to auto deploy, you will need to deploy new Cell Manifest versions manually.
* `Notifications section`: If you want to be notified each time a new version of the Cell Manifest is deployed, select an account integration for a notification provider from the dropdown. You can also add a new integration directly from here.
* Enter values for the environment variables in the `Environment Configs` section.
* In the `Replicas` section, you can choose the number of instances of the Cell you want to deploy to the environment.
* If you added Volumes while setting up your pipeline, you should specify the mounts in the `Volumes` section.
 * The `Load Balancer` section lets you add a load balancer for your Cell. You can either select an existing load balancer in the dropdown or create a new one. If you create a new one, you will need to check the `Load balanced` checkbox for at least one of the ports in your pipeline.  
 * Click on `Deploy`   

That's it! You have deployed your first service! Go back to the `Pipelines` tab of your Subscription page and you will see your deployment.

<img src="../images/pipelines_deployed.png" alt="Adding a GKE cluster to Shippable" style="width:700px; margin:0px auto; display:block"/>

###Stopping a Cell
You can Stop a Cell at any time by following the steps:

- From the Pipelines Status page, click on the Cell name. You will be taken to the Cell's Status page. The Status page shows the deployed Cell information at the top, followed by a list of past cellManifest versions, History of Events, etc.
- Click on `Stop` for the Cell.

<img src="../images/cell_status.png" alt="Adding a GKE cluster to Shippable" style="width:700px; margin:0px auto; display:block"/>

###Upgrade/rollback to a different version
You can Upgrade or Rollback to a different Cell Manifest version at any time by going to the Cell Status page and clicking on the `Deploy` button for the version you need.

Please note that this only deploys a different version of the images in your cell, and changes the environment keys if needed. Routing and values for environment variables will not be rolled back or upgraded and whatever is currently configured for the cell will be respected.

###Updating a Cell

You can make updates to a Cell and redeploy it at any time. Please note that Cells as a whole are not versioned, so if you're changing Routing or values of environment variables, these changes will be used for the new deployment and you will lose previous data.

- From the Pipelines Status page, click on the Cell name.
- Go to the `Settings` tab and make the changes you need.
- Near the `Deploy` button at the bottom of the page, you will see a list of changes you've made compared to what is actually deployed. Make sure the changes look good.
- Click on `Deploy` if you want to deploy the updated Cell.
