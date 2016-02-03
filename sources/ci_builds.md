page_title: Shippable CI/CD Dashboard
page_description: Explanation of the CI/CD Dashboard
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml

# Builds

The Builds page shows you information about a specific build(s) in a project. To get to a specific build page, 

- Login to [Shippable](https://app.shippable.com)
- Click on the CI dropdown and select the subscription you want to view.
- This will bring you to Dashboard of the subscription which shows latest status for all your projects. 
- Click on the project name to view the Project page. This will take you to the project dashboard.
- Click on any build number in the Summary or History tabs to get to the Build page

Addiitonal information about what is shown on this page is given below. To learn how to configure your build, check out our [Build configuration section](ci_configure.md).

## Build information
The build page shows all relevant information like status, branch name, commit message, committer, etc.

A build on Shippable can actually consist of one or more individual build items, depending on your yml configuration. Configurations resulting in a [matrix build](ci_configure.md#matrix_builds) will have more than one build items as part of the build.

The build status widget for the overall build looks like this:

<img src="../images/ci_build_status.png" alt="Build status" style="width:800px;"/>

The breadcrumb shows you the account name, project name, and branch name. The actual widget provides the following information:

* A circle indicating build status, explained in detail below
* Build number
* Commit message (Update shippable.yml in the screenshot above)
* Commit SHA from Github. You can go to the commit page on Github by clicking on the SHA.
* Builder indicated who committed the code change that triggered this build.
* When the build was started, how long it took for the build to complete, and how long it was in the queue waiting for an available minion.

### Build status 

The circle at the left of the widget shows a color coded status with the following values:

- Grey for a build that is still queued and waiting for an available minion    
- Dark Blue for a build that is still in progress 
- Green for a successful build
- Red for a failed build
- Orange for an unstable build
- Purple for a timed out build
- Lighter blue for a build that was canceled

The white icon inside the circle shows whether the a commit or a pull request triggered it:
    
- ![add_icon](images/ci_build_commit.png) for a build triggered by a commit
- ![add_icon](images/ci_build_pr.png) for a build triggered by a pull request

### Build number
To the right of the status circle is the build number. Build number starts at 1 for the first build of the project and increase by 1 for every build. 

For matrix builds, the overall build is still numbered with a whole number and individual build items under it are numbered using decimals like 11.1, 11.2, etc. 

## Build item details

For each build item in a build, we provide the following:

* Matrix values
* Build item console
* Test and code coverage visualization
* The Script that was run for the build item
* Download for console logs and, if configured, artifacts

<img src="../images/ci_build_item.png" alt="Build status" style="width:800px;"/>

### Matrix values
Matrix values show what combination of the yml configuration is being used for the build item. For example, if your yml specifies several versions of a language, the language version for this specific build item is shown.

### Build item console
The build item console shows the actual console output for your build. Sections have a `+` to the left of them and can be collapsed or expanded as desired.You can also copy text from the console log.

### Test & code coverage tabs
If you have set up your yml to [show test and code coverage results](ci_configure.md#test_code_coverage), you will the visualizations in the `Test` and `Code coverage` tabs.

TODO: Add picture

### Script
The script section shows you exactly what scripts and commands were run for your build. In case of a build failure or other issues, you can copy the script and run it locally to see if your build works locally. This helps tremendously while debugging build problems.

### Downloading console logs and artifacts
The `Download` dropdown on the right of the build item console lets you download console logs to your machine.
If you have configured your yml to also store artifacts with an `artifacts: true`, you can download those as well.





