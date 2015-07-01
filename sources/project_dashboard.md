page_title: Shippable Project Dashboard
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


## Branches

The top panel shows the latest **commit** builds for all branches in your project. PR builds are not shown in this section.

## Processing and Queued Builds

This panel lists all the builds across branches queued and waiting for a container to be freed up. Remember, the number of parallel builds that can be run depends on the number of containers in your plan.

## Build History

You can view build history by branch. By default, the build history shows both commit and PR builds for all branches. You can choose the different tabs to see only PR builds or Commit Builds.

### Filter by branch

You can filter by branch by using the dropdown in the **Build History** panel.

![all branches](images/all_branches.gif)

### Commit Builds

Click on the **Commits** tab under Build History to see a filtered list of commit builds for the selected branch(es).

### PR Builds

Shippable is integrated with GitHub to show your pull request status on
CI. Whenever a pull request is opened for your repo, we will run the
build for the respective pull request and notify you about the status.
You can decide whether to merge the request or not, based on the status
shown. If you accept the pull request, Shippable will run one more build
for the merged repo and will send email notifications for the merged
repo.

Click on the **Pull Requests** tab under Build History to see a filtered list of PR builds for the selected branch(es).


### Delete Builds

Click on the **Delete Builds** Button under Build History:

![delete_build1](images/delete_build1.gif)

Choose the builds you would like to delete and click **Confirm**:

![delete_build2](images/delete_build2.gif)

