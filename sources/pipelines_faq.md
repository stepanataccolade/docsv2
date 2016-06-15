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

## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-58244e44-4f25-4c2c-a7d7-4fa4380e9ba8">
      <span class="hs-cta-node hs-cta-58244e44-4f25-4c2c-a7d7-4fa4380e9ba8" id="hs-cta-58244e44-4f25-4c2c-a7d7-4fa4380e9ba8">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/58244e44-4f25-4c2c-a7d7-4fa4380e9ba8"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-58244e44-4f25-4c2c-a7d7-4fa4380e9ba8" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/58244e44-4f25-4c2c-a7d7-4fa4380e9ba8.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '58244e44-4f25-4c2c-a7d7-4fa4380e9ba8', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-5ff5419f-8d4b-4147-9477-84aab100c24b">
      <span class="hs-cta-node hs-cta-5ff5419f-8d4b-4147-9477-84aab100c24b" id="hs-cta-5ff5419f-8d4b-4147-9477-84aab100c24b">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/5ff5419f-8d4b-4147-9477-84aab100c24b"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-5ff5419f-8d4b-4147-9477-84aab100c24b" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/5ff5419f-8d4b-4147-9477-84aab100c24b.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '5ff5419f-8d4b-4147-9477-84aab100c24b', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

* * * 
