page_title: Shippable Lighthouse Image Watcher
page_description: How to watch images using Shippable's Lighthouse Feature
page_keywords: lighthouse, shippable ci, documentation, shippable, watch docker images

## Notifications

We can notify you aboyt your builds and deployment workflows through Slack, IRC, and Email. HipChat support is next on our list and will be available in Q1 of 2016.

To set up notifications via Slack or private IRC channels, you will need to configure account integrations with your credentials or keys to these services. 

Emails are always sent through our Shippable account, so you cannot customize the domain emails are sent from at this time. To request this enhancement, please contact [customer support](mailto:support@shippable.com)

### Slack notifications
You will need to configure this integration to send notifications to Slack channel(s). Notifications can be sent for build status updates, lighthouse image updates, and deployment updates.

**Configuring an incoming webhook on Slack**
1. Sign in to your Slack account and [go to this link to create an incoming webbook](https://my.slack.com/services/new/incoming-webhook/).
2. It does not matter which channel you choose while creating the webhook. We will override it when you configure the integration on Shippable.

**Set up Slack integration on Shippable**
1. From your Shippable dashboard, click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
2. **Integration type:** In the dropdown, select `Slack`
3. **Integration Name:** Use a distinctive name that's easy to recall. Example: `manishas-slack`
4. In the **URL** textbox, paste the webhook URL you created in the Slack UI above.
5. Click `Save`

You have now configured Slack and can use this integration during your CI and Deploy workflows.

### IRC notifications
You will need to configure this integration to send notifications to private IRC room(s). Public IRC channels can be configured without the need for an account integration.

1. From your Shippable dashboard, click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
2. **Integration type:** In the dropdown, select `IRC`
3. 3. **Integration Name:** Use a distinctive name that's easy to recall. Example: `manishas-irc-shippable`
4. Enter your channel key and if applicable, username and password.
5. Click `Save`

You have now configured your private IRC integration and can use this to send notifications during your CI and Deploy workflows.