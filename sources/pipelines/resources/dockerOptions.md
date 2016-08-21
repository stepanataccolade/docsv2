page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# dockerOptions
This resource type is used to add a list of docker options that can be appended 
to a docker image. This resource on its own does not mean anything unless used
in conjunction with an image.

This resource can also be used to override options that are already set in 
another stage of the pipeline. A common use case for this would be a scenario in 
which you want to run different memory settings for the same service in test vs
production. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-opts                            #required
  type: dockerOptions                       #required
  version:
    memory: 64                              #optional
    cpu-shares: 256                         #optional TODO camelcase
    portMappings:                           #optional
      - "80:80"
    TODO : add rest of the options to docs
```
This will create a resource of type `dockerOptions` with the name `box-opts`. 
The following options are being set in this example. Memory of 64mb, 
CPU shares of 256 and host port 80 is being mapped to container port 80.

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *dockerOptions*. This cannot 
be changed once set. 

```
version:
  memory: integer 
  cpu-shares: integer
  portMappings: [elements with integer:integer format]
```
`memory` is the amount of memory the container is allocated. It is set in 
megabytes and is an integer. defaults to 0 if not provided which means let the 
host node manage it dynamically. 

`cpu-shares` is the relative % of CPU that is allocated 
[more info](http://stackoverflow.com/questions/26841846/how-to-allocate-50-cpu-resource-to-docker-container)
This defaults to 0 if its not provided which means let the host node manage it 
dynamically.

`portMappings` is an array of port mappings. Host port is always the first 
element and the container port is the second element separated by a `:`. Port
numbers are always integers. If not provided, no container port is exposed, even
if your Dockerfile had the `EXPOSE` statement.

Any time any of these options changes, a new version is created

