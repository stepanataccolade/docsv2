page_title: GitHub integration with Shippable
page_description: How to integrate GitHub with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, Bitbucket, GitHub Enterprise, Bitbucket server, GitLab

# GitHub

GitHub integration is enabled for your Shippable account in one of 2 ways:

* You sign in to Shippable with your GitHub credentials. In this case, we automatically set up an Account Integration for you. You can see this integration by going to your Account Settings (gear menu in top navbar) and clicking on `Integrations` in the sidebar menu.
 
* You sign in to Shippable with another supported source control provider, and add a GitHub integrations through Account Settings -> Integrations. To learn how to do this, read the [Adding a GitHub integration section](#addGithub).

---

##Signing in with GitHub
To build repositories hosted on GitHub. you will need to authorize Shippable to access your repositories. 

To enable public repositories:  

- Log in to [Shippable](https://app.shippable.com) using your GitHub credentials.
- Click on `Authorize application` button to authorize Shippable to access your public 
  repositories on GitHub (This is a one-time step). Provide your GitHub password, if prompted.
- Your account is ready to use after this step. 
- You can click on the top left menu icon to see a list of your Subscriptions. Choose the subscription you want.  
- In the 'CI' tab, click the 'Enable Project' section to view all your public and private repositories. Proceed to [enabling a project](../../navigatingUI/subscriptions/ci/#enable-project).
- If you don't see your projects in the above step, click on the Account settings (gear icon on the top navigation bar). In the 'Accounts' section click the `Sync` button.

To enable private repositories:

- Go to your **Account Settings** by clicking on the gear icon on the right of the top navbar.
- In the **Git identities** section, authorize Shippable for private repositories.

---

<a name="addGithub"></a>
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
	* Create a [GitHub API token](https://github.com/settings/tokens) with the right settings and paste it in the **Token** textbox 
* Click on **Save**. You should now see the integration in your list of integrations.


#####Set up CI for your repositories 
If you don't want to use your integration to enable repositories for CI, skip this section and go to the next. 

* In your Account Settings, click on `Sync`.
* Go to your Home dashboard. Click on the Subscription dropdown on the top left of your screen.
* You should see your Organizations from GitHub in your list of subscriptions.
* Click on any GitHub organization and you should be able to enable projects for [CI](../../ci/overview/).

#####Use your integration in your Pipeline configuration 

* Go to your Subscription's Settings tab. This should be the Subscription where you want to set up your pipelines.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Name your GitHub integration with a friendly name. This can be the same name as the one in your account integration.
* From the dropdown, choose the account integration you just created in the step above.
* Click on **Save**.

The integration is now added to your subscription. You can now use this account integration while configuring your Pipeline workflows. In your configurations, **you should use the friendly name for the integration from Subscription Settings**.

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
