page_title: Deploying to Docker Datacenter
page_description: How to deploy your application to Docker Datacenter
page_keywords: docker datacenter, continuous deployment, CI/CD

## Docker Datacenter
Docker Datacenter CaaS (Containers-as-a-Service) enables enterprises to deploy Containers on-premise and on their virtual private cloud (VPC). We will see Shippable CI/CD workflow, that involves the following components of Docker Datacenter.

- __Docker Trusted Registry__ (DTR) - Pull and push Images to your Docker Datacenter.
- __Universal Control Plane__ (UCP) - Deploy and manage containers on your Docker Datacenter.

### Continuous Integration
Throughout the demo, We will be using a [sample node.js application](https://github.com/shippable/sample_node_ddc) to demonstrate the workflow.

To enable your project to use Shippable CI, it should be having a `shippable.yml` file that has instructions run your tests and push your docker images to a registry. To know more about the CI workflow, please check the [CI overview](ci_overview).

Lets take the `shippable.yml` file of the sample application.
```yaml
language: node_js

version:
  - 0.12

build:
  ci:
    - npm install -g mocha
    - npm install
    - npm run unit-tests
    - npm start &
    - npm run api-tests

  post_ci:
    - docker build -t ship-dtr.in/shippable-ci/sample_node_ddc:$BRANCH.$BUILD_NUMBER .
    - docker push ship-dtr.in/shippable-ci/sample_node_ddc:$BRANCH.$BUILD_NUMBER

integrations:
  hub:
    - integrationName : "Shippable-DTR"
      type : Docker Trusted Registry
```
In this `ci` section, we issue commands to run our tests and once the tests complete, we will be pushing the docker image to a registry. ( Check the [supported registries](gs_supported.md) ).

In our sample application, we will be pushing the docker images to Docker Trusted Registry using the integration named `Shippable-DTR` ( Check [how to create integration for a docker registry in Shippable](int_docker_registries.md))

### Continuous Delivery
After we push our images to Docker Trusted Registry, we will automatically deploy the latest image to Docker Datacenter. Shippable Pipelines allows us to deploy containers to Docker Datacenter both manually and automatically, whenever the project build finishes.

Configuring your deployment process involves two steps.

* __Environment Creation__ - Specify the infrastructure to be used to deploy ( in our case, it is the default swarm cluster of  Universal Control Plane )
* __Pipeline Creation__ - Specify the image, tag pattern and other configurations like port mapping, environment variables etc. for deployment.

#### Environment Creation
You can follow the instructions [here](pipelines_configure#using-an-existing-docker-datacenter) to create a new Environment.
<img src="../images/ddc_environment_creation.png" alt="Environment Creation" style="width:800px;"/>

#### Pipeline Creation
After Creating an Environment, Click on "Add Pipeline" you will be redirected to Pipeline creation page.

* Give a __Pipeline Name__. This name will be used in naming the containers created on Docker Datacenter. Containers will be named by the pattern *PipelineName-PipelineId-ImageNumber-ReplicaNumber*

* Configure __Cell Manifest__. In this section, you can choose to add one or more docker images that are stored in the [supported registries](gs_supported.md). We will add `ship-dtr.in/shippable-ci/sample_node_ddc` that we push in the Continuous Integration phase and specify the key values for Environment variables.
<img src="../images/ddc_cell_manifest.png" alt="Cell Manifest" style="width:700px;"/>
While adding the image, you can configure various options like Port Mapping, Memory Limit etc.
<img src="../images/ddc_image_creation.png" alt="Image Creation" style="width:700px;"/>

* Configure the __Auto Increment__ and __Pipeline Trigger__. For example, if you set the pattern as `master.*`, Newer versions of Cell Manifest will be created whenever newer tags matching that pattern is available (i.e. master.1, master.2,...,master.N) and the projects specified in the Pipeline Trigger will trigger auto deploy whenever, a build finishes.
<img src="../images/ddc_autoinc_project_trigger.png" alt="Project Trigger" style="width:700px;"/>

* Save the Pipeline and now you are ready to deploy your application. You can get an idea of doing various pipeline operations from [here](pipelines_configure/#deploy-a-cell).
<img src="../images/ddc_cell_deploy.png" alt="Cell Deploy" style="width:700px;"/>

* Since, we have mapped the Container Port 80 with Host port 30662, we can access the Web server running in the container via that port. Make sure to expose the port 30662 on your firewall. If everything went right, you should see this already !
<img src="../images/ddc_sample_app.png" alt="Sample Application" style="width:700px;"/>
