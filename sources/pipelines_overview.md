page_title: Shippable Pipelines Overview
page_description: Overview of Shippable Pipelines
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Deployment pipelines
 
##Overview

In addition to Continuous Integration, Shippable gives you an easy way to provision, configure, and deploy Dockerized applications to  popular container services like Amazon's EC2 Container Service (ECS) and Google Container Engine (GKE). Support for Microsoft Azure and Red Hat Openshift 3 is in the pipeline and planned for a April 2016 release.

Together with Continuous Integration, this gives you an end to end workflow from source control to production.


<img src="../images/shippable_pipelines.png" alt="Subscription Dashboard" style="width:700px;"/>


Note: Support for Microsoft Azure/Red Hat Openshift deployments and GitLab for source control coming up soon. Please send an email to [support@shippable.com](mailto:support@shippable.com) to get more details.
 
As seen in the picture above, Continuous Integration gives you the ability to run unit tests, basic integration tests, and if required, push your tested container image to any Docker registry. Using our Deployment pipelines, you can then define your Deployable unit and deploy it to your test or production environments running on any Container Service. 

You should use Shippable Deployment pipelines for the following reasons:

**Unified delivery pipeline** You get a unified software delivery pipeline from source control to production with full visibility of a single commit from source control through CI through several test environments and finally production. No other platform comes close to this level of traceability.

**Easy setup** Setup is quick and simple since all configuration is driven through a declarative yml format. Unlike other infrastructure/IT automation tools, you do not need to write any code or scripts to set up your pipeline. Plus, your yml is versioned so you can go back and forth as you wish!

**Cloud Portability** We support all popular Container Services and you can move your application environments between these in just a few minutes. The result? No lock in! 

More on the advantages of using Shippable for deployment are described in our marketing material at TODO: Add link

## Example use case

Consider a simple 2 tier Dockerized application with 2 services - ui and api. Your source code is in GitHub and the corresponding repositories are yourOrg/www and yourOrg/api. 

You want to run 3 environments - Test, Beta, and Production. 

The **Test** environment contains the latest versions of all services that have passed CI. You want to run additional functional tests against this environment and maybe some manual testing as well. Once those tests pass, you push the tested services to Beta.
 
Your **Beta** environment is a better representation of your production environment. This is where you test for scale and run performance tests, stress tests, etc. There is also additional automated and manual testing designed to catch those really pesky bugs. At some point, you decide that your application should move to Production.

The **Production** environment is your user facing environment and your application is now live to everyone who uses it.

<img src="../images/flow_subscriptions.png" alt="Subscription Dashboard" style="width:800px;"/>

Using Shippable, your workflow from source control to production will look like this -

- yourOrg/www and yourOrg/api repositories are enabled for continuous integration on Shippable.
- Your developer commits code to /www. 
- The CI workflow is triggered on Shippable. On a successful run, we package your code into a Docker image and push it to a Docker registry with the right tag
- Your **Test** environment is set to auto-deploy all services when a new image tag is available. Your UI service is therefore updated to the latest version and deployed.
- The **Test** environment to run automated functional tests whenever a new service version is deployed. These run and are successful.
- Your test team then does performs additional manual tests. These pass as well.
- Your **Beta** environment is not set to auto-deploy. You push the service versions that have passed all these checks in **Test** to your **Beta** environment.   
- Additional tests, both manual and automated, are performed on **Beta**. This environment is updated several times until one day, everything planned for your next Production update has been tested and approved in **Beta**.
- Release day! You simply push the *approved* service versions to your **Production** environment. As simple as that! 

## Subscriptions
Deployment pipelines are available as part of your organizational or personal subscription on Shippable. For every subscription you have, you will see a 'Pipelines' tab on your Subscription page which will let you add and manage your deployment pipelines.
  

### What is a Pipeline?

In simple terms, a pipeline is the lifecycle for a unit of deployment. A unit of deployment is always deployed at one time and on the same node. What constitutes a unit of deployment is unique to your case. It can be a microservice, a service, or even your entire application.

A monolithic application is likely to need just one pipeline while a microservices based application might need tens or hundreds of pipelines. Most real world applications lie somewhere in the middle of this spectrum.

A pipeline is defined by:

- Trigger(s): These are usually the triggers that cause an image in your pipeline to be updated. E.g. your CI projects are usually triggers for your pipeline.
- Image(s): One or more Docker images that are each spun up in Docker containers when they are deployed. 
- Environment configuration: Key value pairs that provide more information about the environment. For example, an API_URL variable can be set to the URL of the API in that environment so that other services can talk to the API. These configurations are very specific to your application and can be unique for each environment.
- Routing information: If your pipeline needs to be accessible to other internal or external components, it will need some routing information. This includes load balancer, ports, etc.
- Deployment endpoints or environments: These are the environments you want to deploy this pipeline to. We currently support one deployment endpoint per pipeline, but we're adding support for a series of deployment endpoints very soon. 

Since a pipeline is the lifecycle unit of deployment, all containers configured for a pipeline are always deployed together and on the same machine.


## Permissions

All members of your GitHub organization have access to your Deployment pipelines. We are in the process of tying permissions to GitHub teams, so that you can define your teams in GitHub and then assign team based permissions to your pipelines and environments. 








