page_title: GitLab integration with Shippable
page_description: How to integrate GitLab with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, Bitbucket, GitHub Enterprise, Bitbucket server, GitHub

# GitLab
In order to integrate with GitLab, you need to sign into Shippable using your GitHub/Bitbucket account and then add GitLab as an account integration.

If you did not sign in to Shippable with GitLab credentials but want to connect to your Gitlab account for CI or Pipelines, you should add an account integration for Gitlab.


##Adding a Gitlab integration

To add an integration for GitHub Enterprise, you will first need to sign in with GitHub or Bitbucket credentials.

This is achieved as follows:

##### Add an account integration

* Go to your **Account Settings** by clicking on the gear menu in the top navbar.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Enter the following:
	* In the **Master Integration** dropdown, choose **Gitlab** 
	* Add a friendly name for your integration
	* Enter the URL for your GitLab instance. The URL should be in the format https://(GitLab URL)/api/v3. For example, if you're using gitlab.com, this will `https://gitlab.com/api/v3`
	* Copy your **Gitlab private token** and paste it in the **Token** textbox. To get your token,  go to your GitLab profile settings, select `Account` from the left menu, and copy the private token provided
* Click on **Save**. You should now see the integration in your list of integrations.


#####Set up CI for your repositories 
If you don't want to use your integration to enable repositories for CI, skip this section and go to the next. 

* In your Account Settings, click on `Sync`.
* Go to your Home dashboard. Click on the Subscription dropdown on the top left of your screen.
* You should see your Organizations from Gitlab in your list of subscriptions.
* Click on any Gitlab organization and you should be able to enable projects for [CI](../../ci/overview/).

#####Use your integration in your Pipeline configuration 

* Go to your Subscription's Settings tab. This should be the Subscription where you want to set up your pipelines.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Name your Gitlab integration with a friendly name. This can be the same name as the one in your account integration.
* From the dropdown, choose the account integration you just created in the step above.
* Click on **Save**.

The integration is now added to your subscription. You can now use this account integration while configuring your Pipeline workflows. In your configurations, **you should use the friendly name for the integration from Subscription Settings**.

For example, if the integration is called `gitlab-foo` in your subscription settings, you can use it in `shippable.resources.yml` as follows:

```
- name: gitlab-repository                      #required
  type: gitRepo                             	#required
  integration: gitlab-foo                     	#this is your gitlab integration name
  pointer:
    sourceName: org/repo                  		#required
    branch: master                          	#optional
```
 
---
