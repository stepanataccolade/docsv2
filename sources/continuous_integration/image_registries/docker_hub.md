page_title: Image registries integrations
page_description: Setting up Shippable account integrations for Docker Hub Image registries
page_keywords: docker hub, amazon, ecs, gcr, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Trusted registry, private

# Image registries integrations

You will need an Image Registry integration if you want to do the following -

- Pull an image from a private repository in any Image Registry
- Build a Docker image which has a `FROM` that pulls an image from a private repository in any Image Registry
- Push an image to a Image registry

On Shippable, currently you can configure integration with the following Image Registries:

- Docker Hub
- Docker Trusted registry
- Amazon EC2 Container Registry (ECR)
- Google Container Registry (GCR)
- Quay.io
- Any private registry

---

# Docker Hub

##Adding the Account Integration

You will need to configure this integration to pull or push images to Docker Hub as part of building your project.


1. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
2. Click on the `Add Integration` button.
3. For 'Integration type', choose `Docker` from the list of dropdown choices.
4. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `Docker-Integration`.
5. Enter your credentials.
6. Click on `Save`.

<img src="/continuous_integration/images/docker_hub_integration.png" alt="Docker Hub integration" style="width:700px;"/>

The integration will now be available to all your Continuous Integration and Pipelines settings within the Shippable portal.

---

##Pull an image from Docker Hub
You can pull any image you have access to, from Docker Hub and use that to spin up your CI build container.

To pull an image, you'll need to do the following:

1. Add the Docker Hub integration to your subscription (Required only for private repositories on Docker Hub).
2. Configure your `shippable.yml` to associate the Docker Hub integration for your project (Required for both public and private repositories on Docker Hub).

###Add the Docker Hub integration to your subscription
This step is required only for private repositories hosted on Docker Hub. If you are using a public repository on Docker Hub, skip this step and go directly to configuring your `shippable.yml` step.
To add Docker Hub integration to your subscription, do the following:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the Docker Hub integration for your Subscription, such as `docker_hub_integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the Docker Hub account integration created.
7. Click the `Save` button.
8. The Docker Hub integration will show up in the list of integrations for your subscription.

###Configure Docker Hub integration in the `shippable.yml`
To enable Docker Hub integration for your project, add the following to the `shippable.yml` file for that project.
```
pre_ci_boot:
    image_name: manishas/myImage
    image_tag: latest
    pull: true
    options: "-e HOME=/root"

integrations:
  hub:
    - integrationName: docker_hub_integration
      type: docker
      branches:
        only:
          - master
          - dev
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `image_name:` value is in the format docker-registry-username/docker-registry-image-repo.
- `image_tag:` value is the tag for the image that you want to pull.
- `pull:` set to `true` to pull the image from the specified Image Registry.
- In the `env` section, you can enter any environment variables you want to be set inside your CI container. Read more about [environment variables](/continuous_integration/advanced_options/env_var/).
- In the `options` tag, enter any docker options you want to use in the docker run command. You also need to include the HOME environment variable as shown if it is not already set in your image.
- `integrationName` value is the name of the Docker Hub integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as  [described here](ci_troubleshoot/#integration-name-specified-in-yml-does-not-match). Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `docker`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

For more information on pulling images, refer our documentation on [pulling an image](/continuous_integration/advanced_options/images/).

---

##Build a Docker image which has a `FROM` that pulls an image from Docker Hub

If you want to build your Docker image as part of your workflow for each CI run and if your 'Dockerfile' has a `FROM` which pulls a private image from Docker Hub, then you will need to do the following steps:

1. Add the Docker Hub integration to your subscription.
2. Configure your `shippable.yml` to associate the Docker Hub integration for your project and add few options to ensure you are building the Docker image as part of CI.

###Add the Docker Hub integration to your subscription
To add Docker Hub integration to your subscription, do the following:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the Docker Hub integration for your Subscription, such as `docker_hub_integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the Docker Hub account integration created.
7. Click the `Save` button.
8. The Docker Hub integration will show up in the list of integrations for your subscription.

###Configure Docker Hub integration in the `shippable.yml`

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
    - integrationName: docker_hub_integration
      type: docker
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
- `integrationName` value is the name of the Docker Hub integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as  [described here](ci_troubleshoot/#integration-name-specified-in-yml-does-not-match). Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `docker`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

For more information on building images as part of the CI, refer our documentation on [building an image](/continuous_integration/advanced_options/images/).

---

##Push an image to Docker Hub

You can push your image to Docker Hub in the `post_ci` or `push` sections of the `shippable.yml`. The main difference is that the `post_ci` section runs inside the build container and the `push` section runs outside the build container in the Shippable Agent.

To push an image to Docker Hub, do the following:

1. Add the Docker Hub integration to your subscription.
2. Configure your `shippable.yml` to associate the Docker Hub integration for your project and add few options to ensure you are pushing the Docker image in `post_ci` section or in the `push` section.

###Add the Docker Hub integration to your subscription
To add Docker Hub integration to your subscription, do the following:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the Docker Hub integration for your Subscription, such as `docker_hub_integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the Docker Hub account integration created.
7. Click the `Save` button.
8. The Docker Hub integration will show up in the list of integrations for your subscription.

###Configure Docker Hub integration in the `shippable.yml`

To push the Docker image to Docker Hub in the `post_ci` section, add the following to your `shippable.yml` file:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME manishas/sample-node:tag
    - docker push manishas/sample-node:tag

integrations:
  hub:
    - integrationName: docker_hub_integration
      type: docker
      branches:
        only:
          - master
```

Similarly to push the Docker image to Docker Hub in the `push` section, add the following to your `shippable.yml` file:

```
build:
  post_ci:

  push:
    docker push manishas/sample-node:tag

integrations:
  hub:
    - integrationName: docker_hub_integration
      type: docker
      branches:
        only:
          - master
```


- `integrationName` value is the name of the Docker Hub integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as  [described here](ci_troubleshoot/#integration-name-specified-in-yml-does-not-match). Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `docker`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

For more information on pushing images as part of the CI, refer our documentation on [pushing an image](/continuous_integration/advanced_options/images/). In addition, read our blog - [Key concepts of using Docker in Shippable Continuous Integration](http://blog.shippable.com/key-concepts-of-shippable-ci-part-2) for more details.

---

##Deleting the Docker Hub Integration

To remove the Docker Hub integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Docker Hub integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `Docker`. Alternatively, you can use the `Integration Name` field to provide the name of your Docker Hub integration.
3. Your Docker Hub integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Docker Hub integration.
7. Once all dependencies of the Docker Hub integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Docker Hub Integration.

--------
