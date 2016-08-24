page_title: Bitbucket integration with Shippable
page_description: How to integrate Bitbucket with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, GitHub, GitHub Enterprise, Bitbucket server, GitLab


# Bitbucket

Bitbucket integration is enabled for your Shippable account in one of 2 ways:

* You sign in to Shippable with your Bitbucket credentials. In this case, we automatically set up an Account Integration for you. You can see this integration by going to your Account Settings (gear menu in top navbar) and clicking on `Integrations` in the sidebar menu.
 
* You sign in to Shippable with another supported source control provider, and add a Bitbucket integrations through Account Settings -> Integrations. To learn how to do this, read the [Adding a Bitbucket integration section](#addBitbucket). 

---

##Signing in with Bitbucket
To build repositories hosted on Bitbucket. you will need to authorize Shippable to access your repositories. 

To enable Bitbucket for public and private repositories:  

- Log in to [Shippable](https://app.shippable.com) using your Bitbucket credentials.
- Click on `Authorize application` button to authorize Shippable to access your public and private  repositories on Bitbucket (This is a one-time step). Provide your Bitbucket password, if prompted.
- Your subscription is ready to use aftet this step. 
- You can click on the top left menu icon to see a list of your Subscriptions. Choose the subscription you want.  
- In the 'CI' tab, click the 'Enable Project' section to view all your public and private repositories in Bitbucket. Proceed to [enabling a project](../../navigatingUI/subscriptions/ci/#enable-project).
- If you don't see your projects in the above step, click on the Account settings (gear icon on the top navigation bar). In the 'Accounts' section click the `Sync` button.
- No additional step required for private repositories as the above step provides access to both public and private repositories hosted on Bitbucket.

---

<a name="addBitbucket"></a>
##Adding a Bitbucket integration

If you did not sign in to Shippable with Bitbucket credentials but want to connect to your Bitbucket account for CI or Pipelines, you should add an account integration for Bitbucket.

This is achieved in 3 steps:

##### Add an account integration

* Go to your **Account Settings** by clicking on the gear menu in the top navbar.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Enter the following:
	* In the **Master Integration** dropdown, choose **Bitbucket** 
	* Add a friendly name for your integration
	* Create a **Bitbucket API token** with the right settings and paste it in the **Token** textbox 
* Click on **Save**. You should now see the integration in your list of integrations.


#####Set up CI for your repositories 
If you don't want to use your integration to enable repositories for CI, skip this section and go to the next. 

* In your Account Settings, click on `Sync`.
* Go to your Home dashboard. Click on the Subscription dropdown on the top left of your screen.
* You should see your Organizations from Bitbucket in your list of subscriptions.
* Click on any Bitbucket organization and you should be able to enable projects for [CI](../../ci/overview/).

#####Use your integration in your Pipeline configuration 

* Go to your Subscription's Settings tab. This should be the Subscription where you want to set up your pipelines.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Name your Bitbucket integration with a friendly name. This can be the same name as the one in your account integration.
* From the dropdown, choose the account integration you just created in the step above.
* Click on **Save**.

The integration is now added to your subscription. You can now use this account integration while configuring your Pipeline workflows. In your configurations, **you should use the friendly name for the integration from Subscription Settings**.

For example, if the integration is called `bitbucket-foo` in your subscription settings, you can use it in `shippable.resources.yml` as follows:

```
- name: bitbucket-repository                  	#required
  type: gitRepo                             	#required
  integration: bitbucket-foo                  	#this is your Bitbucket integration name
  pointer:
    sourceName: org/repo                  		#required
    branch: master                          	#optional
```
 
---