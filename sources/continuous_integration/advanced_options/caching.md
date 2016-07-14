page_title: Using Caching in your Continuous Integration/Continuous Delivery projects
page_description: How to leverage caching in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, cache, container, Docker


# Caching

You can turn on caching for your builds by including `cache: true` in the `build` section of your shippable.yml. This will cache contents of the build directory $SHIPPABLE_BUILD_DIR.

```
build:
  cache: true
```

You can also choose to cache specific folders instead of the entire build directory by using the `cache_dir_list` tag. The cache_dir_list is an array of **absolute path** of the folders that needs to be cached. Please note that you still need the `cache: true` in your yml:

```
build:
  cache: true
  cache_dir_list:
    - absolute path of dir1
    - absolute path of dir2
    - absolute path of dir3
```

For example, to cache node modules and the .git folder, you would specify the following:

```
build:
  cache: true
  cache_dir_list:
    - $SHIPPABLE_BUILD_DIR/node_modules
    - $SHIPPABLE_BUILD_DIR/.git
```

Cache is updated for every build and is available to subsequent builds.

## Clearing cache
You can clear cache in one of two ways:

* Including [reset minion] or [reset_minion] in your commit message.
* Clicking on the `Clear cache` in your Project settings UI.

In both cases, your cached image will be deleted. If cache is still set to true in your yml, the build will generate a new cache which will be used for subsequent builds. This method is the best way to update your cache if required.

---

## Removing unwanted files when caching is enabled
When caching is enabled, the entire build directory including artifacts (when `cache: true` is used) or the entire folder contents (if configured for specific folders) is cached. This may include unwanted files. Unless these unwanted files are removed, your tests could fail during the CI build, as Shippable updates the cached directory with the new commits. Remove the unwanted files in one of the two ways:

* Use the `git clean` command: In your `shippable.yml` add the `git clean` in the `ci` section using the following format:
    - `git clean -f` removes all untracked files not ignored by `.gitignore`.
    - `git clean -f -X` removes all untracked files included in `.gitignore` only.
    - `git clean -f -x` removes all untracked files.

* Add commands such as `rm` to remove the unwanted files in your `shippable.yml` in the `ci` section.  

---
