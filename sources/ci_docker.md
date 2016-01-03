page_title: Shippable CI/CD Dashboard
page_description: Explanation of the CI/CD Dashboard
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml

# Docker support
The Shippable platform is natively built on Docker and is ony of the largest deployments of Docker in production. As early adopters of Docker, we take great pride in providing an excellent feature set for Docker users to help them easiy build, test, and deploy their Dockerized applications.

While the content in this section is available scattered in various docs depending on the scenario, we thought it would help Docker users to have one place they can go to in order to figure out our Docker support.

##Docker registries integration
Shippable integrates with all popular Docker registries such as:

* Docker Hub
* Amazon ECR
* Google Container Registry (GCR)
* Quay.io
* Any private registry 

You can push your images to or pull images from any of these registries by configuring your credentials in Shippable and using them to connect with these registries in your config file. 

For more on configuring integrations, check out the [Docker registries integration](int_docker_registries.md) docs. For more on how to use the integration in order to push and pull images, check out our [build config docs](ci_configure.md/#Docker) here.

##Docker compose
Since all our build containers run in privileged mode, you can spin up a full topology using Docker compose and test your commits against a live application. This is much more powerful than just unit testing wth stubs and is a great way for developers to find functional bugs before their commits travel farther in the delivery pipeline.

For an example of hor to use Docker compose for functional tests, check out our sample project here. (TODO: Add sample project and linl) 

##Docker in Test environments and Production
While Shippable CI provides build related Docker functionality, you need several additional steps before you can deploy an image to your production environment. You might have one or more Test environments where the latest services are fully tested with a functional test suite and some manual testing, followed by beta or prod where you decide on a release candidate, and finally, a production environment which is the final destination for chosen release candidates.

Shippable Deploy gives you an easy way to set up and manage all these environments. Together with Shippable CI, it creates an E2E pipeline for your commits to flow from source control to production.

Check out [Shippable Deploy](d_overview.md) and get started on a free trial!