page_title: Bitbucket Server integration with Shippable
page_description: How to integrate Bitbucket Server with Shippable
page_keywords: source control management system, continuous integration, continuous delivery, pipelines, git, GitHub, GitHub Enterprise, Bitbucket, GitLab

# Bitbucket Server

We support Bitbucket Server in 2 flavors:

- Using Shippaable SaaS, you can sign in to Shippable with your GitHub or Bitbucket credentials, and then add an integration to your account that enables you to build repositories hosted on your Bitbucket Server instance. This is described in the sections below.
- You can also buy Shippable Server and run it on-premises or behind your firewall in your private cloud. In this setup, we support authenticating against Bitbucket Server directly. If you are interested in this model, please send us an email to our [Sales team](mailto:sales@shippable.com)

##Adding the Bitbucket Server integration

Install the Shippable Add-on available in the [Atlassian Marketplace](https://marketplace.atlassian.com/plugins/shippable/cloud/overview).

Then [sign in to Shippable](https://app.shippable.com) using your GitHub/Bitbucket account and then add Bitbucket Server as an account integration as follows:

- Log in to [Shippable](https://app.shippable.com) using your GitHub or Bitbucket credentials.
- Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
- Click on the `Add Integration` button.
- For 'Integration type', choose `Bitbucket Server` from the list of dropdown choices.
- For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `BBS-Integration`.
- Enter the username used to login to your Bitbucket Server account in the **Username** textbox.
- Enter the URL for your Bitbucket Server instance in the 'URL' textbox. **Ensure there are no trailing slashes here**. Read the [FAQ](/faq/#i-cannot-start-a-manual-build-for-my-bitbucket-project-why-is-it-not-working) on this topic for more details.
- You will need to add a private token from your Bitbucket Server account. To do this -
    - Go to your Bitbucket Server account settings and in the left menu, select
    `Shippable Token`
    - Copy the private token provided
    - Paste the token in the **Token** textbox on Shippable and click on `Save`.
- After adding the Bitbucket Server integration, you should go to the Account Settings tab and `Sync` your Account.
- Go to your Shippable dashboard and check to make sure your Bitbucket Server subscriptions are available in the CI dropdown.

For more details, read the stepwise tutorial - [Using Shippable with Bitbucket Server](/tutorials/ci/integrations/scm/usingBitbucketServer/)

---
