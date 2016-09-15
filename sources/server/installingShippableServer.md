# Installing Shippable Server

####**NOTE: This page is still under construction. Please contact [sales@shippable.com](mailto:sales@shippable.com) to get more information about Shippable Server.**

Before starting to install Shippable Server, please make sure you have the reference architecture in place.

To install Shippable Server, follow the instructions below. All steps in the installation happen on the Swarm machine except when noted otherwise.

###Install git

Install git on the Run the following commands on the Swarm Machine:

```
$ sudo apt-get install git
```

###Clone the Shippable Server installer
The installer is available in a public repository on GitHub. Clone it to your Swarm machine:

```
$ git clone https://github.com/Shippable/base.git
```
The configuration files are included in the `data` folder of the installer. The machine configuration sample config is `machine.json.example` while the actual Server config sample is `config.json.example`

###Configure the topology
You can configure the installer to understand your topology by adding a `machine.json` file in your data folder.
Go to the data folder and copy the sample json to `machines.json`:

```
$ cd /base/data
$ cp machines.json.example machines.json
```

In the `machines.json` file, update the Private IP addresses for Swarm, Core, and Services machines. Please see the lines in CAPS below to figure out what to replace.

```
[
  {
    "group": "core",
    "ip" : "ENTER CORE MACHINE PRIVATE IP HERE",
    "name": "db",
    "login": "root",
    "dataMount": "/data",
    "cores": 2,
    "memory": 4096,
    "arch": "x86"
  },
  {
    "group": "core",
    "ip" : "UPDATE SWARM MACHINE PRIVATE IP HERE",
    "name": "swarm",
    "login": "root",
    "dataMount": "/data",
    "cores": 2,
    "memory": 4096,
    "arch": "x86"
  },
  {
    "group": "services",
    "ip" : "UPDATE FIRST SERVICES MACHINE PRIVATE IP HERE",
    "name": "services1",
    "login": "root",
    "dataMount": "/data",
    "cores": 2,
    "memory": 4096,
    "arch": "x86"
  }
  {
    "group": "services",
    "ip" : "UPDATE SECOND SERVICES MACHINE PRIVATE IP HERE",
    "name": "services2",
    "login": "root",
    "dataMount": "/data",
    "cores": 2,
    "memory": 4096,
    "arch": "x86"
  }
]
```

Save and close the `machines.json` file.

###Configuring Proxy

If you're running the installer behind a proxy, you will need to update the following:

* /etc/environment with HTTP_PROXY, HTTPS_PROXY, http_proxy, https_proxy(before running the installer)

For example, http_proxy=http://172.31.27.52:8888 https_proxy=http://172.31.27.52:8888 HTTP_PROXY=http://172.31.27.52:8888 HTTPS_PROXY=http://172.31.27.52:8888

* /etc/default/docker with http_proxy(when the installer prompts)

###Configure the installer

Most of the configuration resides in the `config.json` file, also in the data directory. Copy the sample file to `config.json`:

```
$ cp config.json.example config.json
```

Open the `config.json` file and make the following updates:

* `wwwUrl`: This should be set to load-balancer-URL:50001 if you're using a load balancer. If not using a load balancer, this should be set to the [Update link]

* `apiUrl`: This should be set to load-balancer-URL:50000 if you're using a load balancer. If not using a load balancer, this should be set to the [Update link]

* `awsAccessKey` should be set to the access key you received from Shippable

* `awsSecretKey` should be set to the secret key you received from Shippable

In the `systemIntegrations` section of the config file, you should only retain `ecr` integration and the integration for the source control provider you want to use with Shippable Server.

[Links to instructions for SCM]

###Run installer

Execute following command on the Swarm machine to run the installer:

```
$ sudo -E ./base.sh --install
```

The installer will run for a few seconds and then ask you to copy a command and run it on your Core and Services machine(s). You can exit the Installer with a Ctrl+C and follow instructions to run the command on the machines.

Re-run the installer and let it run to completion.
