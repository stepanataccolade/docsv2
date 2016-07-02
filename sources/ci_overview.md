page_title: Shippable CI Overview
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Continuous Integration overview

Shippable's Continuous Integration platform helps you automate builds and tests for every code commit and pull request. You can also deploy your build to a PaaS like Heroku or to AWS using Code Deploy. For more on Continuous Integration and why you should include it as part of your workflow, read Martin Fowler's article on the [Benefits of Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html#BenefitsOfContinuousIntegration)

Shippable is natively built on Docker, so all your builds run inside Docker containers, which we call Minions.

---

## What is supported?

Go [here](gs_supported.md) to see a list of all supported source control providers, languages, services and platforms.

---

## How do builds work?

These are the steps that are executed when we receive a build trigger automatically via a webhook or manually through the UI.

### Build trigger

When a repository is enabled on Shippable, we enable webhooks on that repository and start listening to commit and pull request events.

Shippable automatically builds and tests your repositories when -

- we receive a commit webhook
- we receive a webhook for a pull request opened for an enabled repository
- we receive a webhook for a git tag push event (currently only supported on GitHub)
- we receive a webhook for a GitHub release event

You can also initiate a manual build through the UI, by clicking on the `Build` button for any project or branch, irrespective of a webhook event.

By default, we do not automatically trigger builds if you push a tag or create a release. Go here **UpdateLink** for details on configuring these settings.


### Shippable yml configuration
We need a `shippable.yml` file at the root of your repository in order to run your builds. This is your config file and tells us what the build should do. For the yml structure and how to configure it, check out the configure your build **UpdateLink** section.


### Build flow
When a build is triggered, it is executed in the sequence below -

- First, commands in the `pre_ci` section are executed on your build machine and not in your build container.
- The next step is booting your CI container. This will use our default Docker images if nothing is configured in the `pre_ci_boot` section of your yml. If that section is configured, it overrides the default image and boots up the CI container specified.
- All commands in the `ci` section are executed in sequence.
- Commands in the `post_ci` section are executed next.
    - If the `ci` and `post_ci` sections were successful, we will execute commands in the `on_success` section.  
    - If the `ci` and/or `post_ci` were failed, we will execute commands in the `on_failure` section.

We also support the travis.yml format for most cases since we've built a translator that accepts travis.yml format and converts it to shippable.yml. To make it easy for Travis customers to try out Shippable, we will even read the .travis.yml in your repo without requiring you to add a shippable.yml.

* * *

## Permissions

### OAuth Authentication

We use OAuth authentication. What this means is if you have either a GitHub or Bitbucket account, you do not need to create a separate account on our platform.

If you want to build repositories in your GitHub Enterprise instance, you will still need to sign in with GitHub or Bitbucket and add an account integration for GitHub Enterprise.


### Authorizing Shippable

When signing in to Shippable, you will be prompted to give Shippable access to your repos. GitHub and Bitbucket auth behave a little differently as follows -

**GitHub**- By default, we will only ask for access to public repos. If you want to use Shippable to build your private repos, you will need to authorize us for private repositories. This is done from your Account Settings Page **UpdateLink**.

**Bitbucket**- The Bitbucket API does not have public/private
granularity, so we ask for access to all repos on Bitbucket by default.

> **Note**
>
> We realize that most people do not want to give write access to their
> repo. However, we need write permissions to add deploy keys to your
> repos for our webhooks to work. We do not touch anything else in the
> repo.


### Who has access?

We closely mimic GitHub and Bitbucket permissions for organizations and projects.
Anyone who has access to an organization or repository in
GitHub/Bitbucket will also have access to build information and/or
repository and build actions on Shippable. This happens automatically,
so if you enable a repository in your organization on Shippable and another team
member signs in, they will see the enabled repository and build history
already present in their account.

We support 2 roles -

**Owner :** Owners have all privileges for an organization or Project. They can
enable, run and delete projects, upgrade pricing plans, and view/run,
cancel, and delete builds.

**Collaborator :** Collaborators can enable projects and view/run builds
on Shippable. They cannot delete enabled projects or upgrade pricing
plans.

* * *

## Practice Examples

- Run a [sample CI build](gs_ci_sample/) on your own
- Refer to the step-wise series of [running CI on a node.js application](http://blog.shippable.com/get-started-with-continuous-integration-for-nodejs-app)  

* * *

## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-c4f1c1d3-0fd7-42b0-88de-e8664d56a9fd">
      <span class="hs-cta-node hs-cta-c4f1c1d3-0fd7-42b0-88de-e8664d56a9fd" id="hs-cta-c4f1c1d3-0fd7-42b0-88de-e8664d56a9fd">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/c4f1c1d3-0fd7-42b0-88de-e8664d56a9fd"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-c4f1c1d3-0fd7-42b0-88de-e8664d56a9fd" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/c4f1c1d3-0fd7-42b0-88de-e8664d56a9fd.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, 'c4f1c1d3-0fd7-42b0-88de-e8664d56a9fd', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-c22d9688-4527-432f-8fe9-133975e43486">
      <span class="hs-cta-node hs-cta-c22d9688-4527-432f-8fe9-133975e43486" id="hs-cta-c22d9688-4527-432f-8fe9-133975e43486">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/c22d9688-4527-432f-8fe9-133975e43486"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-c22d9688-4527-432f-8fe9-133975e43486" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/c22d9688-4527-432f-8fe9-133975e43486.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, 'c22d9688-4527-432f-8fe9-133975e43486', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

---
