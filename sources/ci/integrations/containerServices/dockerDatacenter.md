page_title: Docker Datacenter Container Services integrations
page_description: Setting up Shippable account integrations for Docker Datacenter Container Service
page_keywords: amazon, ecs, gke, kubernetes, engine, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Cloud, private

# Docker Datacenter
To deploy containers to Docker Datacenter, you need to configure an account integration with credentials to access your Docker Cloud account.

##Adding the Account Integration
The steps to add a Docker Datacenter integration are:

1. Use your own credentials or decide to create a new user with appropriate user permissions, on Docker Cloud, to deploy from Shippable.
2. To create a new user, login to Universal Control Plane (UCP).
3. Go to `Users & Teams` tab and click `Create User`.
4. Sign in to [Shippable](https://app.shippable.com)
5. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
6. Click on the `Add Integration` button.
7. For 'Integration type', choose `Docker Datacenter` from the list of dropdown choices.
8. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `Docker-Datacenter-Integration`.
9. Enter your username and password.
10. Provide the URL to access the Universal Control Plane.
11. Click on `Save`.

<img src="/ci/images/dockerDatacenterInt.png" alt="Docker Datacenter integration" style="width:700px;"/>

The integration will now be available to all your Continuous Integration and Pipelines settings within the Shippable portal.

---

##Deleting the Integration

To remove the Docker Datacenter integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Docker Datacenter integration from the list of integrations. If you have many entries, use the `Integration Name` field to provide the name of your Docker Datacenter integration.
3. Your Docker Datacenter integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Docker Datacenter integration.
7. Once all dependencies of the Docker Datacenter integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Docker Datacenter Integration.

--------

For more information, check our blog - [Getting started with Docker Datacenter](http://blog.shippable.com/getting-started-with-docker-datacenter).

---
