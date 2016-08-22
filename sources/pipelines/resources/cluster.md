page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# cluster
This resource type is used to specify a cluster in any Container Service to which you can deploy your application or service. A `cluster` resource is usually an `IN` resource for [a deploy job](../jobs/deploy/). 

Please note that the resource just points to an existing cluster and does not create a cluster. 

You can define a cluster resource by adding it to `shippable.resources.yml`
```
- name: <string>                            	#required
  type: cluster                             	#required
  integration: <integration name>				#required
  pointer:
    sourceName : "test-aws"                 	#required
    region: "us-east-1"                     	#required for some container services
```

* resource `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view and in the list of resources in the Pipelines `Resources` tab.

* `type` is always set to cluster. 

* `integration` should be the name of the integration that contains your credentials to connect to the Container Service of your choice. To learn how to create integrations for a specific Container Service, please select from the list below:
	* [AWS Elastic Container Service (ECS)](../../integrations/containerServices/ecs/)
	* [Google Container Engine (GKE)](../../integrations/containerServices/gke/)
	* [Joyent Triton](../../integrations/containerServices/triton/)
	* [Microsoft Azure Container Service](../../integrations/containerServices/azure/)
	* [Docker Cloud](../../integrations/containerServices/dcl/)

* `sourcename` is the name of the cluster on the Container Service that is represented by this resource. 

* `region` is the region where the cluster resides. The values are dependent on the
integration. This is required for the following types of integrations and will take
in the values that the provider supports

- AWS Elastic Container Service (ECS)
- Google Container Engine (GKE)
- Joyent Triton container  
- Microsoft Azure Container Service (ACS) 

