page_title: Node Machine Images on Shippable
page_description: How to configure the node Machine Image for your Continuous Integration projects
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker, version, 1.11, 1.12

# Machine images
Machine images are used to spin up a VM for your build. **This should not be confused with the actual build container where your CI workflow is executed.** The CI container is spun up on the build VM and is described in the [Images section](images.md)

The green arrow in the picture below shows where the build machine image is used.

<img src="../../images/advancedOptions/shippableOverview.png"
alt="Machine Image for a Subscription" style="width:1000px;"/>

Our default `Stable` machine image is extensively tested and should serve the needs of almost all customers. However, there are some situations where customers need a later version of a tool, such as latest Docker version. To address this need, we also offer an `Unstable` version of the Machine Image which is regularly updated if required. The unstable version is tested for common scenarios.

All builds use the `Stable` image, unless you explicitly set the machine image to `Unstable`in your Subscription settings. .

You can switch between the 2 versions at any time and your subsequent builds will use the specified image.

---
## Selecting an image

You can choose to continue using the default image or switch to the Unstable image based on the contents of both images listed below:

* **Stable (default)**
    * Shippable Official Docker Images
    * Docker Server Version: 1.9.1
    * Storage Driver: aufs
    * Root Dir: /data/aufs
    * Backing Filesystem: extfs
    * Dirperm1 Supported: true
    * Execution Driver: native-0.2
    * Logging Driver: json-file
    * Kernel Version: 3.19.0-51-generic
    * Operating System: Ubuntu 14.04.3 LTS

* **Unstable**
    * Shippable Official Docker Images
    * Docker Server Version: 1.11.1
    * Storage Driver: aufs
    * Root Dir: /data/aufs
    * Backing Filesystem: extfs
    * Dirperm1 Supported: true
    * Cgroup Driver: cgroupfs
    * Kernel Version: 3.19.0-51-generic
    * Operating System: Ubuntu 14.04.3 LTS

Please note that the stable version has been tested rigorously to work generically across the board and the unstable image has been tested for specific requirements.

---
## Setting an image

To select your Machine Image, go to the 'Settings' tab of your 'Subscription'. Click on the 'Options' section and select from the dropdown under the 'Machine Images' section.

<img src="../../images/advancedOptions/machineImage.png"
alt="Machine Image for a Subscription" style="width:1000px;"/>

---