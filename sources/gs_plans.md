page_title: Learn About What Makes Shippable Great
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation


## CI and Deploy plans

The following sections explain CI and Deploy plans and the pricing for each. All plans offer a Free tier, so you can always try before you buy.

### CI

We offer Freemium pricing for Shippable CI, so your first build container, aka minion, is always free for [every subscription](gs_concepts.md/#Subscriptions). By default, all your builds run on single tenant machines on Shippable's infrastructure, so you do not run into noisy neighbor or security issues commonly associated with multi-tenant platforms .

You also have the option of running builds on your own infrastructure. Read below for the benefits of each approach.

You should sign up for Shippable CI if you fit the following profile -
* Your source code is on GitHub, Bitbucket or GitHub Enterprise. (Support for Bitbucker Server and Gitlab will be announced in Q1 2016)
* You want to avoid the time sink of setting up and managing your own CI system and would rather spend the time writing features for your product   
* (optional)You're a Docker user and you want to use your own custom image to run your builds. You can even run Docker compose to spin up environments!
* Your builds can run in containers with 1 core, 2GB RAM (free) or 2 cores, 4GB RAM (paid).

Additionally, you can choose to run your builds on your own infrastructure. You should do this if  -
* You want complete control over your build machines, including SSH access. 
* Your builds are resource intensive and 2 core, 4GB RAM is not sufficient to run them. You need bigger containers! 
* You want your build machines to be inside your VPC
* You want to set up IAM rules and policies for your build workflows 

**Pricing** 

The **Free tier** for Shippable CI comes with one build minion (1 core, 2GB RAM) and unlimited builds for unlimited repositories and users and is a great way to check out how Shippable CI can greatly simplify your CI workflow. 

Please note that if you choose your own build infrastructre, your free minion will not be constrained to 1 core, 2GB RAM and will use all capacity available on your build machine. 

As you enable more repositories or add developers to your team, you might find that your free minion is frequently busy running a build and subsequent builds are queued as a result. Or you might just need bigger minions.

Our **paid plan** offers build minions with 2 cores, 3.75GB RAM for an *introductory price* of $10/month per minion until 6/30/2016. Our regular price after 6/30/2016 is $25/month 
but customers who buy plans before that date will grandfathered into the introductory pricing as long as their subscriptions are active and in good status. 

With our monthly billing cycle, you can scale your CI capacity up or down every month if required!


### Deploy

With Shippable Deploy, you can automate your deployment of Dockerized applications to your Test and/or Production environments on any Container Service within minutes. When combined with Shippable CI, this gives you a complete pipeline from source control to production that is automated, unified, and cloud agnostic. 

Let's focus on that last term - cloud agnostic. This means that you can deploy your applications to **any** container service through Shippable and even move across Container Services in minutes. We currently support Amazon's ECS and Google Container Engine. Support for Microsoft Azure Container Service and Red Hat Openshift is coming up very soon.

##### Container Service Deploy

You should sign up for this plan if you fit the following profile -

* Your application is Dockerized and you run Docker in test environments and Production, or
* You do not use Docker in production, but run (or are open to running) your Test and/or Production environments on a Container Service, or 
* You are not using Docker in production but are interested in containerizing your Test environments.  
* You run (or want to run) functional tests for every code commit

[Contact us](mailto:support@shippable.com) for details and a demo showing how the above can be easily achieved using our Deploy plan.

**Pricing**

Our pricing model is freemium and is based on the amount of RAM you need for your containers. The free tier comes with 2GB RAM which gives you enough resources to run simple applications. 

Additional RAM can be purchased in blocks of 4GB for $10/month.

*****

