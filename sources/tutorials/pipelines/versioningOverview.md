page_title: Deploy a sample application using Shippable's continuous delivery pipelines
page_description: Quick start for getting up to speed with pipelines
page_keywords: getting started, formations, quick start, documentation, shippable

#Versioning Overview

If you've read the [Continuous Delivery Pipelines documentation](../../pipelines/overview/), you might have notice that the word 'version' is a bit overloaded. You can have resource versions, job versions, and a version resource which specifies application/service releases. Head spinning much?

This page tries to disambiguate 'version' so you can have a clearer picture of what it means in different situations.

###Resource versions

Most resources in your pipeline is versioned - i.e. each time something changes about the resource, a new version is created. A new version of the resource triggers the pipeline automatically, unless the version changed happened because of a manual yml update.

The following resources are versioned:

####gitRepo



####image


####dockerOptions


####params


####replicas


You can view version history to see how the resource changed over time.


###Job versions




###version resource
