page_title: IRC Integration for Build Notifications
page_description: How to set up IRC Integration for Build Notifications
page_keywords: irc integration, build notifications, slack, CI/CD, shippable Continous Integration, config, project settings, notifications, internet relay chat

# IRC Integration for Build Notifications

This guide walks through the steps to integrate Shippable with Internet Relay Chat (IRC), to enable all Build related notifications on an IRC Channel.

You can also get your Build notifications through [Slack](ht_slack_notifications.md) or [Email](oe_yml_reference/#email-notifications).

Configuration of the YML file is needed to send Build notifications to IRC channels. Follow the steps outlined below to enable IRC for Build notifications:

## 1. Configuring a single IRC channel on Shippable for Build Notifications

To specify a single channel, leverage the syntax below to update the yml file..

```yaml 
notifications: 
   irc: "chat.freenode.net#channel1"
```


## 2. Configuring multiple IRC channels on Shippable for Build Notifications

To specify multiple server channels, leverage the syntax below to update the yml file. The following formats are supported:


```yaml
notifications:
  irc:
    - "chat.freenode.net#channel1"
    - "chat.freenode.net#channel2"
    - "server1#channel3"
```

```yaml
notifications:
  irc:
   channels:
     - "chat.freenode.net#channel1"
     - "chat.freenode.net#channel2"
     - "server1#channel3"
```

## 3. Current capabilities
- By default, the Build notifications will always be sent to the mentioned
  channels in yml. **on_success** and **on_failure** are not yet
  configurable.
- IRC notifications are turned off by default for pull request Builds.
  However, you can change the default settings by adding
  **pull_requests: true** tag in your yml as shown below.

```yaml
notifications:
  irc:
   pull_requests: true
   channels:
```



