page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# deploy
This job is used to deploy a manifest to [a cluster on any Container Service](../resources/cluster/). 

## Single manifest deploy

```
- name: box-test-deploy                     #required
  type: deploy                           #required
  steps:
    - IN: box-man                           #required
    - IN: test-cluster                      #required
    - IN: test-params                       #optional   
```
This will create a job of type `deploy` with the name `box-test-deploy`. A 
manifest is required for this job as `IN`. It also requires a resource of type 
[cluster](../resources/cluster/) which is used as a deployment target. In 
addition, an optional `IN` of type [params](../resources/params/) is being supplied.
This is a very powerful pattern where the design time configs are being overridden
by test configs. For more details about how overrides work (click here)[../faq]

## Multi manifest deploy

```
- name: box-test-deploy                     #required
  type: deploy                           #required
  steps:
    - IN: box-man                           #required
    - IN: dv-man                            #optional
    - IN: test-cluster                      #required
    - IN: test-params                       #optional
      applyTo:
      - box-man
```
This will create a job of type `deploy` with the name `box-test-deploy`. At least one 
manifest is required for this job as `IN`. Second one is optional. It also requires 
at least one resource of type [cluster](../resources/cluster/) which is used as a 
deployment target. In addition an optional `IN` of type [params](../resources/params/) 
is being supplied but with the `applyTo` being set, only configs on `box-man` are 
overridden and `dv-man` is left untouched. For more details about how overrides 
work [click here](../faq)

If you have a combined manifest, you can use that instead of specifying individual manifests.  You can still use `applyTo` but you will have to know which manifests were
used to create the combined manifest.

```
- name: box-test-deploy                     #required
  type: deploy                           #required
  steps:
    - IN: combo-man                         #required
    - IN: test-cluster                      #required
    - IN: test-params                       #optional
      applyTo:
      - box-man
```

## Triggering 1 deployment from another
Most teams need to create a deployment workflow i.e. move code from from test to production.
You might also want to turn off automatic deployments to production. 

To daisy chain 2 deployment jobs, use the snippet below as an example: 

```
- name: box-prod-deploy                     #required
  type: deploy                              #required
  steps:
    - IN: box-test-deploy                   #required
      trigger: false                        #optional
    - IN: prod-cluster                      #required
    - IN: prod-params                       #optional
      applyTo:
      - box-man
```
This will create a job of type `deploy` with the name `box-prod-deploy`. This 
job is using another deploy job as `IN`. This means manifests that are currently 
deployed in `box-test-deploy` is going to be deployed here. But since `trigger` 
has been set to false, auto deploy will be turned off. It also requires 
a resource of type [cluster](../resources/cluster/) which is used as a 
deployment target. In addition an optional `IN` of type [params](../resources/params/) 
is being supplied but with the `applyTo` being set, only configs on `box-man` are 
overridden and `dv-man` is left untouched. For more details about how overrides 
work [click here](../faq).

