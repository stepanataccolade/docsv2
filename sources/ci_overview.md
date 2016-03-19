page_title: Shippable CI Overview
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Continuous Integration overview

Shippable's Continuous Integration platform helps you automate builds and tests for every code commit and pull request. You can also deploy your build to a PaaS like Heroku or to AWS using Code Deploy. For more on Continuous Integration and why you should include it as part of your workflow, read Martin Fowler's article on the <a href="http://martinfowler.com/articles/continuousIntegration.html#BenefitsOfContinuousIntegration" target="_blank">Benefits of Continuous Integration</a>

Shippable is natively built on Docker, so all your builds run inside Docker containers, which we call Minions.

## What is supported?

Go [here](gs_supported.md) to see a list of all supported source control providers, languages, services and platforms.

## How do builds work?

These are the steps that are executed when we receive a build trigger automatically via a webhook or manually through the UI.

### Build trigger

When a repository is enabled on Shippable, we enable webhooks on that repository and start listening to commit and pull request events. 

Shippable automatically builds and tests your repositories when -

- we receive a commit webhook 
- we receive a webhook for a pull request opened for an enabled repository

You can also run a manual build through the UI clicking on the `Build` button for any project or branch.

Please note that we do not automatically trigger builds if you push a tag. You can still run a manual build after pushing the tag. 

### yml config

### Build flow

We need a shippable.yml file at the root of your repository in order to run your builds. This is your config file and tells us what the build should do. For the yml structure and how to configure it, check out the [Configure your build](ci_configure.md)

When a build is triggered, it is executed in the sequence below -

- First, commands in the `pre_ci` section are executed on your build machine and not in your build container.
- The next step is booting your CI container. This will use our default Docker images if nothing is configured in the `pre_ci_boot` section of your yml. If that section is configured, it overrides the default image and boots up the CI container specified.
- All commands in the `ci` section are executed in sequence.
- Commands in the `post_ci` section are executed next.
- If the `ci` and `post_ci` sections were successful, we will execute commands in the `on_success` section.
- - If the `ci` and/or `post_ci` were failed, we will execute commands in the `on_failure` section.

We also support the travis.yml format for most cases since we've built a translator that accepts travis.yml format and converts it to shippable.yml. To make it easy for Travis customers to try out Shippable, we will even read the .travis.yml in your repo without requiring you to add a shippable.yml. 


## Permissions

### OAuth Authentication

We use OAuth authentication. What this means is if you have either a GitHub or Bitbucket account, you do not need to create a separate account on our platform.

If you want to build repositories in your GitHub Enterprise instannce, you will still need to sign in with GitHub or Bitbucket and add an account integration for GitHub Enterprise.

### Authorizing Shippable

When signing in to Shippable, you will be prompted to give Shippable access to your repos. GitHub and Bitbucket auth behave a little differently as follows -

**GitHub**- By default, we will only ask for access to public repos. If you want to use Shippable to build your private repos, you will need to authorize us for private repositories. This is done from your [Account Settings Page](acc_overview.md).

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



