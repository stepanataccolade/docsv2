page_title: Shippable CI Overview
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Third-party integrations

Shippable integrates with many popular source control providers, notification platforms, container services, and Docker registries. 

In order to interact with these services on your behalf, you need to provide your credentials or keys. To protect this private information, we do not ask you to enter this in the yml config, and instead provide an easy way to set this information in the Shippable UI. 

For example, to pull an image from or push an image to a Docker Hub, you will add a Docker integration which will ask for your credentials and you can then use that integration during your build process.

To start with, you will always need to add an account integration as described below.

##Adding an account integration 

- Click on Settings ()gear icon) in your top navigation bar to navigate to account settings.

- Click on the Integrations tab and click on 'Add Integration'

- From the dropdown, choose the type of integration you want to add. The relevant fields for that integration will appear below the dropdown

- Enter your information and click on Save.

The integration should now show up in your Integrations tab. This integration will be available to all your projects and can be used for your CI or Deploy workflows. Further details and examples of how a specific integration is used is available in the section for each integration. 

## Deleting an account integration

TODO: Update this

To delete an integration:, simply click on the `Delete` button for the integration you want to delete.
 
Delete will fail if there are any projects actively using the integration, so make sure the integration is not being used in any project before deleting it.


## Supported integrations

### [Source Control Providers](int_scm.md)
- GitHub
- GitHub Enterprise
- Bitbucket

In addition, we are working on Bitbucket Server and GitLab integrations and will announce these in Q1 of 2016.

### [Notifications](int_notifications.md)
- Email
- Slack
- IRC

Hipchat integration will be available in Q1 of 2016.

### [Docker Registries](int_docker_registries.md)
- Docker Hub
- Google Container Registry (GCR)
- Amazon Elastic Container Registry (ECR)
- Quay.io
- Self-hosted private registries

### [Container Services](int_container_services.md)
- Amazon Elastic Container Service (ECS)
- Google Container Engine (GKE)
- Red Hat Openshift V3

### [Keys](int_keys.md)
- SSH keys
- PEM keys