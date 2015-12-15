page_title: Shippable CI Overview
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

## Shippable CI overview

Shippable CI is a Continuous Integration platform which helps you automate builds and tests for every code commit. You can also deploy your build to a PaaS like Heroku or to AWS using Code Deploy. For more on Continuous Integration and why you should include it as part of your workflow, read Martin Fowler's article on the [Benefits of Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html#BenefitsOfContinuousIntegration)

Shippable is natively built on Docker, so all your builds run inside Docker containers, which we call Minions.

### What is supported?

Go [here](gs_supported.md) to see a list of all supported source control providers, languages, services and platforms on Shippable CI.

### How do builds work?

These are the steps that are executed when we receive a build trigger automatically via a webhook or manually through the UI.

#### Build trigger

When a repository is enabled on Shippable, we enable webhooks on that repository and start listening to commit and pull request events. 

Shippable automatically builds and tests your repositories when -

- we receive a commit webhook 
- we receive a webhook for a pull request opened for an enabled repository

You can also run a manual build through the UI clicking on the Play button for any build.

Please note that we do not automatically trigger builds if you push a tag. You can still run a manual build after pushing the tag. 

#### Build flow

We need a shippable.yml file at the root of your repository in order to run your builds. This is your config file and tells us what the build should do.

The yml is somewhat similar to Travis CI's .travis.yml and most commands work as-is on Shippable. Since the formats are very similar, we can also read your config from .travis.yml if we do not find a shippable.yml at the root of your repository.

When a build is triggered, it is executed in the sequence below -

- Clone/Pull the project from source control provider.
- `cd` into the workspace
- Checkout the commit that is being built and parse the yml file
- Run commands from the `before_install` section of your yml file. This section is typically used to prep your minion and install/update any packages
- Run commands from the `install` section of your yml file. This section is typically used to install any project specific libraries or packages
- Run commands from the `before_script` section of your yml file. You can create any folders and unzip files that might be needed for testing. Some users also restore DBs, copy environment variables, etc. here
- Run commands from the `script` section of your yml file. This runs the build and all your tests
- Run commands from the `after_success` or `after_failure` sections from your yml file, depending on the result of your build. after_success can be used to deploy your application to any supported cloud provider
- Run commands from the `after_script` section from your yml file

Build status is determined based on the outcome of the above steps. They need to return an exit code of `0` to be marked as success. Everything else is treated as a failure.

Any errors in `after_script` will not affect the status of the build.



