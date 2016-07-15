page_title: Private Registry integration
page_description: Setting up Shippable account integrations for any private registries
page_keywords: docker hub, amazon, ecs, gcr, ecr, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Trusted registry, private, elastic compute cloud

# Private Registry

##Adding the Integration

You will need to configure this integration in order to pull or push images from a private Image registry. To set up this integration, you will need the URL of your private registry.

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
2. Click on the `Add Integration` button.
3. For 'Integration type', choose `Private Docker Registry` from the list of dropdown choices.
4. For 'Integration Name', use a distinctive name that's easy to associate to the integration and recall. Example: `my_private_registry`.
5. Enter the URL of your private registry and your credentials.
6. Click on `Save`.

The integration will now be available to all your continuous integration and deployment workflows.

<img src="/continuous_integration/images/private_registry_integration.png" alt="Private Registry integration" style="width:700px;"/>


Note: For fetching image tags we use token based authentication using Docker API V2. This is used only in pipelines. So you need to have an auth-server setup for your private registry. For more information read the [official Docker's docs](https://docs.docker.com/registry/spec/auth/token/).

---

##Deleting the Integration

To remove the Private Registry integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Private Registry integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `Docker`. Alternatively, you can use the `Integration Name` field to provide the name of your Private Registry integration.
3. Your Private Registry integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Private Registry integration.
7. Once all dependencies of the Private Registry integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Private Registry Integration.

--------
