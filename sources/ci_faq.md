page_title: Shippable FAQ
page_description: Commonly asked questions that will help with troubleshooting
page_keywords: concepts, documentation, shippable, CI/CD, pipelines, upgrade containers, add new pipeline, multi containers, microservices, Continuous Integration, Continuous Deployment, testing, automation, frequently asked questions

# FAQ

This document lists the FAQs that we've received through our [Support repository](https://github.com/Shippable/support/issues) and speaking with our customers, on running Continuous Integration. The FAQ is divided into two sections: 

1. Setup: All questions related to setup and initial configuration
2. Continuous Integration (CI): Questions related to the CI process

If you have specific errors that you would like to troubleshoot, then refer our [troubleshooting section](troubleshoot.md). 

---

##Setup
### How can I upgrade or downgrade my plan?

The Continuous Delivery plan gives you a minimum of 1 free minion & 1 free pipeline. Upgrading or downgrading your CI  simply means increasing or decreasing the number of build minions in your subscription.

You can do this by going to the 'Billing' Tab on your Subscription Dashboard and clicking the 'Update plan' button. Use the slider to indicate the number of containers you want. Click on the 'Save changes' button when you are done.

Plan upgrades are effective immediately and your bill will be pro-rated for the current month. Plan downgrades are effective immediately, however we do not issue refunds for minions that were already paid for during the current month.

Check our blog on [upgrading your CI/CD subscription](http://blog.shippable.com/how-to-upgrade-your-ci-cd-subscription) for additional details.

---

### Why can't I see some of my repositories in my Shippable account?

This happens due to one of the following reasons:

- You haven't enabled private repositories in your Shippable account. Go to [Account Settings](acc_overview.md) (gear icon on the top right hand navigation bar), in the 'Accounts' tab and under 'Git Identities' section, click 'Enable' under 'GitHub' 'Click to enable private access'. 
- Your account hasn't yet been synced with the latest permissions from GitHub. To force sync your account, go to your Account Settings and click on the `Force Sync` icon next to your Account Id.
-  You're a Bitbucket user and you have mercurial repositories. We do not support mercurial at this time, so you will need to convert them to git or use another platform for CI/CD.

---

### Why do I get an error when I try to enable a project that is listed on my dashboard?

This usually happens if you are a collaborator on a project and the owner of the project has not given Shippable access to the project. You can verify this by confirming that the owner of the project can see the project on their Shippable dashboard.

--- 

### How can I validate my shippable YML?

You can use either of the tools below to validate if your YML is valid:

* [YAML Lint](http://www.yamllint.com/)
* [YAML Online Parser](http://yaml-online-parser.appspot.com/)

---

### Why can't I see my BitBucket repos in my Shippable account?

Shippable only supports git based repositories, so if you have mercurial
repositories in your BitBucket account, you will not see them in the
Shippable repository list. If you cannot see git based repos, please
open an issue on our [GitHub Support
repo](<https://github.com/Shippable/support>).

---

### Why can't Shippable see my org on GitHub?

GitHub's default policy when a new org is created is 'access
restricted'. In order for Shippable to be able to see the org, you must
manually grant access to Shippable. This can be resolved by going to the
third-party access section for the org, and clicking 'Remove
restrictions' Under the 'Third-party application access policy' section.

---

### How do I link my GitHub and Bitbucket accounts?

Please read our documentation on [linking GitHub and Bitbucket accounts](ht_link_gh_and_bb.md). In addition, refer our [blog](http://blog.shippable.com/how-to-link-github-and-bitbucket-accounts) on this topic.

---

### Why am I not able to see Bitbucket org repos after deleting and recreating my account on Shippable?

Deleting the shippable account will also delete the permissions
associated with the account. If you recreate your account, bitbucket
will not allow us to pull all the permissions you have, unless the owner
of that organization logs in back to shippable and then click on the
sync repos button to see the repos.

---

### Why is my project showing up as "empty" after I enable it? It is certainly not empty in github!

A project is empty in Shippable if there are zero builds associated with it. A new project that you have just enabled shows up as an empty project. To avoid cluttering the project page with projects that are never built, the projects page doesn't show projects that have no builds unless you explicitly use the check box to let us know you want to see all projects. An exception to this is if you have just enabled a project; we do check this box during the enable process, so you are able to see your new project. We are continuously iterating on the user experience, so please write to us at support@shippable.com if you have any feedback on the feature.

---

### I converted a public repository (enabled as a project on Shippble) to a private repo. Should I change any setting in Shippable?

When public or private repo on GitHub/Bitbucket (and enabled as a project on Shippable) is converted to a private or public repo, all you need to do is reset the enabled project on Shippable. To do so:

- Click on your project from the Shippable dashboard
- Click the `Settings` tab
- Scroll all the way down and click the `Reset` button under the 'Reset' section
- Click `Confirm`. 

The reset action will do the following things:

1. Reset the webhook for Shippable
2. Generate a new deploy key and update the repository

If you are using encrypted variables for this project, they'll need to be re-encrypted. Integrations and other settings will not be affected. 

---

### Is mariadb supported on Shippable?

Shippable [supports](gs_supported/) lots of different services, tools and third party services. If you have a service or a tool that is currently unsupported, you can still use it to run CI within Shippable in either of the two ways listed:

1. Use Shippable's default images based on the language you use & install 'mariadb' as a dependency in the `build: ci` step.
2. If you have an existing Docker image with 'mariadb' and other dependencies installed, then you can [override Shippable's default image](ci_configure/#overriding-the-default-build-image) and use it for CI. You can also [build your own Docker image](ci_configure/#building-your-ci-image) with all the dependencies including 'mariadb' and use it for CI. 

---


## Continuous Integration (CI)
### I have enabled my repository and committed code, but my build doesn't start. What could be wrong?

A couple of reasons why this could happen:

(1) Missing YML in the branch you are building. Create a `shippable.yml` file in the root of your repository. Here is a [reference/example](http://docs.shippable.com/ci_configure/#shippableyml-structure) of a `shippable.yml` file

(2) Shippable YML is invalid. Please validate your YML using either of the links below:

* [YAML Lint](http://www.yamllint.com/)
* [YAML Online Parser](http://yaml-online-parser.appspot.com/)

---

### How do I set desired timezones inside the minions?

By default, our minions are configured with ETC/UTC timezone which is
set in /etc/timezone file for ubuntu minions. However, we allow you to
set a specific time zone for the minion in before\_script section of
your yml file . For example, you can do the following in your yml:

```
build:
  ci:
    - echo 'Europe/Paris' | sudo tee /etc/timezone
    - sudo dpkg-reconfigure --frontend noninteractive tzdata
```

This will change your minion timezone to paris time. Refer the article
[list of tz database time zones](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) to select the timezone for your location.

---

### How do I skip webhook builds?

Any changes to your source code will trigger a build automatically on Shippable. If you do not want to run build for a particular commit,
then add ```ci skip``` or ```skip ci``` to your commit message.

Our webhook processor will look for the string ```ci skip``` or ```skip ci``` in the commit message and if it exists, then that particular
webhook build will not be executed.

**PR Builds:** To skip a PR build, the ```ci skip``` or ```skip ci``` needs to be part of your PR title, since that's what GitHub sends us as part of the webhook.

**PR Build with multiple commits:** If the original commit did not include the skip flags and subsequent commits do, the PR build will _not_ skip a build.

---

### In my total build time, provisioning a node takes the longest time. How can I reduce the node provisioning time?
When you trigger a build, we spin up a build machine and run your build. This provisioning takes approximately 2-3 minutes.

If you want your builds to start immediately and avoid the node provisioning time, you can use our feature that lets you run builds on your own infrastructure. You can buy a machine from AWS or Digital Ocean or Linode and attach it to your Shippable subscription. We will run all your builds on your attached machines, and since your machines are always up, we will not need to provision nodes and this will save ~3 mins per build. You can read more about [Bringing Your Own Host - BYOH](http://docs.shippable.com/ci_byoh/). Once you BYOH, [read the instructions](http://docs.shippable.com/ci_subscriptions/#adding-your-own-build-infrastructure-byoh) for attaching your build infrastructure to Shippable.

---

### I am pushing to heroku as part of my build. Why is this suddenly failing?

We have made a change as to where your keys are stored on your minion.

You probably have a command in your yml that looks something like this:

```
- test -f ~/.ssh/id_rsa.heroku || ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.heroku && heroku keys:add ~/.ssh/id_rsa.heroku
```

You will need to replace the `~/.ssh/id_rsa` to `/tmp/ssh/00_sub` since that is the new location for keys. Your command will now look like this:
```
- test -f ~/.ssh/id_rsa.heroku || ssh-keygen -y -f /tmp/ssh/00_sub > ~/.ssh/id_rsa.heroku && heroku keys:add ~/.ssh/id_rsa.heroku
```
Your push to Heroku should succeed with this change.

---

### I cannot start a manual build for my Bitbucket project. Why is it not working?

Check your branch name to see if it contains a ```/```. The Bitbucket API currently does not support branch names with a ```/``` in them. We opened a support issue with them - [Get commit/{revision} API does not accept branch names with "/"](https://bitbucket.org/site/master/issues/9969/get-commit-revision-api-does-not-accept) over 1 year ago and there is still no resolution for this. This is not a Shippable bug and while we understand that this affects everyone who uses Gitflow+Shippable+Bitbucket, we cannot fix this at our end.

---

### I am using PHP 7.0 and am unable to install extensions as part of my yml config.

We use pickle to install extensions for PHP. This works for all versions of PHP except 7.0.

Pickle requires `php$ver-dev` environment (which has development modules) to compile extensions. At this time, there is no official php7-dev environment, so pickle is unable to find dependent modules and cannot compile extensions like intl, redis, and gettext.

We will watch for updates and as soon as `php7-dev` is available, the next image update will address this.

---

### How do I specify a region while setting up Amazon EC2 Container Registry (ECR) Integration?
When you set up the [Amazon ECR integration](http://docs.shippable.com/int_docker_registries/#amazon-ec2-container-registry-ecr), the default region is set to  `us-east-1`. You can override the default region by configuring the `shippable.yml` file as shown below.

```
integrations:
  hub:
    - integrationName: your_integration_name
      type: ecr
      region: us-west-2
```

---

### How do I use Ruby in a build with another language?

Specify your [language](http://docs.shippable.com/ci_configure/#specifying-language-and-runtime) as usual. For example: `language: node_js`. This will cause your build to run on the [default Shippable image](http://docs.shippable.com/ci_configure/#setting-your-build-image) for that language.

All [official Shippable images](https://hub.docker.com/u/drydock/) have rvm installed, with a default version of Ruby. However, the rvm location is not added to the $PATH environment variable, so you will need to `source` rvm in your YML. This will give you access to both `ruby` and `rvm`. Your YML will look something like this:
```
language: node_js

node_js:
  - desired Node.js version(s)

build:
  ci:
    - source /usr/local/rvm/scripts/rvm
```

---

## Sign into Shippable

<div class="signup-buttons">
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-d22bcb58-9b5a-40d8-8ef8-f095f6f49dd4">
      <span class="hs-cta-node hs-cta-d22bcb58-9b5a-40d8-8ef8-f095f6f49dd4" id="hs-cta-d22bcb58-9b5a-40d8-8ef8-f095f6f49dd4">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/d22bcb58-9b5a-40d8-8ef8-f095f6f49dd4"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-d22bcb58-9b5a-40d8-8ef8-f095f6f49dd4" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/d22bcb58-9b5a-40d8-8ef8-f095f6f49dd4.png"  alt="Sign up with GitHub"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, 'd22bcb58-9b5a-40d8-8ef8-f095f6f49dd4', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
  <!--HubSpot Call-to-Action Code -->
  <span class="hs-cta-wrapper" id="hs-cta-wrapper-19b25e32-39e6-4c22-b0a8-df5b408b2c6a">
      <span class="hs-cta-node hs-cta-19b25e32-39e6-4c22-b0a8-df5b408b2c6a" id="hs-cta-19b25e32-39e6-4c22-b0a8-df5b408b2c6a">
          <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
          <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/19b25e32-39e6-4c22-b0a8-df5b408b2c6a"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-19b25e32-39e6-4c22-b0a8-df5b408b2c6a" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/19b25e32-39e6-4c22-b0a8-df5b408b2c6a.png"  alt="Sign up with Bitbucket"/></a>
      </span>
      <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
      <script type="text/javascript">
          hbspt.cta.load(362403, '19b25e32-39e6-4c22-b0a8-df5b408b2c6a', {});
      </script>
  </span>
  <!-- end HubSpot Call-to-Action Code -->
</div>

---
