page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# dockerOptions
This resource type is used to add a list of docker options that can be appended to a docker image. This resource on its own does not mean anything unless used in conjunction with an [image resource](image/). A `dockerOptions` resource can be an `IN` resource for [a manifest job](../jobs/manifest/), or for a [deploy job](../jobs/deploy/).

You can define `dockerOptions` by adding it to `shippable.resources.yml` as shown below:

```
- name: <string>                           #required
  type: dockerOptions                      #required
  version:
    
    memory: <integer>      	               	#optional, in MB
    
    cpuShares: <number>                 	#optional 
    
    portMappings:                         	#optional
      - "80:80"
         	
    links:									#optional, containerName:alias
      - <container name>:<alias>
      - <container name>:<alias>

    volumes:								#optional
      - "<source>:<container path>:<options>"
      - "<source>:<container path>:<options>"
      
    logConfig:								#optional 
      type: <string>						#optional 
      options:  							#optional
        <key1>: <value1>
        <key2>: <value2>

    entryPoint:								#optional
      - <string> 
      - <string> 

    cmd:
      - <string> 
      - <string> 

    workingDir: <path to working dir> 

    privileged: <boolean>  					# May be true or false

    labels:
      <key1>: <value1>
      <key2>: <value2>

    volumesFrom:
      - "<container name>:<options>" 			      
      - "<container name>:<options>"				
    ulimits:
      - name: <name of limit> 				# e.g. cpu
        soft: <number> 						# soft Limit
        hard: <number>						# hard Limit
      - name: <name of limit> 				# e.g. nofile
        soft: <number> 						# soft Limit, e.g. 50
        hard: <number>						# hard Limit, e.g. 100

    dnsServers:
      - "<ip address>"

    dnsSearch:
      - "<ip address>"

    user: <string> 							# For GKE, this should be the UID (a number)
		
```

This will create a resource of type `dockerOptions`. You can include any settings shown above that you want as part of your `dockerOptions`. All settings are optional. Read below for a description and format of all settings. 

For a table showing the mapping of each setting to a setting in your Container Service, read the [Mapping dockerOptions to your Container Service section](#mappingDockerOptions). 

```
- name: <string>
```

`name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view and in the list of resources in the Pipelines `Resources` tab. It is also used to refer to this resource in the jobs yml.

```
  type: dockerOptions
```
`type` is always set to dockerOptions. 

```
  version:
```
`version` is where all options are configured. There must be at least one option under this section.

```
   memory: <number>
```
`memory` is the amount of memory allocated to the container. It is set in megabytes and is an integer. It defaults to 0 if not specified, which means the host node manages it dynamically. 


```
    cpuShares: <number> 
```
`cpuShares` are the number of CPU units reserved for the container. A description of how cpu units work is given in <a href="http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_environment" target="_blank">Amazon's ECS docs</a>. It defaults to 0 if not specified, which means the host node manages it dynamically.

```
    portMappings:                         	
      - "80:80"
```
`portMappings` is an array of port mappings. The format is always `"host port number: container port number"`, e.g. "80:80". Port numbers are always integers. If not provided, no container port is exposed, even if your Dockerfile has the `EXPOSE` statement.

```
    links:									
      - <container name>:<alias>
      - <container name>:<alias>
```
`links` allows containers to communicate with each other without the need for port mappings. The format for this is `"<container name>:<alias>"`, e.g. ""shippabledb:db"". 

This setting maps to Links in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a>  of the Docker Remote API and the --link option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>. 

```
    volumes:								
      - "<source>:<container path>:<options>"
      - "<source>:<container path>:<options>"
```
`volumes` configures mount points for data volumes in your container. This is a list of objects, format for each object being <source volume>:<container path>:<options>. The source volume is a string and specifies name of the volume to mount, container path is a string and specifies path on the container where volume should be mounted. Options can be set to `rw` if you want the container to be able to write to the volume, and `ro` if you want the container to have read-only access. Default setting is `rw`.

This setting maps to Volumes in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --volume option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>. 

```
    logConfig:								 
      type: <string>						 
      options:  							
        <key1>: <value1>
        <key2>: <value2>
```
`logConfig` specifies the log configuration of the container. By default, containers use the same logging driver that the Docker daemon uses. To override this and specify a different logging driver, include this settingin dockerOptions. The available logging drivers depend on your Container Service. For example, `type` can be set to `"syslog"` and you can specify options using key value pairs.

This setting maps to LogConfig in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --log-driver option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>.

```
    entryPoint:								
      - <string> 
      - <string> 
```
`entryPoint` specifies the entry point(s) passed to the container. It is an array of strings.

This setting maps to Entrypoint in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --entrypoint option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>. Read more information about the Docker ENTRYPOINT parameter at <a href="https://docs.docker.com/reference/builder/#entrypoint" target="_blank">https://docs.docker.com/reference/builder/#entrypoint</a>.

```
    cmd:
      - <string> 
      - <string> 
```
`cmd` specifies the command(s) is passed to the container.

This setting maps to Cmd in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the COMMAND parameter to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>. For more information about the Docker CMD parameter, go to <a href="https://docs.docker.com/reference/builder/#cmd" target="_blank">https://docs.docker.com/reference/builder/#cmd</a>.


```
    workingDir: <path to working dir> 
```
`workingDir` specifies the working directory where commands are run inside the container. 

This setting maps to WorkingDir in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --workdir option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>.

```
    privileged: <boolean> 
```
`privileged` specifies the level of access the container has to the host container instance. When set to `true`, the container has elevated privileges on the host container instance, similar to the *root* user.

This setting maps to Privileged in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --privileged option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>.

```
    labels:
      <key1>: <value1>
      <key2>: <value2>
```
`labels` specifies a list of key/value pairs of labels to add to the container. 

This setting maps to Labels in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --label option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>.

```
    volumesFrom:
      - "<container name>:<options>" 			      
      - "<container name>:<options>"
      - "<container name>"	
```
`volumesFrom` specifies the list of data volumes to mount from another container.

This setting maps to VolumesFrom in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --volumes-from option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>. `options` can be `rw` if you want the container to be able to write to the volume, and `ro` if you want the container to have read-only access. Default setting is `rw`.

```
    ulimits:
      - name: <name of limit> 				
        soft: <number> 						
        hard: <number>						
      - name: <name of limit> 				
        soft: <number> 						
        hard: <number>
```
`ulimits` specifies a list of ulimits to be set in the container. For alist of 

This setting maps to Ulimits in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --ulimit option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>. 

```
    dnsServers:
      - "<ip address>"
      - "<ip address>"
```
`dnsServers` specifies a list of DNS servers that are presented to the container. 

This setting maps to Dns in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --dns option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>.


```
    dnsSearch:
      - "<ip address>"
```
`dnsSearch` specifies a list of DNS search domains that are presented to the container. 

This setting maps to DnsSearch in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --dns-search option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>.

```
    user: <string> 	
```
`user` specifies the user name to be uses inside the container. 

This setting maps to User in the <a href="https://docs.docker.com/reference/api/docker_remote_api_v1.19/#create-a-container" target="_blank">Create a container section</a> of the Docker Remote API and the --user option to <a href="https://docs.docker.com/reference/commandline/run/" target="_blank">docker run</a>.

<a name="mappingDockerOptions"></a>
##Mapping dockerOptions to your Container Service
Even though `dockerOptions` supports a wide variety of configurations, you can only use options that are relevant for your Container Service. The table below maps our tags to settings in Amazon's ECS, Google Container Enginer, and Joyent Triton Public Cloud.


| Shippable tag | Amazon ECS | Google Container Engine | Joyent Triton 
| ---- | ---- | ---- | ---- |
| links | links | none | Links | 
| logConfig | logConfiguration | none | LogConfig |
| entryPoint | entryPoint | command | Entrypoint |
| cmd | command | command | Cmd |
| workingDir | workingDirectory | workingDir | WorkingDir |
| privileged | privileged | privileged | Privileged (not supported) |
| labels | dockerLabels | labels | Labels |
| volumes | volumes/mountPoints | volumeMounts/volumes | Volumes |
| volumesFrom | volumesFrom | none | VolumesFrom |
| ulimits | ulimits | none | ulimits |
| dnsServers | dnsServers | none | Dns |
| dnsSearch | dnsSearchDomains | none | DnsSearch |
| user | user | runAsUser | User |

Here are links to docs for each Container Service:

* [Amazon ECS docs](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
* [Google Container Engine (GKE) docs](http://kubernetes.io/docs/api-reference/v1/definitions/)
* [Joyent triton docs](https://docs.docker.com/v1.9/engine/reference/api/docker_remote_api_v1.18/)


##Overriding dockerOptions
`dockerOptions` can also be used to override options that are already set in an upstream stage of the pipeline.

For example, if you want to use different settings for your service in Test and Production environments, you can do so by overriding one or more settings in the resource.

<img src="../../images/resources/overrideDockerOptions.png" alt="Overriding docker options" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In the picture above, `deploy-test` takes `dockerOptions-1` as an input. After testing, a release is created with the `release` job. This triggers production deployment with the `deploy-prod` job, which takes `dockerOptions-2` as an input. For this production deployment, we will use a superset of settings from `dockerOptions-1` and `dockerOptions-2`, with values for any common settings being chosen from `dockerOptions-2`.

##Triggering dependent jobs

When anything in `dockerOptions` changes, a new version of the resource is created. However, this does not automatically trigger subsequent portions of the pipeline since we have no way of knowing if your code commit changing dockerOptions also changed something else in the pipeline. Triggering dependent jobs automatically might lead to unexpected behaviour in this case. 

To trigger the rest of the workflow, you will need to manually trigger any jobs that have this resource as an input. You can do this through the UI by right clicking on the dependent job and clicking on `Run`, or by updating an input [trigger resource](../triggers/) for the job. 