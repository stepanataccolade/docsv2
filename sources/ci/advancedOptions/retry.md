page_title: Using the Shippable Retry feature in your Continuous Integration Projects
page_description: How to write your Shippable YML and Set up your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, network, latency, performance


# Retrying a command

Sometimes, commands like `npm install` fail due to the intermittent network issues and this affects your build result.

To avoid this, you can use `shippable_retry` in the yml to try the command up to 3 times if it returns a non-zero code.

`shippable_retry` functionality is available for all default installation commands. You can
also use it for any custom installation from external resources. For example:

```
build:
  ci:
    - shippable_retry sudo apt-get update
    - shippable_retry sudo apt-get install something
```

For more examples, refer our blog ["Automatically retry scripts to avoid network hiccups during CI process"](http://blog.shippable.com/automatically-retry-scripts-to-avoid-network-hiccups-during-ci-process).

---
