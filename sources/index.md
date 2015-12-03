page_title: Learn About What Makes Shippable Great
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

## Overview

### what is Shippable?

Shippable helps Dev, Test, and DevOps teams innovate faster by reducing the time taken for code to be built, tested and deployed to production. Our goal is to simplify DevOps with our unified, automated pipeline from source control to production, without the need for IT automation tools or infrastructure code .

We have 2 flagship products:

##### Shippable CI
Shippable CI is our Continuous Integration Platform that helps developers find bugs as soon as they are introduced. Every time you commit code or open a pull request, your code will be automatically built and tested and you will receive a notification with build results.  

Shippable CI runs all your builds on minions, which are Docker-based containers. If you're using Docker for development, you can use your own Docker images or even build a Docker image and run builds in the container as part of your CI workflow. For customers who are not using Docker for their development, we provide language specific images that are pre-loaded with popular services and tools.

You can choose to run your builds on our hosted, multi-tenant platform, or take advantage of our single-tenant platform to run builds on your own infrastructure.

Go to [Shippable CI](ci_overview.md) to learn more.

##### Shippable Deploy
Shippable Deploy gives Test and DevOps teams the ability to automatically deploy containerized applications to Container Services like Amazon's ECS. Your images and services are versioned and can be upgraded or rolled back with a single click. We also support auto-deploying to test environments, which means your functional tests can also be automated to run on every code commit. 
Most importantly, Shippable Deploy gives you the ability to be cloud agnostic. You can move your applications across Container Services in a few minutes!

Go to [Shippable Deploy](formations_overview.md) to learn more.

In addition, we also have a cool tools called **Lighthouse** that lets you monitor any Docker images you depend on and be notified when they change. This helps avoid situations where your images no longer work due to changing dependencies. 

Go to [Lighthouse Overview](formations_overview.md) to learn more.


### e2e pipeline 
Together, Shippable CI and Deploy give you a unified pipeline from source control to production, integrating with your favorite tools and services along the way.

<img src="./images/how_it_works.png" alt="e2e pipeline" style="width:800px;"/>


*****

