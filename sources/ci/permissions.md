page_title: Shippable Permissions Overview
page_description: Overview of permissions on Shippable's CI/CD platform
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

# Permissions

## OAuth Authentication

We use OAuth authentication.

What this means is if you have either a GitHub or Bitbucket account, you do not need to create a separate account on our platform.

If you want to build repositories in your [GitHub Enterprise](/ci/integrations/scm/githubEnterprise/) instance, you will still need to sign in with GitHub or Bitbucket and add an account integration for GitHub Enterprise.

---

## Authorizing Shippable

When signing in to Shippable, you will be prompted to give Shippable access to your repos. GitHub and Bitbucket auth behave a little differently as follows -

**GitHub**- By default, we will only ask for access to public repos.

If you want to use Shippable to build your private repos, you will need to authorize us for private repositories.

This is done from your Account Settings Page. Read [our documentation](/ci/integrations/scm/github/#enabling-gitHub-account-integration/) for more details.

**Bitbucket**- The Bitbucket API does not have public/private granularity, so we ask for access to all repos on Bitbucket by default.

Read [our documentation](/ci/integrations/scm/bitbucket/#enabling-bitbucket-account-integration) for more details.

> **Note**
>
> We realize that most people do not want to give write access to their repo. However, we need write permissions to add deploy keys to your repos for our webhooks to work. We do not touch anything else in the repo.


## Who has access?

We closely mimic GitHub and Bitbucket permissions for organizations and projects.

Anyone who has access to an organization or repository in GitHub/Bitbucket will also have access to build information and/or repository and build actions on Shippable.

This happens automatically, so if you enable a repository in your organization on Shippable and another team member signs in, they will see the enabled repository and build history already present in their account.

We support 2 roles -

**Owner :** Owners have all privileges for an organization or Project. They can enable, run and delete projects, upgrade pricing plans, and view/run, cancel, and delete builds.

**Collaborator :** Collaborators can enable projects and view/run builds on Shippable. They cannot delete enabled projects or upgrade pricing plans.

---

## Practice Examples

- Run a [sample CI build](gs_ci_sample/) on your own
- Refer to the step-wise series of [running CI on a node.js application](http://blog.shippable.com/get-started-with-continuous-integration-for-nodejs-app)  

---
