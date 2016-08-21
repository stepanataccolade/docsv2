page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# manifest
This job is used to define an app/service/microservice. The idea behind creating 
manifests is to create a versioned immutable design time definition of how your
app/service/microservice is made. 

A manifest is an unit of deployment. This means the entire manifest is deployed 
as a whole on to a single node(vm, physical machine etc). Creating multiple 
replicas of this means that you will get more copies of the whole manifest. If 
you need your apps/service/microservice to be separately deployed, you need to 
create different manifests.

## Single container manifest pattern
If your apps/services are decoupled and versioned, then you might want to independently
deploy and maange them. In those cases, the following manifest will help

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
        versionName: "master.35"            #optional
      - IN: box-opts                        #optional
      - IN: box-params                      #optional
```
This will create a job of type `manifest` with the name `box-man`. Since only 1
[image](../resources/image/) `box-image` is being used, the other 2 addon resources
[dockerOptions](../resources/dockerOptions/) & [params](../resources/params/) and this 
manifest when deployed will create a single container app/service/microservice. 
Another key functionality is the ability to pin versions. By default, every 
resource when used in `IN` gets the most recent version in the system. There are
scenarios where you might not want this and get a static one. In those cases you
use the tag `versionName` or `versionNumber`. In the above scenario we are using
versionName for a resource of type image and this means its actually a docker tag. 
We want `box-image` with a tag `master.35`. Shippable internally maintains a 
sequential number for every version of the resource created. You can also refer 
to that number by using `versionNumber` see below for an example.

## Multi container manifest pattern
There are some cases where your apps/services are not completely decoupled. For
example, your UI component might be tightly couple to your caching component. In
those cases, a single manifest with 2 different images might be required. This 
YML is a sample for that case

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
        versionName: "master.35"            #optional
      - IN: dv-image                        #required
        versionNumber: 10                   #optional
      - IN: all-opts                        #optional
      - IN: box-params                      #optional
        applyTo:
          - box-image
```
This will create a job of type `manifest` with the name `box-man`. This manifest 
has 2 [image](../resources/image/) `box-image` and `dv-image`. But the 2 addon resources 
are configured differently. Resource `all-opts` of type [dockerOptions](../resources/dockerOptions/) 
applies to both the images. But the resource `box-params` of type [params](../resources/params/) 
applies only to `box-image`. This manifest when deployed will create a 2 containers 
as part of this app/service/microservice. We are pinning the version of `box-image`
to the tag `master.35` and `dv-image` to whatever the tag Shippable versionNumber 
`10` points to

## Combining manifests into a manifest pattern
The above example of multi container manifest will allow you to create a union of
tighly coupled apps/services into a single deployable unit. One limitation of the 
pattern is that you cannot scale them independently. They also get deployed on the 
same node/vm/machine as a single manifest will deploy together onto a single node.

If you still need tight coupling but still want to scale independently, the following
pattern will helo.

```
- name: box-man                             #required
  type: manifest                            #required
  steps:
      - IN: box-image                       #required
      - IN: box-opts                        #optional
      - IN: box-params                      #optional
      
- name: dv-man                              #required
  type: manifest                            #required
  steps:
      - IN: dv-image                        #required
      - IN: dv-opts                         #optional
      
- name: combo-man                            #required
  type: manifest                            #required
  steps:
      - IN: box-man                         #required
      - IN: dv-man                          #optional
```
In the above example 2 independent manifests are being combined into a 3rd manifest.
With this approach, you get to scale them independently when you deploy. 

