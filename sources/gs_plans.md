page_title: Learn About What Makes Shippable Great
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation


# CI and Flow plans

The following sections explain CI and Flow plans and the pricing for each. All plans offer a Free tier or a 30 day free trial, so you can always try before you buy.

## CI

We offer Freemium pricing for Shippable CI, so your first build container, aka minion, is always free for [every subscription](gs_concepts.md/#Subscriptions). By default, all your builds run on single tenant machines on Shippable's infrastructure, so you do not run into noisy neighbor or security issues commonly associated with multi-tenant platforms .

You also have the option of running builds on your own infrastructure. Read below for the benefits of each approach.

You should sign up for Shippable CI if you fit the following profile -

* Your source code is on GitHub, Bitbucket or GitHub Enterprise. (Support for Bitbucker Server and Gitlab will be announced in Q1 2016)
* You want to avoid the time sink of setting up and managing your own CI system and would rather spend the time writing features for your product   
* (optional)You're a Docker user and you want to use your own custom image to run your builds. You can even run Docker compose to spin up environments!
* Your builds can run in containers with 2 cores, 3.75GB RAM.

###Bring your own hosts (BYOH)
For customers who want complete control over their build hosts, we a novel approach called **Bring your own hosts (BYOH)**. 

BYOH lets you run builds on your own infrastructure, so you can attach your machines to your Shippable subscription and all your builds are routed to those machines. This is a powerful hybrid approach that gives you the benefit of using a SaaS service for CI orchestration, while still giving you full control over the infrastructure and security of your build machines.

You should take advantage of BYOH if:  

* You want complete control over your build machines. 
* Your builds are resource intensive and 2 core, 4GB RAM is not sufficient to run them. You need bigger containers! 
* You want your build machines to be inside your VPC and/or behind your firewall, which also gives you the ability to configure access, IAM, etc.

###Pricing 

The **Free tier** for Shippable CI comes with one build minion (2 core, 3.75GB RAM) and unlimited builds for unlimited repositories and users and is a great way to check out how Shippable CI can greatly simplify your CI workflow. 

As you enable more repositories or add developers to your team, you might find that your free minion is frequently busy running a build and subsequent builds are queued as a result. Or you might just need bigger minions.

Our **paid plan** offers build minions with 2 cores, 3.75GB RAM for an *promotional price* of $10/month per minion for a limited time. Our regular list price after the promotion ends is $25/month per minion. Customers who buy subscription plans at the promotional price will grandfathered as long as their subscriptions are active and in good status. 

Please note that you need to be on a paid plan to use your own build infrastructure (BYOH). Pricing remains the same and you can configure the number of parallel builds you need on your billing page.

With our monthly billing cycle, you can scale your CI capacity up or down every month if required!


## Flow

With Shippable Flow, you can create and manage your deployment of Dockerized applications to your Test and/or Production environments on any Container Service within minutes. When combined with Shippable CI, this gives you a complete pipeline from source control to production that is automated, unified, and cloud agnostic. 

Let's focus on that last term - cloud agnostic. This means that you can deploy your applications to **any** container service through Shippable and even move across Container Services in minutes. We currently support Amazon's ECS and Google Container Engine. Support for Microsoft Azure Container Service and Red Hat Openshift is coming up very soon.

You should sign up for Shippable Flow if you fit the following profile -

* Your application is Dockerized and you run Docker in test environments and Production, or
* You do not use Docker in production, but run (or are open to running) your Test and/or Production environments on a Container Service, or 
* You are not using Docker in production but are interested in containerizing your Test environments.  
* You run (or want to run) functional tests for every code commit

[Contact us](mailto:support@shippable.com) for details and a demo showing how the above can be easily achieved using Flow.

###Pricing

Our pricing model is based the number of pipelines you want to configure with Flow. In general, number of pipelines is usually equal to the number of services in your application. For a typical 3 tier application with ui, api, db, you will need 3 pipelines.

You can purchase pipelines in blocks of 3 at $10/mo per block. 
 
The 30 day free trial comes with an unlimited number of pipelines, so you can try before you buy.  

*****

