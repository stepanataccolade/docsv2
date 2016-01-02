page_title: Container Services integration
page_description: Setting up account integrations on Shippable for popular container services like Amazon ECS
page_keywords: ecs, amazon, aws, shippable, google, gke, openshift

## Container Services integration

Shippable Deploy lets you easily deploy your Dockerized applications to popular Container Services like Amazon EC2 Container Service (ECS), Google Container Engine (GKE), or Red Hat OpenShift 3.

You will first ned to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable Deploy.

### Amazon ECS

To deploy applications to Amazon ECS, you need to configure an AWS account integration with credentials to access the ECS instance.

1. From your [Shippable dashboard](https://app.shipable.com), Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
2. **Integration type:** In the dropdown, select `AWS`
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: `manishas-aws-ecs`
4. Enter your access and secret keys provided by AWS. [See here](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html) for info on how to generate them. 
5. Click `Save`

You can now use this integration to set up a Shippable Deploy account and manage your ECS clusters.

TODO: GKE and Red Hat Openshift 3.
