page_title: Navigating Shippable's Account Settings UI
page_description: Overview of Shippable's Account Settings UI
page_keywords: User Interface, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


#Account Settings
Get to your account settings by clicking on the gear icon in the top navigation
bar when you are logged in to Shippable.

<img src="/navigatingUI/images/accountSettings/accountSettings.png" alt="Shippable Top Right Navigation
Menu" style="width:200px;"/>

---
The Account Settings contains the following sections:
#Accounts
## Account Information

**Shippable ID:** This is your Shippable account id.

**Email address:** When you sign up, we set to the primary email address of the source control provider account you use to sign in to Shippable as the default email for sending notifications.

You can override this default by clicking on the `Edit` button and entering a new email address. You will start receiving all subsequent notifications at the address you configured.

Please note that once you change this, you cannot undo this action.

**Synchronize** We periodically sync your Shippable account with your source control provider. This section will show you the last time your account was synced.

You can use the `Sync` button to sync your account at any time if you want to see any changes immediately.

For example: You are added to an organization on GitHub as an owner/collaborator,
or  you have new repos in GitHub and want to see them immediately, or you linked
your Bitbucket account to this account and want to see your Bitbucket repositories
right away.

<img src="../../images/accountSettings/accountInfo.png" alt="Account Settings
Account information" style="width:700px;"/>

---

## Git Identities

This sections shows you which source control identities are connected to your Shippable
account.

You can connect both GitHub and Bitbucket accounts to one Shippable account
and get a consolidated view of all your projects.

<img src="../../images/accountSettings/gitIdentities.png" alt="GitHub and Bitbucket
identities" style="width:700px;"/>

**GitHub**

If you've signed in using your GitHub account, your GitHub identity will either be: (public) or (public and private)

(public) means that we have permissions to your public Repos but not your private repos.

This is the default setting since signing in to Shippable requires you to authorize this access on GitHub.

(public and private) means that Shippable has access to your public and private
repos. You need to enable this if you want to build private repositories.

The `Enable` button is a one way toggle - once you enable private repository permissions, you cannot revert back to just public repository permissions using the Shippable UI.

Even if you use Bitbucket credentials to sign in, you can click the `Enable` button for your GitHub identity to connect your GitHub account.

This will give you a consolidated Shippable account where you can build projects from both source control providers and also set up deployment pipelines.

**Bitbucket**

If you signed in using your Bitbucket Account, your Bitbucket identity will be shown in this section.

Bitbucket does not support granular permissions to public and private repo access, so access for both is turned on by default when you sign in and authorize Shippable to access Bitbucket.

Even if you use GitHub credentials to sign in, you can click the `Enable` button for your Bitbucket identity to connect your Bitbucket account.

This will give you a consolidated Shippable account where you can build projects from both source
control providers and also set up deployment pipelines.

---

## Delete Account

The `Delete your account` button lets you delete your Shippable account. You will need to confirm that you want to delete all dependencies like enabled projects, account integrations, etc.

Your account will be deleted immediately if you choose to complete this action.

Please note that deleting your account does not delete Organization subscriptions since these are shared by multiple users.

If you sign in to Shippable again at a future time, you will still see projects and builds for organizational subscriptions.

If you want to stop using Shippable for organizations, you can always revoke access
in your GitHub account settings.

<img src="../../images/accountSettings/delete.png" alt="Delete your Account" style="width:700px;"/>

---
