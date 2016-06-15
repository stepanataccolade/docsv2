page_title: Shippable CI Overview
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Third-party integrations

Shippable integrates with many popular source control providers, notification platforms, container services, and Docker registries.

In order to interact with these services on your behalf, you need to provide your credentials or keys. To protect this private information, we do not ask you to enter this in the yml config, and instead provide an easy way to set this information in the Shippable UI.

For example, to pull an image from or push an image to a Docker Hub, you will add a Docker integration which will ask for your credentials and you can then use that integration during your build process.

To start with, you will always need to add an account integration as described below.

##Adding an account integration

- Click on the 'Account Settings' icon on the top right hand corner of Shippable portal.

<img src="../images/account_settings_icon.png" alt="Account Settings" style="width:200px;"/>

- Click the 'Integrations' tab and then click 'Add Integration'
<img src="../images/add_account_integration.png" alt="Add Account Integration" style="width:800px;"/>

- Use the dropdown to select the desired integration and proceed with the configuration of that specific integration.

<img src="../images/add_integration_select.png" alt="Select Account Integration" style="width:800px;"/>

- Click on `Save`.

The integration should now show up in your `Integrations` tab. This integration will be available to all your projects and can be used for your workflows. Further details and examples of how a specific integration is used is available in the section for each integration.


## Deleting an account integration

To delete an integration:, simply click on the `Delete` button for the integration you want to delete.

Delete will fail if there are any projects actively using the integration, so make sure the integration is not being used in any project before deleting it.


## Supported integrations

### [Source Control Providers](int_scm.md)
- GitHub
- GitHub Enterprise
- Bitbucket
- GitLab

In addition, we are working on Bitbucket Server integration and will announce this in Q2 of 2016.

### [Docker Registries](int_docker_registries.md)
- Docker Hub
- Google Container Registry (GCR)
- Amazon Elastic Container Registry (ECR)
- Quay.io
- Self-hosted private registries

### [Container Services](int_container_services.md)
- Amazon Elastic Container Service (ECS)
- Google Container Engine (GKE)
- Docker Cloud
- Docker Datacenter
- Red Hat Openshift V3 (coming soon)
- Microsoft Azure (coming soon)

### [PaaS/IaaS Providers](int_paas_iaas_providers.md)
- Amazon Elastic Beanstalk (EB)
- Heroku (coming soon)
- Red Hat Openshift (coming soon)

### [Notifications](int_notifications.md)
- Email
- Slack
- IRC
- Hipchat

### [Keys](int_keys.md)
- SSH keys
- PEM keys

*****

## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-0d3e8e0f-553f-41a4-8fed-52e1b3911b2d">
      <span class="hs-cta-node hs-cta-0d3e8e0f-553f-41a4-8fed-52e1b3911b2d" id="hs-cta-0d3e8e0f-553f-41a4-8fed-52e1b3911b2d">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/0d3e8e0f-553f-41a4-8fed-52e1b3911b2d"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-0d3e8e0f-553f-41a4-8fed-52e1b3911b2d" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/0d3e8e0f-553f-41a4-8fed-52e1b3911b2d.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '0d3e8e0f-553f-41a4-8fed-52e1b3911b2d', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-82d2d172-48ab-4398-810c-5ca822da088a">
      <span class="hs-cta-node hs-cta-82d2d172-48ab-4398-810c-5ca822da088a" id="hs-cta-82d2d172-48ab-4398-810c-5ca822da088a">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/82d2d172-48ab-4398-810c-5ca822da088a"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-82d2d172-48ab-4398-810c-5ca822da088a" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/82d2d172-48ab-4398-810c-5ca822da088a.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '82d2d172-48ab-4398-810c-5ca822da088a', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

*****
