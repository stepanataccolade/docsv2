page_title: Using Shippable with Bitbucket Server
page_description: This section explains how to use Shippable with Bitbucket Server
page_keywords: getting started, questions, documentation, shippable, bitbucket-server, source control

# Using Shippable with Bitbucket Server

Shippable supports running CI builds for Bitbucket Server. To set this up, follow the steps mentioned [here](int_scm.md#bitbucket-server) to add Bitbucket Server as
an Account Integration and sync your Subscriptions. Once complete, you can enable a project/repository and setup a `shippable.yml` file to get your builds running.

---


## Builds

Builds are automatically triggered every time you commit code for an enabled project on Shippable. The Shippable addon is made use of to setup the required web-hooks and deploy keys.
