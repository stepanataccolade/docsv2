page_title: Navigating Shippable's Subscriptions Settings UI
page_description: Overview of Shippable's Subscriptions Settings UI
page_keywords: User Interface, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

#Subscription Settings
You can perform subscription level actions by clicking on the 'Settings' tab on the 'Subscription' page.

##Options
###Machine Images

The Machine Images section has a list of images that are available to run your builds. All the builds for your subscription will be using the stable image by default. You can switch to other images based on your requirements. Once you switch the images, all the builds for your subscription will be using the image that you have selected and you can switch back to the default version anytime.

To select your Machine Image, Go to the 'Settings' tab of your 'Subscription'. Click on the 'Options' section and select from the dropdown under the 'Machine Images' section.

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

###Technical Contact

Do ensure this field is populated with a valid email address for the subscription. This email will be used to notify information on service upgrades, service performance and other related topics. It will not be used for marketing purposes.

###Billing Contact

Do ensure this field is populated with a valid email address for the subscription. This email will be used to send billing invoices for this subscription.

###Reset Subscription

Resetting a subscription recreates all webhooks and deployment keys for your subscription. This should only be done if your subscription is in an inconsistent state and you need to restore it. Please note that you will need to re-encrypt all environment variables for your subscription after resetting it.

---

##Integrations

Integrations are added at a subscription level and they are available to be configured for a project by any user, with access to the subscription level.

For example, if an integration is added to an organization subscription, all users with access to the organization's subscription can configure the integration for their projects.

You can view all the configured integrations for your account by going to the 'Account Settings' and clicking the 'Integrations' section. It will display a list of all integrations that are configured and available for your projects.

###Adding integrations

To add an integration for a project, you'll need to add it in the UI for the project's subscription and include it in the `shippable.yml` file for that project.
