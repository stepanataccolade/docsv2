page_title: GitLab integration with Shippable
page_description: How to integrate GitLab with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, Bitbucket, GitHub Enterprise, Bitbucket server, GitHub

# GitLab
Currently, in order to integrate with GitLab, you need to sign into Shippable using your GitHub/Bitbucket account and then add GitLab as an account integration.

##Adding GitLab Account integration
The steps to add GitLab integration are as follows:

- Log in to [Shippable](https://app.shippable.com) using your GitHub or Bitbucket credentials.
- Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
- Click on the `Add Integration` button.
- For 'Integration type', choose `GitLab` from the list of dropdown choices.
- For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `GitLab-Integration`.
- Enter the URL for your GitLab instance. The URL should be in the format https://(GitLab URL)/api/v3. For example, if you're using gitlab.com, this will `https://gitlab.com/api/v3`
- You will need to add a private token from your GitLab account. To do this -
    - Go to your GitLab profile settings and in the left menu, select
    `Account`
    - Copy the private token provided
    - Paste the token in your integration on Shippable and click on `Save`.
- After adding the GitLab integration, you should go to the Account Settings tab and `Sync` your Account.
- Go to your Shippable dashboard and check to make sure your GitLab subscriptions are available in the CI dropdown.

---
