page_title: Shippable integrations- Keys
page_description: How to set up integrations for SSH and PEM keys with Shippable
page_keywords: lighthouse, shippable ci, documentation, shippable, watch docker images

# Keys

You can set up integrations for the keys you use to integrate with third party services that do not have a native Integration with our platform.

This allows you to store your keys in your Shippable account and use them in your yml with the help of environment variables.

## SSH

To create an account integration for an SSH key, do the following:

- Go to Account settings by clicking on the gear icon in the top navbar
- Click on the `Integrations` tab and then click on `Add integration`
- From the dropdown, select `SSH key`
- Enter a name for your key and then click on the `Generate keys` button. This will generate an SSH key for your account.
- `Save` the generated key.

You will need to add this key to both the Settings **and** the shippable.yml of every project you want to use it in. Example shippable.yml integration:
```yaml
integrations:
   key:
      - integrationName: MySSHKeyIntegration
        type: ssh-key
```
 * `integrationName` is the name of the SSH integration you added to the project settings.
 * `type` is ssh-key

Your SSH key will be available on your build minion in the `/tmp/ssh/` directory. You can then use the key for ssh commands in your shippable.yml.

## PEM

To create an account integration for a PEM key, do the following:

- Go to Account settings by clicking on the gear icon in the top navbar
- Click on the `Integrations` tab and then click on `Add integration`
- From the dropdown, select `PEM key`
- Enter a name for your key and then paste your key into the textbox labeled `key`.
- `Save` your key.

You will need to add this key to both the Settings **and** the shippable.yml of every project you want to use it in. Example shippable.yml integration:
```yaml
integrations:
   key:
      - integrationName: MyPEMKeyIntegration
        type: pem-key
```
 * `integrationName` is the name of the PEM integration you added to the project settings.
 * `type` is pem-key

Your PEM key will be available on your build minion in the `/tmp/ssh/` directory, and can be used in your shippable.yml.

