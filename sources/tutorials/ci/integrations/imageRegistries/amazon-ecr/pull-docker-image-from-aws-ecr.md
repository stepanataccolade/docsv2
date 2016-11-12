
#Pull a Docker image from AWS ECR

You can pull any Docker image you have access to from Amazon's Elastic Container Registry (ECR) and use it during your CI workflow.

To do this, follow the steps below:

* Add an Amazon ECR integration to your Account, Subscription, and yml as explained in our [Amazon ECR integration page](../../../../../integrations/imageRegistries/ecr/)
* Add the `docker pull` command to any section of your yml to pull your Docker image from ECR:

```
build:
  pre_ci:
    - docker pull aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name:image-tag .

```
You can replace your aws account id, region, image-name, and image-tag as required in the snippet above.
