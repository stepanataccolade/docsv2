page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# replicas
This resource type is used to control the number of copies of the app/service/microservice
that will be started at the target. This resource on its own does not mean 
anything unless used in conjunction with a service.

This resource can also be used to override environment variables that are already 
set in another stage of the pipeline. A common use case for this would be a scenario 
in  which you want to run different number of copies for the same service in test 
vs production. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-scaler                          #required
  type: replicas                            #required
  version:
    count: 1                                #required
```
The above YML when added to `shippable.resources.yml` will create a resource of 
type `replicas` with the name `box-scaler`. Currently only 1 copy of the service
to which this is attached is started when deployed.

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *replicas*. This cannot be changed 
once set. 

```
version:
  count: 1
```
`count` is an integer that represents the number of copies to run. This is versioned
and everytime the counter is changed, a new version is created.

