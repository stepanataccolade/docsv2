page_title: Running matrix builds
page_description: How to use matrix builds in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, multiple languages, versions

# Matrix Builds
## Running multiple builds per commit

In most cases, you want to trigger one build for each commit/pull request to your repository. However, there are times when you might want to trigger multiple builds for a single code change. For example, you might want to test against multiple versions of Ruby, multiple aspect ratios for your Selenium tests, or multiple environment variables.

This scenario is handled by our matrix build feature, so the following yml configs will trigger multiple builds -

- specifying more than one language version
- specifying more than one variable in the ```env``` section
- specifying multiple gemfiles for ruby



```yaml
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

The above example will fire 16 different builds for each push. Whoa! Need more minions?

---
