page_title: Docker Cloud Container Services integrations
page_description: Setting up Shippable account integrations for Docker Cloud Container Service
page_keywords: amazon, ecs, gke, kubernetes, engine, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Cloud, Datacenter, private

# Docker Cloud
To deploy containers to Docker Cloud, you need to configure an account integration with credentials to access your Docker Cloud account.

##Adding the Account Integration

1. [Generate an API key](https://cloud.docker.com/account/#container-api-key) in your Docker Cloud account to use with Shippable.
2. Copy the generated API key.
3. Sign in to [Shippable](https://app.shippable.com)
4. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
5. Click on the `Add Integration` button.
6. For 'Integration type', choose `Docker Cloud` from the list of dropdown choices.
7. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `Docker-Cloud-Integration`.
8. Enter your username.
9. Paste your API key/token.
10. Provide the Docker Cloud API Endpoint URL.
11. Click on `Save`.

<img src="/continuous_integration/images/docker_cloud_integration.png" alt="Docker Cloud integration" style="width:700px;"/>

The integration will now be available to all your Continuous Integration and Pipelines settings within the Shippable portal.

---

##Deleting the Integration

To remove the Docker Cloud integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Docker Cloud integration from the list of integrations. If you have many entries, use the `Integration Name` field to provide the name of your Docker Cloud integration.
3. Your Docker Cloud integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Docker Cloud integration.
7. Once all dependencies of the Docker Cloud integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Docker Cloud Integration.

--------
