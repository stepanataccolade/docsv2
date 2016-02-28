page_title: Basic concepts
page_description: Code examples, FAQs, language & platform support
page_keywords: containers, lxc, Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation


## Basic concepts before you start...

We have several terms we use throughout this documentation, and this section will bring you up to speed with most of those.


### Minions

Minions are Docker based containers that run your CI builds. 

When your build is triggered, we determine which Docker image to use in order to spin up your build minion. By default, the minion will container popular versions of the language specified in your yml, as well as popular tools and services used with that language. All this happens under the hood and 'just works'.

If you're a Docker enthusiast and want to spin up your build minion based on your custom Docker image or build an image from Dockerfile, you can do so by [following instructions here](ci_configure.md#build_images).

Your build minions are transient and spin up when a build is triggered and are destroyed when a build completes. 
 
Each minion has 2 cores and 4GB RAM. If you use your own infrastructure to run your builds with BYOH, you can spin up bigger containers for your builds since we do not restrict resources for containers running on customers' infrastructure. 

### Account

You do not need to explicitly create an account on Shippable to start using it. However, since we allow you to connect multiple source control providers and clouds to Shippable, the term 'account' is used to emcompass all of these identities. So for example, 'sync' at an account level means syncing your information across all source control providers and connected third party services. 


### Subscription

A subscription on Shippable corresponds to an organization or personal account on GitHub or Bitbucket. So if you sign in to Shippable with GitHub credentials and your username is *abcfoo* and you're a member of orgs *org1foo* and *org2foo*, you will have 3 subscriptions on Shippable. 

Our billing plans are at a subscription level, so you can upgrade or downgrade each of your subscriptions independently. Also, we mirror permissions from your source control provider, so if someone has access to organizational repositories on GitHub/Bitbucket, they will also have access to view and run builds on Shippable. These permissions are synced automatically and you do not have to do anything to make this work.


### Projects

A project on Shippable corresponds to a repository on your source control provider. As with subscriptions, project permissions are also synced with your source control provider.

Once a project is enabled, we build all commits and pull requests for that project, irrespective of who commits and opens the pull request.


*****

