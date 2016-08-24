# Continuous Integration overview

Shippable's Continuous Integration feature helps you automate unit testing, packaging, and deployment for any change in your source control repository.

Continuous Integration is an essential first part of a continuous delivery workflow and helps software teams ensure that their changes are built and tested with the latest version of the entire codebase. As a result, most bugs are found almost immediately after the code change is committed, leading to better quality since each bug can be easily isolated to a specific code change and fixed promptly.   

The following picture gives you more context of where CI fits in the end to end application delivery workflow. 

<img src="../images/appDeliveryPipelines.png"
alt="Application Delivery Pipelines" style="width:1200px;"/>


For more on Continuous Integration and why you should include it as part of your workflow, read Martin Fowler's article on the [Benefits of Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html#BenefitsOfContinuousIntegration)

---
##CI workflow 
The picture below shows a very basic CI workflow. Shippable received an incoming webhook from your source control and spins up a build machine. A Shippable agent comes up on the build machine and starts the build container, inside which your CI commands are executed. At the end of the build process, you can push to any endpoint. This endpoint can be an artifact repository like Artifactory or Docker Hub, or can be a PaaS/IaaS/Container Service endpoint.


<img src="../images/ciWorkflow.png"
alt="Continuous Integration workflow" style="width:1000px;"/>

Your CI workflow stops after deployment to an endpoint. If you want to define your end to end application delivery pipelines, check out our [Unified Pipelines section](../pipelines/overview/).

###Triggers

When a repository is enabled on Shippable, we enable webhooks on that repository and start listening to commit and pull request events.

Shippable automatically builds and tests your repositories when the following triggers are received-

* commit webhook
* webhook for a pull request opened for an enabled repository
* webhook for a git tag push event (GitHub only, turned off by default)
* webhook for a release event (GitHub only, turned off by default)

You can also initiate manual builds through the UI, by clicking on the Build button for any project or branch, irrespective of a webhook event.

###Configuration
You need to create a configuration file called **shippable.yml** and commit it to the root of the repository you want to build. This is mandatory for all enabled projects and tells us what the build should do. For the yml structure and how to configure it, check out the [Build Configuration page](shippableyml.md).


###Build flow

When a build is triggered, it is executed in the sequence below -

* First, we provision a build machine for you. Build machines have 2 cores, 3.75 GB RAM each. Provisioning can take anytime between 10 seconds to 4 mins, depending on whether your subscription already has a build machine running from an earlier build.
* Once the machine is available, the Shippable agent starts running on that machine.
* Commands in the `pre_ci` section are then executed on your build machine by the Shippable Agent.
* The next step is booting your build container. This will use our default Docker images if nothing is configured in the `pre_ci_boot` section of your yml. If that section is configured, it overrides the default image and boots up the build container specified.
* Next, we set the environment in the build container and clone your repository that is to be built.
* All commands in the `ci` section are executed in sequence inside the build container.
* Commands in the `post_ci` section are executed inside the build container.
* If the `ci` and `post_ci` sections were successful, commands in the `on_success` section are executed.
* If the `ci` and/or `post_ci` sections failed, commands in the `on_failure` section are execured.
* If notifications are configured in the yml, we will send out notifications about build results through the configured channel. Email notifications are on by default.

---

##Enabling private repositories

To enable GitHub integration for public repositories:  

- Log in to [Shippable](https://app.shippable.com) using your GitHub credentials.
- Click on `Authorize application` button to authorize Shippable to access your public repositories on GitHub (This is a one-time step). Provide your GitHub password, if prompted.
- Your subscription using your GitHub account is ready to use. In your 'Subscription', in the 'CI' tab, click the 'Enable Project' section to view all your public repositories in GitHub. Proceed to [enabling a project](/navigatingUI/subscriptions/ci/#enable-project).
- If you don't see your projects in the above step, click on the Account settings (gear icon on the top right hand navigation bar). In the 'Accounts' section click the `Sync` button.
- For private repositories, you need to one-time authorize Shippable to access them. You can do this by following the outlined steps:
- Ensure you have logged in to [Shippable](https://app.shippable.com) using your GitHub credentials.
- Click on the Account settings (gear icon on the top right hand navigation bar).
- In the 'Accounts' section and under 'Git Identities', click 'Enable' under 'GitHub'.
- Click `Authorize application` in the next page to enable access to private repositories.

<img src="/ci/images/integrations/scm/github/enablePvtRepoMv.gif" alt="Enable access to GitHub Private Repositories" style="width:700px;"/>

---  
##Build triggers

Shippable integrates with GitHub to build your pull requests and show status inline on your GitHub page for the PR.

Whenever a pull request is opened for a project that is enabled on Shippable, we will run a build for the respective pull request and send you a build status notification.

You can also see this status on your GitHub page as shown below:

<img src="/ci/images/integrations/scm/github/prStatus.png" alt="GitHub PR Status" style="width:700px;"/>

You can then merge the PR confidently if the build passes, or fix any issues that cause a failed build.

Each time your pull request is updated, we will kick off a new build and update status.

After you accept the pull request, Shippable will run one more build for the merged repo and will send email notifications for the merged repo.

###Terminology
Subscription->Organization


