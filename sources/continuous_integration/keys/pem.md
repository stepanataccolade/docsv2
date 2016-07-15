page_title: Shippable integrations- PEM Keys
page_description: How to set up integrations for PEM keys with Shippable
page_keywords: shippable ci, documentation, shippable, watch docker images


# PEM

To create an account integration for a PEM key, do the following:

- Go to Account settings by clicking on the gear icon in the top navigation bar.
- Click on the 'Integrations' section.
- Click on the `Add integration` button.
- From the dropdown, select `PEM key`.
- Enter a name for your key and then paste your key into the textbox labeled `key`.
- `Save` your key.

<img src="/continuous_integration/images/pem_key_integration.png" alt="PEM Keys integration" style="width:700px;"/>

You will need to add this key to both the 'Subscription' Settings **and** the `shippable.yml` of every project you want to use it in. Example `shippable.yml` integration:
```
integrations:
  key:
    - integrationName: MyPEMKeyIntegration
      type: pem-key
```
 * `integrationName` is the name of the PEM integration you added to the 'Subscription' settings.
 * `type` is pem-key

Your PEM key will be available on your build minion in the `/tmp/ssh/` directory, and can be used in your `shippable.yml`.

---
