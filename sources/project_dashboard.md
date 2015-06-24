page_title: Shippable Project Dashboard| Documentation | Shippable
page_description: Explanation of the Shippable Project Dashboard
page_keywords: project dashboard, CI/CD, shippable CI, documentation, shippable, config, yml

# CI Project Dashboard

This page walks through the details on the Project Dashboard, which gives you details on your Current Builds and Build History for your project.

## How do you get here?

- Login to [Shippable](http://shippable.com)
- Click on **CI** on the Shippable Landing Page and choose the appropriate subscription
- This brings you to the [Subscriptions Dashboard](ci_dashboard). If your project is enabled, it will show up on the dashboard. If not, click on the ![add icon](images/enable_icon.gif) to enable your project
- Click on the project name

The Project Dashboard has panels for Current Build and Build History for each branch.

![project_dashboard](images/project_dashboard.gif)


## Current Builds

The Current Build section shows the **commit** builds in progress for all branches in your project. If there are any PR builds, they will show up in the [PR builds](pr_builds) tab.


## Build History

You can view build history by branch. This is also where you can delete builds for any branch. Click on the **Delete Builds** button on the branch panel and choose the builds you would like to delete.

### Delete Builds

Click on the **Delete Builds** Button:

![delete_build1](images/delete_build1.gif)

Choose the builds you would like to delete and click **Confirm**

![delete_build2](images/delete_build2.gif)

### Re-run builds

You can click on the `Re-run` icon to re-run the historical build with the same build info.

### Run a new build

Clicking on the ![play](images/play_icon.gif) icon will kick off a new build for that project/branch.

