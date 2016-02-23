page_title: Running your first sample build
page_description: Setup up documentation for a sample build
page_keywords: getting started, build, quick start, documentation, shippable, continous integration

# Run a sample CI build 

This tutorial walks through the process of running a sample build using Shippable's continuous integration. A Node.js sample application is leveraged for this sample.

You need a GitHub account to complete this tutorial.

## Fork our sample project

Fork the following GitHub repositories in order to complete the tutorial:

<https://github.com/shippableSamples/sample_node> 

## Sign in
Login to [Shippable](http://www.shippable.com) using your GitHub credentials. 

## Enable a project

The first step is to enable continuous integration for your forked repository.

- On the [Shippable landing page](http://www.shippable.com) , select your subscription from the `Subscriptions` dropdown. This should be the subscription where you forked the repository.

- On the subscription page, click on the `Enable Project` button. If you have not enabled any projects on Shippable, you will be directly be taken to a page with a list of your repositories.
-  Find the sample-node project and click on the `Enable` button.
- If sample-node repo is not shown  in the list, click on the `Sync` button next to the Search box. This syncs your Shippable subscription with your source control account. Find the sample-node project and enable it.

## Run a build
Your sample project already has a config file 	`shippable.yml` at the root of the repository.
 
- After enabling the project, you will be redirected to the Project page for sample-node.

- Click the `Build` button to trigger your build.
 

## View build status
Congratulations! You have successfully run your first build on Shippable. 

