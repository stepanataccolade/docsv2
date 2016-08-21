page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


# runSh
This job type lets you run any custom scripts as part of your deployment pipeline. Depending on what you want to achieve in your script(s), you can specify input and output resources. You can also send notifications for specific events, like job start, success, or failure.

This is the most powerful job type since it is not a *managed* job, i.e. you write the scripts yourself so you have unlimited flexibility. You should use this job type if there is no managed job that provides the functionality you need. For example, pushing to Heroku is not yet natively supported through a managed job type, so you can write the scripts needed to do this and add it to your pipeline as a job of type `runSh`. 

We are actively adding managed job types to reduce the need to use `runSh`. If you have a scenario that is not handled managed jobs, [open a support request](https://github.com/Shippable/support/issues/) and we'll look into adding a managed job for it.  

##Anatomy of a runSh job

The following sample shows the overall structure of a runSh job:

```
  - name: <name>								#required
    type: runSh									#required
    on_start:									#optional
      - script: echo 'This block executes when the TASK starts'
      - NOTIFY: slackNotification
    steps:										#required
      - IN: <resource>
      - IN: <resource>
      - TASK:
        - script: <command>
        - script: <command>
      - OUT: <resource>
      - OUT: <resource>      
      - IN: <resource>
      - TASK:
        - script: <command>
    on_success:									#optional
      - script: echo 'This block executes after the TASK section executes successfully'
      - NOTIFY: slackNotification
    on_failure:									#optional
      - script: echo 'This block executes if the TASK section fails'
      - NOTIFY: slackNotification
      
```

* `name` should be set to something that describes what the job does and is easy to remember. This will be the display name of the job in your pipeline visualization.
* `type` indicates type of job. In this case it is always `runSh`
* `on_start` can be used to send a notification indicating the job has started running. 
* `steps` section is where the steps of your custom job should be entered. You can have any number of `IN` and `OUT` resources depending on what your job needs. You can also have one or more `TASK` sections where you can enter one or more of your custom scripts. Keep in mind that everything under the `steps` section executes sequentially. Also, environment variables do not persist across `TASK` sections. Read our [advanced runSh documentation](#advancedRunSh) below to find out how to persist environment variables across `TASK` sections.
* `on_success` can be used to run scripts that only execute if the `TASK` section executes successfully. You can also use this to send a notification as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](../resources/notification/).
* `on_failure` can be used to run scripts that only execute if the `TASK` section fails. You can also use this to send a notification as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](../resources/notification/).
 
<a name="advancedRunSh"></a>
##runSh scenarios

* [Using integrations with a runSh job](../../tutorials/pipelines/runShUseIntegrations.md)
* [Updating resource versions](../../tutorials/pipelines/updateResourceVersion.md)
* [Extracting resource version information](../../tutorials/pipelines/extractVersionInformation.md)
* [Persisting state between runs](../../tutorials/pipelines/persistStateBetweenRuns.md)
