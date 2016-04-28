page_title: Shippable CI/CD Dashboard
page_description: Explanation of the CI/CD Dashboard
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml

# Projects
A project on Shippable CI corresponds to a repository in your source control that you have enabled for CI. To learn how to enable a repository, check out the Enable a project section in [Subscriptions doc](ci_subscriptions.md)

To get to the page for a particular project,

- Login to [Shippable](https://app.shippable.com)
- Click on the CI dropdown and select the subscription you want to view.
- This will bring you to Dashboard of the subscription which shows latest status for all your projects.
- Click on the project name to view the Project page. This will take you to the project dashboard.


## Dashboard
The Project Dashboard shows you the latest status of all branches of the project. You can also view in progress builds and build history.

The **Summary View** is the default when you navigate to this dashboard. It shows you the latest status for all branches that are built using Shippable. Latest status is defined as the build status for the latest commit build for that branch.

If a build is queued or in progress, you will see at the top of the summary view.

NOTE: To view time stamp for a build, hover the mouse over time details

The **History View** shows the build history across all branches in the project. You can filter this view by commit vs pull request builds, build status, and branch name.

### Manually building a branch
You can trigger manual builds for branch by clicking on `Build` for the branch in the **Summary View** of the project dashboard. If you cannot see the branch you want to build, check the `Show all branches` checkbox which will show all branches irrespective of whether they were ever built previously.

To rebuild a previous build, go to the **History view** and click on `Rebuild` for any build listed there.

### Deleting builds

You can **Delete builds** by clicking on the `Delete builds` button, checking the builds you want to delete, and clicking on `Delete`.

## Settings
You can perform project level actions by clicking on the `Settings` tab on the Project page.

### Syncing your project
We sync your account with your source control provider once every 4 hours. However, there are times when you want to force a sync in order to see recently changes that were made in your source control. You can force a sync by clicking on the `Sync` button in the Sync section of the Project settings page.
This action simply makes sure the permissions and repository changes from your source control are reflected in your Shippable project.

<a name="enable_integrations"></a>

### Enabling integrations
You can view all the configured integrations for your subscription by going to the 'Account Settings' for your subscription & clicking the 'Integration' tab. It will display a list of all integrations that are configured & available for your projects.

There are two ways you can enable an integration in the UI. When you use either of them, the enabled integration will be available for all your projects within your subsricption.

1. Through **Project Settings**: You can create an integration for the first time through the 'Settings' tab of your project. In the 'Settings' tab of your project, select the required integration dropdown & click 'Create Integration' as shown below.
<img src="../images/project_settings_integration.png" alt="Select Account Integration" style="width:800px;"/>
Proceed with the configuration of a specific integration. Once you create this integration, it'll be available for all projects in your subscription.

2. Through **Account Settings**: Alternatively, you can enable an integration by following the [instructions here](int_overview.md#adding-an-account-integration).


**IMPORTANT**: After creating the 'Integrations' in the UI, you'll need to configure the same in the `shippable.yml` file. More details on [yml config here](ci_configure.md). The same is true for any Docker registry integrations.

Instructions on specific account integrations are in our [Integrations section](int_overview.md)

### Clearing cache
You can clear cache for your project by clicking on the `Clear cache` button. This will clean up all cached Docker images from your build hosts and the next build will pull the build image again.

<a name="encrypt_env_variables"></a>
### Encrypting your environment variables
Shippable allows you to encrypt your environment variable definitions and keep your configurations private in your shippable.yml by using the `secure` tag.

To encrypt a variable, enter the environment variable and its values in the text box as shown below and click on `Encrypt`-

```
name=abc
```
To encrypt multiple variables, you can use the following syntax-

```
var1="abc" var2="xyz"
```
You can now use these encrypted variables in your shippable.yml with a secure tag . For example,

```
env:
  secure: <encrypted output>
```
### Build status badges
You can get embeddable build status badges for your project. These provide a visual indication of project status.

Select the branch you want the status for and also whether you want the 'Image URL' or 'Markdown' options. Copy the embedded code.

You can use this code anywhere you want to display the badge. For example, many customers  display this badge in the README.md of their project so anyone who goes to the project page on GitHub/Bitbucket can see it and know the project's status.  

### Code coverage badges
Similar to the build status badge, you can get embedded code coverage badges for your project, to provide visualization of the code coverage status for a repository.

Select the branch you want the status for and pick between the 'Image URL' or 'Markdown' options. Copy the embedded code.

You can use this code to display your code coverage report after code coverage runs. The badge displays appropriate colors depending on the code coverage configuration in the `shippable.yml`. Refer the  [documentation](http://docs.shippable.com/ci_configure/#test_code_coverage) on how to configure code coverage reports.


### Resetting the project
Resetting a project recreates all webhooks and deployment keys for your project. This should only be done if your project is in an inconsistent state and you need to restore it. Please note that you will need to re-encrypt all environment variables for your project after resetting it.

### Deleting the project
You can delete your project by clicking on the `Delete` button and then clicking on `Confirm`. Please note that deleting a project will delete all build history and delete all webhooks.

Deleting a project has no effect on the repository in your source control.
