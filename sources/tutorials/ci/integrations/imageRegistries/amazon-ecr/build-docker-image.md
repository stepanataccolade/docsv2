#Build a Docker image which pulls a base image from ECR

In some scenarios, you might want to build your Docker image as part of your workflow. Your Dockerfile might have a `FROM` which pulls a private image from ECR

```
FROM: aws-account-id.dkr.ecr.us-east-1.amazonaws.com/my-base-image:base-image-tag

#rest of Dockerfile

```

In this scenario, you will need to do the following steps:

* From the [Amazon ECR integration page](../../../../../integrations/imageRegistries/ecr/), follow steps for:
    - [Adding an account integration](../../../../../integrations/imageRegistries/ecr/#addAccountIntegration)
    - [Enabling the integration for a Subscription](../../../../../integrations/imageRegistries/ecr/#addSubscriptionIntegration)
    - [Using the integration in your yml](../../../../../integrations/imageRegistries/ecr/#useIntegrationYml)

* Add the `docker build` command to any section of your yml to build your Docker image:

```
build:
  pre_ci:
    - docker build -t aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name:image-tag .

```

You can replace your aws account id, region, image-name, and image-tag as required in the snippet above.


###Important note for customers [overriding default image for CI](../../../../../ci/shippableyml.md#pre-ci-boot)

If you are using a custom image for your CI workflow, we will try to login to ECR on your behalf from inside your CI build container. This means that you will need the AWS Command Line Interface (CLI) installed inside your custom image if you want this to succeed, else you will get a `aws: command not found` error.

You can solve this in 2 ways:

* Set `agent_only: true` for ECR integration in your `shippable.yml`:

```
integrations:
  hub:
    - integrationName: ecr-integration
      type: ecr
      agent_only: true

```

If this tag is set to true, we will not attempt to login to the registry from inside your CI build container. However, this also means that you will only be able to pull from or push to ECR in the `pre_ci` and `push` sections of the yml.

* If you want to use docker commands to interact with ECR in your `ci`, `post_ci`, `on_success` or `on_failure` sections within your `shippable.yml`, then include the following in your 'Dockerfile' to install the AWS CLI:

```
sudo pip install awscli

```
