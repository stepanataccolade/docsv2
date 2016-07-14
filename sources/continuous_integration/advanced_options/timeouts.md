page_title: Build Timeouts
page_description: Information about your builds timing out while running Continuous Integration
page_keywords: getting started, questions, documentation, shippable, config, yml




# Build timeout

Your builds will time out in the following scenarios:

-   If there has not been any log output or a command hangs for 10 minutes
-   If the build is still running for more than 60 minutes (for free plans) or for more than 120 minutes (for paid plans). This is a default setting that you can change for your project and configure it between 1 - 60/120 minutes for free/paid plans respectively. Read [instructions](/navigating_ui/projects_settings/#custom-timeout) on setting a desired value in the Project settings. In addition, we also have a blog on [Changing the default timeout for a CI project](http://blog.shippable.com/changing-the-default-timeout-for-a-continuous-integration-project).

Please [let us know](https://github.com/shippable/support/issues) if you believe a build is timing out when it shouldn't do so and we will take a look.

---
