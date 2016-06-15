page_title: Deploy a sample application using Shippable's continuous delivery pipelines
page_description: Quick start for getting up to speed with pipelines
page_keywords: getting started, formations, quick start, documentation, shippable

# Deploy a sample application

This tutorial walks you through how you can deploy a sample application to Google Container Engine. You can follow similar steps to deploy to Amazon's ECS.

Our sample application has a UI tier and an API tier which are deployed as separate [Cells](glossary.md/#cell). The UI shows a page with response time from an API ping.

##Prerequisites
 You need the following in order to walk through this tutorial:
 
 - GitHub account
 - Docker Hub account
 
##Fork our sample 

Fork the following GitHub repository:

[Demo Sample repository](https://github.com/shippableSamples/micro-sample)


##Set up CI

- Sign in to [Shippable](https://app.shippable.com) and follow the following steps.

###Enable your projects
- In the `Subscriptions` dropdown, select the subscription you forked the sample repository into.
- Click the `Enable Project` button to go to the Enable Projects page. If this if the first project you are enabling, you will directly land there.
- Find the micro-sample project and click on the `Enable` button.
- If you cannot find micro-sample in the list, click on the `Sync` button next to the Search box. This syncs your Shippable subscription with your source control account. Find micro-sample and enable it.

### Update config
In order to use deployment pipelines, your project's CI workflow must push the resultant Docker image(s) to a registry, from where they will be deployed into your pipeline. Our sample code uses Docker Hub, but you can follow the same instructions to push to another registry.

Do the following for micro-sample:

- Add an account integration for the registry you want to push to by following these instructions - [How to add an account integration](int_docker_registries.md)
- Go to the Project on Shippable by navigating to your Subscription from the landing page and then clicking on the project name. Click on `Settings`. 
- In the `Integrations` section, click on dropdown for `Hub` and select the account integration you just created.
- Now, go to the shippable.yml for the project and edit it.
- Make changes to the yml by replacing everything in < > :

```

# language setting
language: node_js

# version numbers, testing against one version of node
node_js:
    - 0.12

env:
    - XUNIT_FILE=../shippable/testresults/result.xml API_PORT=3001

build:
   pre_ci: 
       - cd micro-api && docker build -t <registry_username>/micro-api .
   pre_ci_boot:
        image_name: <registry_username>/micro-api
        image_tag: latest
        pull: false

   ci:
       - mkdir -p ../shippable/testresults
       - mkdir -p ../shippable/codecoverage       
       - cd micro-api
       - npm install 
       - grunt
   on_success:
       - cd ..
       - cd micro-www && docker build -t <registry_username>/micro-www .
       - docker tag -f <registry_username>/micro-www:latest <registry_username>/micro-www:$BRANCH.$BUILD_NUMBER 
       - docker tag -f <registry_username>/micro-api:latest <registry_username>/micro-api:$BRANCH.$BUILD_NUMBER
       - docker push <registry_username>/micro-api:$BRANCH.$BUILD_NUMBER
       - docker push <registry_username>/micro-www:$BRANCH.$BUILD_NUMBER

integrations:
    hub:
        - integrationName: <your_account_integration_name>
          type: docker


```
This yml ensures that for each build of this sample, micro-www and micro-api images will be built and pushed to your registry with the tag <branch name>.<build number> .

###Run a build
The changes to shippable.yml should trigger a build run for the project. If not, you can trigger a manual build from the Project's page on Shippable. Wait until status shows success.

This should create 2 Docker images in your Docker registry:

- registry_username/micro-api
- registry_username/micro-www

If you see these images in your registry, you have successfully completed the first stage of setting up CI for the demo projects!

##Create an environment

Next, you will need an environment(cluster) to which you can deploy the application.

The easiest way to do this is to provision a cluster on Google Container Engine (GKE) by following instructions here - [Create an environment with existing GKE cluster](pipelines_configure.md#gke_cluster)


##Create a pipeline
Now that you have a cluster ready to go, let's create your pipeline. Since you have one free pipeline, we're going to use that to deploy your application to GKE. If you have 2 pipelines in your plan, you can create 2 pipelines - one for API and one for UI - to run this application.

To create your pipeline, go to your Subscription's `Pipelines` tab and click on `Add Pipeline`. 
On the New Pipeline page, name your pipeline, say 'demo-app'

<img src="../images/pipeline_create_name.png" alt="Name your pipeline" style="width:400px;"/>
    
Next, follow steps below:

###Add Cell manifest

- In the Cell Manifest section, click on `Add image`. You will be taken to the Add image page.
- In the `Select image` dropdown, select `Create image`. Enter the name registry_username/micro-api. Enter the account integration that has access to this image

    <img src="../images/pipeline_create_image.png" alt="Name your pipeline" style="width:400px;"/>
    
You will be taken back to the Add Image page. Select the tag you want to deploy (master.1)

- Enter port number for your container - 3001
- NOTE: GKE restricts host ports to a certain range - 30000 to 32767. Hence if you are using a GKE cluster, then you'll need to select the host port from that range as shown in the picture below

    <img src="../images/pipeline_create_image_gke_port.png" alt="Name your pipeline" style="width:400px;"/>

- Click on `Save image`. This will take you back to the add pipelines page.
- Repeat the above steps for the image micro-www. For micro-www port number, enter 80.
- Remember to use the range for ports for GKE clusters
- Add the following configuration keys for the demo application by clicking `Add Variable` under Environment Variables section: `API_PORT`, `API_URL`, `WWW_PORT`, `LOG_LEVEL`, `SHUD_LOG_TO_FILE` The values for these keys will be entered later when we deploy the cell.

###Auto-increment
The auto-increment feature automatically creates new cell manifest versions when new tags are detected for images in your pipeline. Let us enable this for our demo. Check the box for `Auto-increment`. For both images, enter the tag pattern `master.*`. This means cell manifest version will be auto incremented only when an image is pushed due to a build for `master` branch.

###Pipeline trigger
Here, you can configure when we check for new image tags. Add the micro-sample project from your repository from the `Trigger projects` dropdown.
This means that every time CI for micro-sample is triggered, we will check for new image tags and update the cell manifest version if auto increment is enabled.

And that's it. Save your pipeline.

##Configure and deploy your cell
You will be redirected back to the `Pipelines` tab of your subscription. You should see your new pipeline in the Pipeline Status graphic.

To configure and deploy your Cell, click on your Cell. This is the `demo-app` widget in the last column, under the environment name. You will be taken to the `demo-app` Status page which shows that the Cell is not deployed.

Click on the `Configuration` tab and enter the following information:

- The top section shows the current cell manifest that is being used to create this Cell. You should see Version 1 being used. 
- The auto-deploy section allows you to configure whether you want this cell to be automatically deployed each time a new cell manifest version is detected. For the demo, check this box.
- Enter the values for environment variables as shown below:

    <img src="../images/pipeline_cell_env_config.png" alt="Name your pipeline" style="width:700px;"/>

- Leave number of Replicas to 1. This indicates we want one instance of this Cell running in the environment. We also do not need Volumes for the demo, so skip that section
- In the `Routing` section, click on the Load Balancer dropdown and select `Create Load Balancer`. Check the `Load Balanced` checkbox for Container port 80. This means that we are externally exposing the port for www

That's it! Go back to `Configuration` tab and click on `Deploy`at the bottom of the page. It will take a few minutes to provision a load balancer on GKE, but your Cell should be deployed ina  couple of minutes.

##View the application
Now that you've deployed the application, go back to the `Pipelines` tab of your Subscription. The Pipeline Status graphic should show that the Cell is now deployed (green check).

Also, it should show a link in the cell. Click the link to view the page you just deployed. It will launch in a new browser tab.


##Make a change and watch the magic

Now, go to micro-sample/blob/master/micro-www/public/views/home.html on GitHub. Make a simple edit, for example, change line 18 to "This is the best demo application!!". Commit your change.

Here is what will happen: 

- The CI workflow will be triggered for micro-sample. This will create new Docker images and push them to your registry
- Your Cell Manifest version will be automatically incremented as a result of detecting new image tags
- This triggers an auto deployment for your pipeline and demo-app is deployed with latest cell manifest version
- You will see your Cell in Pipeline Status section show - `Deployed version : 2`
- Click on the Cell link. You should see the text update in your deployed application

*****

## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-cfdb3b2d-32b0-48f2-b861-f2eafaed7806">
      <span class="hs-cta-node hs-cta-cfdb3b2d-32b0-48f2-b861-f2eafaed7806" id="hs-cta-cfdb3b2d-32b0-48f2-b861-f2eafaed7806">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/cfdb3b2d-32b0-48f2-b861-f2eafaed7806"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-cfdb3b2d-32b0-48f2-b861-f2eafaed7806" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/cfdb3b2d-32b0-48f2-b861-f2eafaed7806.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, 'cfdb3b2d-32b0-48f2-b861-f2eafaed7806', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-eba2e46d-e1df-4701-a220-dd373dd4c875">
      <span class="hs-cta-node hs-cta-eba2e46d-e1df-4701-a220-dd373dd4c875" id="hs-cta-eba2e46d-e1df-4701-a220-dd373dd4c875">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/eba2e46d-e1df-4701-a220-dd373dd4c875"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-eba2e46d-e1df-4701-a220-dd373dd4c875" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/eba2e46d-e1df-4701-a220-dd373dd4c875.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, 'eba2e46d-e1df-4701-a220-dd373dd4c875', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

*****