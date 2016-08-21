page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# params
This resource type is used to add a list of environment params that will be 
appended to app/service/microservice. This resource on its own does not mean 
anything unless used in conjunction with a service.

This resource can also be used to override environment variables that are already 
set in another stage of the pipeline. A common use case for this would be a scenario 
in  which you want to run different DB connection for the same service in test vs
production. 

You can create this resource by adding it to `shippable.resources.yml`
```
- name: box-params                          #required
  type: params                              #required
  version:
    params:                                 
      DB_HOST: "ds015700"                   #required atleast 1
      DB_NAME: "ayeaye"                     #optional
      DB_PORT: "15700"                      #optional
      secure: <encrypted value>  			 #optional
```
This will create a resource of type `params` with the name `box-params`. The 
following params are being set in this example: DB_HOST, DB_NAME, DB_PORT, and a secure variable containing an encrypted value.

## YML properties
```
name: string
```
This is the name of the resource. Keep it short but explanatory as this is used 
as a reference in jobs

```
type: string
```
This defines the type of resource. In this case *params*. This cannot 
be changed once set. 

```
version:
  params: 
    key1: value1
    key2: value2
    secure: encrypted value
```
`params` is basically an object of key value pairs that will be set as environment
variables when the app/service/microservice starts at the target. A new version is
created everytime any of the values of the params changes. 

You can use secure variables to encrypt any key value pairs that contain sensitive information you don't want to include as plain text. To encrypt one or more key value pairs, [follow the instructions in the Subscription Settings guide](../../navigatingUI/subscriptions/settings.md#encrypt). Copy the encrypted value and include it in your resource file as shown in the snippet above.


