page_title: Including or Excluding branches during Continuous Integration
page_description: How to include or exclude branches in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, master, branch, GitHub, Bitbucket, GitLab


# Including/excluding branches

By default, Shippable builds all branches for enabled repositories. If a branch does not have a shippable.yml at its root, we will create a build and show an error in the build console.

You can choose to build specific branches by using the `branches` sections in your yml. The specific branch that is being included or excluded needs to have this configuration, and not just the master branch. When we get a webhook for an enabled repository, we read the shippable.yml from the branch that has changed and trigger a build using that yml. So unless the yml in the branch to be included/excluded has the right settings, we are not aware of it and will trigger a build as expected.  

Wildcard entries for branches and git-flow branches, are supported.

Here are some examples of the include/exclude config -

```
# this config will build all branches and exclude the following: test1, experiment2, all branches beginning with "dev" and all git-flow branches in the "feature" branch
branches:
  except:
    - test1
    - experiment2
    - dev*
    - feature/*
```
```
# this config will only build the following branches: stage,  prod, all branches beginning with "beta" and all git-flow branches in the "release" branch
branches:
  only:
    - stage
    - prod
    - beta*
    - release/*
```

---
