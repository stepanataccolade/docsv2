page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# version
This resource type is used to create version numbers. It uses semantic version
methodology to increment versions.

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-version                         #required
  type: version                             #required
  seed:
    versionName: "0.0.1"                    #required
```
This will create a resource of type `version` with the name `box-version`. The 
seed version is being set to 0.0.1

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *version*. This cannot be changed 
once set. 

```
seed:
  versionName: string with format "0.0.0"
```
`versionName` is an string integer that represents a semantic version that is used 
as a starting point. This will get incremented in the IN operations of [jobs](#jobs). 
You can also use `0.0.0-alpha`, `0.0.0-beta` & `0.0.0-rc` formats too

