#Linking GitHub and Bitbucket Accounts
You can use Shippable to run builds on both GitHub and Bitbucket repositories, by connecting both your accounts on Shippable.

This helps in a consolidated view of all projects across both these source control systems.

To connect both these accounts, do the following:

- Sign into [Shippable](http://www.shippable.com) with either GitHub or Bitbucket account. Pick the account that you want as your primary account.
- Click on the gear icon for Account Settings in your top navigation bar and then click on the 'Accounts' section.
- Under 'Git Identities', you'll see an option to enable Bitbucket, if you've signed in using GitHub and vice-versa.
- Click the `Enable` button under Bitbucket (or GitHub, if you've signed in using Bitbucket).
- Follow the authorization flow for Bitbucket (or GitHub). Provide your Bitbucket (or GitHub) credentials when prompted.

Once both your accounts are linked, you should see a consolidated list of orgs and projects in your account.

Going forward, you can sign in to Shippable with either GitHub or Bitbucket credentials.

**IMPORTANT**

- To see the linked account repositories updated immediately, click on the `Sync` button in 'Account Settings'.
- Prior to linking the accounts, if you have logged into Shippable using GitHub AND logged in using Bitbucket, you will be unable to link the accounts using the above method. To enable the linking of the accounts in such an instance, open [a support issue](https://github.com/Shippable/support/issues) with a request to delete one of the source control provider accounts within Shippable. Upon deletion, follow the above steps with the existing account to successfully link both the accounts.

Read our blog - [How to link GitHub and Bitbucket accounts](http://blog.shippable.com/how-to-link-github-and-bitbucket-accounts).

