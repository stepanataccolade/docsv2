page_title: Shippable Account Settings
page_description: Account Settings, Integratons, Account Tokens, Credit Cards
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, Tokens, account settings

# Account Settings

You can get to your account settings by clicking on the gear icon in the top navigation bar when you are logged in to Shippable. 

You will land on the Accounts tab.


##Settings

### Account Information

**ID:** This is your Shippable account id. 

**Synchronize** We periodically sync your Shippable account with your source control provider. This section will show you the last time your account was synced.

You can use the `Sync` button to sync your account at any time if you want to see any changes immediately. Example: You are added to an organization on GitHub as an owner/collaborator, or  you have new repos in GitHub and want to see them immediately, or you linked your Bitbucket account to this account and want to see your Bitbucket repositories right away.

<img src="../images/account_settings_account_info.png" alt="Github and Bitbucket identities" style="width:400px; margin:0px auto; display:block"/>


### Default email address
This is the default email address where we sent build status and deployment pipeline status notifications. When you sign up, we set to the primary email address of the source control provider account you use to sign in to Shippable.

You can override this default by clicking on the `Edit` button and entering a new email address. You will start receiving all subsequent notifications at the address you configured. 
Please note that once you change this, you cannot undo this action. 

### Git Identities

This sections hows you which source control identities are connected to your Shippable account. You can connect both GitHub and Bitbucket accounts to one Shippable account and get a consolidated view of all your projects.

<img src="../images/account_settings_git_identities.png" alt="Github and Bitbucket identities" style="width:400px; margin:0px auto; display:block"/>

**GitHub**

If you signed in using your GitHub account, your GitHub identity will either be: (public) or (public and private)

(public) means that we have permissions to your public Repos but not your private repos. This is the default setting since signing in to Shippable requires you to authorize this access on GitHub.

(public and private) means that Shippable has access to your public and private repos. You need to enable this if you want to build private repositories.

The `Enable` button is a one way toggle - once you enable private repository permissions, you cannot revert back to just public repository permissions using the Shippable UI. 

Even if you use Bitbucket credentials to sign in, you can click the `Enable` button for your GitHub identity to connect your GitHub account. This will give you a consolidated Shippable account where you can build projects from both source control providers and also set up deployment pipelines.

**Bitbucket**

If you signed in using your Bitbucket Account, your Bitbucket identity will be shown in this section. Bitbucket does not support granular permissions to public and private repo access, so access for both is turned on by default when you sign in and authorize Shippable to access Bitbucket.

Even if you use GitHub credentials to sign in, you can click the `Enable` button for your Bitbucket identity to connect your Bitbucket account. This will give you a consolidated Shippable account where you can build projects from both source control providers and also set up deployment pipelines.


### API Tokens

This is where you generate, view and manage access tokens to use our [API](api.md).

Enter a token name and click on `Add` to create a new token. Remember to copy the token. For security reasons, the token will never be displayed again.

To delete a token, click on the `Delete` button next for the token you want to delete.

<img src="../images/account_settings_api_token.png" alt="Github and Bitbucket identities" style="width:700px;"/>

**Please remember to keep your token safe and do not share it with anyone.** If anyone gets access to your token, they will be able to make API calls on your behalf and compromise the security of your Shippable account. Treat your API token like a password.


### Delete Account

The `Delete` button lets you delete your Shippable account. You will need to confirm that you want to delete all dependencies like enabled projects, account integrations, etc.

Your account will be deleted immediately if you choose to complete this action. 

Please note that deleting your account does not delete Organization subscriptions since these are shared by multiple users. If you sign in to Shippable again at a future time, you will still see projects and builds for organizational subscriptions. If you want to stop using Shippable for organizations, you can always revoke access in your GitHub account settings.

--------

## Integrations
Shippable integrates with many third party services/platforms and you can leverage this by setting up an account integration and then using the integration at any point in your Shippable Continuous Integration or Delivery workflows.

Detailed information about supported integrations and how to set things up ins available in the [Integrations section of our docs](int_overview.md)

--------
## Cards

You need to add your credit card information to your account in order to use the card to pay for a Shippable subscription.

The Cards tab will show you all the credit cards linked to your account.

You can get more information about where the card is being used by clicking on the ... to expand the card widget.


<img src="../images/acc_cards_2.png" alt="expand credit card" style="width:300px;"/>


### Adding a card

Click on the Add Card button to add a new card and follow instructions to save the card to your account.

You will not be charged until you use a card to upgrade a subscription. 

### Removing a card
You can click on the 'Delete' button for the card you wish to remove from your account. 

