#Pushing a Docker image to Amazon ECR

You can push your Docker image to Amazon ECR in any section of your yml.  

To do this:

* Add an Amazon ECR integration to your Account, Subscription, and yml as explained in our [Amazon ECR integration page](../../../../../integrations/imageRegistries/ecr/)

2. Add the following to your `shippable.yml` file:

```
build:
  post_ci:
    - docker push aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name:image-tag
```

You can replace your aws account id, region, image-name, and image-tag as required in the snippet above.

###Pushing the CI container with all artifacts intact

If you are pushing your CI container to ECR and you want all build artifacts preserved, you should commit the container before pushing it as shown below:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name:image-tag
    - docker push aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name:image-tag

```

The environment variable `$SHIPPABLE_CONTAINER_NAME` contains the name of your CI container.


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

```
```
build:
  push:
    - docker push aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name:image-tag
```

```

* If you want to use docker commands to interact with ECR in your `ci`, `post_ci`, `on_success` or `on_failure` sections within your `shippable.yml`, then include the following in your 'Dockerfile' to install the AWS CLI:

```
sudo pip install awscli

```
