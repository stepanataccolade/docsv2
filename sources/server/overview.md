# Continuous Deployment with Shippable Server

####**NOTE: This page is still under construction. Please contact [sales@shippable.com](mailto:sales@shippable.com) to get more information about Shippable Server.**

Shippable Server is our enterprise version of Shippable. It can be installed on your own machines behind your firewall, so that your continuous integration and delivery workflows and data are not accessible outside your network.

From an end user perspective, Shippable Server looks and feels similar to our Hosted offering at https://app.shippable.com.

---
## Shippable Server licensing
Please [contact our Sales team at sales@shippable.com](mailto:sales@shippable.com) to learn more about how to license Shippable Server.

---

## Reference architecture

Shippable Server requires at least 2 machines for the Server installation, plus 1...N build hosts depending on your requirements for parallel builds.

For a full Enterprise grade installation that can support 1000+ users, you will need 4 machines plus build hosts as shown below.

<img src="../images/serverTopology.jpg" alt="Shippable server topology for continuous integration and deployment" style="width:800px;"/>

###Swarm Master
This machine serves as a starting point for the installation. The Shippable Server installer is cloned and run on this machine. It installs Gitlab CE and Docker Swarm. Swarm runs in the master mode, so all orchestration commands for Shippable services are run from this machine, although no Shippable services are installed here.

We use Gitlab CE as a data store for [UpdateLink] for all Shippable Server end users.

####Machine size

* Cores: 4
* Memory: 16gb
* Storage: 200gb

####Ports needed:

*  2222 for GitLab
*  2377 for Swarm

###Core
This machine is required to host the Postgres database, as well as RabbitMQ for queuing, Vault to store sensitive data, and Redis to cache user sessions. This machine is not connected to the Swarm master and does not run any containers.

For smaller installations, Core and Swarm can both be combined into one machine.

####Machine size

* Cores: 4
* Memory: 16gb
* Storage: 200gb

####Ports needed

* 5672 for amqp
* 15672 for amqp admin
* 8200 for Vault
* 5432 for Postgres
* 6379 for Redis

###Services (2)
These machines are used to run Shippable services. They have swarm running in worker mode, and connect to the swarm master using a token provided by master. The recommended number of Services machines is 2, though any number of machines can be added to run services.

All services connect to the Shippable API using an internal swarm overlay network.

For smaller installations, you can run all services on one machine.

####Machine size

* Cores: 4
* Memory: 8gb
* Storage: 50gb

####Ports needed:
* 50000 for Shippable API
* 50001 for WWW (UI)
* 2377 for Swarm

###Build hosts (1-n)

Build hosts are used to run your continuous integration and deployment jobs. These machines have Docker and a Shippable agent installed. The Agent connects to Rabbitmq running on Core machine to receive messages and also communicates with Shippable API on the Services machine to provide job status updates.

####Machine size

* Cores: 2
* Memory: 4gb
* Storage: 20gb

#### Ports
These machines need access to Shippable API (Port 50000 on the Services machine) and RabbitMQ (Port 5672 on Core machine)
