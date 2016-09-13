page_title: Unified Pipelines Overview
page_description: Overview of Shippable Pipelines
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Getting started with Continuous Deployment Pipelines

This page will give you enough information to get started with your deployment pipelines. It covers basic concepts and a short guide on how to seed your pipeline.

You can also see pipelines in action by following our tutorial on [deploying a sample application](../tutorials/pipelines/samplePipeline/),

---

##Pipeline building blocks

[**Resources**](resources/overview/) are the versioned building blocks of your pipelines. They are inputs for and sometimes outputs from the executable units of your pipeline, aka [Jobs](jobs/overview/). Examples of resources include source code repositories, docker images, container clusters, environment variables, etc.

[**Jobs**](jobs/overview/) are the executable units of your pipelines. They take one or more [resources](resources/overview/) as inputs, perform some operation on the inputs, and can output to other resources. Jobs can also act as inputs for other jobs, which serve to daisy-chain a series of jobs into a pipeline.

[**Triggers**](triggers/) are used to manually trigger a workflow by running a job that takes the trigger as an input. Manually triggering a job is also available through the SPOG UI, though a `trigger` defined in a versioned yml file in your source control includes all of the versioning and history that comes with repo-managed files.

---

##Configuration files

Your deployment pipelines are defined through three yml-based configuration files:

**shippable.jobs.yml** is a required file and contains definitions of the [Jobs](jobs/overview/) in your pipeline.

**shippable.resources.yml** is a required file and contains definitions of the [Resources](resources/overview/) in your pipeline.

**shippable.triggers.yml** is an optional file and contains definitions of manual [Triggers](triggers/) for jobs in your pipeline. This file is needed only if you want to manually trigger jobs through commits to your source control repository. Alternatively, you can skip this config and choose to manually trigger jobs through the SPOG view if required.

These configuration files should be committed to a [repository in your source control](#sync). If you have separate deployment pipelines for different environments or applications, you can put config files for each environment or application in separate repositories.

---

<a name="sync"></a>
##Sync repository

A source control repository that contains your pipeline configuration files is called a **Sync Repository** and can only contain one each of the `shippable.jobs.yml`, `shippable.resources.yml`, and `shippable.triggers.yml` files.  

You must seed your pipeline with at least one sync repository through the Shippable UI. Subsequent sync repositories can also be added through the UI following the same process. Instructions are in the section below.

You may have entire pipeline configurations maintained in one repository or split up the configuration of different sections of your pipeline in multiple sync repositories. This decision depends on your organizational preferences, as well as [security and permissions requirements](#permissions). For example, you may have pipeline configuration for source control through your first test environment in one repo, configuration for subsequent test environments in another repo, and configuration for your production environment in yet another repo. In this way, you can manage who can configure and execute different areas of your pipeline based on the permissions set on each repo.

---

<a name="seedPipeline"></a>

##Adding a sync repository

You can add a sync repository by following the steps below:

* First, add a subscription integration for the source control provider where your sync repository is located. Instructions are here - [Source Control Provider Integrations](../integrations/scm/scmOverview/).
* Go to your Organization's page on Shippable. A list of all available Organizations can be accessed by clicking on the  <i class="fa fa-bars" aria-hidden="true"></i>  icon.
* Click on the `Pipelines` tab
* If you have never added a sync repository, you will land on the `Resources` option in the pill menu. If you have added a sync repository in the past, you will need to click on `Resources` in the pill menu.
* Click on `Add Resource`.
* Complete the Add Resource fields:
	* The subscription integration dropdown should show the subscription you created in the first step. If not, you will need to go through the flow of adding the integration.
	* The `Select Project` dropdown will show all repositories in the source control you just connected with the integration. Choose your sync repository.
	* Select the branch of the sync repository that contains your pipeline configuration files.
	* Name your sync repository with an easy to remember name.
* Click on `Save` to apply your sync repository configuration.

You will now see your configured pipelines created on Shippable. Click on `SPOG` in the pill menu to view your pipelines. Note, if you do not see what you expected, you likely have a configuration error. Click on the rSync resource in the SPOG view to see the console and identify any errors that may exist.

---

<a name="spog"></a>
## Single Pane of Glass (SPOG) View

The Single Pane of Glass (SPOG) view is a real time, interactive, visual representation of all pipelines across your organization. You can zoom in or out of any part of the pipeline with your mouse scrollbar or with pinch-to-zoom on any mouse keypad.

Each job in this view will update colors in real time based on the status of the job. Jobs are green is last run was successful, red if the last run failed, and blue if the job is in processing state.

You can interact with the SPOG view in the folllowing ways:

- Zoom in and out to see additional details for any part of the pipeline
- Right click on a job to view status, inputs, latest version number
- Right click on a job to manually run the job
- Rught click on a resource to view latest version number

You can also filter this view by using Flags. Flags need to be included in your job and/or resource configurations to be available as a filter for SPOG.

---

<a name="permissions"></a>
## Permissions

Permissions for your deployment pipelines are tightly coupled with permissions for your sync repositories. Consequently, pipeline elements are only visible and accessible to perform actions to users with **Owner**, **Collaborator/Write**, or **Read** access to the sync repository that holds the configuration files. Users that do not have access to your sync repository will not have access to that portion of your pipeline, even if they are members of your organization.
