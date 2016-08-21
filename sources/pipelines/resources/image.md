page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# image
This resource type is used to add a docker image to your pipeline. 

Integrations allow you to add images on any of the [supported image registries](#regTypes) 
using the same resource type.

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-image                           #required
  type: image                               #required
  integration: avinci-dh                    #required
  pointer:
    sourceName: "avinci/box"                #required
  seed:
    versionName: "master.35"                #required
```
This will create a resource of type `image` with the name `box-image`. It is using 
an integration `avinci-dh` which is the name of the integration defined, 
[learn more here](overview#integration). The image name is `box` and belongs to `avinci` 
org. The branch to look for resource and job definitions is `master`. This image 
tag is being set to `master.35` as the initial seed version.

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *image*. This cannot 
be changed once set. 

```
integration: string
```
This defines the integration that we are using to connect to the repo. Shippable 
supports multiple types of registries and they can be defined as 
integrations[learn more](overview#integration). We support the following types of registries

<a name="regTypes"></a>

- Docker hub
- Docker private registry
- Docker trusted registry
- Google container registry
- Amazon Elastic Container Registry
- Quay.io

```
pointer:
  sourceName: string 
```
`sourceName` is the fully qualified name of the image i.e. **org/repo**

```
seed:
  versionName: string
```
`versionName` since this is an image, this will take in the tag of the image

