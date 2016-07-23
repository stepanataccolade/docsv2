page_title: GitHub Enterprise integration with Shippable
page_description: How to integrate GitHub Enterprise with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, Bitbucket, GitHub, Bitbucket server, GitLab


# GitHub Enterprise
Currently, we do not support signing in to Shippable directly with your GitHub Enterprise credentials.

 In order to use Shippable for your GitHub Enterprise repositories, you will need to first sign in with GitHub or Bitbucket and then add an account integration.

##Adding the GitHub Enterprise integration
The steps to enable GitHub Enterprise integration with Shippable are:

- Log in to [Shippable](https://app.shippable.com) using your GitHub or Bitbucket credentials.
- Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
- Click on the `Add Integration` button.
- For 'Integration type', choose `GitHub Enterprise` from the list of dropdown choices.
- For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `GHE-Integration`.
- Enter the URL for your GitHub Enterprise instance. The URL should be in the format https://(git hub enterprise URL)/api/v3
- You will need to add a token from your GitHub Enterprise account with the right permissions. To do this -
    - Go to your GitHub Enterprise account settings and in the left menu, select
   `Personal access tokens`.
    - Click on `Generate token` and on the Generate Token page, select the following permissions as shown below:

    <img src="/ci/images/integrations/scm/githubEnterprise/permissions.png" alt="GitHub Enterprise Permissions" style="width:700px;"/>

    - Click on `Generate token`, and copy the generated token immediately. This is important since you will not see the token once you navigate away from this page.
    - Paste the token in your Integration on Shippable and click on `Save`.   
- After adding a GitHub Enterprise integration, you should go to the Account Settings tab and `Sync` your account.
- Go to your Shippable dashboard and check to make sure you have your GitHub Enterprise subscriptions in the CI dropdown.

You can now enable projects, run CI, etc just like with GitHub or Bitbucket subscriptions.

---
