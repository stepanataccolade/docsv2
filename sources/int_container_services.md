page_title: Container Services integration
page_description: Setting up account integrations on Shippable for popular container services like Amazon ECS
page_keywords: ecs, amazon, aws, shippable, google, gke, openshift

# Container Services integration

Shippable Deploy lets you easily deploy your Dockerized applications to popular Container Services like Amazon EC2 Container Service (ECS), Google Container Engine (GKE), or Red Hat OpenShift 3.

You will first ned to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable Deploy.

<a name="ecs-integration"></a>
## Amazon EC2 Container Service

To deploy applications to Amazon ECS, you need to configure an AWS account integration with credentials to access the ECS instance.

1. From your [Shippable dashboard](https://app.shipable.com), Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
2. **Integration type:** In the dropdown, select `AWS`
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: `manishas-aws-ecs`
4. Enter your access and secret keys provided by AWS. [See here](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html) for info on how to generate them. 
5. Click `Save`

You can now use this integration to set up your Environment and Deployment Pipelines on your ECS clusters. For more information on this, please check out our [Deployment pipelines section](pipelines_overview.md)

<a name="gke-integration"></a>
## Google Container Engine (GKE)

To deploy applications to GKE, you need to configure an account integration with credentials to access your GKE account.

* Go to your Google Cloud Platform (GCP) Console. Create a new Service account by following the instructions in Google's documentation for [Generating a service account credential](https://cloud.google.com/storage/docs/authentication#service_accounts) and generate a private key in JSON format. 
* Copy the JSON key you generated for your Service account.  
* Sign in to Shippable and go to your [Account Settings](https://app.shippable.com/accountSettings). Click on the `Integrations` tab.
* Click on `Add Integration`. Choose `Google Container Engine`, name your integration, and paste your JSON key. 
* Click `Save`

You can now use this integration to set up your Environment and Deployment Pipelines on your GKE clusters. For more information on this, please check out our [Deployment pipelines section](pipelines_overview.md)
