page_title: Shippable CI Billing
page_description: How to update Subscription CI Plan and add more containers
page_keywords: ci billing, add containers, subscription settings, CI/CD, shippable CI, documentation, shippable, config, yml

# Deploy Subscriptions

A Shippable deploy subscription is required for each environment you want to provisiona nd manage using Shippable. For example, if you run 2 Test environments, one Beta, and one Production environment, you will need 4 subscriptions.   

You do not have any Deploy subscriptions by default. You will need to add each one as described in the sections below. Deploy plans and pricing are explained in the [Plans and Pricing section](gs_plans.md)


##Adding a new subscription
You can add a new Deploy subscription as follows:
 
- Login to [Shippable](https://app.shippable.com)
- Click on the `Deploy` dropdown and select `Add subscription`
- This will take you to the Subscription Plan page.
    - Choose a name for your subscription. Ideally, the name should make it obvious what environment will be configured in this subscription. For example, `Test1`, `Test2`, `Beta` are good names.
    - Choose the amount of memory you need for your environment. This will be a total of all memory you need across all services in your application. Please note our free plan gives you 2GB and you will need a credit card for any memory you choose to buy beyond that.
- If you choose more than 2GB memory, you will need to choose an existing credit card or enter a new one.
- Enter your billing email address.
- Click on `Save`.   

You will now be redirected to your `Settings` page for the subscription. Further instructions are in our [Deploy configuration section](d_configure.md)

##Provisioning application infrastructure 
Before you can deploy your application, you need to provision the infrastructure you want to run your environment on. You can also choose to run your application on already existing infrastructure.

For more details and a guide on how to provision your application infrastructure, read the [Application infrastructure section](d_infrastructure.md) 

Once you have identified the infrastructure your application will be deployed to, you're ready to start configuring the application. More on that in the [Configuring services section](d_configure.md) 

##Subscription dashboard
You can view the status of all services in your application environment on the subscription dashboard. Your can navigate to your dashboard by clicking on the `Status` tab of your Deploy subscription.

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

## Teams and access
Since Deploy subscriptions aren't tightly coupled with your source control, you need to set up teams and grant access to your subscriptions from the Shippable UI.

We support 2 roles:

- **owner** can perform all possible actions for a subscription such as upgrade/downgrade plan, adding/removing team members, and adding/managing/deploying services.
- **collaborator** can only deploy services and view provisioning and deployment history.

To grant someone access to your subscription, you should:

   - Click on the `Teams` tab on the Subscription dashboard
   - In the `User search` box, enter the GitHub or Bitbucket username of the person you wish to add and click on `Find`
   - You can choose which role you want to assign to the person by selecting `owner` or `collaborator` in the dropdown. They will be added to the team immediately and they will now see the Deploy subscription in the dropdown on their Shippable landing page.
   
   <img src="../images/deploy_permissions.png" alt="Subscription Dashboard" style="width:800px;"/>
   
To remove access to your subscription, you can select `none` from the dropdown for the user and they will be removed from your team.

## Deleting your subscription
You can go to the `Billing` tab at any time and click on `Delete` in the `Delete subscription` section at the bottom. You will be asked to confirm the action before we go ahead and delete all your subscription data.

This action is not reversible, so please make sure you really want to delete your Deploy subscription.
