page_title: Quay integration
page_description: Setting up Shippable account integrations for Quay
page_keywords: docker hub, amazon, ecs, gcr, ecr, google, shippable, quay, coreos, docker, registry, EC2 Container Service, Google, Docker Trusted registry, private, elastic compute cloud


# Quay.io

##Adding the Integration

You will need to configure this integration in order to pull or push images to Quay.io.

###Getting your quay.io accesstoken

Shippable will need your `username`, `password` and your `accesstoken`. `Username` and `Password` are same as your quay login credentials but to get your `accesstoken` you will need to create an quay `application` and `authorize` the application.

A new application can be created under an Organization. To create an Organization click on the + icon in the menu and select `New Organization` then, fill in the details and hit create application.

You can see your organization listed under Users and Organizations on your dashboard. Click on your Organization that you just created, click on the applications tab which is present at the bottom of the Organization view just above Organization settings.

<img src="/continuous_integration/images/quay_new_application.png" alt="Quay create new application" style="width:700px;"/>

Create a new Application and an it should be listed under OAuth Applications. Click on the application you created, and then on `Generate Token` under the menu options. Shippable will require read permission.Finally click on `authorize application` and Quay will provide you with an access token.

<img src="/continuous_integration/images/quay_generate_token.png" alt="Quay generate token" style="width:700px;"/>

###Configuring Quay.io Integration on Shippable

On your [Shippable dashboard](https://shippable.com):

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Integrations' section.
2. Click on the `Add Integration` button.
3. For 'Integration type', choose `Quay.io` from the list of dropdown choices.
4. For 'Integration Name', use a distinctive name that's easy to associate to the integration and recall. Example: `quay_integration`.
5. Enter your credentials.
6. Click on `Save`.

<img src="../images/quay_integration.png" alt="Quay integration" style="width:700px;"/>

The integration will now be available to all your continuous integration and deployment workflows.

---

##Deleting the Integration

To remove the Quay.io integration, you'll need to remove this integration from all dependencies configured to use it. To find all the dependencies:

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the `Integrations` section.
2. Select the Quay integration from the list of integrations. If you have many entries, use the `Filters` dropdown and select `Quay.io`. Alternatively, you can use the `Integration Name` field to provide the name of your Quay integration.
3. Your Quay integration shows up in the list.
4. Click on the `Delete` button.
5. A window pops up confirming that you want to delete the integration. This window lists all dependencies of this this integration. The list will include any project, environment or subscription image dependent on this integration.
6. If there are dependencies, individually access the `Settings` tab for each project/environment/subscription image and delete the Quay integration.
7. Once all dependencies of the Quay integration have been removed, Step 5 will show the message: `No dependency`.
8. Click the `Yes` button to delete the Quay Integration.

--------
