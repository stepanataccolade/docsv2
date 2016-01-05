page_title: Docker registries integrations
page_description: Setting up Shippable account integrations for Docker registries
page_keywords: docker hub, amazon, ecs, gcr, google, shippable, quay, coreos, docker, registry

# Docker registries integrations

You will need a Docker integration if you want to do the following -

- Pull an image from a private repository in any Docker registry
- Push an image to a Docker registry

The process for setting up an account integration for all supported registries is detailed below.

## Docker Hub

You will need to configure this integration to pull or push images to Docker Hub as part of building your project.


1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on `Add Integration`
2. For **Integration type**, choose `Docker`.
2. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: ``manishas-docker`
3. Enter your credentials
4. Click on `Save`

<img src="../images/docker_integration.png" alt="docker integration" style="width:800px;"/>

The integration will now be available to all your CI and Deploy workflows.

--------

## Amazon EC2 Container Registry (ECR)

You will need to configure this integration to pull or push images to Amazon ECR.

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
9. **Integration type:** In the dropdown, select `Amazon ECR`
2. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: `manishas-ecr`
11. Enter your aws_access_key_id and aws_secret_access_key. You can follow instructions in [Amazon's guide for Creating and Managing access keys](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)  
12. Click on `Save`

The integration will now be available to all your CI and Deploy workflows.


--------

## Google Container Registry (GCR)

You will need to configure this integration to pull or push images to Google Container Registry.

On the [Google Developers Console](https://console.developers.google.com/):

1. In the top navigation bar, select the project you want to integrate with Shippable
2. Click on the `Products and Services` menu on the top left and select 'Permissions'.
3. Select `Service Accounts` tab and click on 'Create service account'
4. Add Service name and ID and then select `Furnish a new private key` and check `JSON`. Click on `Create`. A dialog box appears to save the keys.
5. Your new Public/Private key pair is generated and downloaded to your machine. Please store this carefully since you will not be able to retrieve this from your GDC account.

(For more on JSON keys and Service accounts, read [Google's docs](https://cloud.google.com/container-registry/docs/auth#using_a_json_key_file))


On your [Shippable dashboard](https://shippable.com):

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
9. **Integration type:** In the dropdown, select `GCR`
2. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: `manishas-gcr`
11. Enter your JSON key that you saved earlier
12. Click on `Save`

<img src="../images/gcr_integration.png" alt="gcr integration" style="width:800px;"/>

The integration will now be available to all your CI and Deploy workflows.

--------

## Quay.io

You will need to configure this integration in order to pull or push images to Quay.io.

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
3. **Integration type:** In the dropdown, select `Quay.io`
4. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. `Example:quay-manishas`
5. Enter your credentials
6. Click on `Save`

<img src="../images/quay_integration.png" alt="Quay integration" style="width:800px;"/>

The integration will now be available to all your CI and Deploy workflows.

--------

## Private Registry

You will need to configure this integration in order to pull or push images from a private Docker registry. To set up this integration, you will need the URL of your private registry.

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
3. **Integration type:** In the dropdown, Choose `Private Docker Registry`
4. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. `Example:manishas-myregistry`
5. Enter the URL of your private registry and your credentials
6. Click on `Save`

The integration will now be available to all your CI and Deploy workflows.

------------
