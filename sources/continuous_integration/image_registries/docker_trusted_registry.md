page_title: Docker Trusted Registry integration
page_description: Setting up Shippable account integrations for Docker Trusted Registry
page_keywords: docker hub, amazon, ecs, gcr, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Trusted registry, private

# Docker Trusted Registry
##Adding the Integration

You will need to configure this integration in order to pull or push images from a Docker Trusted Registry. To set up this integration, you will need the URL of your Docker Trusted Registry.

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
2. Click on the `Add Integration` button.
3. For 'Integration type', choose `Docker Trusted Registry` from the list of dropdown choices.
4. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `Docker-Trusted-Registry`.
5. Enter the URL of your trusted registry and your credentials.
6. Click on `Save`.

<img src="/continuous_integration/images/docker_tr_integration.png" alt="Docker Trusted Registry integration" style="width:700px;"/>

The integration will now be available to all your continuous integration and deployment workflows.

---

##Deleting the Integration

To remove the Docker Trusted Registry integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Docker Trusted Registry integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `Docker`. Alternatively, you can use the `Integration Name` field to provide the name of your Docker Trusted Registry integration.
3. Your Docker Trusted Registry integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Docker Trusted Registry integration.
7. Once all dependencies of the Docker Trusted Registry integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Docker Trusted Registry Integration.

------------
