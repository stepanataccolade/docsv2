page_title: Deploy a sample application using Shippable's continuous delivery pipelines
page_description: Quick start for getting up to speed with pipelines
page_keywords: getting started, formations, quick start, documentation, shippable

#Versioning Overview

If you've read the [Continuous Delivery Pipelines documentation](../../pipelines/overview/), you might have notice that the word 'version' is a bit overloaded. You can have resource versions, job versions, and a version resource which specifies application/service releases. Head spinning much?

This page tries to disambiguate 'version' so you can have a clearer picture of what it means in different situations.

###Resource versions

Most [resources](../../pipelines/resources/overview/) in your pipeline are versioned - i.e. each time something changes about the resource, a new version is created.

A resource can change in one of two ways:

* manual editing of the resource in shippable.resources.yml
* resource is updated by a CI build or [a job in your pipeline](../../pipelines/jobs/overview/)

When a resource is updated by a CI build or a job in your pipeline, the new resource version triggers the next component of your pipeline automatically, unless your jobs yml explicitly prevents automatic triggers.

The following resources are versioned:

####gitRepo



####image


####dockerOptions


####params


####replicas


You can view version history to see how the resource changed over time.


###Job versions




###version resource
