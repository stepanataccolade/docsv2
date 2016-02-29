page_title: Shippable CI/CD Dashboard
page_description: Explanation of the CI/CD Dashboard
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml

#CI dashboard	
A subscription on Shippable corresponds to an individual or organizational subscription on GitHub/Bitbucket. Your pricing plans are enforced at this level, so you need to determine your minion needs for each subscription.

To get to the CI dashboard,

- Login to [Shippable](https://app.shippable.com)
- Click on the `Subscriptions` dropdown and select the subscription you want to view.
- This will bring you to the CI tab which shows you the latest status for your projects.

## Status
The `CI` tab of your Subscription page shows you the latest status of all enabled projects. You can also view in progress builds and build history.

<img src="../images/subscription_dashboard.png" alt="Subscription Dashboard" style="width:800px;"/>

The **Summary View** is the default when you navigate to this dashboard. It shows you the latest status for all enabled projects. Latest status is defined as the build status for the latest commit build on the default branch. If no default branch exists for your project, project status is latest commit build status for the master branch, and if no master branch exists, then the project status is the build status of latest commit build across all branches.

If a build is queued or in progress, you will see at the top of the summary view. 

NOTE: To view time stamp for a build, hover the mouse over time details

The **History View** shows the build history across all enabled project in the subscription. You can filter this view by commit vs pull request builds, build status, and project name. 

You can also see how many minions are being used at the current time by looking at the **Minion usage** count. 


## Project actions

You can enable projects and trigger manual builds from the CI tab of the Subscription page.

###Enabling a project

You can enable a project for CI by going to the clicking on the `Enable Project` button. 

<img src="../images/project_dashboard_list.png" alt="Dashboard List Page" style="width:800px;"/>

- This brings you to the page with the list of repositories that not yet enabled in your subscription.
- Click on the `Enable` button to enable a particular repository. You could also the search function to look for a repository and enable it.

<img src="../images/project_dashboard_enable_project.png" alt="Dashboard Enable Project Page" style="width:800px;"/>

- If you have recently added a repository to github/bitbucket, click on the `Sync` button and check to see if you can see your new repository.

After enabling a project you will be redirected to the project's page on Shippable. More details on this are in our [Projects section](ci_projects.md)

### Building a Project
Once enabled, you can build a project in the following ways -

* Committing a change to the repository in your source control.This automatically triggers a build for the project on Shippable.
* Opening a pull request to an enabled repository. This automatically triggers a build on Shippable.  
* Triggering a manual build from the Shippable UI (This will build latest code)
* Rebuilding a previous build from the Shippable UI

You can trigger manual builds for an enabled project by clicking on `Build` for a project in the **Summary View** of the subscription dashboard. To rebuild a previous build, go to the **History view** and click on `Rebuild` for any build listed there. 

## Settings
You can perform subscription level actions by clicking on the `Settings` tab on the Subscription page.

<a name="ci_byoh"></a>
### Adding your own build infrastructure (BYOH)
By default, all your builds run inside build containers hosted on Shippable's infrastructure. However, you can choose to run your builds on your own infrastructure, i.e. you can 'Bring your own hosts (BYOH)'. To understand the advantages of BYOH, check out the [CI Overview section](ci_overview.md).

The 'Build Infrastructure' section lets you set up your own infrastructure if desired. 
To do so, select the radio button for `I want to use my own build machines` and follow instructions for adding a build node below.

#### Adding a build node
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
    
#### Editing a build node
You can click on the `Edit` button for a build node to edit node name and in the case of your own build infrastructure, the SSH port number.

#### Re-initializing a build node
You can reinitialize a node by clicking on the `Reinitialize` button. This will reset the node and initialize/install everything from scratch. You can only reinitialize nodes provisioned on Shippable's infrastructure. If you have added your own build nodes, you will need to redownload the initialization script and run it on your node.

#### Deleting a build node
Click on `Delete` to delete your build node. This action is final and cannot be undone.

### Syncing your subscription
We sync your subscription with your source control provider once every 4 hours. However, there are times when you want to force a sync in order to see recently changes that were made in your source control. You can force a sync by clicking on the `Sync` button in Subscription settings.
This action simply makes sure the permissions and repository changes from your source control are reflected in your Shippable subscription.
  
### Deployment key
The Deployment key section shows the SSH public key associated with your Shippable Account. You will need this key to deploy to cloud providers that supports git based deployments like Heroku and Red Hat Openshift. This key is also used to encrypt any environment variables that you want to use during your build.

Our How To guides provide instructions on how to enable continuous deployment to different providers.

### Resetting your CI projects
Resetting a subscription recreates all webhooks and deployment keys for your subscription. This should only be done if your subscription is in an inconsistent state and you need to restore it. Please note that you will need to re-encrypt all environment variables for your subscription after resetting it.


