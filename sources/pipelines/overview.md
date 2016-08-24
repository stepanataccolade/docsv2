page_title: Unified Pipelines Overview
page_description: Overview of Shippable Pipelines
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


# Shippable Continuous Deployment Pipelines 

Shippable's continuous deployment pipelines provide an integrated platform, built from the ground up, to defragment and streamline the process of shipping applications. 

Using our platform, software powered organizations can accelerate innovation by shrinking their software release lifecycle. We achieve this by giving you a continuous deployment platform that helps you:

**Improve productivity**

Most deployment pipelines today need to be cobbled together with tools that solve part of the end to end requirement. These pipelines are mostly homegrown and DevOps engineers spend a lot of time writing thousands of lines of imperative code to create them. As a result, companies either automate only part of their deployment workflow or bite the bullet and spend the time required to build these pipelines. Both choices are suboptimal and slow down your release cycles.    
 
Shippable gives you an **end to end declarative platform** that will get your deployment pipeline up and running in less than an hour. No coding required! 

**Always use the best tools for the job**

Our pipelines are heterogeneous, i.e. they natively integrate with all tools and services that you might want to use for your deployment workflows. Want to switch from HipChat to Slack? Configure it in less than 5 minutes. Want to deploy to a different cloud endpoint? Also configured in less than 5 mins! 

**Ship cloud native and traditional applications in a unified pipeline**

Cloud native is the new buzzword, but if you're like most organizations, a bulk of your code is still written in Java and deployed to an IaaS/PaaS. With Shippable, you can use the same pipeline to ship both types of applications.

**View all your deployments in a Single Pane of Glass**

Our pipelines give you an end to end visual representation of your deployment workflow, with the ability to zoom in and out of any part of it. You can view version history, logs, and also upgrade and rollback in no time.

To get started, read our [Getting Started Guide](gettingStarted/).

---

## Why do I need Continuous Deployment?

Today, most organizations find it challenging to innovate fast enough to satisfy consumers. DevOps is a set of principles that tries to solve this problem. One of these principles is automation of your software delivery pipelines, also called Continuous Deployment.

The picture below shows a high level maturity model for Continuous Deployment. As shown below, Continuous Integration is just a starting point for achieving Continuous Delivery/Deployment.

<img src="../images/cdMaturityModel.png" alt="Shippable Continuous Integration and Delivery" style="width:800px;"/>

Most organizations today are at L1 or L2 of this maturity model. 

Organizations that have achieved L3 or L4 have put in significant time and resources in order to get there, mostly through struggling with cobbling together a bunch of fragmented tools and writing thousands of lines of custom scripts to create their continuous deployment pipelines. Once created, these custom, homegrown pipelines are rigid, inflexible and hard to maintain. Regardless of the effort, several successful companies like Facebook, Netflix, Amazon have invested in building these pipelines. 

However, not every organization has the luxury of having entire in-house teams to manage this process. Not just that, this do-it-yourself approach is a distraction and takes valuable cycles away from product engineering  

**Shippable helps you mature from L1 to L4 at your own pace, without needing to build homegrown pipelines.** Our pipelines are configured in a human readable, declarative language, making it very easy to create and update your release workflows. We offer the only integrated platform that address Continuous Integration (CI) and Application Release Automation (ARA) for a complete end to end solution. 

To get started, read our [Getting Started Guide](gettingStarted/).

---

## Sample use case

Let us consider the end to end deployment for one service. The code for your service is in a repository called gitRepo. 

<img src="../images/codeToProdPipelines.png" alt="Shippable Continuous Integration and Delivery" style="width:1200px;"/>

* Every time your code changes, it triggers CI. This job is represented by `ci`.
* Upon a successful CI run, a versioned docker image for your service is built and pushed to a Docker registry. This is represented by the `image` resource.
* The updated image automatically triggers a deployment to your Test environment. This is represented by the `deploy-Test` job. You can set up Shippable to trigger your functional tests each time this environment is updated. 
* Each time the Test environment is updated, your Test team is also notified through a Slack channel.
* Once the automated (and manual if required) tests have passed, you can create a new release and bump up the version number. Ops team is notified about the new release creation through a Slack channel. This is done by the `release` job.
* The new release is deployed to Beta. This is represented by the `deploy-Beta` job.
* You can run stress tests and any other sanity checks in the Beta environment. If needed, you can also insert another `release` job between Beta and Production deploy jobs.
* **Release day**! You trigger a manual deploy to production! This is represented bu the `deploy-Prod` job.



