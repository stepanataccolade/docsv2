page_title: Google Container Registry (GCR) integration
page_description: Setting up Shippable account integrations for Google GCR
page_keywords: docker hub, amazon, AWS, ecs, gcr, ecr, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Trusted registry, private, elastic compute cloud

# Google Container Registry (GCR)

##Adding the Account Integration

You will need to configure this integration to pull or push images to Google Container Registry.

On the [Google Developers Console (GDC)](https://console.developers.google.com/):

1. In the top navigation bar, select the project you want to integrate with Shippable.
2. Click on the `Products and Services` menu on the top left and select 'Permissions'.
3. Select 'Service Accounts' tab and click on `Create service account`.
4. Add Service name and ID and then select `Furnish a new private key` and check `JSON`. Click on `Create`. A dialog box appears to save the keys.
5. Your new Public/Private key pair is generated and downloaded to your machine. Please store this carefully since you will not be able to retrieve this from your GDC account.

(For more on JSON keys and Service accounts, read [Google's docs](https://cloud.google.com/container-registry/docs/auth#using_a_json_key_file))


On your [Shippable dashboard](https://shippable.com):

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Click on the `Add Integration` button.
3. For 'Integration type', choose `GCR` from the list of dropdown choices.
2. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `gcr_integration`
11. Enter your JSON key that you saved earlier
12. Click on `Save`

<img src="/ci/images/integrations/imageRegistries/gcr/addInt.png" alt="Google Container Registry integration" style="width:700px;"/>

The integration will now be available to all your continuous integration and deployment workflows.

---

##Pull an image from GCR
You can pull any image you have access to, from GCR and use that to spin up your CI build container.

To pull an image, you'll need to do the following:

1. Add the GCR integration to your subscription.
2. Configure your `shippable.yml` to associate the GCR integration for your project.

###Add the GCR integration to your subscription
To add GCR integration to your subscription, do the following:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the GCR integration for your Subscription, such as `gcr-integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the GCR account integration created.
7. Click the `Save` button.
8. The GCR integration will show up in the list of integrations for your subscription.

###Configure GCR integration in the `shippable.yml`
To enable GCR integration for your project, add the following to the `shippable.yml` file for that project.
```
pre_ci_boot:
    image_name: manishas/myImage
    image_tag: latest
    pull: true
    options: "-e HOME=/root"

integrations:
  hub:
    - integrationName: gcr-integration
      type: gcr
      branches:
        only:
          - master
          - dev
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `image_name:` value is in the format docker-registry-username/docker-registry-image-repo.
- `image_tag:` value is the tag for the image that you want to pull.
- `pull:` set to `true` to pull the image from the specified Image Registry.
- In the `env` section, you can enter any environment variables you want to be set inside your CI container. Read more about [environment variables](/ci/advancedOptions/envVar/).
- In the `options` tag, enter any docker options you want to use in the docker run command. You also need to include the HOME environment variable as shown if it is not already set in your image.
- `integrationName` value is the name of the GCR integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as  [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match). Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `gcr`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

For more information on pulling images, refer our documentation on [pulling an image](/ci/advancedOptions/images/).

---

##Build a Docker image which has a `FROM` that pulls an image from GCR

If you want to build your Docker image as part of your workflow for each CI run and if your 'Dockerfile' has a `FROM` which pulls a private image from GCR, then you will need to do the following steps:

1. Add the GCR integration to your subscription.
2. Configure your `shippable.yml` to associate the GCR integration for your project and add few options to ensure you are building the Docker image as part of CI.

**IMPORTANT**
If you are using a custom image and you specify an GCR integration in your yml, we will try to login to the registry on your behalf from inside your CI build container. This means that for custom images, you would need the gCloud SDK installed inside your custom image if you want this to succeed, else you will get a `gcloud not found` error. Get around this by setting `agent_only: true` for GCR integration in your `shippable.yml`. This will ensure that we will not attempt to login to the registry from inside your CI build container. However, this also means that you will not be able to pull from or push to GCR in the `ci`, `post_ci`, `on_success` and `on_failure` sections.

If you do want to use docker commands to interact with GCR in your `ci`, `post_ci`, `on_success` or `on_failure` sections within your `shippable.yml`, then include the following in your 'Dockerfile' to install the gCloud SDK:
```
echo "================= Adding gclould binaries ============"
CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

###Add the GCR integration to your subscription
To add GCR integration to your subscription, do the following:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the GCR integration for your Subscription, such as `gcr-integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the GCR account integration created.
7. Click the `Save` button.
8. The GCR integration will show up in the list of integrations for your subscription.

###Configure GCR integration in the `shippable.yml`

Add the following to your `shippable.yml` file:

```
build:
  pre_ci:
    - docker build -t myImage:tip .

  pre_ci_boot:
    image_name: myImage
    image_tag: tip
    pull: false
    options: "-e HOME=/root"

integrations:
  hub:
    - integrationName: gcr-integration
      type: gcr
      agent_only: true
      branches:
        only:
          - master
          - dev
```

- `image_name` value is the name of the image that was built in the `pre_ci` step.
- `image_tag` is the tag for the image that was built in the `pre_ci` step.
- set `pull` to `false` if you want to use the image you built during the pre_ci step instead of pulling from a docker registry.
- In the env section, you can enter any environment variables you want to be set inside your CI container.
- In the options tag, enter any docker options you want to use in the docker run command. You also need to include the HOME environment variable as shown if it is not already set in your 'Dockerfile'.
- `integrationName` value is the name of the GCR integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match). Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `gcr`.
- `agent_only:` Set the value to `true` only if you are using a custom Docker image and you want to pull from or push to GCR in the `ci`, `post_ci`, `on_success` or `on_failure` sections.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

For more information on building images as part of the CI, refer our documentation on [building an image](/ci/advancedOptions/images/).

---

##Push an image to GCR

You can push your image to GCR in the `post_ci` or `push` sections of the `shippable.yml`. The main difference is that the `post_ci` section runs inside the build container and the `push` section runs outside the build container in the Shippable Agent.

To push an image to GCR, do the following:

1. Add the GCR integration to your subscription.
2. Configure your `shippable.yml` to associate the GCR integration for your project and add few options to ensure you are pushing the Docker image in `post_ci` section or in the `push` section.

**IMPORTANT**
If you are using a custom image and you specify an GCR integration in your yml, we will try to login to the registry on your behalf from inside your CI build container. This means that for custom images, you would need the gCloud SDK installed inside your custom image if you want this to succeed, else you will get a `gcloud not found` error. Get around this by setting `agent_only: true` for GCR integration in your `shippable.yml`. This will ensure that we will not attempt to login to the registry from inside your CI build container. However, this also means that you will not be able to pull from or push to GCR in the `ci`, `post_ci`, `on_success` and `on_failure` sections.

If you do want to use docker commands to interact with GCR in your `ci`, `post_ci`, `on_success` or `on_failure` sections within your `shippable.yml`, then include the following in your 'Dockerfile' to install the gCloud SDK:
```
echo "================= Adding gclould binaries ============"
CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update && sudo apt-get install google-cloud-sdk
```

###Add the GCR integration to your subscription
To add GCR integration to your subscription, do the following:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the GCR integration for your Subscription, such as `gcr-integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the GCR account integration created.
7. Click the `Save` button.
8. The GCR integration will show up in the list of integrations for your subscription.

###Configure GCR integration in the `shippable.yml`

To push the Docker image to GCR in the `post_ci` section, add the following to your `shippable.yml` file:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME manishas/sample-node:tag
    - docker push manishas/sample-node:tag

integrations:
  hub:
    - integrationName: gcr-integration
      type: gcr
      agent_only: true
      branches:
        only:
          - master
```

Similarly to push the Docker image to GCR in the `push` section, add the following to your `shippable.yml` file:

```
build:
  post_ci:

  push:
    docker push manishas/sample-node:tag

integrations:
  hub:
    - integrationName: gcr-integration
      type: gcr
      branches:
        only:
          - master
```


- `integrationName` value is the name of the GCR integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match). Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `gcr`.
- `agent_only:` Set the value to `true` only if you are using a custom Docker image and you want to pull from or push to GCR in the `ci`, `post_ci`, `on_success` or `on_failure` sections.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

For more information on pushing images as part of the CI, refer our documentation on [pushing an image](/ci/advancedOptions/images/). In addition, read our blog - [Key concepts of using Docker in Shippable Continuous Integration](http://blog.shippable.com/key-concepts-of-shippable-ci-part-2) for more details.

---

##Deleting the Integration

To remove the GCR integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the GCR integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `GCR`. Alternatively, you can use the `Integration Name` field to provide the name of your GCR integration.
3. Your GCR integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the GCR integration.
7. Once all dependencies of the GCR integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the GCR Integration.

---
