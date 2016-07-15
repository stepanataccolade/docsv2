page_title: Image registries integrations
page_description: Setting up Shippable account integrations for Docker Hub Image registries
page_keywords: docker hub, amazon, ecs, gcr, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Trusted registry, private

# Image registries integrations

You will need an Image Registry integration if you want to do the following -

- Pull an image from a private repository in any Image registry
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

##Adding the Integration

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

##Deleting the Integration

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
