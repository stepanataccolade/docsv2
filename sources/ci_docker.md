page_title: Shippable CI/CD Dashboard
page_description: Explanation of the CI/CD Dashboard
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml

# Docker support
The Shippable platform is natively built on Docker and is one of the largest deployments of Docker in production. As early adopters of Docker, we take great pride in providing an excellent feature set for Docker users to help them easily build, test, and deploy their Dockerized applications.

While the content in this section is available scattered in various docs depending on the scenario, we thought it would help Docker users to have one place they can go to in order to figure out our Docker support.

##Docker commands in yml
You can include Docker commands in your shippable.yml in order to set up your CI workflow.

For example, you can build your CI image in the `pre_ci` section of your yml:

```
build:
    pre_ci:
        docker build -t manishas/myImage:tip
```
or, you can run CI on the default image and build and push your production container after CI is successful:

```
build:
    on_success:
        docker build -t manishas/prodImage:$BRANCH.$BUILD_NUMBER
        docker push manishas/prodImage:$BRANCH.$BUILD_NUMBER

integrations:
    hub:
      - integrationName: manishasDockerHub
        type: docker  
```

##Docker registries integration
Shippable integrates with all popular Docker registries such as:

* Docker Hub
* Amazon EC2 Container Registry (ECR)
* Google Container Registry (GCR)
* Quay.io
* Any private registry
* Docker Trusted Registry

You can push your images to or pull images from any of these registries by configuring your credentials in Shippable and using them to connect with these registries in your config file.

For more on configuring integrations, check out the [Docker registries integration](int_docker_registries.md) docs. For more on how to use the integration in order to push and pull images, check out our [build config docs](ci_configure.md/#Docker) here.

##Docker compose
Using [Docker compose](https://docs.docker.com/v1.5/compose/) lets you spin up a full topology and test your commits against a live application. This is much more powerful than just unit testing with stubs and is a great way for developers to find functional bugs before their commits travel farther in the delivery pipeline.

You can include a docker-compose.yml in your repository and then use it to spin up your application in any section of the yml. You will need to install `docker compose` on your minion as follows:
```
build:
    post_ci:
      - sudo pip install -U docker-compose
      - docker-compose up -d
      - docker ps
```
Please remember to use the `-d` option so that the containers are started in the background and the command exits correctly. Running `docker compose` without the `-d` option will hang your build.
The `docker ps` command will show you the containers running on your minion. You can now include tests that run against this application.


##Docker in Test environments and Production
Shippable provides build related Docker functionality as well as continuous delivery pipelines that you can use to deploy your application to test environments.

Check out our [CD pipelines to learn more](pipelines_overview.md)
