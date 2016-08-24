page_title: GitHub integration with Shippable
page_description: How to integrate GitHub with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, Bitbucket, GitHub Enterprise, Bitbucket server, GitLab

# GitHub

GitHub integration is enabled for your Shippable account in one of 2 ways:

* You sign in to Shippable with your GitHub credentials. In this case, we automatically set up an Account Integration for you. You can see this integration by going to your Account Settings (gear menu in top navbar) and clicking on `Integrations` in the sidebar menu.
* You sign in to Shippable with another supported source control provider, and add a GitHub integrations through Account Settings -> Integrations. To do this, check out the [Adding an Integration` section](#addGithub).

---

##Adding a GitHub integration

If you did not sign in to Shippable with GitHub credentials but want to connect to your GitHub account for CI or Pipelines, you should add an account integration for GitHub.

This is achieved in 3 steps:

##### Add an account integration

* Go to your **Account Settings** by clicking on the gear menu in the top navbar.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Enter the following:
	* In the **Master Integration** dropdown, choose **GitHub** 
	* Add a friendly name for your integration
	* Create a [GitHub API token](https://github.com/settings/tokens) with the permissions you need and paste it in the **Token** textbox
* Click on **Save**. You should now see the integration in your list of integrations.

##### Add integration to your subscription

* Go to your Subscription's Settings tab. This should be the GitHub organization which contains the source control repo(s) you want to use with Shippable.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Name your integration with a friendly name. This can be the same name as the one in your account integration.
* From the dropdown, choose the account integration you just created in the step above.
* Click on **Save**.

The integration is now added to your subscription.

#####Use it in your CI or Pipeline configuration 

You can now use this account integration while configuring your CI or pipeline workflows. In your configurations, **you should use the friendly name for the integration from Subscription Settings**.

For example, if the integration is called `github-foo` in your subscription settings, you can use it in `shippable.resources.yml` as follows:

```
- name: github-repository                      #required
  type: gitRepo                             	#required
  integration: github-foo                     	#this is your github integration name
  pointer:
    sourceName: org/repo                  		#required
    branch: master                          	#optional
```
 
---
