page_title: Integrating Slack on the Shippable platform
page_description: Configure Slack to send out Slack notifications for Continuous Integration/Continuous Delivery actions
page_keywords: Integration, Integrate, Slack, Notify, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, email, HipChat, IRC


#Notifications
Shippable can notify you about your builds and deployment workflows through Slack, IRC, Email and HipChat.
To set up notifications via Slack, HipChat, Email or private IRC channels, you will need to configure account integrations with your credentials or keys to these services and configure the options in the `shippable.yml` file.

#Slack
Notifications can be sent for build status updates, monitoring your Docker image updates, and deployment updates. To send these notifications to Slack channel(s), you'll need to take both steps outlined below:

1. Set up Slack integration on Shippable through UI
2. Configure Slack notification options in the `shippable.yml` file

##1. Set up Slack integration through UI

There are three actions to set up the Slack integration through the UI. They are:

- Configure an incoming webhook on Slack
- Set up Slack integration in Account Settings
- Add the Slack integration to your subscription

###Configure an incoming webhook on Slack

1. Sign in to your Slack account and [go to this link to create an incoming webbook](https://my.slack.com/services/new/incoming-webhook/).
     - Provide credentials to your Slack account, if prompted.
2. In the 'Post Channel' section, use the dropdown and select a channel to create the webhook. It does not matter which channel you choose while creating the webhook. We will override it when you configure the integration on Shippable.
3. Click the 'Add Incoming Webhook integration' button.
4. Copy the text in the 'Webhook URL' section. It looks like this: `https://hooks.slack.com/services/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`.
5. Click the `Save Settings` button.

###Set up Slack integration in Account Settings
1. Login to [Shippable](https://app.shippable.com).
2. Go to Account Settings by clicking the gear icon on the top right navigation bar.
3. Click the 'Integrations' section.
4. Click the `Add Integration` button.
5. In the 'Master Integration' dropdown, select 'Slack'.
6. Provide an easy-to-remember name for the Slack integration, such as 'shippable-slack', in the 'Integration Name' field.
7. In the 'Webhook URL' field, paste the text from Slack's webhook URL from Step 4 in the above section
8. Provide the channel name or the user name where you would like the notifications to be sent.
9. Click the `Save` button.
10. The Slack integration will show up in the list of Account integrations.

###Add the Slack integration to your subscription
1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the Slack integration for your Subscription, such as 'slack-integration', in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the Slack account integration created.
7. Click the `Save` button.
8. The Slack integration will show up in the list of integrations for your subscription.

---

##2. Configure Slack notification options in the `shippable.yml`
To enable slack notification for your project, add the following to the `shippable.yml` file for that project.
```
integrations:
  notifications:
    - integrationName: slack-integration
      type: slack
      recipients:
        - "#channelOne"
        - "#channelTwo"
      branches:
        only:
          - master
          - dev
      on_success: never
      on_failure: always
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the Slack integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with error as  [described here **UpdateLink**](../continuous_integration/ci_troubleshoot/#Integration-name-specified-in-yml-does-not-match).
- `type` is `slack`.
- `recipients` specifies the channels you want to send the notification to. Please note this is a required field for slack notifications to work.
     - Even if there is a single recipient, use the format `recipients: "#channelOne"`
- [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches.
- [optional] You can set the following options for the `on_success`, `on_failure` tags:
     - The value `change` for `on_success` or `on_failure` fields means you will receive notifications only when the build status changes to success or failure respectively.
     - `always` means that you will always receive a notification for that build status.
     - `never` means that you will never receive a notification for that build status.
     - By default, `on_success` is set to `change` and `on_failure` is set to `always` when Slack is configured in the yml and you have not specified these tags.
- [optional] You can set the following options for the `on_start`, `on_pull_request` tags:
     - Setting the value to `always` means that you will always receive a notification for build start/pull request.
     - Setting the value to `never` means that you will never receive a notification for that build start/pull request.
     - By default, `on_start` is set to `never` and `on_pull_request` is set to `always` when Slack is configured in the yml and you have not specified these tags.

---


##Configuring Slack notifications to monitor Docker Images

You can add a Slack account integration to receive notifications for monitored Docker images. To do this:

1. Ensure you have configured [the monitoring of a Docker image](../navigating_ui/account_settings_images/).
2. Go to 'Account Settings' and click the 'Images' section.
3. Select the 'Image' you want to configure the Slack notifications.
4. Under the 'Notifications' section, use the dropdown for the 'Channel' field and select `slack`.
5. From the 'Slack Integrations' dropdown select the Slack integration created from your 'Account Settings'
     - If there is no HipChat integration, click `Create Integration` and create a HipChat Account Integration. Follow [these steps](###Set-up-Slack-integration-in-Account-Settings), if you need help.
6. In the 'Recipients' field, add the channel. For example: "#channelOne"
7. Click the `Add Item` button.
8. [Optional] Add additional recipients.
9. Click the `Save` button.

<img src="../images/slack_to_monitor_images.png" alt="Configure to be notified through Slack while monitoring a Docker image" style="width:700px;"/>

---

Check our blog ["Notifying CI failure/success status on Email and Slack"](http://blog.shippable.com/notifying-ci-failure/success-status-on-email-slack) for multiple scenarios.

---
