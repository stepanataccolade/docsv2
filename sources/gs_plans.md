page_title: Learn About What Makes Shippable Great
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation


# Pricing

We offer Freemium pricing, so your first build container, aka minion, and your first pipeline is always free for [every subscription](gs_concepts.md/#Subscriptions). 

You can buy additional build containers and run parallel CI builds, and/or buy more pipelines depending on how many deployable units (cells) you need for your application.

## Free plan  
You get **one build minion** (2 core, 3.75GB RAM) for Continuous Integration, along with unlimited builds for unlimited repositories and users. 

As you enable more repositories or add developers to your team, you might find that your free minion is frequently busy running a build and subsequent builds are queued as a result. Or you might just need bigger minions. Check out the section below describing how you can buy additional build containers. 

By default, all your builds run on single tenant machines on Shippable's infrastructure, so you do not run into noisy neighbor or security issues commonly associated with multi-tenant platforms. You also have the option of running builds on your own infrastructure as described in the [Continuous Integration overview section](ci_overview.md).

As part of the free tier, you also get **one Pipeline**, which allows you to set up deployment for one deployment unit of your application. If your application has additional tiers/services, you will need to buy additional pipelines as described below.

## Paid plan

You can buy additional build containers and run parallel CI builds, and/or buy more pipelines depending on how many deployable units (cells) you need for your application.

The pricing for that is :

- **Additional build minions with 2 cores, 3.75GB RAM for a promotional price of $10/month per minion.** Our regular list price after the promotion ends is $25/month per minion. Customers who buy subscription plans at the promotional price will grandfathered as long as their subscriptions are active and in good status.
- **Additional pipelines in blocks of 3 at $10/mo per block.** In general, number of pipelines you will need is usually equal to the number of services in your application. For a typical 3 tier application with ui, api, db, you will need 3 pipelines.




