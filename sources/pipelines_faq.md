page_title: Shippable Pipelines Billing
page_description: Explains how Shippable  Billing works
page_keywords: pipelines, upgrade containers, add new pipeline, multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Pipelines FAQ

## How can I upgrade or downgrade my plan?

The Continuous Delivery plan gives you a minimum of 1 free minion & 1 free pipeline. Upgrading or downgrading the Pipelines plan simply means increasing or decreasing the number of pipelines and containers in your subscription.

You can do this by going to the 'Billing' Tab on your Subscription Dashboard and clicking the 'Update plan' button. Use the slider to indicate the number of pipelines (and/or containers) you want. Click on the 'Save changes' button when you are done.

Plan upgrades are effective immediately and your bill will be prorated for the current month. Plan downgrades are effective immediately, however we do not issue refunds for minions that were already paid for during the current month.

Read the blog [upgrading your Continuous Integration/Continuous Delivery subscription](http://blog.shippable.com/how-to-upgrade-your-ci-cd-subscription) to help you determine when you need to upgrade.

* * * 

## Why is my application not accessible externally, even though my pipeline is working perfectly?

You may notice that your pipeline has been configured correctly & is deploying your Docker image successfully into Kubernetes (GKE). However, you'll see that no service is created & hence your application is not accessible externally, even though you have configured the routing. A main reason this happens is when a GKE cluster is used & the port ranges are not configured. Kubernetes, by default, restricts the nodePort on a service to be in the range 30000 to 32767. Hence if you are using a GKE cluster, then you'll need to select the hostPort you choose for routing, between this range. For more details refer [deploying a sample app on pipelines](http://docs.shippable.com/gs_deploy_sample/#add-cell-manifest).

* * * 
