page_title: Unified Pipeline Triggers
page_description: List of supported triggers
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

<br>
# Triggers
Triggers are used to manually trigger a workflow. This can also be done using the 
UI. If you would like to use your source control to do it, this is the way to do it

<br>
# Adding Triggers
Triggers are stored in a trigger file `shippable.triggers.yml` present in a git 
repository. Any repo can contain this file but only one of it can be used. If 
more than 1 trigger file is present, the first one is used. This is done in order
to reduce conflict due to the same trigger being defined in multiple places.

To learn how to add this file and connect it to pipelines, 
[click here](../../tutorials/how_to_add_syncRepos)

<br>
# Deleting Triggers
Deleting a trigger is a 2 step process. Pipelines are all about dependencies and
deployable units are flowing through these pipelines. Hard deleting triggers from 
pipelines is a non reversible operation and you will lose all the version history 
etc. As a result of this, we only soft delete triggers when they are removed from
the YML file. If it was done mistakenly, you just add it back and the system will
un-delete the trigger. 

To hard delete a trigger, it will have to be done from the UI. 
(TODO : add instructions)

<br>
# Anatomy of a Trigger YML 
Triggers are defined through the YML and they all follow a similar format.

Here is a template YML the defines a trigger
```
- name: "Name of the trigger"
  type: trigger
  version:
    counter: 1
```
The above YML adds a trigger with the counter being set to 1. Everytime you want 
to manually trigger a [job](#job), add this trigger to the `IN` of the job. Now upon
changing the counter to 2, the job will be manually triggered.
