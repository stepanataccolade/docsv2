page_title: Bitbucket integration with Shippable
page_description: How to integrate Bitbucket with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, GitHub, GitHub Enterprise, Bitbucket server, GitLab


# Bitbucket
In order to integrate with your Bitbucket account, we automatically set up an Account integration when you log in using your Bitbucket credentials. You do not have to do anything to set this up further.

---

##Signing in with Bitbucket
To build repositories hosted on Bitbucket. you will need to authorize Shippable to access your repositories. 

To enable Bitbucket for public and private repositories:  

- Log in to [Shippable](https://app.shippable.com) using your Bitbucket credentials.
- Click on `Authorize application` button to authorize Shippable to access your public and private  repositories on Bitbucket (This is a one-time step). Provide your Bitbucket password, if prompted.
- Your subscription is ready to use aftet this step. 
- You can click on the top left menu icon to see a list of your Subscriptions. Choose the subscription you want.  
- In the 'CI' tab, click the 'Enable Project' section to view all your public and private repositories in Bitbucket. Proceed to [enabling a project](/navigatingUI/subscriptions/ci/#enable-project).
- If you don't see your projects in the above step, click on the Account settings (gear icon on the top navigation bar). In the 'Accounts' section click the `Sync` button.
- No additional step required for private repositories as the above step provides access to both public and private repositories hosted on Bitbucket.

---

##Pull Requests
Shippable also integrates with Bitbucket to build pull requests.

<img src="/ci/images/integrations/scm/bitbucket/prStatus.png" alt="Bitbucket PR Status" style="width:700px;"/>

The pull request build can be enabled or disabled by editing the webhook in Bitbucket.
To enable it:

- Go to Bitbucket Project Settings > Webhooks > Edit > Choose from a full list of triggers.
- Check Pull Request Created and Updated.
- To disable, uncheck the two options.

<img src="/ci/images/integrations/scm/bitbucket/webhookTriggers.png" alt="Bitbucket Webhook Triggers" style="width:300px;">

A few things to note here:

- The YML is always picked from the destination(base) branch.
- If the pull request comes from a private fork of the project and the subscription key is not added as a deploy key for the fork, the pull request build will fail at the `git_sync` CI step. This is due to the way Bitbucket handles permissions on private forks. To fix this:
     - Copy the subscription deploy key from Shippable Subscription > Settings > Deployment Keys
     - Next, add it as a deploy key for the private fork: Bitbucket Project Settings > Deploy Key > Add.

---

##Linking GitHub and Bitbucket Accounts
You can use Shippable to run builds on both GitHub and Bitbucket repositories, by connecting both your accounts on Shippable.

This helps in a consolidated view of all projects across both these source control systems.

To connect both these accounts, do the following:

- Sign into [Shippable](http://www.shippable.com) with either GitHub or Bitbucket account. Pick the account that you want as your primary account.
- Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Accounts' section.
- Under 'Git Identities', you'll see an option to enable GitHub, if you've signed in using Bitbucket and vice-versa.
- Click the `Enable` button under GitHub (or Bitbucket, if you've signed in using GitHub).
- Follow the authorization flow for GitHub (or Bitbucket). Provide your GitHub (or Bitbucket) credentials when prompted.

Once both your accounts are linked, you should see a consolidated list of orgs and projects in your account.

Going forward, you can sign in to Shippable with either GitHub or Bitbucket credentials.

**IMPORTANT**

- To see the linked account repositories updated immediately, click on the `Sync` button in 'Account Settings'.
- Prior to linking the accounts, if you have logged into Shippable using GitHub AND logged in using Bitbucket, you will be unable to link the accounts using the above method. To enable the linking of the accounts in such an instance, open [a support issue](https://github.com/Shippable/support/issues) with a request to delete one of the source control provider accounts within Shippable. Upon deletion, follow the above steps with the existing account to successfully link both the accounts.

Read our blog - [How to link GitHub and Bitbucket accounts](http://blog.shippable.com/how-to-link-github-and-bitbucket-accounts).

---
