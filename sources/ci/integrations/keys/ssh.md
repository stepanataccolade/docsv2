page_title: Shippable integrations- SSH Keys
page_description: How to set up integrations for SSH keys with Shippable
page_keywords: lighthouse, shippable ci, documentation, shippable, watch docker images

# Keys

You can set up integrations for the keys you use to integrate with third party services that do not have a native Integration with our platform.

This allows you to store your keys in your Shippable account and use them in your yml with the help of environment variables.

---

## SSH

To create an account integration for an SSH key, do the following:

- Go to Account settings by clicking on the gear icon in the top navigation bar.
- Click on the 'Integrations' section.
- Click on the `Add integration` button.
- From the dropdown, select `SSH key`
- Enter a name for your key and then click on the `Generate keys` button. This will generate an SSH key for your account.
- `Save` the generated key.


<img src="/ci/images/integrations/keys/ssh/addInt.png" alt="SSH Keys integration" style="width:700px;"/>

You will need to add this key to both the 'Subscription' Settings **and** the `shippable.yml` of every project you want to use it in. Example `shippable.yml` integration:
```
integrations:
  key:
    - integrationName: MySSHKeyIntegration
      type: ssh-key
```
 * `integrationName` is the name of the SSH integration you added to the 'Subscription' settings.
 * `type` is ssh-key

Your SSH key will be available on your build minion in the `/tmp/ssh/` directory. You can then use the key for ssh commands in your `shippable.yml`.

---
