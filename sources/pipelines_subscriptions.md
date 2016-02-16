page_title: Shippable CI Billing
page_description: How to update Subscription CI Plan and add more containers
page_keywords: ci billing, add containers, subscription settings, CI/CD, shippable CI, documentation, shippable, config, yml

# Subscriptions

A Shippable Flow subscription is required for each environment you want to provision and manage using Shippable. For example, if you run 2 Test environments, one Beta, and one Production environment, you will need 4 subscriptions.   

You do not have any Flow subscriptions by default. You will need to add each one as described in the sections below. Flow plans and pricing are explained in the [Plans and Pricing section](gs_plans.md)


##Pipelines dashboard
You can view the status of all services in your application environment on the subscription dashboard. Your can navigate to your dashboard by clicking on the `Status` tab of your Flow subscription.

The top of your `Status` page shows you how much RAM is currently being used in your subscription. As you add services or scale existing services, you will need more RAM at some point. You can add RAM to your subscription by following instructions in the section below on [Upgrading your plan](#Billing).

You will also see the status of all services in your application environment. For each service, you'll see-

- The service name, version, and status. Status can be `Running` denoted by green, or `Stopped` denoted by grey. The `Starting` status is shown by blue.
- Date and time when service was last started and by whom. For environments that are set to auto-deploy, you will see the string 'Started by Auto Deploy'
- Number of images, replicas, and configs in the service. 
    - A service can include one or more images. Since a service is the unit of deployment, all images in a service are deployed together on the same machine when any one of them changes.    
    - Replicas provide a way of scaling a service up and down by running any number of instances as desired.
    - Service config includes environment configuration. Typically, these are URLs, tokens, and other key value pairs that are required for the application.
- On clicking on the `...` for a service, the widget will expand to show you additional information about images and environment configuration as shown below.

<img src="../images/service_widget.png" alt="Subscription Dashboard" style="width:800px;"/>    
  
You can stop a service by clicking on the `Stop` button for it.

## Billing

You can view and manage your plan by clicking on the `Billing` tab on the Subscriptions page. 

### Upgrade your plan

You should upgrade your subscription if you need more memory to run your application. 
 
To buy more RAM, simply slide the slider to the amount of RAM you need. Choose a credit card, or Enter your credit card and click on `Buy`.

We will charge your credit card immediately and send you an invoice.

### Downgrade your plan
You can downgrade your plan at any time by moving the slider to the amount of RAM you need. Please note that any RAM changes due to your plan downgrade will be effective immediately and you will not receive a partial or prorated refund if you make this change in the middle of a billing cycle. Your new price will be reflected in your next invoice.



