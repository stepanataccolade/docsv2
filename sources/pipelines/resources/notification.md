page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

#notification
This resource type is used to add a notification type so that you can send our notifications for the following events:

* Job starts
* Job is completed successfully
* Job failed 

This resource type is only supported for jobs of type `runSh`. Email and Slack notifications are supported as of now.

You can create a notification resource by adding it to `shippable.resources.yml`

```
- name: mySlack								#required
  type: notification						#required
  integration: trriplejay slack				#required
  pointer:									
    recipients:
      - "#beta"								#required
      - "@trriplejay"						#optional
```
The events for which this notification is sent out are configured in the jobs yml.

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used as a reference for this resource in your jobs yml.

```
type: string
```
This defines the type of resource. In this case, this is always *notification*. This cannot 
be changed once set. 

```
integration: string
```
**This is only required for sending Slack notifications**. The value should be set to the name of the integration that contains your credentials to connect to Slack. To learn how to add a Slack integration to your subscription, read the **Adding the Account Integration** section on our [Slack integrations page](../../integrations/notifications/slack/)  

```
pointer:	
  method: email								#required for email only
  recipients:
    - john@shippable.com					#required
    - abc@foo.com							#optional
```
`method` is required for **email only** and should always be set to `email`. 

`recipients` is an array specifying who should receive notifications. For email notifications, include email addresses where you want to send notifications. For Slack notifications, include channel names or slack usernames where notifications should be sent. Slack channels/users should be entered in double quotes, with a leading # for channels and @ for users. For example, to send to a Slack room foo, specify `"#foo"` and to send to a person tom, specify `"@tom"`



