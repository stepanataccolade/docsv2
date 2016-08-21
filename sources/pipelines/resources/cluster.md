page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# cluster
This resource type is used to specify a cluster in any Container Service to which you can deploy your apps/services/microservices. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: env-test                            #required
  type: cluster                             #required
  integration: avinci-aws
  pointer:
    sourceName : "test-aws"                 #required
    region: "us-east-1"                     #required for some container services
```
This will create a resource of type `cluster` with the name `env-test`. It uses an integration `avinci-aws` which contains credentials to connect to the Container Service. The cluster name is `test-aws` and on the aws region  to `us-east-1`. 

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory since this is used as a reference in your shippable.jobs.yml and also to represent this resource in the SPOG view.

```
type: string
```
This defines the type of resource. For a resource of type cluster, this is always set to **cluster**. 

```
integration: string
```
This value should be set to the name of the integration that contains your credentials to connect to the Container Service of your choice. To learn how to create integrations for a specific Container Service, please select from the list below and read the **Adding the Account Integration** section:

* [AWS Elastic Container Service (ECS)](../../integrations/containerServices/ecs/)
* [Google Container Engine (GKE)](../../integrations/containerServices/gke/)
* [Joyent Triton](../../integrations/containerServices/triton/)
* [Microsoft Azure Container Service](../../integrations/containerServices/azure/)
* [Docker Cloud](../../integrations/containerServices/dcl/)

```
pointer:
  sourceName: string 
  region: string
```
`sourceName` is the name of the cluster that this resource represents.

`region` is the region where the cluster resides. The values are dependent on the
integration. This is required for the following types of integrations and will take
in the values that the provider supports

- AWS Elastic Container Service
- Google KContainer Engine 
- Joyent Triton container  
- Azure Container Service  

