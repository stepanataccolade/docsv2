page_title: Configuring services with Shippable Flow
page_description: This page describes how users can configure and manage services in their dockerized applications
page_keywords: deploy, multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Configuring your application

This section walks you through the workflow for configuring your application pipelines. We think of pipelines as the flow of your application from source control->ci->image registry->packaging into a deployable unit->deployment.





At a high level, you need to follow the steps below:

**Create your environment** You can choose an existing cluster on a supported deployment endpoint or create a new one using a config file in Terraform format.

**Create your pipelines**  

**Deploy your application** 


##Creating an environment
An environment on Shippable is a group of machines on which your application will be deployed. An environment is created by either provisioning a new cluster or pointing to an existing cluster on supported Container Services, i.e. Amazon's ECS and Google Container Engine (GKE). Your application will be deployed to the cluster associated with your environment.

Please note that you can currently limited to creating one environment per Subscription.  

### Creating an environment using a GKE cluster

To create an environment on Shippable, you must first create a cluster using your Google Cloud Platform Console. Instructions for this are given in the Google Container Engine documentation for [Creating a Container Cluster](https://cloud.google.com/container-engine/docs/clusters/operations#creating_a_container_cluster)

After you have a cluster on GKE, follow the steps below to create your environment:

* Create an account integration: Follow our [instructions on how to add a GKE account integration](int_container_services.md#gke-integration). This will save your GKE JSON key in your account integrations on Shippable. 

* Go to your Subscription page on Shippable where you want to set up your deployment pipelines. You can get to your Subscription by going to the [Shippable home page](https://app.shippable.com), clicking on the `Subscriptions` dropdown and selecting your subscription.

* On your Subscription page, click on the `Pipelines` tab and then click on `Add environment`

* Name your environment. In the `Deployment integration` dropdown, choose the cluster you just created and click on `Confirm`.

* In the `Cluster Source` section that shows up, select the `Choose an existing cluster` radio button. 

* In the `Cluster` section, select your GKE cluster from the dropdown. If you cannot see your cluster, you can click on `Sync` and check the dropdown again. 

* Click on `Confirm`.

* Click on `Done`. This will return you to your Pipelines status page.


<img src="../images/pipelines_add_gke_env.png" alt="Adding a GKE cluster to Shippable" style="width:800px; margin:0px auto; display:block"/>

You have created your environment and you're now ready to start creating your pipelines. 



## Creating a Pipeline
A pipeline defines the flow of a 'Unit of Deployment' from source control or image registry to your Environment. A unit of deployment is deployed at one time and on the same node. It is specific to each application and can be a micro-service, a service, an application tier, or even the entire application.

To create a pipeline, follow the steps below:

* From the `Pipelines` tab on your Subscription page, click on `Add pipeline`
 
* Name your pipeline. 

* The `Versioning` section includes all components that change the latest version of your deloyable unit. This includes images and a list of environment variables. Click on `Add image`.   

* On the `Add image` page:
    * Click on the dropdown for `Image` and select the image you want to deploy. You can also click on `Create image` to add any image from a Docker registry. If you choose `Create image`, you will need to enter the image name and an account integration for the Docker registry you want to pull this image from. 
    * Select the image tag you want to deploy. You can `Sync` tags if you don't see the one you want in the dropdown.
    * Select the Docker registry integration that will be used to pull this image.
    * Next, add any ports you need for the image.
    * Specify the memory you need to run this image in MB. Default is 400 MB.  
    * Add Volume mounts for your container, if required. 
    * Click on `Save image` This will take you back to the `New pipeline` page.
    
* In the `Environment configuration name list`, enter a list of environment variables you will need for this unit of deployment. You should not enter actual values for the variables, but only the variable names at this point. eg: API_URL, LOG_LEVEL

* In the `Auto increment` section, check the `Auto increment` checkbox if you want your Pipeline version to be automatically incremented each time a new image tag is detected for the images in your pipeline. If you check this box, you also need to enter a tag pattern that will increment the version, e.g. master.* if you're using $BRANCH.$BUILD_NUMBER as recommended to tag your images.

 * In the `Pipeline triggers` section, select the project(s) that trigger an update for the images in your pipeline. These projects should be enabled for CI on Shippable. Each time these projects are built, we will check to see if there is a new tag available for your images.

* Click on `Save`. You have created your first pipeline!
 
As an example, here are a couple of screenshots for setting up the [api service of our demo project](https://github.com/aye0aye/micro-api).

**Adding an image:**
<img src="../images/pipelines_add_image.png" alt="Adding a GKE cluster to Shippable" style="width:800px; margin:0px auto; display:block"/>


**Add pipeline page:**
<img src="../images/pipelines_add.png" alt="Adding a GKE cluster to Shippable" style="width:800px; margin:0px auto; display:block"/>



## Deploying to a supported endpoint

If you have created an environment and a pipeline as described in the sections above, your Pipelines tab on the Subscription page should look like this:

<img src="../images/pipelines_status.png" alt="Adding a GKE cluster to Shippable" style="width:800px; margin:0px auto; display:block"/>

The first column shows your pipeline trigger(s), the second one shows the latest version of your unit of deployment, and the third shows the status of your service in an environment (ayeayeDemo in the picture above).
 
To deploy:

* Click on the pipeline name in the environment column. This will redirect you to a page that shows the status of the pipeline in that environment.
* Click on the `Settings` tab. This lets you configure the instance of your service, like specifying values for environment variables, adding routing, etc.
*  In the `Settings` section, check the `Auto Deploy` checkbox if you want your service to be deployed automatically every time a new pipeline version is detected. If you do not choose to auto deploy, you will need to deploy new versions manually.
* `Notifications section`: If you want to be notified each time a new version is deployed, select an account integration for a notification provider from the dropdown. You can also add a new integration directly from here.
* Enter values for the environment variables in the `Environment Configs` section.
* In the `Replicas` section, you can choose the number of instances of the pipeline you want to deploy to the environment.
* If you added Volumes while setting up your pipeline, you should specify the mounts in the `Volumes` section.
 * The `Load Balancer` section lets you add a load balancer for your service. You can either select an existing load balancer in the dropdown or create a new one. If you create a new one, you will need to check the `Load balanced` checkbox for at least one of the ports in your pipeline.  
 * Click on `Deploy`   

That's it! You have deployed your first service! Go back to the `Pipelines` tab of your Subscription page and you will see your deployment.

<img src="../images/pipelines_deployed.png" alt="Adding a GKE cluster to Shippable" style="width:800px; margin:0px auto; display:block"/>


