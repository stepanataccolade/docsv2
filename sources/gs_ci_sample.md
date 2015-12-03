page_title: Running your first sample build
page_description: Setup up documentation for a sample build
page_keywords: getting started, build, quick start, documentation, shippable, continous integration, MT-CI

# Running a sample build
This guide walks through the process of running a sample build for **Shippable MT-CI (Multi Tenant - Continuous Integration)**. A two-tier NodeJs sample application (Aye0Aye) is leveraged

## Pre-requisite
Fork the following GitHub repositories in order to complete the tutorial

- Sample app front-end: <https://github.com/aye0aye/micro-www> 

- Sample app back-end: <https://github.com/aye0aye/micro-api>


## Sign into Shippable
- Login to [Shippable](<http://www.shippable.com>) using your source code system, for this tutorial GitHub. 
- Click the "Account Settings" icon on the top, upper right navigation bar.
![Account Settings](images/account_settings.gif)


- Select ‘Force Sync’ to ensure your source code system (such as GitHub, BitBucket) permissions are synced.

![Account Settings](images/account_settings_sync.gif)

## Enable a Repo
To enable your forked repositories for Shippable's CI, activate each of the repos on the ‘New Project’ page (Note: if you haven’t enabled any projects previously, you’ll be on the ‘New Project’ page automatically). Select the ‘+’ in the upper right of the Status page):

- Click on the ![add icon](images/add_icon.gif) icon to the right of the header bar to enable the project/repos.
- This brings you to the page with the list of projects (**micro-www** and **micro-api**) in your repo that are yet to be enabled.
- Click on the ![key](images/enable_icon.gif) icon to enable the project
- If micro-www and micro-api repos are not showing up on the new projects list, click on the **force sync** icon to sync your source code repo with Shippable.

![new project](images/aye0aye_new_project.gif)

## Run a CI build
- Your page should look like this
![Build](images/build_badge.gif)
- Click on the "Play" icon to trigger your CI build 
![Play](images/play_icon.gif)

## Successful CI build
Congrats, you have successfully run your build. A sample, successful build is shown below
![Build](images/build_dashboard.gif)