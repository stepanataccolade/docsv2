page_title: Container Services integration
page_description: Setting up account integrations on Shippable for popular container services like Amazon ECS
page_keywords: ecs, amazon, aws, shippable, google, gke, openshift

# Container Services integration

Shippable Deploy lets you easily deploy your Dockerized applications to popular Container Services like Amazon EC2 Container Service (ECS), Google Container Engine (GKE), or Red Hat OpenShift 3.

You will first need to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable Deploy.

<a name="ecs-integration"></a>
## Amazon EC2 Container Service Using Account Keys

In this method of deploying to Amazon ECS, you need to configure an AWS account integration with credentials to access the ECS instance and create appropriate
roles and permissions on Amazon IAM console. This can be achieved in two steps. The first step sets up appropriate AWS access and second one uses the AWS user keys to create Shippable Account Integration.

###1. Create an AWS IAM User with access to ECS resources
  on IAM console do following  
  **New User** ->  
  User Name: `shippable-user-to-allow-ecs-access` (or anything else) ->  
  **Download Credentials** (or copy them) ->  
  **Close**  

  Once the user is created, attach a policy to this user that gives it access to Amazon ECS resources. The credentials(Access Key/Secret Key pair) for this user will be used for creating
  an Account Integration on Shippable  

  on IAM console do following  
  Select user `shippable-user-to-allow-ecs-access` ->  
  **Permissions** ->  
  **Inline Policies** ->  
  **Click Here** ->  
  **Custom Policy** ->  
  **Select** ->  
  Policy Name : `shippable-user-policy-for-ecs-access` ->  
  Copy following policy document  

```
"Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:ConfigureHealthCheck",
                "elasticloadbalancing:DescribeLoadBalancers",
                "elasticloadbalancing:DeleteLoadBalancerListeners",
                "elasticloadbalancing:CreateLoadBalancerListeners",
                "iam:ListServerCertificates",
                "iam:ListRoles",
                "iam:PassRole",
                "ec2:DescribeRegions",
                "ec2:DescribeInstances",
                "ecs:DescribeClusters",
                "ecs:ListClusters",
                "ecs:ListTaskDefinitions",
                "ecs:RegisterTaskDefinition",
                "ecs:DeregisterTaskDefinition",
                "ecs:DescribeServices",
                "ecs:UpdateService",
                "ecs:DeleteService",
                "ecs:CreateService",
                "ecs:ListTasks",
                "ecs:ListContainerInstances",
                "ecs:DescribeContainerInstances"

            ],
            "Resource": "*"
        }
    ]
```
  **Apply Policy**

  The user `shippable-user-to-allow-ecs-access` now has permissions to access Amazon ECS and Loadbalancer resources.


###2. Create an AWS IAM Role with access to ECS resources.  

This Role will be used by Shippable when creating a service on ECS.

  on IAM console do following  
  **New Role** ->  
  Role Name: `shippable-role-to-allow-ecs-access` ->  
  **AWS Service Roles** ->  
  **Amazon EC2 Container Service Role** ->  
  Select **AmazonEC2ContainerServiceRole** ->  
  **Next Step** ->  
  **Create Role**  

  Amazon has a pre-existing policy called `AmazonEC2ContainerServiceRole` is being attached to the Role here. It contains everything that the role needs to allow the ECS agent to control the load balancing.

  Update the role `shippable-role-to-allow-ecs-access` to have a 'Trust Relationship` that looks like following:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

This gives the `ecs` agent running on each ECS instance(s) permissions to talk to the Loadbalancers
NOTE: Refer [the official Amazon documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_IAM_role.html) on how to set up this special role and policy

###3. Create Shippable Account Integration
1. From your [Shippable dashboard](https://app.shippable.com), Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
2. **Integration type:** In the dropdown, select `AWS`
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: `manishas-aws-ecs`
4. Enter your access and secret keys provided by AWS. [See here](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html) for info on how to generate them.
5. Click `Save`

You can now use this integration to set up your Environment and Deployment Pipelines on your ECS clusters. For more information on this, please check out our [Deployment pipelines section](pipelines_overview.md)

<a name="ecs-integration-iam"></a>
## Amazon EC2 Container Service using Cross Account IAM Roles

This is another(recommended) way of giving AWS account access to Shippable without sharing your AWS Secret and Access Keys. [AWS Cross Account account IAM Roles documentation](http://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html) provides technical details on how Shippable internall implements this. To put simply, Shippable uses its own AWS account keys to assume a Role on user's behalf and then perform actions on user's AWS account.

This requires four additional steps to be performed by the user

###1. Create an AWS IAM Role that Shippable will assume

  on IAM console do following  
  **New Role** ->  
  Role Name: `shippable-role-to-allow-ecs-access` ->  
  **Role for Cross Account Access** ->  
  **Allows IAM users from a 3rd party AWS account to access this account.** ->  
  **Account Id**: < shippable aws account id >, **External Id**: < users shippable account id > ->  
  **Next Step** ->  
  **Create Role**  

###2. Add policy to role to access ECS entities
   select the role `shippable-role-to-allow-ecs-access`  
  **Permissions** ->  
  **Inline Policies** ->  
  **Custom Policy**. Name the policy as `shippable-policy-to-access-ecs` and add following policy document  

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
                "elasticloadbalancing:Describe*",
                "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
                "elasticloadbalancing:ConfigureHealthCheck",
                "elasticloadbalancing:DescribeLoadBalancers",
                "elasticloadbalancing:DeleteLoadBalancerListeners",
                "elasticloadbalancing:CreateLoadBalancerListeners",
                "iam:ListServerCertificates",
                "iam:ListRoles",
                "iam:PassRole",
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:Describe*",
                "ec2:DescribeRegions",
                "ec2:DescribeInstances",
                "ecs:DescribeClusters",
                "ecs:ListClusters",
                "ecs:RegisterTaskDefinition",
                "ecs:DeregisterTaskDefinition",
                "ecs:ListTaskDefinitions",
                "ecs:DescribeServices",
                "ecs:UpdateService",
                "ecs:DeleteService",
                "ecs:CreateService",
                "ecs:ListTasks",
                "ecs:ListContainerInstances",
                "ecs:DescribeContainerInstances"
            ],
            "Resource": "*"
        }
    ]
}
```

###3. Update the `Trust Relationship` of the Role
  navigate to the Role `shippable-role-to-allow-ecs-access` from IAM console ->  
  **Edit Trust Relationship** ->  
  Add the following entity to the `Statement` array of the Policy Document
```
{
    "Sid": "",
    "Effect": "Allow",
    "Principal": {
      "Service": "ecs.amazonaws.com"
    },
    "Action": "sts:AssumeRole"
}

```

  The complete Policy Document should look something like this

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<shippable aws account id> :root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<users shippable account id>"
        }
      }
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
  click **Update Trust Policy**


###4. Configure Shippable to use this role to access the account

  1. From your [Shippable dashboard](https://app.shipable.com), Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
  2. **Integration type:** In the dropdown, select `AWS (IAM)`
  3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: `manishas-aws-iam`
  4. Enter the ARN for the role `shippable-role-to-allow-ecs-access`. This will be a string with format like this `arn:aws:iam::12345678912:role/shippable-role-to-allow-ecs-access`
  5. Click `Save`

You can now use this integration to set up your Environment and Deployment Pipelines on your ECS clusters. For more information on this, please check out our [Deployment pipelines section](pipelines_overview.md)

<a name="gke-integration"></a>
## Google Container Engine (GKE)

To deploy applications to GKE, you need to configure an account integration with credentials to access your GKE account.

* Go to your Google Cloud Platform (GCP) Console. Create a new Service account by following the instructions in Google's documentation for [Generating a service account credential](https://cloud.google.com/storage/docs/authentication#service_accounts) and generate a private key in JSON format.
* Copy the JSON key you generated for your Service account.  
* Sign in to Shippable and go to your [Account Settings](https://app.shippable.com/accountSettings). Click on the `Integrations` tab.
* Click on `Add Integration`. Choose `Google Container Engine`, name your integration, and paste your JSON key.
* Click `Save`

You can now use this integration to set up your Environment and Deployment Pipelines on your GKE clusters. For more information on this, please check out our [Deployment pipelines section](pipelines_overview.md)

<a name="dcl-integration"></a>
## Docker Cloud
To deploy containers to Docker Cloud, you need to configure an account integration with credentials to access your Docker Cloud account.

* [Generate an API key](https://cloud.docker.com/account/#container-api-key) in your Docker Cloud account to use with Shippable.
* Copy the generated API key.
* Sign in to Shippable and go to your [Account Settings](https://app.shippable.com/accountSettings). Click on the `Integrations` tab.
* Click on `Add Integration`. Choose `Docker Cloud`, name your integration, and paste your API key.
* Click `Save`.

<a name="ddc-integration"></a>
## Docker Datacenter
To deploy containers to Docker Datacenter, you need to configure an account integration with credentials to access your Docker Cloud account.

* You can use your own credentials or decide to create a new user with appropriate user permissions to deploy from Shippable.
* To create a new user, login to Universal Control Plane (UCP) and go to `Users & Teams` tab and click `Create User`.
* Sign in to Shippable and go to your [Account Settings](https://app.shippable.com/accountSettings). Click on the `Integrations` tab.
* Click on `Add Integration`. Choose `Docker Datacenter`, name your integration and provide the username, password and URL to access the Universal Control Plane.
* Click `Save`.
