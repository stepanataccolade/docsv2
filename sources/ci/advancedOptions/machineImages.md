page_title: Node Machine Images on Shippable
page_description: How to configure the node Machine Image for your Continuous Integration projects
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker, version, 1.11, 1.12

## Selecting the Machine Images
The Machine Images section has a list of images that are available to run your builds. All the builds for your subscription will be using the stable image by default. You can switch to other images based on your requirements. Once you switch the images, all the builds for your subscription will be using the image that you have selected and you can switch back to the default version anytime. Review [our documentation](/navigating_ui/subscriptions_settings/#machine-images) for help on switching the images.

#### Here is the list of contents of the machine images

* Stable
    * Shippable Official Images.
    * Docker Server Version: 1.9.1
    * Storage Driver: aufs
    * Root Dir: /data/aufs
    * Backing Filesystem: extfs
    * Dirperm1 Supported: true
    * Execution Driver: native-0.2
    * Logging Driver: json-file
    * Kernel Version: 3.19.0-51-generic
    * Operating System: Ubuntu 14.04.3 LTS

* Unstable
    * Shippable Official Images.
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
