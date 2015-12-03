page_title: Running your first sample build
page_description: Setup up documentation for a sample build
page_keywords: getting started, build, quick start, documentation, shippable, continous integration, MT-CI

# Running a sample CI build
This guide walks through the process of running a sample build for **Shippable MT-CI (Multi Tenant - Continuous Integration)**. A NodeJs sample application (Aye0Aye) is leveraged

## Pre-requisite
Fork the following GitHub repository in order to complete the tutorial

- Sample app: <https://github.com/aye0aye/micro-www> 

<img src="./images/aye0aye_fork.png" alt="e2e pipeline" style="width:800px;"/>

## Sign into Shippable
- Login to [Shippable](<http://www.shippable.com>) using your source code system. For this tutorial GitHub is used. 

## Enable a Repo
To enable the forked repository for Shippable's CI, activate the re on the ‘New Project’ page (Note: if you haven’t enabled any projects previously, you’ll be on the ‘New Project’ page automatically). Select the ‘+’ in the upper right of the Status page):

- Click on the ![add icon](images/add_icon.gif) icon to the right of the header bar to enable the project/repos.
- This brings you to the page with the list of projects (**micro-www**) in your repo that are yet to be enabled.
- Click on the ![key](images/enable_icon.gif) icon to enable the project
- If micro-www repo is not showing up on the new projects list, click on the **force sync** icon in the Account Settings (top, right corner navigation bar)to sync your source code repo with Shippable.

<img src="./images/aye0aye_new_project.png" alt="e2e pipeline" style="width:800px;"/>


## Run a CI build
- Your page should look like this

<img src="./images/aye0aye_initiate_build.png" alt="e2e pipeline" style="width:800px;"/>


- Click on the "Play" icon to trigger your CI build 
![Play](images/play_icon.gif)

## Successful CI build
Congrats, you have successfully run your build. A sample, successful build is shown below
<img src="./images/aye0aye_success_build.png" alt="e2e pipeline" style="width:800px;"/>