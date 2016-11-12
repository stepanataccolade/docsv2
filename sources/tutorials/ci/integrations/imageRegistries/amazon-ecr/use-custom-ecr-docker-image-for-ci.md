
#Using a custom Docker image from Amazon ECR for your builds

By default, all CI builds on Shippable run on our default Docker images which are preconfigured depending on programming language.

However, you have the option to override the default image and use your own if needed. In most cases, customers choose to do this if they are using Docker for their applications and have a very specific requirements for the build image.

To override the default CI build image and use your own, do the following:

* Add an Amazon ECR integration to your Account, Subscription, and yml as explained in our [Amazon ECR integration page](../../../../../integrations/imageRegistries/ecr/)

* Add the following to your yml:

```
build:
  pre_ci_boot:
    image_name: aws-account-id.dkr.ecr.us-east-1.amazonaws.com/image-name
    image_tag: tip
    pull: true
    options: "-e HOME=/root"

```
- `image_name` value is the fully qualified name of the image you want to pull
- `image_tag` is the tag for the image you want to pull
- set `pull` to `true` if you want to pull the image and `false` if you pulled or built the Docker image in the `pre_ci` step.
- In the `options` tag, enter any docker options you want to use in the docker run command. You also need to include the HOME environment variable as shown if it is not already set in your 'Dockerfile'.

###Building a Docker image and using it for CI

Please note that if you want to build a Docker image and then use it for your CI, you should follow instructions in our [Build a Docker image](build-docker-image/) tutorial and set `pull` to false in the example snippet above.
