page_title: Navigating Shippable's Builds UI
page_description: Overview of Shippable's Builds UI
page_keywords: User Interface, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Build item details

For each build item in a build, we provide the following:

- Matrix values
- Console for Build item
- Tests coverage visualization
- Coverage visualization
- Scripts (that was run for the build item)
- Download (for console logs)

<img src="../../images/builds/console.png" alt="Build status" style="width:700px;"/>

##Matrix values
Matrix values show what combination of the yml configuration is being used for 
the build item. For example, if your yml specifies several versions of a language, 
the language version for this specific build item is shown. In the above example, 
only one version of node_js language is used and hence you see '79.1'.

---

##Console section
The build item console shows the actual console output for your build. Sections 
have a `+` to the left of them and can be collapsed or expanded as desired.You 
can also copy text from the console log.

<img src="../../images/builds/consoleResults.png" alt="Console Results" style="width:700px;"/>

---

##Tests section
If you have set up your yml to [show test results **UpdateLink**](build_ci.md), 
you will see the visualizations in the `Tests` section.

<img src="../../images/builds/testResults.png" alt="Test Results" style="width:700px;"/>

---

##Coverage section
Similarly, if you have set up your yml to [show coverage results **UpdateLink**](build_ci.md), 
you will see the visualizations in the `Coverage` section.

<img src="../../images/builds/coverageResults.png" alt="Code Coverage Results" style="width:700px;"/>

---

## Scripts section
The script section shows you exactly what scripts and commands were run for your 
build. In case of a build failure or other issues, you can copy the script and 
run it locally to see if your build works locally. This helps tremendously while 
debugging build problems.

<img src="../../images/builds/scripts.png" alt="Scripts used in a build" style="width:700px;"/>

---

##Downloads section
The `Download` dropdown on the right of the build item console lets you download 
console logs to your machine.

<img src="../../images/builds/downloadLogs.png" alt="Download logs" style="width:700px;"/>

---
