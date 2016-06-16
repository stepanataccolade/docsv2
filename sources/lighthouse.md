page_title: Shippable Lighthouse Image Watcher
page_description: How to watch images using Shippable's Lighthouse Feature
page_keywords: lighthouse, shippable ci, documentation, shippable, watch docker images

# Lighthouse: Monitor your images

## Overview

Have you ever wasted your time debugging a broken build only to realize a few frustrated hours later that it was due to something that changed in one of the images you depend on?

Lighthouse to your rescue!

Lighthouse lets you monitor any Docker image from any registry and be notified if the image changes. This is very powerful since you can now set up Shippable to automatically build all dependent projects when an upstream image is updated.

Lighthouse is available to all Shippable users for free. You can monitor any number of images at no cost.

We're actively expanding Lighthouse functionality to include monitor dependencies that go beyond just Docker images, so stay tuned!

You can check out Lighthouse bu signing in to [Shippable](https://app.shippable.com) and clicking on `Lighthouse` on the landing page.

---

## Adding an image

To add an image to Lighthouse and receive notification when the image is updated in the registry, follow the steps below.

1. Create an account integration for the Docker registry where the image is to be monitored. ([Instructions here](int_docker_registries.md))
2. Create an account integration for the type of notification you want to receive when the image changes. You can set up Slack, HipChat, IRC, or Email notification. ([Instructions here](int_notifications.md))
3. Go to your [Lighthouse page](https://app.shippable.com/lighthouse)
4. Click on `Add image` and complete the following
    * Image Name: `your_repo_name/image_name` (the image from either DockerHub or GCR)  
    - Hub Integration: The Docker registry integration that has permissions to access this image. You can create a new one if you don't have one already configured in your Account Settings.  
    - Click on the `Save Image` button
    - Next, enter the type of notification you want to receive each time the image changes. This can be email, Slack, HipChat or IRC. Enter the account integration details.
    - Click on `Ok`
    - You will be redirected to the Lighthouse page where you will start seeing status of the image. A `green` indicator shows that we could successfully sync the image and will be able to send notifications when the image changes.

Images are 'watched' every 20 mins, so your notification will be sent 20 mins after the image is updated, in the worst case.

---

## Tags

Lighthouse periodically polls the registry and the tags are updated when there is any update to the image in the source registry. You will see the latest tag against the image when the image is synced.

---

## Updating an image

To update an image or change the notification settings:

1. Go to your [Lighthouse page](https://app.shippable.com/lighthouse)
 - You will see the list of images being watched on the Lighthouse Dashboard
 - Click on the image_name to update the notification setting

---

## Deleting an image

To delete an image on lighthouse:

1. Go to your [Lighthouse page](https://app.shippable.com/lighthouse)
 - You will see the list of images being watched on the Lighthouse Dashboard
 - Click on the `Delete` button for the image(s) you want to stop monitoring

---


## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-64e0f8e9-8d08-40d5-948c-d0faf9827d17">
      <span class="hs-cta-node hs-cta-64e0f8e9-8d08-40d5-948c-d0faf9827d17" id="hs-cta-64e0f8e9-8d08-40d5-948c-d0faf9827d17">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/64e0f8e9-8d08-40d5-948c-d0faf9827d17"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-64e0f8e9-8d08-40d5-948c-d0faf9827d17" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/64e0f8e9-8d08-40d5-948c-d0faf9827d17.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '64e0f8e9-8d08-40d5-948c-d0faf9827d17', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-314f8ada-0d53-49db-afa0-483d5963e59e">
      <span class="hs-cta-node hs-cta-314f8ada-0d53-49db-afa0-483d5963e59e" id="hs-cta-314f8ada-0d53-49db-afa0-483d5963e59e">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/314f8ada-0d53-49db-afa0-483d5963e59e"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-314f8ada-0d53-49db-afa0-483d5963e59e" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/314f8ada-0d53-49db-afa0-483d5963e59e.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '314f8ada-0d53-49db-afa0-483d5963e59e', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

---
