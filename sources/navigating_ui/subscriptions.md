page_title: Navigating Shippable's Subscriptions UI
page_description: Overview of Shippable's Subscriptions UI
page_keywords: User Interface, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


#Subscriptions
A subscription on Shippable corresponds to an individual or organizational subscription on GitHub/Bitbucket. Your pricing plans are enforced at this level, so you need to determine your minion needs for each subscription.

The Subscriptions page consists of 4 tabs:

1. CI (Continuous Integration) tab
2. Infra tab
3. Pipelines tab
4. Settings tab

##CI tab

The `CI` tab of your Subscription page shows you the latest status of all enabled projects. You can also view in progress builds and build history.

To get to the CI view,

- Login to [Shippable](https://app.shippable.com)
- Click on the `Subscriptions` dropdown and select the subscription you want to view.
- This will bring you to the CI tab which shows you the latest status for your projects.

<img src="../images/ci_subscriptions_mv_ci_dashboard.gif" alt="Continuous Integration Dashboard" style="width:700px;"/>


The **Summary View** is the default view when you navigate to this dashboard.

By default, you will see the status of the most recent commit builds for all enabled projects. The default branch of the repository, as configured in your source control account, is used.

You can customize the branch(es) shown on this page and also configure this view to include status for pull request builds. More details on this in the [Dashboard Settings for Projects](ci_projects/#dashboard-settings).

If a build is queued or in progress, you will see at the top of the 'Summary' view.

NOTE: To view time stamp for a build, hover the mouse over time details

<img src="../images/subscription_dashboard.png" alt="Subscription Dashboard" style="width:700px;"/>


The **History View** shows the build history across all enabled project in the subscription. You can filter this view by commit vs pull request builds, build status, and project name.

You can also see how many minions are being used at the current time by looking at the **Minion usage** count.
