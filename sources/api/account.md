page_title: Shippable API for Accounts
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# Accounts

## Get your account id

Returns a list of your account ids.

```
GET /accounts
```

###Response

```javascript
[
  "56b42b965d77641100004d14"
]
```
---

## Get account information

```
GET /accounts/:id
```

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check account id.|


```
{
    "lastUsedIdentityId": "56cfe9b668147b1300df0c6a",
    "lastSyncStartDate": "2016-02-28T14:12:01.802Z",
    "defaultEmail": "shippableapi@gmail.com",
    "braintreeCustomerId": "56cfe9b668147b1300df0c69",
    "hubspotId": "4221645",
    "identities": [
        {
            "userName": "shippableapi",
            "displayName": null,
            "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3",
            "avatarId": "",
            "provider": "github",
            "providerId": "561f7fe7a120200d00ac0725",
            "providerAccountId": "17489387",
            "providerType": "User",
            "providerBlog": null,
            "providerCompany": null,
            "providerLocation": null,
            "providerFollowerCount": 0,
            "providerPublicRepoCount": 2,
            "providerPublicGistCount": 0,
            "email": null,
            "providerPrivateGists": null,
            "providerTotalPrivateRepos": null,
            "providerOwnedPrivateRepos": null,
            "emails": [
                {
                    "email": "shippableapi@gmail.com",
                    "verified": true,
                    "primary": true
                }
            ],
            "enforceScopes": [],
            "scopes": [
                "admin:repo_hook",
                "read:org",
                "repo",
                "user:email"
            ],
            "id": "56cfe9b668147b1300df0c6a"
        }
    ],
    "systemRoles": [
        "user"
    ],
    "welcomeEmailSent": false,
    "lastAggregatedAt": "1970-01-01T00:00:00.000Z",
    "lastSyncEndDate": "2016-02-28T14:12:03.894Z",
    "created": "2016-02-26T05:59:18.700Z",
    "id": "56cfe9b668147b1300df0c69"
}
```
---

## Get latest status of all enabled projects

This route returns the latest run status for all enabled projects across all subscriptions.

```
GET /accounts/:id/runStatus
```

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check account id.|

```
{
    "id": "56d303db13067a12006bf53a",
    "runNumber": 2,
    "projectId": "56d30070c77dae78a8ed91d4",
    "projectName": "sample_node_mongo",
    "subscriptionOrgName": "shippableapi",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "isPrivate": false,
    "lastCommitShortDescription": "Merge pull request #7 from rageshkrishna/master\n\nNew YML format and fix tests running twice",
    "commitSha": "5dddd47aa0b8faba5f474b4e85cb382dbd053708",
    "triggeredBy": {
      "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3",
      "email": "",
      "displayName": null,
      "login": "shippableapi"
    },
    "statusCode": 30,
    "startedAt": "2016-02-28T14:27:40.133Z",
    "createdAt": "2016-02-28T14:27:39.321Z",
    "endedAt": "2016-02-28T14:28:33.955Z",
    "branchName": "master",
    "isPullRequest": false,
    "pullRequestNumber": null,
    "projectHtmlUrl": "https://github.com/shippableapi/sample_node_mongo",
    "providerName": "GITHUB",
    "commitUrl": "https://github.com/shippableapi/sample_node_mongo/commit/5dddd47aa0b8faba5f474b4e85cb382dbd053708",
    "committer": {
      "avatarUrl": "https://avatars.githubusercontent.com/u/1302035?v=3",
      "email": "avi@shippable.com",
      "displayName": "Avi Cavale",
      "login": "avinci"
    },
    "runLengthInMS": 53822,
    "isRun": true,
    "totalTests": 3,
    "testsFailed": 0,
    "testsPassed": 3,
    "testsSkipped": 0,
    "postCallerId": "56cfe9b668147b1300df0c69",
    "providerId": "561f7fe7a120200d00ac0725",
    "providerUrl": "https://api.github.com",
    "sequenceCoveragePercent": 0,
    "branchCoveragePercent": 0,
    "language": "node_js"
}
```
---

##Get dependencies

This route returns account dependencies, including subscriptions, enabled projects, credit cards, and account integrations. These must be deleted before you delete the account.

```
GET /accounts/:id/dependencies
```

###Response

```
{
    "errors": [],
    "count": 2,
    "projects": [
        {
            "repositoryProvider": "github",
            "providerId": "561f7fe7a120200d00ac0725",
            "sourceRepoOwner": {
                "login": "shippableapi",
                "id": 17489387,
                "avatar_url": "https://avatars.githubusercontent.com/u/17489387?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/shippableapi",
                "html_url": "https://github.com/shippableapi",
                "followers_url": "https://api.github.com/users/shippableapi/followers",
                "following_url": "https://api.github.com/users/shippableapi/following{/other_user}",
                "gists_url": "https://api.github.com/users/shippableapi/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/shippableapi/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/shippableapi/subscriptions",
                "organizations_url": "https://api.github.com/users/shippableapi/orgs",
                "repos_url": "https://api.github.com/users/shippableapi/repos",
                "events_url": "https://api.github.com/users/shippableapi/events{/privacy}",
                "received_events_url": null,
                "type": "User",
                "site_admin": false
            },
            "sourceUpdated": "2016-02-28T14:11:49.000Z",
            "sourcePushed": "2016-02-25T09:59:01.000Z",
            "repositoryHtmlUrl": "https://github.com/shippableapi/sample_node_mongo",
            "isFork": true,
            "isPrivateRepository": false,
            "sourceDescription": "Testing MongoDB service",
            "language": "JavaScript",
            "repositoryUrl": "https://api.github.com/repos/shippableapi/sample_node_mongo",
            "fullName": "shippableapi/sample_node_mongo",
            "name": "sample_node_mongo",
            "subscriptionId": "56cfe9f3c77dae78a8eaa746",
            "enabledDate": "2016-02-28T14:12:11.383Z",
            "sourceDefaultBranch": "master",
            "isPaused": false,
            "enabledByAccount": {
                "id": "56cfe9b668147b1300df0c69",
                "identityUsedToEnable": {
                    "id": "56cfe9b668147b1300df0c6a",
                    "provider": "github",
                    "userName": "shippableapi"
                }
            },
            "created": "2016-02-28T14:12:03.864Z",
            "autoBuild": true,
            "isOrg": false,
            "branches": [
                "master"
            ],
            "id": "56d30070c77dae78a8ed91d4"
        },
        {
            "repositoryProvider": "github",
            "providerId": "561f7fe7a120200d00ac0725",
            "sourceRepoOwner": {
                "login": "shippableapi",
                "id": 17489387,
                "avatar_url": "https://avatars.githubusercontent.com/u/17489387?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/shippableapi",
                "html_url": "https://github.com/shippableapi",
                "followers_url": "https://api.github.com/users/shippableapi/followers",
                "following_url": "https://api.github.com/users/shippableapi/following{/other_user}",
                "gists_url": "https://api.github.com/users/shippableapi/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/shippableapi/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/shippableapi/subscriptions",
                "organizations_url": "https://api.github.com/users/shippableapi/orgs",
                "repos_url": "https://api.github.com/users/shippableapi/repos",
                "events_url": "https://api.github.com/users/shippableapi/events{/privacy}",
                "type": "User",
                "site_admin": false
            },
            "sourceUpdated": "2016-02-26T05:58:58.000Z",
            "sourcePushed": "2016-02-26T19:38:08.000Z",
            "repositoryHtmlUrl": "https://github.com/shippableapi/sample_node",
            "isFork": true,
            "isPrivateRepository": false,
            "sourceDescription": "",
            "language": "JavaScript",
            "repositoryUrl": "https://api.github.com/repos/shippableapi/sample_node",
            "fullName": "shippableapi/sample_node",
            "name": "sample_node",
            "subscriptionId": "56cfe9f3c77dae78a8eaa746",
            "sourceDefaultBranch": "master",
            "enabledDate": "2016-02-26T06:05:11.968Z",
            "isPaused": false,
            "enabledByAccount": {
                "id": "56cfe9b668147b1300df0c69",
                "identityUsedToEnable": {
                    "id": "56cfe9b668147b1300df0c6a",
                    "provider": "github",
                    "userName": "shippableapi"
                }
            },
            "created": "2016-02-26T05:59:20.980Z",
            "autoBuild": true,
            "isOrg": false,
            "branches": [
                "dockerpush",
                "master",
                "test",
                "testdockerbuildrepo"
            ],
            "id": "56cfe9f4c77dae78a8eaa748"
        }
    ],
    "accountIntegrations": [
        {
            "name": "github",
            "accountId": "56cfe9b668147b1300df0c69",
            "masterIntegrationId": "561f7f5da120200d00abfedf",
            "masterName": "github",
            "masterDisplayName": "github",
            "masterType": "scm",
            "createdBy": "56cfe9b668147b1300df0c69",
            "updatedBy": "56cfe9b668147b1300df0c69",
            "providerId": "561f7fe7a120200d00ac0725",
            "isValid": false,
            "updatedAt": "2016-02-28T14:10:41.882Z",
            "createdAt": "2016-02-26T05:59:18.771Z",
            "isEnabled": true,
            "formJSONValues": [
                {
                    "type": "static",
                    "secure": false,
                    "label": "url",
                    "example": "https://api.github.com",
                    "editable": false,
                    "description": "Github's API endpoint",
                    "value": "https://api.github.com"
                },
                {
                    "label": "token",
                    "type": "inputSmall",
                    "description": "Your GitHub API token",
                    "example": "abcdef123456",
                    "secure": true,
                    "value": "********"
                }
            ],
            "id": "56cfe9b668147b1300df0c6c"
        }
    ],
    "cards": [
        {
            "id": "56cfea65d410701a005fa9da",
            "accountId": "56cfe9b668147b1300df0c69",
            "createdAt": "2016-02-26T06:02:13.154Z",
            "updatedAt": "2016-02-26T06:02:13.154Z",
            "card": {
                "token": "67cgz2",
                "maskedNumber": "411111******1111",
                "expirationDate": "01/2017",
                "imageUrl": "https://assets.braintreegateway.com/payment_method_logo/visa.png?environment=sandbox",
                "cardType": "Visa",
                "last4": "1111"
            }
        }
    ],
    "subscriptionPlans": [
        {
            "subscriptionId": "56cfe9f3c77dae78a8eaa746",
            "cardId": "56cfea65d410701a005fa9da",
            "planId": "5677abfab9f8c912003e061b",
            "planName": "future",
            "billingEmail": "shippableapi@gmail.com",
            "startDate": "2016-02-26T06:02:24.607Z",
            "activePlan": true,
            "unitCount": 2,
            "pipelineCount": 1,
            "maskedCardNumber": "411111******1111",
            "cardType": "Visa",
            "createdBy": "56cfe9b668147b1300df0c69",
            "updatedBy": "56cfe9b668147b1300df0c69",
            "braintreeSubscriptionId": "4pgsjb",
            "updatedAt": "2016-02-26T06:02:24.607Z",
            "createdAt": "2016-02-26T06:02:24.607Z",
            "originAccount": {
                "id": "56cfe9b668147b1300df0c69",
                "identityUsedToEnable": {
                    "id": "56cfe9b668147b1300df0c6a",
                    "provider": "github",
                    "userName": "shippableapi"
                }
            },
            "cost": {
                "currency": "USD",
                "total": 10
            },
            "unitType": "minions",
            "id": "56cfea70d410701a005fa9e5"
        }
    ]
}
```
---

## Delete an account

```
DELETE /accounts/:id
```

Deletes the specified account

**Response**
```Status 200 OK```

The accounts schema described in GET /accounts/:id is returned.

---
