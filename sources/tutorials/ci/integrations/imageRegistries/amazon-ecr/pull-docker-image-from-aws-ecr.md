
#Pull a Docker image from AWS ECR

You can pull any Docker image you have access to from Amazon's Elastic Container Registry (ECR) and use it during your CI workflow.

To do this, follow the steps below:

* From the [Amazon ECR integration page](../../../../../integrations/imageRegistries/ecr/), follow steps for:
    - [Adding an account integration](../../../../../integrations/imageRegistries/ecr/#addAccountIntegration)
    - [Enabling the integration for a Subscription](../../../../../integrations/imageRegistries/ecr/#addSubscriptionIntegration)
    - [Using the integration in your yml](../../../../../integrations/imageRegistries/ecr/#useIntegrationYml)

* Add the `docker pull` command to any section of your yml to pull your Docker image from ECR:

```
build:
  pre_ci:
    - docker pull aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name:image-tag .

```
You can replace your aws account id, region, image-name, and image-tag as required in the snippet above.
