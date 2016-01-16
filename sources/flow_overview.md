page_title: Shippable Deploy Overview
page_description: Overview of Shippable Deploy
page_keywords: Deploy,multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Shippable Flow 
##Overview

Shippable Deploy gives developers an easy way to provision, configure, and deploy your Dockerized applications to  popular container services like Amazon's EC2 Container Service (ECS) and Google Container Engine (GKE). Support for Red Hat Openshift 3 is in the pipeline and planned for a February 2015 release.

Together with Shippable CI, this gives you a unified E2E pipeline from source control to production.

(TODO: Add a picture showing shippable ci + deploy)


As seen in the picture above, Shippable CI gives you the ability to run unit tests, basic integration tests, and if required, push your tested container image to any Docker registry. Using Deploy, you can then deploy this container to your test or production environments running on any Container Service. 

You should use Shippable Deploy for the following reasons:

- **Unified delivery pipeline** Shippable CI and Deploy together give you a unified software delivery pipeline from source control to production. You get full visibility of a single commit from source control through CI through several test environments and finally production. No other platform comes close to this level of traceability.
- **Easy setup** Setup is quick and simple since all configuration is driven through a declarative yml format. Unlike other infrastructure/IT automation tools, you do not need to write any code or scripts to set up your pipeline. Plus, your yml is versioned so you can go back and forth as you wish!
- **Cloud Portability** We support all popular Container Services and you can move your application environments between these in just a few minutes. The result? No lock in! 

More on the advantages of using Shippable Deploy are described in our marketing material at TODO: Add link

## Example use case

Consider a simple 3 tier Dockerized application with 3 services - ui, api, and db. Your source code is in GitHub and the corresponding repositories are yourOrg/www, yourOrg/api, and yourOrg/db. 

You want to run 3 environments - Test, Beta, and Production. 

The **Test** environment contains the latest versions of all services that have passed CI. You want to run additional functional tests against this environment and maybe some manual testing as well. Once those tests pass, you push the tested services to Beta.
 
Your **Beta** environment is a better representation of your production environment. This is where you test for scale and run performance tests, stress tests, etc. There is also additional automated and manual testing designed to catch those really pesky bugs. At some point, you decide that your application should move to Production.

The **Production** environment is your user facing environment and your application is now live to everyone who uses it.

<img src="../images/deploy_subscriptions.png" alt="Subscription Dashboard" style="width:800px;"/>

Using Shippable, your pipeline from source control to production will look like this -

- www, api, and db are enabled on Shippable CI.  
- Your developers commit code to www. 
- The CI workflow is triggered on Shippable. On a successful run, we package your code into a Docker image and push it to a Docker registry with the right tag
- Your **Test** environment is set to auto-deploy all services when a new image tag is available. www is therefore updated to the latest version and deployed.
- The **Test** environment to run automated functional tests whenever a new service version is deployed. These run and are successful.
- Your test team then does performs additional manual tests. These pass as well.
- Your **Beta** environment is not set to auto-deploy. You push the service versions that have passed all these checks in **Test** to your **Beta** environment.   
- Additional tests, both manual and automated, are performed on **Beta**. This environment is updated several times until one day, everything planned for your next Production update has been tested and approved in **Beta**.
- Release day! You simply push the *approved* service versions to your **Production** environment. As simple as that! 

## Deploy Subscriptions
A Shippable deploy subscription is required for each environment you want to provision and manage using Shippable. For example, if you run 2 Test environments, one Beta, and one Production environment, you will need 4 subscriptions. 
  
You do not have any Deploy subscriptions by default when you sign in to Shippable. You will need to add each one as described in the the [Deploy subscriptions section](d_subscriptions.md) . Deploy plans and pricing are explained in the [Plans and Pricing section](gs_plans.md)
### Services
In simple terms, a service is a unit of deployment. Most applications are composed of one or more services, with the extremes being a monolithic application with just one service, and at the other end of the spectrum, an application with tens or hundreds of microservices.

A service is defined by:

- Image(s): One or more Docker images that are each spun up in a Docker container. 
- Environment configuration: Key value pairs that give the service more information about the environment. For example, an API_URL variable can be set to the URL of the API in that environment so that other services can talk to the API. These configurations are very specific to your application.

You can run one or more instances of a service in any given environment. Each instance is called a Replica and will run on a  separate virtual machine. You can add a load balancer to distribute incoming traffic across several replicas of a service.

Since a service is a unit of deployment, all containers in a service instance are always deployed together and on the same machine.


## Permissions

### Authentication

You will need to sign in to Shippable with GitHub or Bitbucket credentials in order to use Deploy.

For signing in, we use GitHub/Bitbucket OAuth authentication, so you do not need to create a separate account on our platform.

### Authorizing Shippable

When signing in to Shippable, you will be prompted to give Shippable access to your repos. GitHub and Bitbucket auth behave a little differently as follows -

**GitHub**- By default, we only ask for access to public repos. This level of access is sufficient to use Deploy. However, if you want to enable your private repos for CI using Shippable, you will need to authorize us for private repositories. This is done from your [Account Settings Page](account_settings.md).

**Bitbucket**- The Bitbucket API does not have public/private
granularity, so we ask for access to all repos on Bitbucket by default.

> **Note**
>
> We realize that most people do not want to give write access to their
> repo. However, we need write permissions to add deploy keys to your
> repos for our webhooks to work. We do not touch anything else in the
> repo.

### Who has access?

Since Deploy subscriptions are not tightly coupled with your source control, you can create teams and assign each member to a role that defines the access they get. More on this in our [Deploy subscriptions section](d_subscriptions.md).









