page_title: Running matrix builds
page_description: How to use matrix builds in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, multiple languages, versions

# Matrix builds

In most cases, you want to trigger one build for each commit/pull request to your repository. However, there are times when you might want to trigger multiple builds for a single code change.

For example, you might want to test against multiple versions of Ruby, multiple aspect ratios for your Selenium tests, or multiple environment variables.

This scenario is handled by our matrix build feature, where certain configurations of your yml file lead to multiple builds being triggered per code commit or pull request. These configurations include -

- specifying more than one language version
- specifying more than one variable in the `env` section
- specifying multiple gemfiles for ruby

For example, the yml snippet below will trigger a 16 build matrix:

```
rvm:
  - 1.9.2
  - 1.9.3
  - rbx
  - jruby

gemfile:
  - gemfiles/Gemfile.rails-2.3.x
  - gemfiles/Gemfile.rails-3.0.x
env:
  - ISOLATED=true
  - ISOLATED=false
```

Even though each build in the matrix is a separate build, the Shippable UI also shows an aggregated view in order to organize all builds into a single build number. For example, if the yml snippet above triggers build number 15, with each individual build in the matrix numbered 15.1 through 15.16. 

<img src="../../images/advancedOptions/matrixBuilds.png" alt="Build matrix with Shippable" style="width:1000px;"/>





---
