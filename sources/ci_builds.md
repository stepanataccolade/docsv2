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
* Commit SHA from GitHub. You can go to the commit page on GitHub by clicking on the SHA.
* Builder indicated who committed the code change that triggered this build.
* When the build was started, how long it took for the build to complete, and how long it was in the queue waiting for an available minion.

### Build status

The circle at the left of the widget shows a color coded status with the following values when you hover the mouse on it:

#### Build status definitions:
Complete States

- ![add_icon](images/ci_build_icon_success.png) **success**: The build has successfully completed with no failed tests in a build or in any job in a matrix build. The statusCode in API for this state is 30.
- ![add_icon](images/ci_build_icon_unstable.png) **unstable**: State when a job ends successfully (meaning it returned an exit code of 0), but there are one or more failed tests. If at least one job in a matrix is unstable and all the other jobs are successful, the build will be marked as unstable. The statusCode in API for this state is 50.
- ![add_icon](images/ci_build_icon_timeout.png) **timeout**: The build has timed out prior to executing all the jobs. This occurs  when there is no log output or a command hangs for over 10 minutes. It also occurs if your build is running for over 120 minutes. The statusCode in API for this state is 60.
- ![add_icon](images/ci_build_icon_cancelled.png) **canceled**: State when a build has been manually canceled, from the Shippable portal. The statusCode in API for this state is 70.
- ![add_icon](images/ci_build_icon_failed.png) **failed**: State when there is at least a single failure in a build or a single job in a matrix build that fails. The errors in the build causing it to fail are listed in the console logs for the exact step it failed. The statusCode in API for this state is 80.

Incomplete States:

- ![add_icon](images/ci_build_icon_waiting.png) **waiting**: A build that is waiting for an available minion. The most probable reason you'll see this state is when you have exceeded the number of concurrent builds your subscription is eligible for. The statusCode in API for this state is 0.
- ![add_icon](images/ci_build_icon_processing.png) **processing**: A build that is still in progress and is executing the steps defined in shippable.yml file. The statusCode in API for this state is 20.


The white icon inside the circle shows whether a commit or a pull request triggered the build:

- ![add_icon](images/ci_build_icon_commit.png) for a build triggered by a commit
- ![add_icon](images/ci_build_icon_pr.png) for a build triggered by a pull request


### Build number
To the right of the status circle is the build number. Build number starts at 1 for the first build of the project and increase by 1 for every build.

For matrix builds, the overall build is still numbered with a whole number and individual build items under it are numbered using decimals like 11.1, 11.2, etc.

## Build item details

For each build item in a build, we provide the following:

* Matrix values
* Build item console
* Test and code coverage visualization
* The Script that was run for the build item
* Download for console logs

<img src="../images/ci_build_item.png" alt="Build status" style="width:700px;"/>

### Matrix values
Matrix values show what combination of the yml configuration is being used for the build item. For example, if your yml specifies several versions of a language, the language version for this specific build item is shown.

### Build item console
The build item console shows the actual console output for your build. Sections have a `+` to the left of them and can be collapsed or expanded as desired.You can also copy text from the console log.

### Test & code coverage tabs
If you have set up your yml to [show test and code coverage results](ci_configure.md#test_code_coverage), you will the visualizations in the `Test` and `Code coverage` tabs.

<img src="../images/ci_test_results.png" alt="Build status" style="width:700px;"/>


### Script
The script section shows you exactly what scripts and commands were run for your build. In case of a build failure or other issues, you can copy the script and run it locally to see if your build works locally. This helps tremendously while debugging build problems.

### Downloading console logs
The `Download` dropdown on the right of the build item console lets you download console logs to your machine.
