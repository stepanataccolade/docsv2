page_title: PaaS/IaaS providers integration
page_description: Setting up account integrations on Shippable for popular Platform as a Service/Infrastructure as a Service providers like AWS Elastic Beanstalk
page_keywords: eb, amazon, aws, shippable, google, openshift

# PaaS/IaaS providers integration

Shippable CI lets you easily deploy your applications to popular Platform as a Service (PaaS) and Infrastructure as a Service (IaaS) providers like AWS Elastic Beanstalk (EB), Heroku, Openshift, etc.

You will first need to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable CI.

---

<a name="eb-integration"></a>
## AWS Elastic Beanstalk

To deploy applications to AWS EB, you need to configure an AWS account integration with credentials to access the EB instance.

1. From your [Shippable dashboard](https://app.shipable.com), Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` tab. Click on 'Add Integration'
2. **Integration type:** In the dropdown, select `AWS`
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: `abhijitkini-aws-eb`
4. Enter your access and secret keys provided by AWS. [See here](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html) for info on how to generate them. 
5. Click `Save`

You can now use this integration to set up your Environment and Deployment Pipelines on your Elastic Beanstalk service. For more information on this, refer the documentation on [Configuring deployments to PaaS/IaaS providers - AWS Elastic Beanstalk section](http://docs.shippable.com/ci_configure/#aws-elastic-beanstalk). In addition, review our blog for a stepwise guide on [deploying your source code application on AWS Elastic Beanstalk](http://blog.shippable.com/how-to-deploy-your-application-to-aws-elastic-beanstalk-using-shippable-part-1).

---

Stay tuned for other PaaS/IaaS providers.
