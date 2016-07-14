page_title: Shippable API
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# API
# Overview and Purpose

The Shippable API enables you to do most things that you would normally do in the Shippable UI through HTTP requests. Our API is RESTful, and can be interfaced through curl, third party tools, your own wrapper libraries, or any form of HTTPS communication.

Please note that you must have a paid account with Shippable in order to use the API.

## Endpoint

The main endpoint for interacting with our API is
<https://api.shippable.com>

---

## Authentication

Using our API requires authenticating with a Shippable API tokens. To generate a token, follow instructions in our [Generate API token](acc_overview.md#api-tokens) section.

These tokens must be placed in the header of your HTTP request. For example, if your API token has the value 10010, you can authenticate with curl as follows:

```bash
curl -H "Authorization: apiToken 10010" https://api.shippable.com
```

A useful pattern is to set an env var with the value of your token. For example, if we saved our token to the environment variable apiToken:

```bash
curl -H "Authorization: apiToken $apiToken" https://api.shippable.com
```

This is useful not only because one no longer has to type type apiToken in repeated times, but use of an env var allows for secure automation of API scripts; it is dangerous to directly save your apiToken into code.

Also be careful to never commit code containing your API token to a public repository. Doing so will compromise the security of your Shippable account. Treat your API token like a password.

Detailed documentation for API routes is provided below.

---

## Runs

The old `builds` have now been replaced by `runs`.

Any builds started before 3/1/2016 can be retrieved by replacing `runs` with `builds` for the APIs in this section. E,g, GET /builds, GET /builds/:buildID, etc

For all runs started after 3/1/2016, please use /runs as shown in the routes below.

###Get all runs

```
GET /runs
```

####Query parameters
|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| runIds| Filter by one or more runIds. runIds should be separated by commas, for example, GET /runs?runIds=456,58,34| no | string | |
| QueryParameter| projectIds| Get runs for one or more projects. Multiple projectIds should be separated by commas.| no | string | |
| QueryParameter| subscriptionIds| Get runs for one or more subscriptions. Multiple subscriptionIds should be separated by commas.| no | string | |
| QueryParameter| branch| Get runs for one or more branch names. Multiple branch values should be separated by commas.| no | string | |
| QueryParameter| isPullRequest| When set to true, returns all runs that were triggered by pull requests. When set to false, returns runs that were triggered by commits.| no | boolean | |
| QueryParameter| maxRunNumber| Returns all runs with run number that is <= maxRunNumber.| no | string | |
| QueryParameter| status| Get runs with one or more statuses.| no | string | |

####Response

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

### Get a specific run

```
GET /runs/:id
```

####Response

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

###Cancel a run

```
POST /runs/:id/cancel
```

####Response


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

### Delete a run

```
DELETE /runs/:id
```
####Response


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

## Jobs
Jobs are individual builds in a Run. For example, a matrix build will have multiple Jobs that are a part of the Build Run, one for each value in the matrix. For more on matrix builds, [check out our documentation on build config](ci_configure.md#matrix_builds)

###Get all jobs
This route returns all jobs across projects and subscriptions and runs.

```
GET /jobs
```

####Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|


```
{
    "version": "0.12",
    "jobNumber": 1,
    "runNumber": 5,
    "runId": "56d28c4e42bc2e11001ed507",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "subscriptionOrgName": "shippableapi",
    "projectId": "56cfe9f4c77dae78a8eaa748",
    "projectName": "sample_node",
    "statusCode": 70,
    "startedAt": "2016-02-28T05:57:35.571Z",
    "endedAt": "2016-02-28T05:57:48.307Z",
    "jobLengthInMS": 12736,
    "timeoutMS": 5400000,
    "branchName": "master",
    "isPullRequest": false,
    "pullRequestNumber": null,
    "createdBy": "56cfe9b668147b1300df0c69",
    "commitSha": "4bec06511580963fa011e07bf467732a6d562b29",
    "isPrivateRepository": false,
    "createdAt": "2016-02-28T05:57:34.856Z",
    "allowFailure": false,
    "branchCoveragePercent": 0,
    "sequenceCoveragePercent": 0,
    "testsErrors": 0,
    "testsSkipped": 0,
    "testsPassed": 0,
    "testsFailed": 0,
    "totalTests": 0,
    "env": [
      "FOO=FUBU",
      "FO1=BUBU",
      "BOO=GUBU"
    ],
    "isCompleted": true,
    "id": "56d28c4e0dc2d81300a2b634"
}
```

### Get a job

```
GET /jobs/:id

```

####Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check job id.|

```
Status 200 OK
```

```
{
    "version": "0.12",
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
            "isLegacyImage": false,
            "containerName": "c.exec.sample_node.5.1",
            "sectionName": "build_pre_ci_boot"
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
    "submoduleEnabled": true,
    "jdk": "",
    "gemfile": "",
    "compiler": "",
    "jobNumber": 1,
    "runNumber": 5,
    "runId": "56d28c4e42bc2e11001ed507",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "subscriptionOrgName": "shippableapi",
    "projectId": "56cfe9f4c77dae78a8eaa748",
    "projectName": "sample_node",
    "scmURL": "https://github.com/shippableapi/sample_node.git",
    "statusCode": 70,
    "statusMessage": "job generated",
    "startedAt": "2016-02-28T05:57:35.571Z",
    "endedAt": "2016-02-28T05:57:48.307Z",
    "jobLengthInMS": 12736,
    "timeoutMS": 5400000,
    "branchName": "master",
    "isPullRequest": false,
    "pullRequestNumber": null,
    "pullRequestBaseBranch": null,
    "createdBy": "56cfe9b668147b1300df0c69",
    "commitSha": "4bec06511580963fa011e07bf467732a6d562b29",
    "addons": [],
    "isPrivateRepository": false,
    "node": "56d28ada0dc2d81300a27b0e",
    "updatedAt": "2016-02-28T05:58:19.702Z",
    "createdAt": "2016-02-28T05:57:34.856Z",
    "allowFailure": false,
    "branchCoveragePercent": 0,
    "sequenceCoveragePercent": 0,
    "jobErrorMsgs": [],
    "testsErrors": 0,
    "testsSkipped": 0,
    "testsPassed": 0,
    "testsFailed": 0,
    "totalTests": 0,
    "steps": [
        {
            "id": "58c89b5c-4d9c-40b6-aaae-63873f693b7a",
            "execOrder": 11,
            "scriptType": "collect_stats",
            "who": "mexec",
            "script": "#!/bin/bash -e\n\n######################## META SECTION ################################\n#\n# Prints the command start and end markers with timestamps\n# and executes the supplied command\n#\n\nbn  trap before_exit EXIT\n  get_bash_info\n  ret=$?\n  [ \"$ret\" != 0 ] && return $ret;\n  is_success=true\n}\n\ntrap before_exit EXIT\nexec_grp \"job_node_info\" \"Job node info\"\n"
        },
        {
            "id": "e73ba84f-d088-46c8-9ea4-b29a236c3f3c",
            "execOrder": 30,
            "scriptType": "boot",
            "who": "mexec",
            "script": "#!/bin/bash -e\n\n######################## META SECTION ################################\n#\n# Prints the command start and end markers with timestamps\n# and executes the supplied command\n#\n\nbefore_script_exit() is_success=true\n  echo \"$SECTION script completed\"\n}\n\nif [ \"$PULL\" == true ] && [ \"$SHIPPABLE_CACHE_ENABLED\" == false -o \"$RESET_CACHE\" == true ]; then\n  trap before_exit EXIT\n  exec_grp \"pull_job_image\"\nfi\n\ntrap before_exit EXIT\nexec_grp \"boot_container\"\nexec_grp \"wait_for_exit\" \"wait_for_exit\" \"false\"\n"
        },
        {
            "id": "92f4cae1-3841-4f8e-8798-ae6f2381fc03",
            "execOrder": 50,
            "scriptType": "run",
            "who": "cexec",
            "script": "#!/bin/bash -e\n\n######################## META SECTION ################################\n#\n# Prints the command start and end markers with timestamps\n# and executes the supplied command\n#\n\nCall build_ci\n#\ntrap before_exit EXIT\nexec_grp \"build_ci\"\n"
        },
        {
            "id": "1dae974b-4cb2-4380-a706-c4b59fa0c521",
            "execOrder": 60,
            "scriptType": "reports",
            "who": "cexec",
            "script": "#!/bin/bash -e\n\n######################## META SECTION ################################\n#\n# Prints the command start and end markers with timestamps\n# and executes the supplied command\n#\n\nexec_cmd \"$parse_coverage_cmd\"\n  else\n    exec_cmd \"echo 'No coverage reports exist, skipping coverage report processing'\"\n  fi\n\n  is_success=true\n}\n\n\ntrap before_exit EXIT\nexec_grp \"copy_test_reports\" \"parse test reports\" \"true\"\n\ntrap before_exit EXIT\nexec_grp \"copy_coverage_reports\" \"parse coverage reports\" \"true\"\n"
        }
    ],
    "keyIntegrations": [],
    "deployIntegrations": [],
    "hubIntegrations": [],
    "notificationIntegrations": [
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
            "isValid": true,
            "accountIntegration": null
        }
    ],
    "services": [],
    "bundlerArgs": [],
    "env": [
        "FOO=FUBU",
        "FO1=BUBU",
        "BOO=GUBU"
    ],
    "isCompleted": true,
    "id": "56d28c4e0dc2d81300a2b634"
}
```
---

## Download console logs

```
GET /jobs/:id/consoles/download
```

####Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check job id.|

Response will contain the console log for the job.

---

## Get coverage report

```
GET /jobs/:jobId/jobCoverageReports
```

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check job id.|

```
{
        "jobId": "56d300466492cb120027648c",
        "createdBy": "56cfe9b668147b1300df0c69",
        "updatedAt": "2016-02-28T14:19:41.682Z",
        "createdAt": "2016-02-28T14:19:41.682Z",
        "classes": [
            {
                "lineRate": "1",
                "branchRate": "1",
                "name": "sample_node_mongo",
                "fileName": "Gruntfile.js",
                "id": "56d301fd6492cb1200276aa6"
            },
            {
                "lineRate": "1",
                "branchRate": "1",
                "name": "sample_node_mongo",
                "fileName": "test.js",
                "id": "56d301fd6492cb1200276aa5"
            }
        ],
        "branchCoverage": {
            "coveredBranches": 0,
            "validBranches": 0,
            "branchRate": 1
        },
        "lineCoverage": {
            "lineRate": 1,
            "validLines": 0,
            "coveredLines": 0
        },
        "id": "56d301fd6492cb1200276aa4"
    }

```
---

## Get test result report

```
GET /jobs/:id/jobTestReports
```

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check job id.|

```

{
        "jobId": "56d300466492cb120027648c",
        "total": 3,
        "totalPassing": 3,
        "totalFailures": 0,
        "totalErrors": 0,
        "totalSkipped": 0,
        "updatedAt": "2016-02-28T14:19:41.329Z",
        "createdAt": "2016-02-28T14:19:41.329Z",
        "failureDetails": [],
        "errorDetails": [],
        "id": "56d301fd13067a12006bf2ec"
}

```
---

## Delete a job

```
DELETE /jobs/:id
```
###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check job id.|

This will return the entire Job object that is being deleted. The schema is the same as the one for GET /jobs/:id.

---

## Subscriptions

###Get all subscriptions

```
GET /subscriptions
```

####Query parameters

|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| projectIds| Filter by one or more project ids. Multiple projectIds should be separated by commas.| no | string | |
| QueryParameter| isOrgSubscription| When set to true, returns all organizational subscriptions . When set to false, returns all personal subscriptions.| no | string | |


####Response


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


### Get specific subscription

This route returns in depth information about a single subscription

```
GET/subscriptions/:id
```

`id` is the guid for the subscription.

####Response

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


###Delete a subscription
This route lets you delete your subscription. Please note that all projects, jobs and runs will also be deleted when the subscription is deleted.

```
DELETE /subscriptions/:id
```

---

## Status Code Mapping
Given below is the mapping of a build's statusCode to the build states displayed in the UI.

|statusCode      | Definition | State|   Icon  |
|---------------|--------------------|------------|---------|
|0|waiting | Incomplete | ![add_icon](images/ci_build_icon_waiting.png)|
|20|processing | Incomplete |![add_icon](images/ci_build_icon_processing.png)|
|30|success |Complete |![add_icon](images/ci_build_icon_success.png)|
|50|unstable |Complete |![add_icon](images/ci_build_icon_unstable.png)|
|60|timeout |Complete |![add_icon](images/ci_build_icon_timeout.png)|
|70|canceled |Complete |![add_icon](images/ci_build_icon_cancelled.png)|
|80|failed |Complete |![add_icon](images/ci_build_icon_failed.png)|

Here is more information on [build states](ci_builds/#build-status).

---

## Sign into Shippable

<div class="signup-buttons">
    <!--HubSpot Call-to-Action Code -->
    <span class="hs-cta-wrapper" id="hs-cta-wrapper-ce8390cf-4a53-4136-9201-4f53777638b2">
        <span class="hs-cta-node hs-cta-ce8390cf-4a53-4136-9201-4f53777638b2" id="hs-cta-ce8390cf-4a53-4136-9201-4f53777638b2">
            <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
            <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/ce8390cf-4a53-4136-9201-4f53777638b2"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-ce8390cf-4a53-4136-9201-4f53777638b2" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/ce8390cf-4a53-4136-9201-4f53777638b2.png"  alt="Sign up with GitHub"/></a>
        </span>
        <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
        <script type="text/javascript">
            hbspt.cta.load(362403, 'ce8390cf-4a53-4136-9201-4f53777638b2', {});
        </script>
    </span>
    <!-- end HubSpot Call-to-Action Code -->
    <!--HubSpot Call-to-Action Code -->
    <span class="hs-cta-wrapper" id="hs-cta-wrapper-95e655a7-8e8d-4a8b-84ec-1aab69214c49">
        <span class="hs-cta-node hs-cta-95e655a7-8e8d-4a8b-84ec-1aab69214c49" id="hs-cta-95e655a7-8e8d-4a8b-84ec-1aab69214c49">
            <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
            <a href="http://cta-redirect.hubspot.com/cta/redirect/362403/95e655a7-8e8d-4a8b-84ec-1aab69214c49"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-95e655a7-8e8d-4a8b-84ec-1aab69214c49" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/362403/95e655a7-8e8d-4a8b-84ec-1aab69214c49.png"  alt="Sign up with Bitbucket"/></a>
        </span>
        <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
        <script type="text/javascript">
            hbspt.cta.load(362403, '95e655a7-8e8d-4a8b-84ec-1aab69214c49', {});
        </script>
    </span>
    <!-- end HubSpot Call-to-Action Code -->
</div>

---
