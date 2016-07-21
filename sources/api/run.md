page_title: Shippable API for Runs
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# Runs

The old `builds` have now been replaced by `runs`.

Any builds started before 3/1/2016 can be retrieved by replacing `runs` with `builds` for the APIs in this section. E,g, GET /builds, GET /builds/:buildID, etc

For all runs started after 3/1/2016, please use /runs as shown in the routes below.

##Get all runs

```
GET /runs
```

###Query parameters
|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| runIds| Filter by one or more runIds. runIds should be separated by commas, for example, GET /runs?runIds=456,58,34| no | string | |
| QueryParameter| projectIds| Get runs for one or more projects. Multiple projectIds should be separated by commas.| no | string | |
| QueryParameter| subscriptionIds| Get runs for one or more subscriptions. Multiple subscriptionIds should be separated by commas.| no | string | |
| QueryParameter| branch| Get runs for one or more branch names. Multiple branch values should be separated by commas.| no | string | |
| QueryParameter| isPullRequest| When set to true, returns all runs that were triggered by pull requests. When set to false, returns runs that were triggered by commits.| no | boolean | |
| QueryParameter| maxRunNumber| Returns all runs with run number that is <= maxRunNumber.| no | string | |
| QueryParameter| status| Get runs with one or more statuses.| no | string | |

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|

```
{
    "id": "56cfeb866718d820008fa246",
    "runNumber": 2,
    "projectId": "56cfe9f4c77dae78a8eaa748",
    "projectName": "sample_node",
    "subscriptionOrgName": "shippableapi",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "isPrivate": false,
    "lastCommitShortDescription": "Update shippable.yml",
    "commitSha": "392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "triggeredBy": {
      "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3",
      "email": "",
      "displayName": null,
      "login": "shippableapi"
    },
    "statusCode": 20,
    "startedAt": "2016-02-26T06:07:03.789Z",
    "createdAt": "2016-02-26T06:07:02.121Z",
    "endedAt": null,
    "branchName": "master",
    "isPullRequest": false,
    "pullRequestNumber": null,
    "projectHtmlUrl": "https://github.com/shippableapi/sample_node",
    "providerName": "GITHUB",
    "commitUrl": "https://github.com/shippableapi/sample_node/commit/392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "committer": {
      "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3",
      "email": "shippableapi@gmail.com",
      "displayName": "shippableapi",
      "login": "shippableapi"
    },
    "runLengthInMS": 2000,
    "isRun": true
  }
}
```

---

## Get a specific run

```
GET /runs/:id
```

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check run id.|


```
{
    "runNumber": 2,
    "branchName": "master",
    "lastCommitShortDescription": "Update shippable.yml",
    "commitSha": "392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "statusCode": 20,
    "statusMessage": "PROCESSING",
    "startedAt": "2016-02-26T06:07:03.789Z",
    "endedAt": null,
    "runLengthInMS": 2000,
    "timeoutMS": 5400000,
    "providerId": "561f7fe7a120200d00ac0725",
    "providerName": "GITHUB",
    "providerUrl": "https://api.github.com",
    "providerDomain": "github.com",
    "projectId": "56cfe9f4c77dae78a8eaa748",
    "projectName": "sample_node",
    "projectURL": "https://api.github.com/repos/shippableapi/sample_node",
    "projectHtmlUrl": "https://github.com/shippableapi/sample_node",
    "scmURL": "https://github.com/shippableapi/sample_node.git",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "subscriptionOrgName": "shippableapi",
    "beforeCommitSha": "b6286d8d5ed5800467800a3934c1af252cab7e35",
    "commitRange": "b6286d8d5ed5800467800a3934c1af252cab7e35...392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "commitMessage": "Update shippable.yml",
    "commitUrl": "https://github.com/shippableapi/sample_node/commit/392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "compareUrl": "https://github.com/shippableapi/sample_node/compare/b6286d8d5ed5800467800a3934c1af252cab7e35...392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "baseCommitRef": "",
    "isFork": true,
    "isPrivate": false,
    "isOrg": false,
    "isPullRequest": false,
    "isManualRun": true,
    "pullRequestNumber": null,
    "pullRequestBaseBranch": null,
    "reRunBatchId": null,
    "skipDecryption": false,
    "cleanRunYml": null,
    "postCallerId": "56cfe9b668147b1300df0c69",
    "createdBy": "56cfe9b668147b1300df0c69",
    "updatedAt": "2016-02-26T06:31:05.479Z",
    "createdAt": "2016-02-26T06:07:02.121Z",
    "warnMsgs": [],
    "errorMsgs": [],
    "branchCoveragePercent": 0,
    "sequenceCoveragePercent": 0,
    "testsSkipped": 0,
    "testsPassed": 0,
    "testsFailed": 0,
    "totalTests": 0,
    "parallelizedTest": false,
    "triggeredBy": {
        "login": "shippableapi",
        "displayName": null,
        "email": "",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "lastAuthor": {
        "login": "shippableapi",
        "displayName": "shippableapi",
        "email": "shippableapi@gmail.com",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "committer": {
        "login": "shippableapi",
        "displayName": "shippableapi",
        "email": "shippableapi@gmail.com",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "isReRun": false,
    "isReady": false,
    "id": "56cfeb866718d820008fa246"
}
```

---

##Cancel a run

```
POST /runs/:id/cancel
```

###Response


|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal server error. Check run id|

```
{
    "runNumber": 5,
    "branchName": "master",
    "lastCommitShortDescription": "Update README.md",
    "commitSha": "4bec06511580963fa011e07bf467732a6d562b29",
    "statusCode": 70,
    "statusMessage": "CANCELED",
    "startedAt": "2016-02-28T05:57:35.600Z",
    "endedAt": "2016-02-28T05:57:48.000Z",
    "runLengthInMS": 12400,
    "timeoutMS": 5400000,
    "providerId": "561f7fe7a120200d00ac0725",
    "providerName": "GITHUB",
    "providerUrl": "https://api.github.com",
    "providerDomain": "github.com",
    "projectId": "56cfe9f4c77dae78a8eaa748",
    "projectName": "sample_node",
    "projectURL": "https://api.github.com/repos/shippableapi/sample_node",
    "projectHtmlUrl": "https://github.com/shippableapi/sample_node",
    "scmURL": "https://github.com/shippableapi/sample_node.git",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "subscriptionOrgName": "shippableapi",
    "beforeCommitSha": "392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "commitRange": "392eee0b6e27865135d0b14ee2ecb46abdb28ae7...4bec06511580963fa011e07bf467732a6d562b29",
    "commitMessage": "Update README.md",
    "commitUrl": "https://github.com/shippableapi/sample_node/commit/4bec06511580963fa011e07bf467732a6d562b29",
    "compareUrl": "https://github.com/shippableapi/sample_node/compare/392eee0b6e27865135d0b14ee2ecb46abdb28ae7...4bec06511580963fa011e07bf467732a6d562b29",
    "baseCommitRef": "",
    "isFork": true,
    "isPrivate": false,
    "isOrg": false,
    "isPullRequest": false,
    "isManualRun": true,
    "pullRequestNumber": null,
    "pullRequestBaseBranch": null,
    "reRunBatchId": null,
    "skipDecryption": false,
    "cleanRunYml": {
        "language": "node_js",
        "services": [],
        "integrations": {
            "hub": [],
            "deploy": [],
            "key": [],
            "notifications": [
                {
                    "recipients": [
                        "shippableapi@gmail.com"
                    ],
                    "integrationName": "email",
                    "type": "email",
                    "on_success": "change",
                    "on_failure": "always",
                    "on_pull_request": "always",
                    "on_start": "never",
                    "isValid": true
                }
            ]
        },
        "git": {
            "submodules": true
        },
        "branches": {
            "except": [],
            "only": []
        },
        "skip": false,
        "env": {
            "global": [
                "FOO=FUBU",
                "FO1=BUBU",
                "BOO=GUBU"
            ]
        },
        "jdk": [],
        "gemfile": [],
        "compiler": [],
        "node_js": [],
        "bundler_args": [],
        "python": [],
        "lein": [],
        "go": [],
        "scala": [],
        "php": [],
        "rvm": [],
        "addons": [],
        "matrix": {
            "include": [],
            "exclude": [],
            "allow_failures": []
        },
        "infra": {
            "pre_prov": [],
            "pre_prov_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "prov": [],
            "post_prov": [],
            "post_prov_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "build": {
            "pre_ci": [],
            "pre_ci_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "ci": [
                "ps -eax",
                "printenv",
                "ls -al",
                "ssh-add -l"
            ],
            "post_ci": [],
            "post_ci_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": [],
            "cache": false
        },
        "deploy": {
            "pre_ci": [],
            "pre_start_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "start": [],
            "post_start": [],
            "post_start_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "versions": [
            "0.12"
        ]
    },
    "language": "node_js",
    "postCallerId": "56cfe9b668147b1300df0c69",
    "createdBy": "56cfe9b668147b1300df0c69",
    "updatedAt": "2016-02-28T05:57:38.419Z",
    "createdAt": "2016-02-28T05:57:34.803Z",
    "warnMsgs": [],
    "errorMsgs": [],
    "branchCoveragePercent": 0,
    "sequenceCoveragePercent": 0,
    "testsSkipped": 0,
    "testsPassed": 0,
    "testsFailed": 0,
    "totalTests": 0,
    "parallelizedTest": false,
    "triggeredBy": {
        "login": "shippableapi",
        "displayName": null,
        "email": "",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "lastAuthor": {
        "login": "shippableapi",
        "displayName": "shippableapi",
        "email": "shippableapi@gmail.com",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "committer": {
        "login": "shippableapi",
        "displayName": "shippableapi",
        "email": "shippableapi@gmail.com",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "isReRun": false,
    "isReady": false,
    "id": "56d28c4e42bc2e11001ed507"
}
```
---

## Delete a run

```
DELETE /runs/:id
```
###Response


|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check run id.|


```
{
    "runNumber": 4,
    "branchName": "master",
    "lastCommitShortDescription": "Update README.md",
    "commitSha": "4bec06511580963fa011e07bf467732a6d562b29",
    "statusCode": 20,
    "statusMessage": "PROCESSING",
    "startedAt": "2016-02-28T05:51:22.260Z",
    "endedAt": null,
    "runLengthInMS": 2000,
    "timeoutMS": 5400000,
    "providerId": "561f7fe7a120200d00ac0725",
    "providerName": "GITHUB",
    "providerUrl": "https://api.github.com",
    "providerDomain": "github.com",
    "projectId": "56cfe9f4c77dae78a8eaa748",
    "projectName": "sample_node",
    "projectURL": "https://api.github.com/repos/shippableapi/sample_node",
    "projectHtmlUrl": "https://github.com/shippableapi/sample_node",
    "scmURL": "https://github.com/shippableapi/sample_node.git",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "subscriptionOrgName": "shippableapi",
    "beforeCommitSha": "392eee0b6e27865135d0b14ee2ecb46abdb28ae7",
    "commitRange": "392eee0b6e27865135d0b14ee2ecb46abdb28ae7...4bec06511580963fa011e07bf467732a6d562b29",
    "commitMessage": "Update README.md",
    "commitUrl": "https://github.com/shippableapi/sample_node/commit/4bec06511580963fa011e07bf467732a6d562b29",
    "compareUrl": "https://github.com/shippableapi/sample_node/compare/392eee0b6e27865135d0b14ee2ecb46abdb28ae7...4bec06511580963fa011e07bf467732a6d562b29",
    "baseCommitRef": "",
    "isFork": true,
    "isPrivate": false,
    "isOrg": false,
    "isPullRequest": false,
    "isManualRun": true,
    "pullRequestNumber": null,
    "pullRequestBaseBranch": null,
    "reRunBatchId": null,
    "skipDecryption": false,
    "cleanRunYml": {
        "language": "node_js",
        "services": [],
        "integrations": {
            "hub": [],
            "deploy": [],
            "key": [],
            "notifications": [
                {
                    "recipients": [
                        "shippableapi@gmail.com"
                    ],
                    "integrationName": "email",
                    "type": "email",
                    "on_success": "change",
                    "on_failure": "always",
                    "on_pull_request": "always",
                    "on_start": "never",
                    "isValid": true
                }
            ]
        },
        "git": {
            "submodules": true
        },
        "branches": {
            "except": [],
            "only": []
        },
        "skip": false,
        "env": {
            "global": [
                "FOO=FUBU",
                "FO1=BUBU",
                "BOO=GUBU"
            ]
        },
        "jdk": [],
        "gemfile": [],
        "compiler": [],
        "node_js": [],
        "bundler_args": [],
        "python": [],
        "lein": [],
        "go": [],
        "scala": [],
        "php": [],
        "rvm": [],
        "addons": [],
        "matrix": {
            "include": [],
            "exclude": [],
            "allow_failures": []
        },
        "infra": {
            "pre_prov": [],
            "pre_prov_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "prov": [],
            "post_prov": [],
            "post_prov_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "build": {
            "pre_ci": [],
            "pre_ci_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "ci": [
                "ps -eax",
                "printenv",
                "ls -al",
                "ssh-add -l"
            ],
            "post_ci": [],
            "post_ci_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": [],
            "cache": false
        },
        "deploy": {
            "pre_ci": [],
            "pre_start_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "start": [],
            "post_start": [],
            "post_start_boot": {
                "image_name": "drydock/u14nod",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "isLegacyImage": false
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "versions": [
            "0.12"
        ]
    },
    "language": "node_js",
    "postCallerId": "56cfe9b668147b1300df0c69",
    "createdBy": "56cfe9b668147b1300df0c69",
    "updatedAt": "2016-02-28T05:53:27.213Z",
    "createdAt": "2016-02-28T05:51:20.764Z",
    "warnMsgs": [],
    "errorMsgs": [],
    "branchCoveragePercent": 0,
    "sequenceCoveragePercent": 0,
    "testsSkipped": 0,
    "testsPassed": 0,
    "testsFailed": 0,
    "totalTests": 0,
    "parallelizedTest": false,
    "triggeredBy": {
        "login": "shippableapi",
        "displayName": null,
        "email": "",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "lastAuthor": {
        "login": "shippableapi",
        "displayName": "shippableapi",
        "email": "shippableapi@gmail.com",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "committer": {
        "login": "shippableapi",
        "displayName": "shippableapi",
        "email": "shippableapi@gmail.com",
        "avatarUrl": "https://avatars.githubusercontent.com/u/17489387?v=3"
    },
    "isReRun": false,
    "isReady": false,
    "id": "56d28ad80dc2d81300a279b9"
}
```

---
