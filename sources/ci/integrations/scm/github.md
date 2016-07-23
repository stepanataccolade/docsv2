page_title: GitHub integration with Shippable
page_description: How to integrate GitHub with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, Bitbucket, GitHub Enterprise, Bitbucket server, GitLab

# GitHub
Both public & private GitHub repositories are supported on Shippable.

In order to integrate with your GitHub account, we automatically set up an Account integration when you log in using your GitHub credentials.

##Enabling GitHub account integration

- To enable GitHub integration for public repositories:  
     - Log in to [Shippable](https://app.shippable.com) using your GitHub credentials.
     - Click on `Authorize application` button to authorize Shippable to access your public repositories on GitHub (This is a one-time step). Provide your GitHub password, if prompted.
     - Your subscription using your GitHub account is ready to use. In your 'Subscription', in the 'CI' tab, click the 'Enable Project' section to view all your public repositories in GitHub. Proceed to [enabling a project](/navigatingUI/subscriptions/ci/#enable-project).
     - If you don't see your projects in the above step, click on the Account settings (gear icon on the top right hand navigation bar).
          - In the 'Accounts' section click the `Sync` button.
- For private repositories, you need to one-time authorize Shippable to access them. You can do this by following the outlined steps:

     - Ensure you have logged in to [Shippable](https://app.shippable.com) using your GitHub credentials.
     - Click on the Account settings (gear icon on the top right hand navigation bar).
     - In the 'Accounts' section and under 'Git Identities', click 'Enable' under 'GitHub'.
     - Click `Authorize application` in the next page to enable access to private repositories.

<img src="/ci/images/integrations/scm/github/enablePvtRepoMv.gif" alt="Enable access to GitHub Private Repositories" style="width:700px;"/>

---  
##Pull Requests

Shippable integrates with GitHub to build your pull requests and show status inline on your GitHub page for the PR.

Whenever a pull request is opened for a project that is enabled on Shippable, we will run a build for the respective pull request and send you a build status notification.

You can also see this status on your GitHub page as shown below:

<img src="/ci/images/integrations/scm/github/prStatus.png" alt="GitHub PR Status" style="width:700px;"/>

You can then merge the PR confidently if the build passes, or fix any issues that cause a failed build.

Each time your pull request is updated, we will kick off a new build and update status.

After you accept the pull request, Shippable will run one more build for the merged repo and will send email notifications for the merged repo.

---

##Linking GitHub and Bitbucket Accounts
You can use Shippable to run builds on both GitHub and Bitbucket repositories, by connecting both your accounts on Shippable.

This helps in a consolidated view of all projects across both these source control systems.

To connect both these accounts, do the following:

- Sign into [Shippable](http://www.shippable.com) with either GitHub or Bitbucket account. Pick the account that you want as your primary account.
- Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Accounts' section.
- Under 'Git Identities', you'll see an option to enable Bitbucket, if you've signed in using GitHub and vice-versa.
- Click the `Enable` button under Bitbucket (or GitHub, if you've signed in using Bitbucket).
- Follow the authorization flow for Bitbucket (or GitHub). Provide your Bitbucket (or GitHub) credentials when prompted.

Once both your accounts are linked, you should see a consolidated list of orgs and projects in your account.

Going forward, you can sign in to Shippable with either GitHub or Bitbucket credentials.

**IMPORTANT**

- To see the linked account repositories updated immediately, click on the `Sync` button in 'Account Settings'.
- Prior to linking the accounts, if you have logged into Shippable using GitHub AND logged in using Bitbucket, you will be unable to link the accounts using the above method. To enable the linking of the accounts in such an instance, open [a support issue](https://github.com/Shippable/support/issues) with a request to delete one of the source control provider accounts within Shippable. Upon deletion, follow the above steps with the existing account to successfully link both the accounts.

Read our blog - [How to link GitHub and Bitbucket accounts](http://blog.shippable.com/how-to-link-github-and-bitbucket-accounts).

---
