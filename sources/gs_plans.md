page_title: Learn About What Makes Shippable Great
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation


## choosing the right plan

We offer several plans since there is no one-size-fits-all solution to what customers really need. The following sections explain CI and Deploy plans, the feature differentiation between them, and the pricing for each. All plans offer a Free tier, so you can always try before you buy.

### CI plans

The 2 plans for CI are: *Multi tenant CI* and *Single Tenant CI*

##### Multi Tenant CI

Multi Tenant CI is the default plan for all GitHub and Bitbucket subscriptions. 

You should stay with multi tenant CI plan if you fit the following profile -
* Your source code is on GitHub or Bitbucket
* You want to avoid the time sink of setting up and managing your own CI system and would rather spend the time writing features for your product   
* You are comfortable with your CI containers running on a multi-tenant platform 
* You do not need complete control over your build machines or SSH access. As part of your build details, you will get streaming (and downloadable) build console logs as well as the ability to archive artifacts
* You are not a Docker user. We will restrict custom Docker images for our multi tenant plan users starting Q1 2016 since we no longer believe that Docker should be used in a multi-tenant environment. 
* Your builds are not too resource intensive and 2 core, 4GB RAM is sufficient to run them 

If one or more of the above points do not resonate, check out our Single Tenant CI plan. 

**Pricing** 

The free tier comes with one build minion and unlimited builds for unlimited repositories and users and is a great way to check out how Shippable CI can greatly simplify your CI workflow. 

As you enable more repositories or add developers to your team, you might find that your free minion is frequently busy running a build and subsequent builds are queued as a result. Depending on your needs, you can add additional minions for $10/month per minion. With our monthly billing cycle, you can scale you CI capacity up or down every month if required!


##### Single Tenant CI
Single Tenant CI is the default plan for GitHub Enterprise, Bitbucket Server(coming soon), and GitLab(coming soon) subscriptions. Under this plan, your build containers run on dedicated machines, either provided by you or provisioned by Shippable for your subscription. 

You should choose the single tenant CI plan if you fit the following profile -

* Your source code is on GitHub Enterprise, Bitbucket Server(coming soon), or GitLab(coming soon)
* You want to avoid the time sink of setting up and managing your own CI system but do not want your builds to run on a multi-tenant platform   
* You want complete control over your build machines, including SSH access. 
* You are a Docker user and you want to use your own custom image to run your builds.
* Your builds are resource intensive and 2 core, 4GB RAM is not sufficient to run them. You need bigger containers! 
* You want to go beyond CI and run multiple containers with Docker compose for your tests (coming soon)


**Pricing** 

**Please note that the Single Tenant CI plan is currently in preview and is completely free while in preview.The following pricing will be effective at launch.** 

We offer a freemium model based on the number of parallel builds you want to run. The free tier comes with one build minion (which means you can run one build at a time) and is limited to 1500 build minutes a month. There are no limits on number of enabled repositories or on users.

As your usage increases, you will either need to run more than 1500 build minutes a month, or find that your free minion is often busy running a build and subsequent builds are queued. Depending on your needs, you can purchase additional minions for $40/month per minion (discounted to $20/mo for the first 6 months). There are no limits on build minutes for paid subscriptions. 


### Deploy plans

With Shippable Deploy, you can automate your deployment of Dockerized applications to your Test and/or Production environments on any Container Service within minutes. When combined with Shippable CI, this gives you a complete pipeline from source control to production that is automated, unified, and cloud agnostic. 

Let's focus on that last term - cloud agnostic. This means that you can deploy your applications to **any** container service through Shippable and even move across Container Services in minutes. We currently support Amazon's ECS, with support for Google Container Engine, Microsoft Azure Container Service, and Red Hat Openshift coming up very soon.

##### Container Service Deploy

We have just one plan that spans all containerized application deployments. You should try out this plan if you fit the following profile -

* Your application is Dockerized
* You run (or are open to running) your Test and/or Production environments on a Container Service. 
* You are not running Docker in production but are interested in containerizing your Test environments.  
* You run (or want to run) functional tests for every code commit

[Contact us](mailto:support@shippable.com) for details and a demo showing how the above can be easily achieved using our Deploy plan.

**Pricing**

**Please note that the Container Service Deploy plan is currently in preview and is completely free while in preview.The following pricing will be effective at launch.** 

Our pricing model is freemium and is based on the amount of RAM you need for your containers. The free tier comes with 2GB RAM which gives you enough resources to run simple applications. 

Additional RAM can be purchased in blocks of 8GB for $20/month.

*****

