page_title: Amazon EC2 Container Service integrations
page_description: Setting up Shippable account integrations for Amazon EC2 Container Service
page_keywords: amazon, ecs, gke, kubernetes, engine, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Cloud, Datacenter, private

# Container Services integration

Shippable lets you easily deploy your Dockerized applications to popular Container Services like Amazon EC2 Container Service (ECS), Google Container Engine (GKE), or Red Hat OpenShift 3.

You will first need to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable Pipelines. There are two ways to configure Amazon EC2 Container Service (ECS) on Shippable. Use either one of them:

- ECS integration using Cross Account AWS Identity and Access Management (IAM) Roles
- ECS integration using Account Keys

---

# ECS integration using Cross Account AWS IAM Roles

This is a (recommended) way of giving AWS account access to Shippable without sharing your AWS Secret and Access Keys. [AWS Cross Account account IAM Roles documentation](http://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html) provides technical details on how Shippable internal implements this. To put simply, Shippable uses its own AWS account keys to assume a Role on user's behalf and then perform actions on user's AWS account.

This requires four additional steps to be performed by the user

##1. Create an AWS IAM Role that Shippable will assume

On the [IAM console](https://console.aws.amazon.com/iam/) do following:

- Click on `Roles`.
- Click `Create New Role` and enter the following:  
     - Role Name: `shippable-role-to-allow-ecs-access`
     - Role type: Select `Role for Cross Account Access`
          - Select `Allows IAM users from a 3rd party AWS account to access this account.`
     - Establish Trust: Provide the following values  
          - Account Id: <12 digit AWS account id>
          - External Id: <user's Shippable account id> (This can be found on the Shippable platform, Account Settings/Accounts section. Check [our documentation](/navigatingUI/accountSettingsAccounts/) for more help.)
     - Click `Next Step`
     - Skip attaching any policies in this step. Click `Next Step`
     - Review and click `Create Role`

##2. Add a policy to the role created to access ECS entities


- Click the role `shippable-role-to-allow-ecs-access`.
- In the 'Permissions' tab, click 'Inline Policies' dropdown and create a new one by clicking the `Click here` button.
- Select 'Custom Policy' and click the `Select` button.
- Name the policy as `shippable-policy-to-access-ecs` and add the following in the 'policy document'  

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
                "ecs:DescribeTasks",
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
- Click `Validate Policy` button to ensure the syntax and the indentation are correct.
- Click `Apply Policy` button.

##3. Update the `Trust Relationships` of the Role

- From the IAM console, navigate to and click the Role `shippable-role-to-allow-ecs-access`.
- Go to the 'Trust Relationships' tab.
- Click `Edit Trust Relationship` button.
-  Add the following entity to the `Statement` array of the Policy Document
```
,
{
    "Sid": "",
    "Effect": "Allow",
    "Principal": {
      "Service": "ecs.amazonaws.com"
    },
    "Action": "sts:AssumeRole"
}

```
NOTE: Do not forget to include the comma at the top. After adding to the `Statement` the complete Policy Document should look something like this:

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
- Click `Update Trust Policy`


##4. Configure Shippable to use this role to access the account

1. Sign in to [Shippable](https://app.shippable.com)
2. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
3. Click on the `Add Integration` button.
4. For 'Integration type', choose `Amazon Web Services (IAM)` from the list of dropdown choices.
5. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `AWS-IAM-Integration`.
6. Enter the ARN for the role `shippable-role-to-allow-ecs-access`. This will be a string with format like this `arn:aws:iam::XXXXXX:role/shippable-role-to-allow-ecs-access`, where XXXXXX is your 12 digit AWS account id.
7. Click on `Save`.

<img src="/ci/images/awsIamInt.png" alt="Amazon AWS IAM integration" style="width:700px;"/>

You can now use this integration to set up your Environment and Deployment Pipelines on your ECS clusters. For more information on this, please check out our [Deployment pipelines section](/pipelines/overview/)

---

# ECS integration using Account Keys

In this method of deploying to Amazon ECS, you need to configure an AWS account integration with credentials to access the ECS instance and create appropriate roles and permissions on [Amazon AWS IAM console](https://console.aws.amazon.com/iam/). This can be achieved in two steps. The first step sets up appropriate AWS access and second one uses the AWS user keys to create Shippable Account Integration.

##1. Create an AWS IAM User with access to ECS resources

On the [IAM console](https://console.aws.amazon.com/iam/) do following:

- Click on `Users`.
- Click `Create New User` and enter the following:  
     - User Name: `shippable-user-to-allow-ecs-access` (You can specify an alternate name as well.)
     - Ensure the 'Generate an access key for each user' option is checked.
     - Click the `Create` button.
     - Download the User Security Credentials (or copy them)
     - Click `Close`.

  Once the user is created, attach a policy to this user that gives the user, access to Amazon ECS resources. The credentials(Access Key/Secret Key pair) for this user will be used for creating
  an Account Integration on Shippable.

  On the [IAM console](https://console.aws.amazon.com/iam/) do following:

  - Click on `Users`.
  - Click on the user `shippable-user-to-allow-ecs-access`
  - In the 'Permissions' tab, click 'Inline Policies' dropdown and create a new one by clicking the `Click here` button.
  - Select 'Custom Policy' and click the `Select` button.
  - Name the policy as `shippable-user-policy-for-ecs-access` and add the following in the 'policy document'  

```
{
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
                "ecs:DescribeTasks",
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
}
```

- Click `Validate Policy` button to ensure the syntax and the indentation are correct.
- Click `Apply Policy` button.

The user `shippable-user-to-allow-ecs-access` now has permissions to access Amazon ECS and Load balancer resources.

##2. Create an AWS IAM Role with access to ECS resources.  

This Role will be used by Shippable when creating a service on ECS. On the [IAM console](https://console.aws.amazon.com/iam/) do following:

- Click on `Roles`.
- Click `Create New Role` and enter the following:  
     - Role Name: `shippable-role-to-allow-ecs-access`
     - Role type: Select `AWS Service Roles`
     - Scroll down and select `Amazon EC2 Container Service Role`.
     - Select the checkbox for `AmazonEC2ContainerServiceRole`
     - Click `Next Step`.
     - Review and click `Create Role`

Amazon has a pre-existing policy called `AmazonEC2ContainerServiceRole` is being attached to the Role here. It contains everything that the role needs to allow the ECS agent to control the load balancing.

##3. Update the `Trust Relationships` of the Shippable Role

- From the IAM console, navigate to and click the Role `shippable-role-to-allow-ecs-access`.
- Go to the 'Trust Relationships' tab.
- Click `Edit Trust Relationship` button.
- Ensure the Policy Document looks like the following:

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

This gives the `ecs` agent running on each ECS instance(s) permissions to talk to the Load balancers
NOTE: Refer [the official Amazon documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_IAM_role.html) on how to set up this special role and policy

##4. Create Shippable Account Integration

1. Sign in to [Shippable](https://app.shippable.com)
2. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
3. Click on the `Add Integration` button.
4. For 'Integration type', choose `AWS` from the list of dropdown choices.
5. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `AWS-Integration`.
6. Enter your access and secret keys provided by AWS. [See here](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html) for info on how to generate them.
7. Click on `Save`.

<img src="/ci/images/awsInt.png" alt="Amazon AWS integration" style="width:700px;"/>

You can now use this integration to set up your Environment and Deployment Pipelines on your ECS clusters. For more information on this, please check out our [Deployment pipelines section](/pipelines/overview/)

---

##Deleting the Integration

To remove the ECS integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the ECS integration from the list of integrations. If you have many entries, use the `Integration Name` field to provide the name of your ECS integration.
3. Your ECS integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the ECS integration.
7. Once all dependencies of the ECS integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the ECS Integration.

--------
