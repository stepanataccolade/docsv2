page_title: Deploy a sample application using Shippable's continuous delivery pipelines
page_description: Quick start for getting up to speed with pipelines
page_keywords: getting started, formations, quick start, documentation, shippable

# Deploy a sample application

This tutoroal walks you through how you can deploy a sample application to Google Container Engine. You can follow similar steps to deploy to Amazon's ECS.

Our sample application has a UI tier and an API tier which are deployed as separate [Cells](glossary.md/#cell). The UI shows a page with response time from an API ping.

##Prerequisites
 You need the following in order to walk through this tutorial:
 - GitHub account
 - Docker Hub account
 
##Fork our sample 

Fork the following GitHub repositories:

[API repository](https://github.com/aye0aye/micro-api)

[UI repository](https://github.com/aye0aye/micro-www)


##Set up CI

- Sign in to [Shippable](https://app.shippable.com) and follow the following steps.

###Enable your projects
- In the `Subscriptions` dropdown, select the subscription you forked the sample repositories into.
- Enable both repositories by clicking on the `Enable Project` button.
- Find the micro-api and micro-www projects and click on the `Enable` button.
- If you cannot find the repositories  in the list, click on the `Sync` button next to the Search box. This syncs your Shippable subscription with your source control account. Find the projects again and enable them.

### Update config
In order to use deployment pipelines, your projects should push the Docker images you want to deploy to a registry. Our sample code uses Docker Hub, but you can follow the same instructions to push to another registry.

Do the following for micro-api and micro-www:

- Add an account integration for the registry you want to push to by following these instructions - [How to add an account integration](int_docker_registries.md)
- Go to the Project page by navigating to the Subscription from the landing page and then clicking on the project name. Click on `Settings`. 
- In the `Integrations` section, click on dropdown for `Hub` and select the account integration you just created.
- Now, go to the shippable.yml for the project and edit it
- Make changes to the yml by replacing everything in < > :

**micro-www**
```
# language setting
language: node_js

# version numbers, testing against one version of node
node_js:
    - 0.10.33

build:
    pre_ci: 
      - docker build -t <your hub repo>/micro-www:$BRANCH.$BUILD_NUMBER .
    post_ci: 
      - docker push <your hub repo>/micro-www:$BRANCH.$BUILD_NUMBER

integrations:
  hub:
    - integrationName: <This is the account integration name for the registry>
      type: docker
      #setting branches is optional and should be set only if you want to push to registry for only specific branches
      branches: 
        only:
          - master

```

**micro-api**
```
# language setting
language: node_js

# version numbers, testing against one version of node
node_js:
    - 0.10.33

env:
    - XUNIT_FILE=./shippable/testresults/result.xml API_PORT=3001

build:
    pre_ci: 
      - docker build -t <your hub repo>/micro-api:$BRANCH.$BUILD_NUMBER .
    post_ci: 
      - docker push <your hub repo>/micro-api:$BRANCH.$BUILD_NUMBER

integrations:
  hub:
    - integrationName: <This is the account integration name for the registry>
      type: docker
      branches:
        only:
          - master
```


###Run builds
Once you have set everything up for both micro-api and micro-www as explained, run a build for each project and wait until status shows success.

This should create 2 Docker images in your registry:

your_repo/micro-api:master.1
your_repo/micro-www:master.1

If you see these images in your registry, you have successfully completed the first stage of setting up CI for the demo projects.

##Create an environment

Next, you will need an environment (cluster) to which you can deploy the application.

The easiest way to do this is to provision a cluster on Google Container Engine (GKE) by following instructions here - [Create an environment with existing GKE cluster](pipelines_configure.md#gke_cluster)


##Create a pipeline
Now that you have a cluster ready to go, let's create your pipelines. Since the demo application has 2 tiers, you will need 2 pipelines.

##Deploy your cell
