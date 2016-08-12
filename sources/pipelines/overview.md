page_title: Unified Pipelines Overview
page_description: Overview of Shippable Pipelines
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

<br>
# Shippable Unified Pipelines Overview
Unified pipelines are a way to achieve Continuous Delivery. These are designed
to deliver your applications faster without having to write any imperative code
for your pipelines. The focus is to get you to reduce your cycle time between
writing code and running code.

Shippable's Unified Pipelines have the following characteristics

- it is a declarative platform
- supports heterogeneous applications, sources and targets
- it works for both cloud native and traditional applications

<br>
# What is it made up of?
At the very core, it is application delivery workflows made up of three fundamental
building blocks.

- [Resources](resources.md) are the building blocks of your pipeline. They can
include managed integrations to external components or services, custom
integrations to internal assets, as well as reusable building blocks, such as
runtime parameters to be used across environments. For example, git
repositories, docker registries, artifact repositories, s3 buckets, deployment
endpoints like Heroku, ECS clusters, etc., are all resources.
- [Jobs](jobs.md) are actions that connect the resources together.  They represent
a set of pre-defined operations or custom actions that can be performed on your
resources. For example, deploying to an ECS cluster, running CI on a commit to a
git repo, building a docker image, etc., are all jobs.
- [Triggers](triggers.md) are special resources used to trigger jobs manually.
Often, your pipelines will be triggered automatically via events received from
connected resources, such as webhooks from GitHub or Bitbucket. Triggers, though,
provide the ability to trigger jobs at any stage of your pipeline via the repo,
such as manually deploying to an ECS cluster.

With these, Shippable gives you a declarative approach to quickly and easily
create a complete continuous delivery story so that you can avoid spending time
building it from scratch. Via this approach, you can manage both your software
delivery and infrastructure provisioning, managing configuration and
deployments into both traditional and cloud native architectures, whether IaaS,
PaaS, or CaaS.

<br>
# Why do I need it?
As seen in the picture below, CI is just a starting point for CD.


<img src="../images/overview.png" alt="Unified Pipelines" style="width:640px;"/>


If you want CD, the next step is to push your tested code as an immutable deploy
artifact. This can be a container image or a JAR file that is stored in a
repository (Docker registry, JFrog etc.).

From here, you can deploy these artifacts to an environment and even chain many
environments to create a dev, test and production workflow.

You can override runtime environment variables as you move from one environment
to another. Versioned application releases can be created at any stage to combine
1 or many deployable artifacts.

<br>
# Sample use case
Consider a simple 2 tier Dockerized application on github

- ui  : `yourOrg/www`
- api : `yourOrg/api`

Your deployment flows through 3 environments, 2 running on GKE and 1 on AWS

<img src="../images/pipelineRequirement.png" alt="Single Pane of Glass" style="width:640px;"/>

 - test (GKE): every version is deployed to this environment
 - beta (ECS): pre-production environment where only release versions are deployed
 - prod (ECS): is where all customers are interacting with your environment

Your workflow is this

- `www` and `api` are CI enabled and are auto run if code change is committed
- upon successful CI run, versioned docker images are built and pushed to docker hub
- **test** environment is updated every time a new version is available on
docker hub
- on every deployment to **test** environment, an automated functional tests
run is performed and if it passes and test team is notified through a slack channel
- a successful automation run triggers new release creation and ops team is
notified through a slack channel
- ops will manually update the **beta** environment and this deployment triggers
a automation tests on **beta**
- on successful testing, the release is updated to release candidate `rc` and
ops is notified through the slack channel
- Additional tests, both manual and automated, can be performed on **beta** and
each successful test pas will create a new `rc`. This process continues several
times until one day, everything planned for your next `prod` update has been
tested and approved in **beta**. The current `rc` version is *pegged* to prod
- Release day! You simply push the *peged*  version to your **prod** environment

Here is a [how to tutorial]() to achieve this workflow using Shippable Unified
Pipelines. When finished your pipeline will look like this
<img src="../images/spog.png" alt="Single Pane of Glass" style="width:640px;"/>
<br>
