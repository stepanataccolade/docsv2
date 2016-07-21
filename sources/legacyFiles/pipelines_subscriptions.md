page_title: Pipelines
page_description: How to update Subscription CI Plan and add more containers
page_keywords: ci billing, add containers, subscription settings, CI/CD, shippable CI, documentation, shippable, config, yml

# Pipelines
A pipeline is the lifecycle for a unit of deployment, aka 'cell'. The `Pipelines` tab on your Subscription page is the entry point to view and manage your pipelines.

## Pipelines tab

You can view the status of all your pipelines for a Subscription by clicking on the `Pipelines` tab of your subscription page.

<img src="../images/pipelines_status_pipelines.png" alt="Subscription Dashboard" style="width:700px;"/>

The top of your Pipelines Status page shows you how many pipelines you're using and how many are available in your subscription plan. As you get closer to your plan limit, the text color will change to red so you are aware that it's time to add pipelines to our plan.

You will also see a visual status of all pipelines for your application in the `Pipeline Status` section, which shows the information described in the sections below.


### CI
The **Projects** that trigger your pipeline are shown on the left. If you enable these projects for Continuous Integration, you will see the latest build number. On hovering over this element, you see the following additional information:
- Latest build number
- Date/Time the last build was completed
- The Builder whose commit triggered the build
- the commit message for the build.

Clicking on the project name takes you to the project page.


### Pipeline
The **Pipeline** column shows you the pipeline name and latest cell version available for deployment. On hover, you'll see the following additional information:
- Date/Time this cell version was created
- The images and tags that are part of this cell version. If you're tagging your images with the recommended tags of $BRANCH.$BUILD_NUMBER, your image and tag will look something like manishas/api:master:45

Clicking on the pipeline name will take you to the `Settings` page for the pipeline.


### Environments
The next column shows **environment names** associated with the pipeline and the status of your cell deployed in the respective environment. This includes:
- An indicator that shows the current status of the cell deployed to that environment. This can be `Green` to indicate that the cell is deployed, `Red` to indicate that the cell couldn't be deployed due to errors, `Yellow` to indicate that the cell was stopped, and `Gray` to indicate that the cell was never deployed.   
- The cell version deployed. This gives you an immediate idea of how far behind your deployment is compared to the latest cell version.

You can manage environments associated to pipeline in `Settings` page for the pipeline.

On hover, you see the following additional information:
- The number of replicas of the cell running in the environment
- Date/Time of current deployment
- Number of environment configurations
- Images and tags that are part of this deployment, along with number of ports and mounts for each.

Clicking on the cell name takes you to the `Status` page of the cell deployed to the environment. This is described in more detail in TODO: Add link.

* * * 

## Environments tab

In the Environments tab is the list of environments configured in your subscription.

<img src="../images/pipelines_status_environments.png" alt="Subscription Dashboard" style="width:700px;"/>

You can also click on the Settings button for an environment to go to the Settings for the environment.

Here's a tutorial to [deploy a GitHub hosted sample node.js application to Google Container Engine](gs_deploy_sample/) that walks you through the concepts described above.

* * * 
