page_title: Shippable CI/CD Dashboard
page_description: Explanation of the CI/CD Dashboard
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml

# Subscriptions, Projects & Builds



## Subscription Dashboard

- Login to [Shippable](http://shippable.com)
- This will bring you to the ***Summary*** page of the CI Subscriptions and Formations Dashboard


*****

### Summary View

The summary view when you get to the subscriptions dashboard is a list of your enabled projects. The view includes information at a project level about the following:

- Project Names
- Active branch of a project
- Status of the latest build for a project
- Last build number
- Time details of the latest build for a project such as Start time, duration and queued time

NOTE: To get time stamps, hover the mouse over time details

<img src="../images/project_dashboard_summary.png" alt="Dashboard Summary Page" style="width:800px;"/>

*****

### In Progress View
The In Progress view in the subscriptions dashboard is the list of builds that are currently in process and/or queued.

This view includes information at a build level about the following:

- Project Name
- Comments from the last commit
- Active branch of a project
- Status of the latest build for a project
- Last build number
- Person who initiated the build
- Time details of the latest build for a project such as Start time, duration and queued time

NOTE: To get time stamps, hover the mouse over time details


<img src="../images/project_dashboard_inprogress.png" alt="Dashboard In Progress Page" style="width:800px;"/>

*****

### History View
Shippable maintains the build history for all projects. The history view in the subscriptions dashboard displays the entire list of builds for all enabled projects. The view includes similar information described above at a build level.

<img src="../images/project_dashboard_history.png" alt="Dashboard History Page" style="width:800px;"/>

*****

### Enable a New Project

- From the home page, click on **CI** on the Shippable Landing page
- Click on a subscription from the dropdown

- Click on the ***Enable Project*** button on the right

<img src="../images/project_dashboard_list.png" alt="Dashboard List Page" style="width:800px;"/>

- This brings you to the page with the list of projects in your repo that are yet to be enabled.
- Click on the ***Enable*** button to enable a particular project. You could also the search function to look for a project.


<img src="../images/project_dashboard_enable_project.png" alt="Dashboard Enable Project Page" style="width:800px;"/>

- If you have recently added a project to github/bitbucket, click on the ***Sync*** button to sync your source code repo with Shippable.

*****

### Minion Usage

This indicates the number of minions or containers currently in use. It will also indicate the maximum number of containers available as per your subscription plan.