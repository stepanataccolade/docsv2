page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# deploy
This job is used to deploy [a manifest](manifest/) to [a cluster](../resources/cluster/) on any [supported Container Service](../../integrations/overview/). As a part of the deployment, you can include any necessary environment parameters.

The definition of a `deploy` job should be included in your `shippable.jobs.yml`.

## Single manifest deploy

If your job takes a single manifest as an input, it is a single manifest deployment.

<img src="../../images/jobs/singleManifestDeploy.png" alt="Single package manifest" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

A single manifest deploy is configured in `shippable.jobs.yml` as shown below:

```
- name: <string>                     		#required
  type: deploy                           	#required
  steps:
    - IN: <manifest>                   	#required
    - IN: <cluster>                      	#required
    - IN: <dockerOptions>					#optional override
    - IN: <params>                       	#optional override  
    - IN: <replicas>						#optional override
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view and in the list of jobs in the Pipelines `Jobs` tab.
* `type` is always set to deploy
* You will need one `manifest` job as an input. This tells us what images are to be deployed. Please read documentation on how to [define a manifest](manifest/) in your jobs yml.
* `cluster` is also a required input resource. This gives us information about where you want your manifest to be deployed, i.e. your deployment target. Read more on [cluster resource](../resources/cluster/).

Additional overrides:
In addition to the inputs above, you can provide `dockerOptions`, `params`, and `replicas` as inputs to your deploy job. If you have defined these resources in your input manifest, you do not need to define them again here. If provided in both manifest and deploy, the values set in deploy override any common options set in your manifest.

* `dockerOptions` is an optional input resource and customizes the memory, cpu shares, port mappings, etc. Read more on [dockerOptions resource](../resources/dockerOptions/). If your input manifest also has `dockerOptions`, defining it here will override any common options set in your manifest.
* `params` is an optional input resource and adds a list of environment params required for the deployment. This can include any key value pairs and lets you override design time configuration for the manifest. Read more on [params resource](../resources/params/).
* `replicas` is an optional input resource that lets you scale the number of instances of your manifest that you want to deploy. The default value for replicas is 1. Read more on [replicas resource](../resources/params/).


## Multi manifest deploy

If your job deploys more than one manifest, it is a multi manifest deployment.

<img src="../../images/jobs/multiManifestDeploy.png" alt="Single package manifest" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

A multi manifest deploy is configured in `shippable.jobs.yml` as shown below:

```
- name: <string>                     			#required
  type: deploy                           		#required
  steps:
    - IN: manifest-1                          	#required
    - IN: manifest-2                         	#optional
    - IN: <cluster>                      		#required
    - IN: <params>                       		#optional override
      applyTo:
        - image-2
    - IN: <dockerOptions>						#optional override
      applyTo:
        - manifest-2
    - IN: <replicas>							#optional override
      applyTo:
        - manifest-2
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view and in the list of jobs in the Pipelines `Jobs` tab.
* `type` is always set to deploy
* You can add any number of `manifest` jobs as an input for this job. This tells us what images are to be deployed. Please read documentation on how to [define a manifest](manifest/) in your jobs yml.
* `cluster` is also a required input. This gives us information about where you want your manifest to be deployed, i.e. your deployment target. All manifests from your deploy job will be deployed to a single cluster. Read more on [cluster resource](../resources/cluster/). 

Additional overrides:
In addition to the inputs above, you can provide `dockerOptions`, `params`, and `replicas` as inputs to your deploy job. If you have defined these resources in your input manifest, you do not need to define them again here. If provided in both manifest and deploy, the values set in deploy override any common options set in your manifest.

* `dockerOptions` is an optional tag and customizes the memory, cpu shares, port mappings, etc. Read more on [dockerOptions resource](../resources/dockerOptions/). 
	* By default, values specified in dockerOptions apply to all images in all manifests. If you want the custom values to only apply to specific manifests or images, use the `applyTo` tag and provide a list of manifests/images you want to apply them to. 
* `params` is an optional input and adds a list of environment params required for the deployment. This can include any key value pairs and lets you override design time configuration for the manifest. Read more on [params resource](../resources/params/).
	* 	By default, values specified in params applies to all manifests. Use the `applyTo` tag and provide a list to apply params only to specific manifests.
* `replicas` is an optional input resource that lets you scale the number of instances of your manifest that you want to deploy. The default value for replicas is 1. Read more on [replicas resource](../resources/params/).
	* 	By default, value specified in replicas applies to all manifests. Use the `applyTo` tag and provide a list to apply replicas only to specific manifests.

## Combined manifest deploy
If you have a combination manifest, you can use it as an input to a `deploy` job, instead of specifying individual manifests.  You can still use `applyTo` but you will have to know which manifests were used to create the combined manifest.

As an example, assume that combo-manifest is a combination of manifest-1 and manifest-2. A deploy job would look like this:

```
- name: <string>                     			#required
  type: deploy                           		#required
  steps:
    - IN: combo-manifest              			#required
    - IN: <cluster>                      		#required
    - IN: <params>                       		#optional override
      applyTo:
        - image-2
    - IN: <dockerOptions>						#optional override
      applyTo:
        - manifest-2
    - IN: <replicas>							#optional override
      applyTo:
        - manifest-1

```

The inputs for this follow the same rules as for a multi-manifest deploy job.

## Cascading deployments
Most teams need to create a deployment workflow i.e. move code from from test to production.
You might also want to turn off automatic deployments to production. 

<img src="../../images/jobs/daisyChainDeploys.png" alt="Daisy chaining deploy jobs" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

To daisy chain 2 deployment jobs, use the snippet below as an example: 

```
- name: deploy-2	                     		#required
  type: deploy                              	#required
  steps:
    - IN: deploy-1                   			#required, type deploy
      trigger: false                        	#optional
    - IN: <cluster>                      		#required
    - IN: <params>                       		#optional override
      applyTo:
        - image-2
    - IN: <dockerOptions>						#optional override
      applyTo:
        - manifest-2
    - IN: <replicas>							#optional override
      applyTo:
        - manifest-1
```

Instead of taking a manifest job as an input, this uses another `deploy` job as an input. 

This means that by default, anytime the input deploy job finishes executing, it will trigger this job automatically. You can change this behavior with the `trigger: false` setting as shown in the snippet above. If trigger is set to false, deploy-2 is not automatically triggered after deploy-1 finishes. You can go to the Shippable SPOG view for Pipelines and run the job manually. You can also add a [trigger resource](../triggers/) to run the job manually without going to the Shippable UI.


