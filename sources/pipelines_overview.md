page_title: Shippable Pipelines Overview
page_description: Overview of Shippable Pipelines
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Continuous Delivery pipelines

##Overview

In addition to Continuous Integration, Shippable gives you an easy way to provision, configure, and deploy Dockerized applications to  popular container services like [Amazon's EC2 Container Service (ECS)](int_container_services/#amazon-ec2-container-service-using-account-keys), [Google Container Engine (GKE)](int_container_services/#google-container-engine-gke), [Docker Cloud](int_container_services/#docker-cloud) and [Docker Datacenter](int_container_services/#docker-datacenter). Support for Microsoft Azure and Red Hat Openshift 3 is in the pipeline and planned for a Q3 release.

With CI and CD Pipelines, you can set up an end to end workflow from your source control to CaaS/PaaS/IaaS providers.

<img src="../images/shippable_pipelines.png" alt="Subscription Dashboard" style="width:700px;"/>

As seen in the picture above, Continuous Integration gives you the ability to run unit tests, basic integration tests, and if required, push your tested container image to any Docker registry. Using our Deployment pipelines, you can then define your unit of deployment (aka Cell) and deploy it to your dev, test or production environments running on any Container Service or PaaS/IaaS providers.

You should use Shippable Deployment pipelines for the following reasons:

**Easy setup** Setup is quick and simple since all configuration is driven through a simple UI. Unlike other infrastructure/IT automation tools, you do not need to write any code or scripts to set up your pipeline.

**Unified delivery pipeline** You get a unified software delivery pipeline from source control to production with full visibility of a single commit from source control through CI through several test environments and finally production. No other platform comes close to this level of traceability.

**Cloud Portability** We support all popular Container Services and you can move your application environments between these in just a few minutes. The result? No lock in!

* * * 

## Example use case

Consider a simple 2 tier Dockerized application with 2 services - ui and api. Your source code is in GitHub and the corresponding repositories are yourOrg/www and yourOrg/api.

You want to run 3 environments - Test, Beta, and Production.

The **Test** environment contains the latest versions of all services that have passed CI. You want to run additional functional tests against this environment and maybe some manual testing as well. Once those tests pass, you push the tested services to Beta.

Your **Beta** environment is a better representation of your production environment. This is where you test for scale and run performance tests, stress tests, etc. There is also additional automated and manual testing designed to catch those really pesky bugs. At some point, you decide that your application should move to Production.

The **Production** environment is your user facing environment and your application is now live to everyone who uses it.

<img src="../images/flow_subscriptions.png" alt="Subscription Dashboard" style="width:700px;"/>

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

Here's a [tutorial to deploy a GitHub hosted sample node.js application to Google Container Engine](gs_deploy_sample/). 

* * * 

## Subscriptions

Deployment pipelines are available as part of your organizational or personal subscription on Shippable. Every Subscription will have 'Pipelines' tab on your Subscription page which will let you add and manage your deployment pipelines.

**You are limited to configuring one environment per subscription today.** For example, if you run 2 Test environments, one Beta, and one Production environment, you will need 4 subscriptions. This limitation of one environment per subscription will be removed in the next few weeks and you will be able to create multiple environments in a single subscription.  

By default, you get one free pipeline per subscription. You can add more pipelines as explained in the [Plans and Pricing section](gs_plans.md). Read the blog [upgrading your Continuous Integration/Continuous Delivery subscription](http://blog.shippable.com/how-to-upgrade-your-ci-cd-subscription) to help you determine when you need to upgrade.

### What is a Pipeline?

In simple terms, a pipeline is the lifecycle for a unit of deployment, aka 'Cell'. A Cell is always deployed at one time and on the same node. What constitutes a cell is unique to your case. It can be a microservice, a service, or even your entire application.

A monolithic application is likely to need just one pipeline while a microservices based application might need tens or hundreds of pipelines. Most real world applications lie somewhere in the middle of this spectrum.

<img src="../images/pipeline_status.png" alt="Subscription Dashboard" style="width:700px;"/>

A pipeline is defined by:

- Trigger(s): These are usually the triggers that cause an image in your pipeline to be updated. E.g. your CI projects are usually triggers for your pipeline.
- Image(s): One or more Docker images that are each spun up in Docker containers when they are deployed.
- Environment configuration: Key value pairs that provide more information about the environment. For example, an API_URL variable can be set to the URL of the API in that environment so that other services can talk to the API. These configurations are very specific to your application and can be unique for each environment.
- Routing information: If your pipeline needs to be accessible to other internal or external components, it will need some routing information. This includes load balancer, ports, etc.
- Deployment endpoints or environments: These are the environments you want to deploy this pipeline to. We currently support one deployment endpoint per pipeline, but we're adding support for a series of deployment endpoints very soon.

Since a pipeline is the lifecycle for a cell, all containers configured for the cell are always deployed together and on the same machine.

* * * 

## Permissions

All members of your GitHub organization have access to your Deployment pipelines. We are in the process of tying permissions to GitHub teams, so that you can define your teams in GitHub and then assign team based permissions to your pipelines and environments.

* * * 

## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-73e872dc-d91b-4aec-a3c4-e2a981663da2">
      <span class="hs-cta-node hs-cta-73e872dc-d91b-4aec-a3c4-e2a981663da2" id="hs-cta-73e872dc-d91b-4aec-a3c4-e2a981663da2">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/73e872dc-d91b-4aec-a3c4-e2a981663da2"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-73e872dc-d91b-4aec-a3c4-e2a981663da2" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/73e872dc-d91b-4aec-a3c4-e2a981663da2.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '73e872dc-d91b-4aec-a3c4-e2a981663da2', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-2e911403-926f-4f34-a4a4-788d11ce6c20">
      <span class="hs-cta-node hs-cta-2e911403-926f-4f34-a4a4-788d11ce6c20" id="hs-cta-2e911403-926f-4f34-a4a4-788d11ce6c20">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/2e911403-926f-4f34-a4a4-788d11ce6c20"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-2e911403-926f-4f34-a4a4-788d11ce6c20" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/2e911403-926f-4f34-a4a4-788d11ce6c20.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '2e911403-926f-4f34-a4a4-788d11ce6c20', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

* * * 
