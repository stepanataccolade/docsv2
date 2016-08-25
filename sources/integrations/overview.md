page_title: What is supported?
page_description: Supported languages, services & platforms
page_keywords: containers, languages, services, platforms, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# What is an integration?

Integrations are used to connect your Shippable CI or CD workflows to third party platforms and services. We believe in separating authentication credentials from your yml definitions for better security and privacy. All integrations are stored in our Vault for maximum security.

Using an integration is a 3 step process:

#### Adding an integration to your account
You can get to your account integrations by clicking on the gear icon in the top navbar and clicking on `Integrations` in the left sidebar menu. Click on `Add integration` to add a new integration. Instructions for each type of integration are in the links below.

#### Enabling the integration for a Subscription
Next, you should go to your Subscription's Settings and click on `Integrations` on the left sidebar. Here, you can enable any of your account integrations for that particular subscription. This gives all projects in that subscription 'permission' to use that integration in their yml configurations.

#### Using the integration in your yml
Once an integration is enabled for a subscription, you can use it in any yml configuration as needed. 

For more details on how to use each type of integration, click on the integration you need from the list below.
 
---
##List of available integrations

### Source control providers
-  [GitHub](scm/github/)
-  [GitHub Enterprise](scm/githubEnterprise/)
-  [Bitbucket](scm/bitbucket/)
-  [Bitbucket Server](scm/bitbucketServer/)
-  [GitLab](scm/gitlab/)

---

### Notification Providers
- [Slack](notifications/slack/)
- [IRC](notifications/irc/)
- [Email](notifications/email/)
- [HipChat](notifications/hipchat/)
- [Event triggers](notifications/webhooks/)

---

### Docker registries
- [Docker Hub](imageRegistries/dockerHub/)
- [Amazon EC2 Container Registry (ECR)](imageRegistries/ecr/)
- [Google Container Registry](imageRegistries/gcr/)
- [Quay](imageRegistries/quay/)
- [Docker Trusted Registry](imageRegistries/dockerTrustedRegistry/)
- [Any private registry](imageRegistries/privateRegistry/)

---

### Container Services
- [Amazon EC2 Container Service (ECS)](containerServices/ecs/)
- [Google Container Engine (GKE)](containerServices/gke/)
- [Docker Cloud](containerServices/dockerCloud/)
- [Docker Datacenter](containerServices/dockerDatacenter/)

---

### Deploy
- [Amazon Elastic Beanstalk](deploy/eb/)

---
### Keys
- [PEM](keys/pem/)
- [SSH](keys/ssh/)

---