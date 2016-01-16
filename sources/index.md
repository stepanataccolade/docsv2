page_title: Learn About What Makes Shippable Great
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

## What is Shippable?

<<<<<<< HEAD
Shippable was founded to simplify software delivery and to help Dev, Test, and DevOps teams innovate faster by reducing the time taken for code to be built, tested and deployed to production. Our unified, automated pipeline takes your code from from source control to production, without the need for configuration management/IT automation tools or infrastructure code.
=======
Shippable was founded to simplify software delivery and to help Dev, Test, and DevOps teams innovate faster by reducing the time taken for code to be built, tested and deployed to production. Our unified, automated pipeline takes your code from source control to production, without the need for IT automation tools or infrastructure code.
>>>>>>> 574bef1b618e95ceeaaf29baa7ac21bdb4826892

If you believe that developers should spend their time writing features and not on managing CI tools and infrastructure, you should check out Shippable today.

We have 2 flagship products - Shippable CI and Shippable Flow. 

**Shippable CI** is a powerful Continuous Integration platform natively built on Docker. 

**Shippable Flow** is focused on automating the flow of your application from source control to production by letting you create and manage delivery pipelines for your applications. Test and DevOps teams can easily deploy containerized applications to Container Services like Amazon's ECS and Google Container Engine. 

Both CI and Flow integrate with your favorite tools and services, such as build/test tools,  source control providers, docker registries, cloud providers, and container services.

<img src="./images/how_it_works.png" alt="e2e pipeline" style="width:800px;"/>

### Shippable CI
Shippable CI is our Continuous Integration Platform that helps developers find bugs as soon as they are introduced. Every time you commit code or open a pull request, your code will be automatically built and tested and you will receive a notification with build results. 

Shippable CI runs all your builds on minions, which are Docker-based containers. If you're using Docker for development, you can use your own Docker images or even build a Docker image and run builds in the container as part of your CI workflow. For customers who are not using Docker for their development, we provide language specific images that are pre-loaded with popular services and tools.

You can choose to run your builds on our hosted CI platform, or choe to run builds on your own infrastructure.

Go to [Shippable CI](ci_overview.md) to learn more.

### Shippable Flow

Shippable Flow gives Test and DevOps teams the ability to automatically deploy containerized applications to Container Services like Amazon's ECS. Your application components like images and services are versioned and can be upgraded or rolled back with a single click. We also support auto-deploying to test environments, which means your functional tests can be automated to run on every code commit.
 
Most importantly, Shippable Flow gives you the ability to be cloud agnostic. You can move your applications across Container Services in a few minutes!

Go to [Shippable Flow](flow_overview.md) to learn more.

In addition, we also have a cool tool called **Lighthouse** that lets you monitor any Docker images you depend on and be notified when they change. This helps avoid situations where your images no longer work due to changing dependencies. 

Go to [Lighthouse Overview](formations_overview.md) to learn more.

*****

