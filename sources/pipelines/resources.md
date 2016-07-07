page_title: Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

<br>
# What are Resources?
Resources are the building blocks of your pipelines. Eg. git repos, docker 
images etc. 

A key characteristic of resources is that it can be versioned and its immutable. 
Picking specific version of a resource should be idempotent. i.e. it returns the
same result every single time it is fetched. eg. git commit sha

Shippable internally maintains its own version numbers for every resource so that
different resources can be normalized internally. Docker images have tags as a way
to version and git repos use commit shas. Both of these have a version number for 
every tag or sha making it easy to abstract it out

There are many types of resources that come out of the box. Every resource does
one thing and one thing only. Together with [integrations]() they become a very
powerful concept that can be used to model any pipeline from simple to complex 
ones. 

# How do I add Resources?
Resources are stored in a resource file `shippable.resource.yml` present in a git 
repository. Any repo can contain this file but only one of it can be used. If 
more than 1 resource file is present, the first one is used. This is done in order
to reduce conflict due to the same resource being defined in multiple places.

To learn how to add this file and connect it to pipelines, 
[click here](../../tutorials/how_to_add_syncRepos)

These are the resources that come straight out of the box.

- [syncRepo](#syncRepo): source for resources & jobs
- [gitRepo](#gitRepo): source for your code
- [image](#image): docker image definition 
- [dockerOptions](#dockerOptions): options for docker images
- [params](#params): parameters for your apps/services/microservices
- [replicas](#replicas): number of copies of the service to run
- [version](#version): semantic versions
- [ecsCluster](#ecsCluster): Amazon Elastic Compute Service cluster definition
- [gkeCluster](#gkeCluster): Google Kubernetes cluster definition
- [tritonCluster](#tritonCluster): Joyent Triton cluster definition 
- [acsCluster](#acsCluster): Azure Container Service cluster definition 
- [dclCluster](#dclCluster): Docker Cloud cluster definition 

# What is an integration?
Shippable is designed to separate auth information out from resources. The reason
for this is that there is no encryption/decryption issues when you move things
around i.e. moving resource definitions from one repo to another or if the person
who created it is no longer the member of the team etc. Integration property in the 
YML definition is a reference to this integration.

To learn how to create integration and map them to your org, 
[click here](../../tutorials/how_to_add_integrations)

<a name="syncRepo"></a>
# syncRepo
Using this resource you can instruct Shippable's internal sync system to look for
`shippable.resources.yml` and `shippable.jobs.yml`. This is the only resource that 
can be added from the UI or `shippable.resources.yml`. *Note: You should not add
the same repository in both places. This can lead to unexpected behavior*

### Adding syncRepo from UI
TODO : 

### Adding syncRepo through YML
```
- name: prod-repo01
  type: syncRepo
  integration: "avinci-gh"
  source:
    name: avinci/prod
    branch: master
```

`**name**: *string*`



<a name="gitRepo"></a>
# gitRepo

<a name="image"></a>
# image

<a name="dockerOptions"></a>
# dockerOptions

<a name="params"></a>
# params

<a name="replicas"></a>
# replicas

<a name="version"></a>
# version

<a name="ecsCluster"></a>
# ecsCluster

<a name="gkeCluster"></a>
# gkeCluster

<a name="tritonCluster"></a>
# tritonCluster

<a name="acsCluster"></a>
# acsCluster

<a name="dclCluster"></a>
# dclCluster

We natively support the following cloud targets

- [Amazon's EC2 Container Service (ECS)](int_container_services/#amazon-ec2-container-service-using-account-keys) 
- [Google Container Engine (GKE)](int_container_services/#google-container-engine-gke) 
- [Docker Cloud](int_container_services/#docker-cloud)  
- [Docker Datacenter](int_container_services/#docker-datacenter) 
- Joyent Triton

In addition, you can deploy to any target using our 

- Open shell script runner

Native support coming soon to following targets

- IaaS
  - Digital Ocean 
  - VMWare
  - Openstack
  - AWS EC2
  - Google Cloud Platform
- PaaS
  - Elastic Beanstalk
  - Heroku
- CaaS
  - Microsoft Azure 
  - Red Hat Openshift 3 
