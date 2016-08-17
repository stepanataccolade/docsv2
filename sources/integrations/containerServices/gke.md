page_title: Google Container Engine integrations
page_description: Setting up Shippable account integrations for Google Container Engine
page_keywords: amazon, ecs, gke, kubernetes, engine, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Cloud, Datacenter, private


# Google Container Engine (GKE)

To deploy applications to GKE, you need to configure an account integration with credentials to access your GKE account.

##Adding the Account Integration

1. Go to your [Google Cloud Platform (GCP) Console](https://console.cloud.google.com).
2. Create a new Service account by following the instructions in Google's documentation for [generating a service account credential](https://cloud.google.com/storage/docs/authentication#service_accounts).
3. Generate a private key in JSON format.
4. Copy the JSON key you generated for your Service account.  
5. Sign in to [Shippable](https://app.shippable.com)
6. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
7. Click on the `Add Integration` button.
8. For 'Integration type', choose `Google Container Engine` from the list of dropdown choices.
9. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `GKE-Integration`.
10. Paste your JSON key.
11. Click on `Save`.

<img src="/ci/images/integrations/containerServices/gke/addInt.png" alt="Google Container Engine integration" style="width:700px;"/>

You can now use this integration to set up your Environment and Deployment Pipelines on your GKE clusters. For more information on this, please check out our [Deployment pipelines section](/pipelines/overview/)

---

##Deleting the Integration

To remove the Google Container Engine integration, you'll need to remove this integration from all dependencies configured to use it.

To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Google Container Engine integration from the list of integrations. If you have many entries, use the `Integration Name` field to provide the name of your Google Container Engine integration.
3. Your Google Container Engine integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Google Container Engine integration.
7. Once all dependencies of the Google Container Engine integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Google Container Engine Integration.

--------
