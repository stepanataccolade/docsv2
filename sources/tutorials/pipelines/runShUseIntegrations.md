page_title: Using integrations with your runSh job
page_description: Continuous deployment tutorials
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, Tokens, account settings

#Using integrations with your runSh job
The `runSh` job type is a custom job that lets you run any custom scripts as part of your deployment pipeline. For scenarios where you want to interact with a supported third party service, you will need to add an integration as an `IN` for your custom job.

For example, if you want to push to a Docker registry or pull a private Docker image from a registry, you will need to add an integration for the Docker registry. For more on Integrations, read our [Integrations overview page.](../integrations/overview/) 


###Specifying an integration as an input 
To use an integration with your custom job, you should first define it in your `shippable.resources.yml`:

```
resources:
  - name: myIntegration					#required
    type: integration				    #required
    integration: myCredentials			#required
```

Next, specify the integration resource in your `shippable.jobs.yml`:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myIntegration
      - TASK:
        - script: ./doStuffWithIntegration.sh 
```


###Extracting data from integration
Now that you have added the integration as an `IN` resource, you need to extract data from your integration in order to use it in your custom script. For example, if your integration is for Docker Hub, you will need to extract the username and password from your integration resource so you can include a `docker login` command in your custom script.

The information from your integration is stored in the `./IN/<resource name>integration.env` file. You can run the comand shown below to extract your credentials:

```
  . ./IN/myIntegration/integration.env
```
This will export the data into environment variables with the same names as the field in your account integration. Exported environment variables are always in lower case.

For example, the environment variables are $username, $password, and $email for Docker Hub integrations:

<img src="../../images/pipelines/dockerHubCreds1.png" alt="Docker Hub credentials " style="width:400px;"/> 

You can use then use these environment variables in your custom script as shown below:

```
dockerLogin() {
  . ./IN/$RES_DOCKER_CREDS/integration.env		
  docker login -u $username -p $password
}
```




