page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# gitRepo
Using this resource you can hook your source code to pipelines. 

Adding this resource type will create a webhook on the source repo server pointing 
to Shippable. With this, future commits to the repo will automatically create a 
new version for this resource with the new commit sha.

Integrations allow you to add repos on any of the [supported git servers](#repoTypes2) 
using the same resource type.

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-repo                            #required
  type: gitRepo                             #required
  integration: avinci-gh                    #required
  pointer:
    sourceName: avinci/box                  #required
    branch: master                          #optional
```
This will create a resource of type `gitRepo` with the name `box-repo`. It is 
using an integration `avinci-gh` which is the name of the integration defined, 
[learn more here](#integration). The repo name is `box` and belongs to `avinci` 
org. The branch to look for resource and job definitions is `master`

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this
is used as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *gitRepo*. This cannot be changed 
once set. 

```
integration: string
```
This defines the integration that we are using to connect to the repo. 
Shippable supports multiple types of git repository providers and they can be 
defined as integrations. [Learn more](overview#integration). We support the following 
types of repository providers
<a name="repoTypes2"></a>

- github
- bitbucket
- github enterprise
- bitbucket server (stash)
- gitlab
- gitlab server

```
pointer:
  sourceName: string 
  branch: string
```
`sourceName` is the fully qualified name of the repo i.e. **org/repo**

`branch` defaults to `master` if its not provided 

