page_title: Using git submodules in your Continuous Integration/Continuous Delivery projects
page_description: How to to use git submodules in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, GitHub, Bitbucket, GitLab, Docker


# Using git submodules

Shippable supports git submodules.

For big projects, you can break your projects down into manageable chunks and use git submodules to make everything work.

We automatically initialize the `.gitmodules` file in the root of the repo.

> **Note**
>
> If you are using private repos, you will need to add the deploy keys so that our minion ssh keys are allowed to pull from the repo.

If your submodules are in your own public repos then the following will work:

```python
# for public modules use
https://github.com/someuser/somelibrary.git

# for private modules use
git@github.com:someuser/somelibrary.git
```

If you want to turn off submodules completely:

```yaml
# for public modules use
git:
 submodules: false
```

---
