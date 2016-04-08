page_title: Pricing
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation


#Pricing
This page provides pricing information and instructions on how to upgrade or downgrade your plan.

<img src="../images/shippable_pricing.png" alt="Subscription Dashboard" style="width:700px;"/>

## Plan description
We offer Freemium pricing, so your first build container, aka minion, and your first pipeline is always free for [every subscription](gs_concepts.md/#Subscription).

You can buy additional build containers and run parallel CI builds, and/or buy more pipelines depending on how many deployable units (cells) you need for your application.

###Free plan  
You get **one build minion** (2 core, 3.75GB RAM) for Continuous Integration, along with unlimited builds for unlimited repositories and users.

As you enable more repositories or add developers to your team, you might find that your free minion is frequently busy running a build and subsequent builds are queued as a result. Or you might just need bigger minions. Check out the section below describing how you can buy additional build containers.

By default, all your builds run on single tenant machines on Shippable's infrastructure, so you do not run into noisy neighbor or security issues commonly associated with multi-tenant platforms. You also have the option of running builds on your own infrastructure as described in the [Continuous Integration overview section](ci_overview.md).

As part of the free tier, you also get **one Pipeline**, which allows you to set up deployment for one deployment unit of your application. If your application has additional tiers/services, you will need to buy additional pipelines as described below.

###Paid plan

You can buy additional build containers and run parallel CI builds, and/or buy more pipelines depending on how many deployable units (cells) you need for your application.

The pricing for that is :

- **Additional build minions with 2 cores, 3.75GB RAM for a promotional price of $10/month per minion.** Our regular list price after the promotion ends is $25/month per minion. Customers who buy subscription plans at the promotional price will grandfathered as long as their subscriptions are active and in good status.
- **Additional pipelines in blocks of 3 at $10/mo per block.** In general, number of pipelines you will need is usually equal to the number of services in your application. For a typical 3 tier application with ui, api, db, you will need 3 pipelines.

## Billing
A subscription on Shippable corresponds to an individual or organizational subscription on GitHub/Bitbucket. Your pricing plans are enforced at a subscription level, so you need to determine your build minion and pipeline needs for each subscription.

To get to the Subscription Billing page,

- Login to [Shippable](https://app.shippable.com)
- Click on the `Subscriptions` dropdown and select the subscription you want to view.
- This will take you to the `CI` tab of the subscription.
- Click on the `Billing` tab to view and manage your plan.

### Upgrade your plan
You should buy more build minions if:

 * Your builds need bigger minions than the one in your free plan. All paid minions come with 2 cores, 3.75GB RAM (as opposed to 1 core, 2GB RAM with the free plan)
 * Your team is growing and your builds are frequently queued as a result, which means your developers wait longer to get build results. Buying more minions will enable parallel execution of builds and reduce queuing time.  

You should buy more pipelines if your application has more than 1 unit of deployment. These can be tiers, services, or microservice.

To buy more build minions or pipelines, simply slide the slider to the number of minions and/or pipelines you need. Choose a credit card, or Enter a new credit card and click on `Buy`.

We will charge your credit card immediately and send you an invoice. You can also view past invoices on this page.

### Downgrade your plan
You can downgrade your plan at any time by moving the slider to the number of minions and/or pipelines you need. Please note that any minion count changes due to your plan downgrade will be effective immediately and you will not receive a partial or prorated refund if you make this change in the middle of a billing cycle. Your new price will be reflected in your next invoice.
