page_title: Running your first sample build
page_description: Setup up documentation for a sample build
page_keywords: getting started, build, quick start, documentation, shippable, continous integration

# Running a sample CI build
<<<<<<< HEAD

This guide walks through the process of running a sample build for Shippable CI. A NodeJs sample application (Aye0Aye) is leveraged for this sample.
=======
This guide walks through the process of running a sample build for **Shippable CI (Continuous Integration)**. A NodeJs sample application (Aye0Aye) is leveraged
>>>>>>> 574bef1b618e95ceeaaf29baa7ac21bdb4826892

## Pre-requisite
Fork the following GitHub repository in order to complete the tutorial:

- Sample app: <https://github.com/aye0aye/micro-www> 

<img src="../images/aye0aye_fork.png" alt="Aye0Aye Fork" style="width:800px;"/>

## Sign into Shippable
- Login to [Shippable](<http://www.shippable.com>) using your source code system. For this tutorial GitHub is used. 

## Enable a Repo
<<<<<<< HEAD
To enable the forked repository for CI, activate the repo on the ‘New Project’ page (Note: if you haven’t enabled any projects previously, you’ll be on the ‘New Project’ page automatically). Select the ‘Enable project’ in the upper right of the Status page):
=======
To enable the forked repository (repo) for Shippable's CI, activate the repo on the ‘New Project’ page (Note: if you haven’t enabled any projects previously, you’ll be on the ‘New Project’ page automatically). Select the ‘+’ in the upper right of the Status page):
>>>>>>> 574bef1b618e95ceeaaf29baa7ac21bdb4826892

- Select your subscription for Shippable's Continuous Integration (CI). The example shown below has a demo subscription. 
<img src="../images/account_settings_subscription.png" alt="Account Settings Subscription" style="width:800px;"/>

- Click on the ***Enable Project*** which brings you to the page with the list of projects in your repo that are yet to be enabled. ***Enable*** the **micro-www** project.
<img src="../images/project_dashboard_enable_project.png" alt="Enable Project" style="width:800px;"/>

- If **micro-www** repo is not showing up in the list, click on the ***Sync*** icon in the Settings tab to sync your source code repo with your Shippable subscription. This step is not needed if you were able to successfully enable the project.

<img src="../images/account_settings_sync2.png" alt="Force Sync" style="width:800px;"/>


## Run a CI build
- Upon successfully enabling the **micro-www** project, your page should look like this. The URL shows the **Project ID** for this project.

<img src="../images/aye0aye_initiate_build.png" alt="Aye0Aye Initiate Build" style="width:800px;"/>


- Click ***Build*** to trigger your CI build 

## Successful CI build
Congrats, you have successfully run your build. A sample, successful build is shown below. The URL shows the **Build ID** for this build within the **micro-www** project.
<img src="../images/aye0aye_success_build.png" alt="Aye0Aye Successful Build" style="width:800px;"/>