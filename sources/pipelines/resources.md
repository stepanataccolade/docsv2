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

These are the following resources that come straight out of the box. We are 
constantly adding to this list

- [syncRepo](resources.md#syncRepo)
- gitRepo 
- image
- dockerOptions
- params
- replicas
- version
- ecsCluster
- gkeCluster
- tritonCluster
- azureCluster
- dclCluster

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# syncRepo

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
