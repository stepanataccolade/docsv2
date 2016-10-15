page_title: Rolling back to a previous deployment
page_description: Continuous deployment tutorials
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, Tokens, account settings

#Rolling back to a previous deployment

We all hope that our tests are perfect and once a release is 'blessed' to be deployed to an environment, it will all 'just work'. Unfortunately, that is not always the case. In some cases, you discover problems with the new release that were not caught during testing. In these situations, you might want to roll back your environment to a previous release while you can work on fixing the problems.

We are working on an easy, single click UI action for rollback since we believe this is an important scenario. However, there are some easy ways to roll back your deployments using your jobs yml configuration.


##Rolling back a release

<img src="../../images/pipelines/rollback-release.png" alt="Shippable Continuous Integration and Delivery" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In this scenario, you have a setup where the deploy job you want to rollback is preceded by a release job in your pipeline.The easiest way to roll back to a previous deployment here is:

* Identify the versionName of the release you want to roll back to. To do this, go to the `Jobs` tab of your Pipelines page and find the release job in the list. Click on the number in the `Latest version` column for the job.

 <img src="../../images/pipelines/view-older-job-versions.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* This will show you a list of releases that were created for your application. Look up the release you want and write down the `versionName` for the release

* Pin the versionName of the release you want to go back to in your yml config for deploy.

```
jobs:

  - name: deploy-to-prod
    type: deploy
    steps:
      - IN: release-job-name
        versionName: "v1.2.1"  #This needs to contain the versionName you want to pin
```

* Commit the yml to your source control repository.
* Re-run the deploy job by going to the Single Pane of Glass (SPOG) view, right clicking on the job, and clicking on `Run`

Your deployment should roll back to the desired release. However, please remember that all future runs of the deploy job will deploy the same release since it is now pinned in your yml. When you decide to deploy the latest release, you can go back to the yml and remove the  `versionName: "v1.2.1"` line and all future runs should deploy the latest release available.

##Rolling back a manifest

<img src="../../images/pipelines/rollback-manifest.png" alt="Shippable Continuous Integration and Delivery" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In this scenario, you have a setup where the deploy job you want to rollback is preceded by a manifest job in your pipeline.The easiest way to roll back to a previous deployment here is:

* You will first need to identify which image tag you want to roll back to. To go this, go to the `Resources` tab of your Pipelines page and find the image resource  in the list. Click on the number in the `Latest version` column for the image.

 <img src="../../images/pipelines/view-older-resource-versions.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* This will show you a list of versions that were created for your image resource. Look up the `versionName` column and find the tag you want to roll back to. Write this down.

<img src="../../images/pipelines/list-image-versions.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Pin the versionName of the image you want to go back to in your yml config for the manifest job.

```
jobs:

  - name: manifest-job-name
    type: manifest
    steps:
      - IN: image-res-name
        versionName: "master.45"  #This needs to contain the tag you want to pin
```

* Commit the yml to your source control repository.
* Re-run the manifest job by going to the Single Pane of Glass (SPOG) view, right clicking on the job, and clicking on `Run`
* If the deploy job is set to run automatically after the manifest job, it will be triggered and will deploy the desired image.
* If the deploy job is not set to run automatically, you will need to right click on that and run it in order to trigger the deployment.

Please remember that all future runs of the deploy job will deploy the same image tag since it is now pinned in your yml. When you decide to deploy the latest image version, you can go back to the yml and remove the  `versionName: "master.45"` line and all future runs should deploy the latest image available.
