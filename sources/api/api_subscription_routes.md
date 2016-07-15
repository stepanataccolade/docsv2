page_title: Shippable API for Subscriptions
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# Subscriptions

##Get all subscriptions

```
GET /subscriptions
```

###Query parameters

|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| projectIds| Filter by one or more project ids. Multiple projectIds should be separated by commas.| no | string | |
| QueryParameter| isOrgSubscription| When set to true, returns all organizational subscriptions . When set to false, returns all personal subscriptions.| no | string | |


###Response


|HTTP code      |    Status     |    Description    |
|----------|-------------|-------------------|
| 200| OK| Query was successful and all subscripti0ns will be returned.|

```
{
    "providerId": "561f7fe7a120200d00ac0725",
    "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3",
    "type": "scm",
    "orgName": "shippableapi",
    "updatedAt": "2016-02-26T06:10:19.161Z",
    "createdAt": "2016-02-26T06:18:14.194Z",
    "isOrgSubscription": false,
    "id": "56cfe9f3c77dae78a8eaa746"
}
```
---

## Get specific subscription

This route returns in depth information about a single subscription

```
GET/subscriptions/:id
```

`id` is the guid for the subscription.

###Response

|HTTP code      |    Status     |    Description    |
|----------|-------------|-------------------|
| 200| OK| Query was successful and subscription details will be returned.|
| 500| Internal Server Error| Incorrect subscription ID.|


```
{
    "orgId": "17489387",
    "provider": "github",
    "providerId": "561f7fe7a120200d00ac0725",
    "updatedBy": "56cfe9b668147b1300df0c69",
    "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3",
    "type": "scm",
    "orgName": "shippableapi",
    "processQueue": "56cfe9f3c77dae78a8eaa746.process",
    "isUsingCustomHost": false,
    "lastDeployNumber": 0,
    "disableDeployWebhook": false,
    "updatedAt": "2016-02-26T06:10:19.161Z",
    "createdAt": "2016-02-26T06:19:36.980Z",
    "providerLastSyncStartDate": "2016-02-26T06:10:19.161Z",
    "providerLastSyncEndDate": "2016-02-26T06:10:21.064Z",
    "syncInterval": 3600,
    "sshKey": {
        "public": "ssh-rsa AAAAB3NzaC1yc2E8eaa746\n"
    },
    "isOrgSubscription": false,
    "id": "56cfe9f3c77dae78a8eaa746"
}

```

---

##Delete a subscription
This route lets you delete your subscription. Please note that all projects, jobs and runs will also be deleted when the subscription is deleted.

```
DELETE /subscriptions/:id
```

---
