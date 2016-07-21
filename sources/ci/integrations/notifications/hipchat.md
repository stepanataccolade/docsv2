page_title: Integrating HipChat on the Shippable platform
page_description: Configure HipChat to send out notifications for Continuous Integration/Continuous Delivery actions
page_keywords: Integration, Integrate, Slack, Notify, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, email, HipChat, IRC

#HipChat
Notifications can be sent for build status updates, monitoring your Docker image updates, and deployment updates. To send these notifications to HipChat room(s) and user(s), you'll need to take both steps outlined below:

1. Set up HipChat integration on Shippable through UI
2. Configure HipChat notification options in the `shippable.yml` file

##1. Set up HipChat integration through UI

There are two actions to set up the HipChat integration through the UI. They are:

- Generate a token for API access
- Add the HipChat integration to your subscription

###Generate a token for API access

1. Sign in to your HipChat account using [this link to generate a token](https://www.hipchat.com/account/api).
     - Provide credentials to your HipChat account, if prompted.
2. Create a token with `Send Message` and `Send Notification` scopes.

###Add the HipChat integration to your subscription
1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. In the 'Account Integrations' dropdown list review if you have a HipChat account integration already created. If you have, select it and go to Step 12.
6. If you do not find an existing HipChat account integration, then select '+Add Integration' option.
7. In the 'Master Integration' dropdown, select 'HipChat'.
8. Provide an easy-to-remember name for the HipChat integration, such as 'hipchat-account', in the 'Integration Name' field.
9. In the 'Token' field, paste the token from HipChat's UI from Step 2 in the above section.
10. Click the `Save` button.
11. Provide an easy-to-remember name for the HipChat integration for your Subscription, such as 'hipchat-integration', in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
12. From the 'Account Integrations' dropdown select the HipChat account integration created.
13. Click the `Save` button.
14. The HipChat integration will show up in the list of integrations for your subscription.

<img src="/ci/images/integrations/notifications/hipchat/addIntMv.gif" alt="Add HipChat Integration on Shippable" style="width:700px;"/>

---

##2. Configure HipChat notification options in the `shippable.yml`
To enable HipChat notification for your project, add the following to the `shippable.yml` file for that project.
```
integrations:
  notifications:
    - integrationName: hipchat-integration
      type: hipchat
      recipients:
        - "#roomOne"
        - "#roomTwo"
        - "@userOne"
      branches:
        only:
          - master
          - dev
      on_success: never
      on_failure: always
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the HipChat integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match).
- `type` is `hipchat`.
- `recipients` specifies the rooms and/or users you want to send the notification to. Please note this is a required field for HipChat notifications to work.
     - Even if there is a single recipient, use the format `recipients: "#roomOne"` for rooms and `@userOne` for users.
- [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches.
- [optional] You can set the following options for the `on_success`, `on_failure` tags:
     - The value `change` for `on_success` or `on_failure` fields means you will receive notifications only when the build status changes to success or failure respectively.
     - `always` means that you will always receive a notification for that build status.
     - `never` means that you will never receive a notification for that build status.
     - By default, `on_success` is set to `change` and `on_failure` is set to `always` when HipChat is configured in the yml and you have not specified these tags.
- [optional] You can set the following options for the `on_start`, `on_pull_request` tags:
     - Setting the value to `always` means that you will always receive a notification for build start/pull request.
     - Setting the value to `never` means that you will never receive a notification for that build start/pull request.
     - By default, `on_start` is set to `never` and `on_pull_request` is set to `always` when HipChat is configured in the yml and you have not specified these tags.

Check our blog [on configuring HipChat for both CI and Pipelines](http://blog.shippable.com/hipchat-integration-is-here).

---

##Configuring HipChat notifications to monitor Docker Images

You can add a HipChat account integration to receive notifications for monitored Docker images. To do this:

1. Ensure you have configured [the monitoring of a Docker image](/navigatingUI/accountSettings/images/).
2. Go to 'Account Settings' and click the 'Images' section.
3. Select the 'Image' you want to configure the HipChat notifications.
4. Under the 'Notifications' section, use the dropdown for the 'Channel' field and select `hipchat`.
5. From the 'hipchat Integrations' dropdown select the hipchat integration created from your 'Account Settings'.
     - If there is no HipChat integration, click `Create Integration` and create a HipChat Account Integration. Follow [these steps](#Set-up-HipChat-integration-in-Account-Settings), if you need help.
6. In the 'Recipients' field, add the room and/or users. For example: "#roomOne" and/or "@userOne"
7. Click the `Add Item` button.
8. [Optional] Add additional recipients.
9. Click the `Save` button.

<img src="/ci/images/integrations/notifications/hipchat/monitorImages.png" alt="Configure to be notified through HipChat while monitoring a Docker image" style="width:700px;"/>

---
##Deleting the HipChat Integration

To remove the HipChat integration, you'll need to remove this integration from all dependencies configured to use it.

###Deleting HipChat integration from a Project
To remove the HipChat integration from a project, simply remove the section shown below from the `shippable.yml` for that project.

```
integrations:
  notifications:
    - integrationName: hipchat-integration
      type: hipchat
      recipients:
        - "#roomOne"
        - "#roomTwo"
        - "@userOne"
      branches:
        only:
          - master
          - dev
      on_success: never
      on_failure: always
```

###Deleting HipChat integration from a Subscription
To delete a HipChat integration from a subscription, the steps are:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Review the list of integrations for your subscription.
5. Click the `Delete` button next to the HipChat integration.

<img src="/ci/images/integrations/notifications/hipchat/deleteInt.png" alt="Delete the HipChat integration from your Subscription" style="width:700px;"/>

###Deleting HipChat Account Integration
To delete the HipChat Account integration, all the dependencies, such as Subscriptions, using the HipChat account must be deleted first. Do note that this action is irreversible. The steps to delete the HipChat Account integration are:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the HipChat integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `HipChat`. Alternatively, you can use the `Integration Name` field to provide the name of your HipChat integration.
3. Your HipChat integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the HipChat integration.
7. Once all dependencies of the HipChat integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the HipChat Integration.

--------
