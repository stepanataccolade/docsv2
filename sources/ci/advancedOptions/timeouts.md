page_title: Build Timeouts
page_description: Information about your builds timing out while running Continuous Integration
page_keywords: getting started, questions, documentation, shippable, config, yml


# Build timeout
##Default Timeouts
Your builds will time out in the following scenarios based on default timeout settings:

-   If there has not been any log output or a command hangs for 10 minutes
-   If the build is still running for more than 60 minutes (for free plans) or for more than 120 minutes (for paid plans). This is a default setting that can be customized per project.

---

##Custom Timeouts
You can customize the build time outs per project. You can customize it between 1 - 60 minutes for free plans and 1 - 120 minutes for paid plans.

To customize the timeouts for a project, do the following:

- Go to 'Project' settings
- Click the 'Runs Config' section
- Scroll down to the 'Custom Timeouts' section
- Click the `Edit` button
- Enter a value between 1 and 60 (for free plans) or 120 (for paid plans)
- Click the `Save` button.

NOTE: For any values entered less than 1 or greater than 60 (for free plans) or 120 (for paid plans), you'll see the error:

```
(Id: 4005) Custom timeout is greater than the maximum limit of 3600000 milliseconds
verbose: projects|putById|callerId:XXXXX|projectId:YYYYYY|_validateTimeout
```

For further reading, we have a blog on [Changing the default timeout for a CI project](http://blog.shippable.com/changing-the-default-timeout-for-a-continuous-integration-project).

Customizing build timeouts is also covered in the [Navigating the UI/Project Settings](/navigating_ui/projects_settings/#custom-timeout) documentation section.

Please [let us know](https://github.com/shippable/support/issues) if you believe a build is timing out when it shouldn't do so and we will take a look.

---
