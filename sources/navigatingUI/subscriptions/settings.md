page_title: Navigating Shippable's Subscriptions Settings UI
page_description: Overview of Shippable's Subscriptions Settings UI
page_keywords: User Interface, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

#Subscription Settings
You can perform subscription level actions by clicking on the 'Settings' tab on the 'Subscription' page.

##Options
###Machine Images

The Machine Images section has a list of images that are available to run your builds. All the builds for your subscription will be using the stable image by default. You can switch to other images based on your requirements. Once you switch the images, all the builds for your subscription will be using the image that you have selected and you can switch back to the default version anytime.

To select your Machine Image, Go to the 'Settings' tab of your 'Subscription'. Click on the 'Options' section and select from the dropdown under the 'Machine Images' section.

<img src="../images/subscriptionSettingsMachineImage.png" alt="Machine Image for a Subscription" style="width:700px;"/>


Here is the list of contents of the machine images:
```
    Stable
        Shippable Official Images.
        Docker Server Version: 1.9.1
        Storage Driver: aufs
        Root Dir: /data/aufs
        Backing Filesystem: extfs
        Dirperm1 Supported: true
        Execution Driver: native-0.2
        Logging Driver: json-file
        Kernel Version: 3.19.0-51-generic
        Operating System: Ubuntu 14.04.3 LTS

    Unstable
        Shippable Official Images.
        Docker Server Version: 1.11.1
        Storage Driver: aufs
        Root Dir: /data/aufs
        Backing Filesystem: extfs
        Dirperm1 Supported: true
        Cgroup Driver: cgroupfs
        Kernel Version: 3.19.0-51-generic
        Operating System: Ubuntu 14.04.3 LTS
```
Please note that the stable version has been tested rigorously to work generically across the board and the unstable image has been tested for specific requirements.

###Deployment key

The Deployment key section shows the SSH public key associated with your Shippable Account. You will need this key to deploy to cloud providers that supports git based deployments like Heroku and Red Hat Openshift. This key is also used to encrypt any environment variables that you want to use during your build.

Our How To guides provide instructions on how to enable continuous deployment to different providers.

<img src="../images/subscriptionSettingsDeploymentKey.png" alt="Deployment Key for a Subscription" style="width:700px;"/>

###Technical Contact

Do ensure this field is populated with a valid email address for the subscription. This email will be used to notify information on service upgrades, service performance and other related topics. It will not be used for marketing purposes.

###Billing Contact

Do ensure this field is populated with a valid email address for the subscription. This email will be used to send billing invoices for this subscription.

###Reset Subscription

Resetting a subscription recreates all webhooks and deployment keys for your subscription. This should only be done if your subscription is in an inconsistent state and you need to restore it. Please note that you will need to re-encrypt all environment variables for your subscription after resetting it.

<img src="../images/subscriptionSettingsReset.png" alt="Resetting for a Subscription" style="width:700px;"/>

---

##Integrations

Integrations are added at a subscription level and they are available to be configured for a project by any user, with access to the subscription level.

For example, if an integration is added to an organization subscription, all users with access to the organization's subscription can configure the integration for their projects.

You can view all the configured integrations for your account by going to the 'Account Settings' and clicking the 'Integrations' section. It will display a list of all integrations that are configured and available for your projects.

###Adding integrations

To add an integration for a project, you'll need to add it in the UI for the project's subscription and include it in the `shippable.yml` file for that project.

Add the integration to a subscription, in the UI, through **Subscription Settings**:

1. Go to the 'Settings' tab of your subscription and click the 'Integrations' section on the left side menu.

2. Click 'Add Integration' and select the list of integrations available in the dropdown of the 'Account Integrations' field.
     <img src="../images/subscriptionSettingsAddIntegration.png" alt="Add Integration to a Subscription" style="width:700px;"/>

3. Ensure the 'Integration Name' you input is exactly the same as the one you configure in the `shippable.yml` file
<img src="../images/subscriptionSettingsAddIntegration2.png" alt="Add Integration to a Subscription" style="width:700px;"/>


NOTE: If you don't see an integration in the dropdown, you will need to create one. To do so:

- Click on the '+ Add integration' from the dropdown choices of the 'Account Integrations' field as shown above in Step 3.
- Create the integration. [Detailed instructions here](navigatingUI/accountSettings/integrations/#Adding-an-account-integration).
- Once you create this integration, add it to  your subscription by following Steps 2 and 3.

**IMPORTANT**: After adding the 'Integrations' in the UI, you'll need to configure the same in the `shippable.yml` file for the project. More details on [yml config here(**UpdateLink**)](Update). The same is true for any Docker registry integrations.

---

## Billing
A subscription on Shippable corresponds to an individual or organizational subscription on GitHub/Bitbucket. Your pricing plans are enforced at a subscription level, so you need to determine your build minion and pipeline needs for each subscription.

To get to the Subscription Billing page:

- Login to [Shippable](http://www.shippable.com).
- Click on the `Subscriptions` dropdown and select the subscription you want to view.
- Click on the Billing tab to view and manage your plan.

By default, you are subscribed to the 'Continuous Delivery' free plan. It includes:

- One free CI build container (2 core, 3.75GB RAM) that supports unlimited public and private repositories for unlimited users from your source control provider. You can run as many builds as you want.
- One free Pipeline, that allows you to set up deployment for one Cell.

<img src="../images/subscriptionSettingsBilling.png" alt="Subscription Plan" style="width:700px;"/>

###Upgrade your plan

You should buy more build minions if:
- Your builds need bigger minions than the one in your free plan. All paid minions come with 2 cores, 3.75GB RAM (as opposed to 1 core, 2GB RAM with the free plan)
- Your team is growing and your builds are frequently queued as a result, which means your developers wait longer to get build results. Buying more minions will enable parallel execution of builds and reduce queuing time.

You should buy more pipelines if your application has more than 1 unit of deployment. These can be tiers, services, or microservice.

Read more about [when and how to upgrade your subscription](http://blog.shippable.com/how-to-upgrade-your-ci-cd-subscription).

To buy more build minions or pipelines, simply slide the slider to the number of minions and/or pipelines you need. Choose a credit card, or Enter a new credit card and click on Buy.

We will charge your credit card immediately and send you an invoice. You can also view past invoices on this page.

###Downgrade your plan

You can downgrade your plan at any time by moving the slider to the number of minions and/or pipelines you need. Please note that any minion count changes due to your plan downgrade will be effective immediately and you will not receive a partial or prorated refund if you make this change in the middle of a billing cycle. Your new price will be reflected in your next invoice.

---

## Nodes

By default, all your builds run inside build containers hosted on Shippable's infrastructure. However, you can choose to run your builds on your own infrastructure, i.e. you can '**Bring Your Own Node (BYON)**'. To understand the advantages of BYON, check out the [Running builds on your machines section](../continuous_integration/advanced_options/byon_overview.md).

The 'Build Infrastructure' section lets you set up your own infrastructure if desired.
To do so, select the radio button for `My Node` and follow instructions for adding a build node below.

Please note that you need to add one build node per parallel build, up to a maximum of the number of parallel builds allowed in your plan.

### Adding a build node
* To add a build machine, click on the `Add node` button. You will be redirected to the Add Node page.
* Enter a name for the node and its IP address.
* You can choose to initialize the build host through Shippable or run the initialization scripts yourself. Initialization through Shippable requires you to grant SSH access, so if you do not want to grant that for any reason, select the radio button for `I want to run the scripts myself`
* To initialize the node through Shippable,
    * Enter the SSH port for your build host. This is usually port 22, but is configurable.
    * Choose whether you want to enable swap space on your machine. This is recommended.
    * Copy the command shown and run it on your build host. This will create a shippable user on your host and allow us to run initialization scripts on your machine.
    * Check the checkbox to confirm that you have run the command on your machine and click on `Initialize`
    * You will be redirected to a page showing you the console log as your machine is initialized.
    * When your node is ready, the status indicator on will turn green.
* To run the initialization scripts yourself,
    * Choose whether you want to enable swap space on your machine. This is recommended.
    * Click on `Generate initialization scripts` to generate the script.
    * Click on `Download scripts` to download. Copy it to your build machine and run them.
    * Check the `I have run this script on my node successfully` and then click on the `Save` button.
    * Your node status will automatically show green at this point. We have no way of verifying that the node was in fact successfully initialized so you will need to make sure this was the case.

Once you add your first build node, all subsequent builds for that subscription will run on your machines.

### Editing a build node
You can click on the `Edit` button for a build node to edit the node name. Nothing else can be edited for a node.

### Re-initializing a build node
You can reinitialize a node by clicking on the `Reinitialize` button. This will reset the node and initialize/install everything from scratch. You can only reinitialize nodes provisioned on Shippable's infrastructure. If you have added your own build nodes, you will need to redownload the initialization script and run it on your node.

### Deleting a build node
Click on `Delete` to delete your build node. This action is final and cannot be undone.

---
