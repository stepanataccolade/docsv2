page_title: Amazon EC2 Container Registry (ECR) integration
page_description: Setting up Shippable account integrations for Amazon ECR
page_keywords: Docker Hub, amazon, ecs, gcr, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Trusted registry, private, elastic compute cloud

# Amazon EC2 Container Registry (ECR) integration

An ECR integration lets you configure the following scenarios:

- Pull a private image
- Build a Docker image which has a `FROM` that pulls a private image
- Push an image
- Use an [image resource](../../pipelines/resources/image/) as part of your CD [pipeline](../../pipelines/overview/)

Using an ECR integration is a three step process:

<img src="../../images/accountIntegrationLifecycle.png" alt="Google Container Registry integration" style="width:800px;"/>

* **Adding an integration to your account**

You can get to your account integrations by clicking on the gear icon in the top navbar and clicking on `Integrations` in the left sidebar menu. Click on `Add integration` to add a new integration. Detailed instructions are provided in the [section below](#addAccountIntegration).

* **Enabling the integration for a [Subscription](../../../ci/overview/#subscription)**

Next, you should go to your [Subscription's Settings](../../../navigatingUI/subscriptions/settings/#adding-integrations) and click on `Integrations` on the left sidebar. Here, you can enable any of your account integrations for that particular subscription. This means that all projects in that subscription can now use that integration in their yml configurations. Detailed instruction on this step and in the [Adding integration to your Subscription section](#addSubscriptionIntegration) below.

* **Using the integration in your yml**

Once an integration is enabled for a subscription, you can use it in any project in that subscription with a few lines of yml configuration. Please note that the integration name should be the one from Subscription Settings. Additional details are in the [Using integration in your yml](#useIntegrationYml) section below.

---
<a name="addAccountIntegration"></a>

##Adding the Account Integration

You will need to configure this integration to pull or push images to Amazon ECR.

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
2. Click on the `Add Integration` button.
3. For 'Integration type', choose `Amazon ECR` from the list of dropdown choices.
4. For 'Integration Name' use a distinctive name that's easy to associate to the integration and recall. Example: `ecr-integration`
5. Enter your aws_access_key_id and aws_secret_access_key. You can follow instructions in [Amazon's guide for Creating and Managing access keys](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)  
12. Click on `Save`

The integration will now be available to all your continuous integration and deployment workflows.

<img src="/ci/images/integrations/imageRegistries/ecr/addInt.png" alt="Amazon EC2 Container Registry integration" style="width:700px;"/>

---

<a name="addSubscriptionIntegration"></a>
##Adding integration to your Subscription

To add ECR integration to your subscription, do the following:

1. Ensure you have logged in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the dropdown burger bar menu on the top left.
3. Click the 'Settings' tab and go to the 'Integrations' section.
4. Click the `Add Integration` button.
5. Provide an easy-to-remember name for the ECR integration for your Subscription, such as `ecr-integration`, in the 'Name' field.
**IMPORTANT:** The 'Name' you have entered in this step should be used in your `shippable.yml` file. Both names should be exactly the same. If not the build will fail with an error.
6. From the 'Account Integrations' dropdown select the ECR account integration created.
7. Click the `Save` button.
8. The ECR integration will show up in the list of integrations for your subscription.

---

<a name="useIntegrationYml"></a>
##Using integration in your yml

You can add the integration to your yml with the following snippet:

```
integrations:
  hub:
    - integrationName: ecr-integration
      type: ecr
      region: us-west-2     #optional
      branches:             #optional
        only:
          - master
          - dev
```

- `integrationName` value is the name of the ECR integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as  [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match).
- `type` is `ecr`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.
- [optional] By default, the ECR region is set to `us-east-1`. To override and specify a desired region, you can use the `region` tag to specify region as shown above.

Now that you've configured the integration in your yml, you can use docker commands to push or pull images from ECR. For further information about specific scenarios, check out the tutorials below.

---

##Tutorials

We have published the following tutorials to help get started on working with images stored in ECR as part of your CI/Pipelines workflows.

* [Pulling an image from ECR](../../../tutorials/ci/integrations/imageRegistries/amazon-ecr/pull-docker-image-from-aws-ecr/)

* [Using an image from ECR to spin up your CI container](../../../tutorials/ci/integrations/imageRegistries/amazon-ecr/use-custom-ecr-docker-image-for-ci/)

* [Build an image which pulls the base image from ECR](../../../tutorials/ci/integrations/imageRegistries/amazon-ecr/build-docker-image/)

* [Push an image to ECR](../../../tutorials/ci/integrations/imageRegistries/amazon-ecr/push-docker-image-to-aws-ecr/)


---

##Deleting the Integration

To remove the Amazon ECR integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Amazon ECR integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `ECR`. Alternatively, you can use the `Integration Name` field to provide the name of your Amazon ECR integration.
3. Your Amazon ECR integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Amazon ECR integration.
7. Once all dependencies of the Amazon ECR integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Amazon ECR Integration.

---
