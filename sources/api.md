page_title: Shippable API
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# API

## Overview and Purpose

The Shippable API enables you to do most things that you would normally do in the Shippable UI through HTTP requests. Our +API is RESTful, and can be interfaced through curl, third party tools, your own wrapper libraries, or any form of HTTPS communication.

Please note that you must have a paid account with Shippable in order to use the API.

### Endpoint

The main endpoint for interacting with our API is
<https://api.shippable.com>

### Authentication

Using our API requires authenticating with a Shippable API tokens. To generate a token, follow instructions in our [acc_overview.md#api-tokens) section.

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

## Runs

###Get all runs

```
GET /runs
```

####Response

|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| runIds| Filter by one or more runIds.| no | string | |
| QueryParameter| projectIds| Get runs for one or more projects.| no | string | |
| QueryParameter| subscriptionIds| Get runs for one or more subscriptions.| no | string | |
| QueryParameter| branch| Get runs for one or more branch names.| no | string | |
| QueryParameter| isPullRequest| When set to true, returns all runs that were triggered by pull requests. When set to false, returns runs that were triggered by commits.| no | boolean | |
| QueryParameter| maxRunNumber| Returns all runs with run number that is <= maxRunNumber.| no | string | |
| QueryParameter| status| Get runs with one or more statuses.| no | string | |

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


 
### Delete a run

```
DELETE /runs/:id
``` 
####Response
Delete returns the entire schema for Run and the relevant fields for the Run being deleted are filled out. 

### Get a list of jobs for a run

```
GET /runs/:id/jobs
```

####Response

Returns a list of all Job objects associated with the Run.

```
[
    {
        "version": "3.4",
        "infra": {
            "pre_prov": [],
            "pre_prov_boot": [],
            "prov": [],
            "post_prov": [],
            "post_prov_boot": [],
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "build": {
            "pre_ci": [],
            "pre_ci_boot": {
                "image_name": "drydock/u14pyt",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "containerName": "c.exec.sample_python.2.2",
                "sectionName": "build_pre_ci_boot"
            },
            "ci": [
                "pip install -r requirements.txt",
                "mkdir -p shippable/testresults",
                "mkdir -p shippable/codecoverage",
                "which python",
                "coverage run `which nosetests` test.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml",
                "coverage xml -o shippable/codecoverage/coverage.xml"
            ],
            "post_ci": [],
            "post_ci_boot": {
                "image_name": "drydock/u14pyt",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": [],
            "cache": false
        },
        "deploy": {
            "pre_ci": [],
            "pre_start_boot": [],
            "start": [],
            "post_start": [],
            "post_start_boot": [],
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "submoduleEnabled": true,
        "jdk": "",
        "gemfile": "",
        "jobNumber": 1,
        "runNumber": 2,
        "runId": "56b3822965bdc412008bde26",
        "subscriptionId": "564eb6dfd78fc6fc5965369a",
        "subscriptionOrgName": "manishas",
        "projectId": "564eb6e2d78fc6fc5965371d",
        "projectName": "sample_python",
        "scmURL": "https://github.com/manishas/sample_python.git",
        "statusCode": 30,
        "statusMessage": "SUCCESS",
        "startedAt": "2016-02-04T16:55:39.532Z",
        "endedAt": "2016-02-04T17:01:08.109Z",
        "jobLengthInMS": 328577,
        "branchName": "master",
        "isPullRequest": false,
        "pullRequestNumber": null,
        "pullRequestBaseBranch": null,
        "createdBy": "564eb6d4589a531100ff7c81",
        "commitSha": "18458f0473dbaf25589570313f447ad9590d477c",
        "addons": [],
        "node": "56b3822a65bdc412008bde29",
        "updatedAt": "2016-02-04T17:01:08.109Z",
        "createdAt": "2016-02-04T16:54:01.664Z",
        "allowFailure": false,
        "branchCoveragePercent": 0,
        "sequenceCoveragePercent": 0,
        "jobErrorMsgs": [],
        "testsSkipped": 0,
        "testsPassed": 0,
        "testsFailed": 0,
        "totalTests": 0,
        "steps": [
            {
                "id": "39d7ef8e-b336-46e5-9777-03b044136557",
                "who": "mexec",
                "script": " ",
                "scriptType": "setup_integrations",
                "execOrder": 10,
                "status": 30
            },
            {
                "id": "68140bbc-9f8c-4393-b9e9-351c0cced8e3",
                "who": "mexec",
                "script": "  ",
                "scriptType": "boot",
                "execOrder": 30,
                "status": 30
            },
            {
                "id": "4abd4aca-9adc-41a1-91bc-a4e7defb6bc0",
                "who": "cexec",
                "script": " ",
                "scriptType": "setup_integrations",
                "status": 30,
                "execOrder": 40
            },
            {
                "id": "be8a15b5-7021-45b0-ad02-0e04ebcadcc4",
                "who": "cexec",
                "script": " ",
                "scriptType": "run",
                "status": 30,
                "execOrder": 50
            }
        ],
        "keyIntegrations": [],
        "deployIntegrations": [],
        "hubIntegrations": [],
        "notificationIntegrations": [
            {
                "recipients": [
                    "manisha@shippable.com"
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
        "env": [],
        "isCompleted": true,
        "id": "56b3822965bdc412008bde27"
    },
    {
        "version": "2.7",
        "infra": {
            "pre_prov": [],
            "pre_prov_boot": [],
            "prov": [],
            "post_prov": [],
            "post_prov_boot": [],
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "build": {
            "pre_ci": [],
            "pre_ci_boot": {
                "image_name": "drydock/u14pyt",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true,
                "containerName": "c.exec.sample_python.2.2",
                "sectionName": "build_pre_ci_boot"
            },
            "ci": [
                "pip install -r requirements.txt",
                "mkdir -p shippable/testresults",
                "mkdir -p shippable/codecoverage",
                "which python",
                "coverage run `which nosetests` test.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml",
                "coverage xml -o shippable/codecoverage/coverage.xml"
            ],
            "post_ci": [],
            "post_ci_boot": {
                "image_name": "drydock/u14pyt",
                "image_tag": "prod",
                "pull": true,
                "options": "--privileged=true --net=bridge",
                "envs": "",
                "isOfficialImage": true
            },
            "smoke_test": [],
            "on_success": [],
            "on_failure": [],
            "cache": false
        },
        "deploy": {
            "pre_ci": [],
            "pre_start_boot": [],
            "start": [],
            "post_start": [],
            "post_start_boot": [],
            "smoke_test": [],
            "on_success": [],
            "on_failure": []
        },
        "submoduleEnabled": true,
        "jdk": "",
        "gemfile": "",
        "jobNumber": 2,
        "runNumber": 2,
        "runId": "56b3822965bdc412008bde26",
        "subscriptionId": "564eb6dfd78fc6fc5965369a",
        "subscriptionOrgName": "manishas",
        "projectId": "564eb6e2d78fc6fc5965371d",
        "projectName": "sample_python",
        "scmURL": "https://github.com/manishas/sample_python.git",
        "statusCode": 30,
        "statusMessage": "SUCCESS",
        "startedAt": "2016-02-04T16:55:42.362Z",
        "endedAt": "2016-02-04T17:00:41.410Z",
        "jobLengthInMS": 299048,
        "branchName": "master",
        "isPullRequest": false,
        "pullRequestNumber": null,
        "pullRequestBaseBranch": null,
        "createdBy": "564eb6d4589a531100ff7c81",
        "commitSha": "18458f0473dbaf25589570313f447ad9590d477c",
        "addons": [],
        "node": "56b3822a3fa7241300e54bbb",
        "updatedAt": "2016-02-04T17:00:41.410Z",
        "createdAt": "2016-02-04T16:54:01.665Z",
        "allowFailure": false,
        "branchCoveragePercent": 0,
        "sequenceCoveragePercent": 0,
        "jobErrorMsgs": [],
        "testsSkipped": 0,
        "testsPassed": 0,
        "testsFailed": 0,
        "totalTests": 0,
        "steps": [
            {
                "id": "8433fa44-6cd0-4256-a0d2-9e2c69879d47",
                "who": "mexec",
                "script": "script to set up integration",
                "scriptType": "setup_integrations",
                "execOrder": 10,
                "status": 30
            },
            {
                "id": "e50e1c19-4521-4b9c-9895-85fb32b323b3",
                "who": "mexec",
                "script": "boot script",
                "scriptType": "boot",
                "execOrder": 30,
                "status": 30
            },
            {
                "id": "eaec8178-44d2-428a-a630-eadae6b96567",
                "who": "cexec",
                "script": "script to set up integration",
                "scriptType": "setup_integrations",
                "status": 30,
                "execOrder": 40
            },
            {
                "id": "723d0a4f-cc17-4ef7-8e86-7905417c111c",
                "who": "cexec",
                "script": "#script for run",
                "scriptType": "run",
                "status": 30,
                "execOrder": 50
            }
        ],
        "keyIntegrations": [],
        "deployIntegrations": [],
        "hubIntegrations": [],
        "notificationIntegrations": [
            {
                "recipients": [
                    "manisha@shippable.com"
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
        "env": [],
        "isCompleted": true,
        "id": "56b3822965bdc412008bde28"
    }
]
```
 
## Jobs
Jobs are individual builds in a Run. For example, a matrix build will have multiple Jobs that are a part of the Build Run, one for each value in the matrix. For more on matrix builds, [check out our documentation on build config](ci_configure.md#matrix_builds)

To get a job ID, you will first need to get all Jobs for a Run by calling GET/runs/:id/jobs and then look for the `id` of each job returned.

###Schema

```
{
    "version": "3.4",
    "infra": {
        "pre_prov": [],
        "pre_prov_boot": [],
        "prov": [],
        "post_prov": [],
        "post_prov_boot": [],
        "smoke_test": [],
        "on_success": [],
        "on_failure": []
    },
    "build": {
        "pre_ci": [],
        "pre_ci_boot": {
            "image_name": "drydock/u14pyt",
            "image_tag": "prod",
            "pull": true,
            "options": "--privileged=true --net=bridge",
            "envs": "",
            "isOfficialImage": true,
            "containerName": "c.exec.sample_python.1.2",
            "sectionName": "build_pre_ci_boot"
        },
        "ci": [
            "pip install -r requirements.txt",
            "mkdir -p shippable/testresults",
            "mkdir -p shippable/codecoverage",
            "which python",
            "coverage run `which nosetests` test.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml",
            "coverage xml -o shippable/codecoverage/coverage.xml"
        ],
        "post_ci": [],
        "post_ci_boot": {
            "image_name": "drydock/u14pyt",
            "image_tag": "prod",
            "pull": true,
            "options": "--privileged=true --net=bridge",
            "envs": "",
            "isOfficialImage": true
        },
        "smoke_test": [],
        "on_success": [],
        "on_failure": [],
        "cache": false
    },
    "deploy": {
        "pre_ci": [],
        "pre_start_boot": [],
        "start": [],
        "post_start": [],
        "post_start_boot": [],
        "smoke_test": [],
        "on_success": [],
        "on_failure": []
    },
    "submoduleEnabled": true,
    "jdk": "",
    "gemfile": "",
    "jobNumber": 1,
    "runNumber": 1,
    "runId": "56b42baff5aaa11100bcd12e",
    "subscriptionId": "56b42bc6d78fc6fc598f9539",
    "subscriptionOrgName": "theamerlyn",
    "projectId": "56b42bc7d78fc6fc598f953b",
    "projectName": "sample_python",
    "scmURL": "https://github.com/theamerlyn/sample_python.git",
    "statusCode": 30,
    "statusMessage": "SUCCESS",
    "startedAt": "2016-02-05T04:59:04.307Z",
    "endedAt": "2016-02-05T05:04:01.114Z",
    "jobLengthInMS": 296807,
    "branchName": "master",
    "isPullRequest": false,
    "pullRequestNumber": null,
    "pullRequestBaseBranch": null,
    "createdBy": "56b42b965d77641100004d14",
    "commitSha": "18458f0473dbaf25589570313f447ad9590d477c",
    "addons": [],
    "node": "56b42baf5d77641100004d1c",
    "updatedAt": "2016-02-05T05:04:01.114Z",
    "createdAt": "2016-02-05T04:57:19.277Z",
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
            "id": "2e8895e6-cf9e-45cb-8bc6-f024db4fc34d",
            "who": "mexec",
            "script": "setup_integrations script",
            "scriptType": "setup_integrations",
            "execOrder": 10,
            "status": 30
        },
        {
            "id": "ee3d9988-f0e7-4dff-aeaf-00c463c45eff",
            "who": "mexec",
            "script": "#boot script",
            "scriptType": "boot",
            "execOrder": 30,
            "status": 30
        },
        {
            "id": "df67d8bc-fd8d-474d-92e6-9b0ab09561f4",
            "who": "cexec",
            "script": "setup_integrations script",
            "scriptType": "setup_integrations",
            "status": 30,
            "execOrder": 40
        },
        {
            "id": "15e3a16c-1071-47da-bf76-e4a8f8663aaa",
            "who": "cexec",
            "script": "run script",
            "scriptType": "run",
            "status": 30,
            "execOrder": 50
        }
    ],
    "keyIntegrations": [],
    "deployIntegrations": [],
    "hubIntegrations": [],
    "notificationIntegrations": [
        {
            "recipients": [
                "manisha@shippable.com"
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
    "env": [],
    "isCompleted": true,
    "id": "56b42baff5aaa11100bcd12f"
}
```

### Get a job

```
GET /jobs/:id

```

**Response**

```Status 200 OK```

Returns the Job schema for the id specified.

### Download console logs for a job

```
GET /jobs/:id/consoles/download
```

**Response**

```Status: 200 OK```

Response will contain the console log for the job.

### Delete a job

```
DELETE /jobs/:id
```
**Response**
This will return the entire Job object that is being deleted. The schema is the same as the one for GET /jobs/:id.

## Projects

The Projects endpoint will provide you with information about your projects.


###Schema


### Get a list of all projects

Will a return a list projects, and some info about the projects

```
GET /projects
```

####Parameters

|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| projectIds| Filter by one or more project ids.| no | string | |
| QueryParameter| subscriptionIds| Filter by subscription.| no | string | |
| QueryParameter| autoBuild| If set to true, returns all projects enabled on Shippable. If set to false, returns all projects not enabled on Shippable.| no | boolean | |
| QueryParameter| isPrivateRepository| If set to true, returns all private repositories. If set to false, returns all public repositories. | no | boolean | |
| QueryParameter| isFork| If set to true, returns all repositories that are forked from another repo. If set to false, will return repositories that are not forks.| no | boolean | |
| SortParameter| enabledDate| When combined with autoBuild=true, sort=enabledDate will sort all enabled repositories by when they were enabled on Shippable.| no | string | |


####Response
|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|

```
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
    "sourcePushed": "2016-02-26T00:08:34.000Z",
    "repositoryHtmlUrl": "https://github.com/shippableapi/sample_node",
    "isFork": true,
    "isPrivateRepository": false,
    "sourceDescription": "",
    "language": "JavaScript",
    "repositoryUrl": "https://api.github.com/repos/shippableapi/sample_node",
    "fullName": "shippableapi/sample_node",
    "name": "sample_node",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "isPaused": false,
    "created": "2016-02-26T05:59:20.980Z",
    "autoBuild": false,
    "isOrg": false,
    "branches": [],
    "id": "56cfe9f4c77dae78a8eaa748"
  }
```



### Get a specific project

This route returns in-depth information about the specified project.

```
GET /projects/:projectId
```

####Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|

```
{
    "repositoryProvider": "github",
    "sourceId": "52582289",
    "providerId": "561f7fe7a120200d00ac0725",
    "updatedDate": "2016-02-26T05:59:20.977Z",
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
    "sourceUpdated": "2016-02-26T05:58:58.000Z",
    "sourceCreated": "2016-02-26T05:58:57.000Z",
    "sourcePushed": "2016-02-26T00:08:34.000Z",
    "repositorySshUrl": "git@github.com:shippableapi/sample_node.git",
    "repositoryHtmlUrl": "https://github.com/shippableapi/sample_node",
    "isFork": true,
    "isPrivateRepository": false,
    "sourceDescription": "",
    "language": "JavaScript",
    "repositoryUrl": "https://api.github.com/repos/shippableapi/sample_node",
    "fullName": "shippableapi/sample_node",
    "name": "sample_node",
    "subscriptionId": "56cfe9f3c77dae78a8eaa746",
    "providerLastSyncStartDate": "2016-02-26T06:04:21.458Z",
    "sourceDefaultBranch": "master",
    "isPaused": false,
    "cacheTag": 0,
    "projectAuthorizationLastSyncEndDate": "1970-01-01T00:00:00.000Z",
    "providerLastSyncEndDate": "2016-02-26T06:04:23.337Z",
    "created": "2016-02-26T05:59:20.980Z",
    "settings": {
        "environmentVariables": [],
        "imageOptions": {
            "ports": [],
            "mounts": []
        }
    },
    "autoBuild": false,
    "sourceSize": 30,
    "sourceWatchersCount": 0,
    "sourceStargazersCount": 0,
    "sourceForksCount": 0,
    "isOrg": false,
    "branches": [
        "dockerpush",
        "master",
        "test",
        "testdockerbuildrepo"
    ],
    "id": "56cfe9f4c77dae78a8eaa748"
}
```

###Get latest run for a branch of an enabled project

```
/projects/:projectId/branchRunStatus
```

####Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|  |
|500|Internal Server Error| This indicates that the projectID was invalid. Message: "getProjects for query: projectIds=2345"  |

```
    {
        "id": "56cfe31f388a4f2d00382db1",
        "runNumber": 26,
        "projectId": "56a9b50ad78fc6fc596b61e5",
        "projectName": "micro-sample",
        "subscriptionOrgName": "manishas",
        "subscriptionId": "564eb6dfd78fc6fc5965369a",
        "isPrivate": false,
        "lastCommitShortDescription": "Update shippable.yml",
        "commitSha": "f8d84e86e40b4ae8dc8a6ff83d6cc3f6772838bb",
        "triggeredBy": {
            "avatarUrl": "https://avatars.githubusercontent.com/u/2983749?v=3",
            "email": "",
            "displayName": "Manisha",
            "login": "manishas"
        },
        "statusCode": 30,
        "startedAt": "2016-02-26T05:31:12.886Z",
        "createdAt": "2016-02-26T05:31:11.085Z",
        "endedAt": "2016-02-26T05:32:11.442Z",
        "branchName": "master",
        "isPullRequest": false,
        "pullRequestNumber": null,
        "projectHtmlUrl": "https://github.com/manishas/micro-sample",
        "providerName": "GITHUB",
        "commitUrl": "https://github.com/manishas/micro-sample/commit/f8d84e86e40b4ae8dc8a6ff83d6cc3f6772838bb",
        "committer": {
            "avatarUrl": "https://avatars.githubusercontent.com/u/2983749?v=3",
            "email": "manisha@shippable.com",
            "displayName": "Manisha",
            "login": "manishas"
        },
        "runLengthInMS": 58556,
        "isRun": true
    }
```

### Trigger a new run

This route triggers a new build for the default branch of a project.

```
POST /projects/:projectId/newBuild
``

####Parameters

|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| projectIds| Filter by one or more project ids.| no | string | |


####Response

|HTTP code      |    Status     |    Description    |  
|----------|-------------|-------------------|
| 200| OK| New build was successfully triggered| 
| 500| Internal Server Error| This happens when the project ID is invalid. Error message: "Internal API error: getProjectById"| 

111
{
  "runId": "56cfe31f388a4f2d00382db1"
}
```

## Subscriptions

###Get all subscriptions

```
GET /subscriptions
```

####Optional parameters

|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| projectIds| Filter by one or more project ids.| no | string | |
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


### Get a specific subscription

This route returns in depth information about a single subscription

```
GET/subscriptions/:id
```
`id` is the guid for the subscription.

####Response

|HTTP code      |    Status     |    Description    |      
|----------|-------------|-------------------|
| 200| OK| Query was successful and subscription details will be returned.|
| 500| Internal Server Error| Query was successful and subscription details will be returned.|


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
### Get number of active minions in a subscriptions
This route will tell you how many minions in a subscriptions are currently 'active', i.e. processing builds.

```
GET/subscriptions/:id/activeMinions
```

####Response

```
{
    "count": 0
}
```

### Get a list of projects in a subscription

```
GET /subscriptions/:subscriptionId/projects
```
TODO: Add response


### GET /subscriptions/:subscriptionId/searchBuilds

Used to get builds for a given subscription.

Query options available for the route are listed below:

**sortBy**

Field (or comma separated list of fields) to sort builds by (default: 'createdDate')

```Example: ?sortBy=buildGroupNumber```

**sortOrder**

Order (or comma separated list of orders) to sort. Assigned to sortBy fields in order as they appeared in sortBy. Possible values: asc, desc, ascending, descending, 1, and -1 (default: -1)

```Example: ?sortBy=buildGroupNumber,createdDate&sortOrder=asc,-1```
```sorts by buildGroupNumber ascending, then createdDate descending```

**status**

Status (or comma separated list of statuses) of what you want to filter by. Do not include this field to search all statuses. Possible values:
0, waiting (waiting)
10, queued (queued)
20, processing (processing)
30, success (success)
40, skipped (skipped)
50, unstable (unstable)
60, timeout (timeout)
70, canceled (canceled)
80, failed (failed)
idle (equivalent to 0, 10)
incomplete (equivalent to 0, 10, 20)
started (equivalent to 10, 20)
complete (equivalent to 30, 40, 50, 60, 70, 80)
successful (equivalent to 30, 40)
unsuccessful (equivalent to 50, 60, 70, 80)

```Example: ?status=20,successful```

**branch**

Name (or comma separated list of names) of branches you want to filter. Do not include this field to search all branches.
```Example: ?branch=master,beta```

**isPR**

Boolean value for if you want to search for pull request (PR) builds. True means you will only get PR builds, false means you will get only commit builds. Do not include this field to search both PR and commit builds.

```Example: ?isPR=true```

**limit**

Maximum number of results to return. Do not include this field to search all builds you have access to.

```Example: ?limit=100```

**skip**

How many entries to skip before returning the query, usually used with limit for paging.

```Example: ?limit=50&skip=350 this will skip the first 350 builds and return the next 50 after that```

**projectId**

Define a project (or comma separated list of projectIds) to search through. Do not include this field to search for all projects.

```Example: ?projectId=12345 ?projectId=1111,2222,3333```

## Accounts

[![Run in Postman](https://run.pstmn.io/button.png)](https://www.getpostman.com/run-collection/4452529ae0631668c776)

### GET your account id

Returns a list of your account ids.

```
GET /accounts
```

Response

```javascript
[
  "56b42b965d77641100004d14"
]
```

### GET account information

```
GET /accounts/:accountId
```

**Response**

```
{
    "lastUsedIdentityId": "56b42b965d77641100004d15",
    "lastSyncStartDate": "2016-02-05T04:56:54.323Z",
    "defaultEmail": "atheamerlyn@gmail.com",
    "hubspotId": "3142445",
    "braintreeCustomerId": "56b42b965d77641100004d14",
    "identities": [
        {
            "userName": "theamerlyn",
            "displayName": null,
            "avatarUrl": "https://avatars.githubusercontent.com/u/17077788?v=3",
            "avatarId": "",
            "provider": "github",
            "providerId": "561f7fe7a120200d00ac0725",
            "providerAccountId": "17077788",
            "providerType": "User",
            "providerBlog": null,
            "providerCompany": null,
            "providerLocation": null,
            "providerFollowerCount": 0,
            "providerPublicRepoCount": 1,
            "providerPublicGistCount": 0,
            "emails": [
                {
                    "email": "atheamerlyn@gmail.com",
                    "verified": true,
                    "primary": true,
                    "id": "56b42b9c5d77641100004d1a"
                }
            ],
            "enforceScopes": [],
            "scopes": [
                "admin:repo_hook",
                "read:org",
                "repo:status",
                "repo_deployment",
                "user:email"
            ],
            "id": "56b42b965d77641100004d15"
        }
    ],
    "systemRoles": [
        "user"
    ],
    "welcomeEmailSent": false,
    "lastAggregatedAt": "1970-01-01T00:00:00.000Z",
    "lastSyncEndDate": "2016-02-05T04:56:56.262Z",
    "created": "2016-02-05T04:56:54.255Z",
    "id": "56b42b965d77641100004d14"
}
```

  Name                | Type    | Description
  --------------------| --------| -------------------------------------
  id                  | string  | Account ID
  lastUsedIdentityId  | string  | id of last used identity.
  identities          | list    | A list of this accounts identitiesj
  created             | string  | When the account was created

### Get a list of enabled projects

```
GET/accounts/:id/enabledProjects
```

**Response**

A list of projects that are enabled across subscriptions are returned. In this example response, only `https://github.com/theamerlyn/sample_node` was enabled for a subscription, so it contains just one project.

```Status: 200 OK```

```
[
    {
        "repositoryProvider": "github",
        "sourceId": "51126832",
        "providerId": "561f7fe7a120200d00ac0725",
        "updatedDate": "2016-02-05T04:56:56.240Z",
        "sourceRepoOwner": {
            "login": "theamerlyn",
            "id": 17077788,
            "avatar_url": "https://avatars.githubusercontent.com/u/17077788?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/theamerlyn",
            "html_url": "https://github.com/theamerlyn",
            "followers_url": "https://api.github.com/users/theamerlyn/followers",
            "following_url": "https://api.github.com/users/theamerlyn/following{/other_user}",
            "gists_url": "https://api.github.com/users/theamerlyn/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/theamerlyn/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/theamerlyn/subscriptions",
            "organizations_url": "https://api.github.com/users/theamerlyn/orgs",
            "repos_url": "https://api.github.com/users/theamerlyn/repos",
            "events_url": "https://api.github.com/users/theamerlyn/events{/privacy}",
            "received_events_url": null,
            "type": "User",
            "site_admin": false
        },
        "sourceUpdated": "2016-02-05T04:55:26.000Z",
        "sourceCreated": "2016-02-05T04:55:25.000Z",
        "sourcePushed": "2016-02-04T16:53:58.000Z",
        "repositorySshUrl": "git@github.com:theamerlyn/sample_python.git",
        "repositoryHtmlUrl": "https://github.com/theamerlyn/sample_python",
        "isFork": true,
        "isPrivateRepository": false,
        "sourceDescription": "",
        "language": "Python",
        "repositoryUrl": "https://api.github.com/repos/theamerlyn/sample_python",
        "fullName": "theamerlyn/sample_python",
        "name": "sample_python",
        "subscriptionId": "56b42bc6d78fc6fc598f9539",
        "enabledDate": "2016-02-05T04:57:11.908Z",
        "providerLastSyncStartDate": "2016-02-06T23:35:29.659Z",
        "sourceDefaultBranch": "master",
        "cacheTag": 0,
        "enabledByAccount": {
            "id": "56b42b965d77641100004d14",
            "identityUsedToEnable": {
                "id": "56b42b965d77641100004d15",
                "provider": "github",
                "userName": "theamerlyn"
            }
        },
        "projectAuthorizationLastSyncEndDate": "1970-01-01T00:00:00.000Z",
        "providerLastSyncEndDate": "2016-02-06T23:35:31.113Z",
        "created": "2016-02-05T04:56:56.243Z",
        "settings": {
            "environmentVariables": [],
            "imageOptions": {
                "ports": [],
                "mounts": []
            }
        },
        "deployKey": {
            "public": "ssh-rsa AAAA"
        },
        "autoBuild": true,
        "sourceSize": 5,
        "sourceWatchersCount": 0,
        "sourceStargazersCount": 0,
        "sourceForksCount": 0,
        "isOrg": false,
        "branches": [
            "master"
        ],
        "id": "56b42bc7d78fc6fc598f953b"
    }
]
```

### GET builds for an account

```
GET /accounts/:accountId/searchBuilds
```

This API returns Runs for an account across all subscriptions.

**Response**

The response contains a list of build objects as shown below.

```Status: 200 OK``` 

```
[
    {
        "runNumber": 1,
        "branchName": "master",
        "lastCommitShortDescription": "Update shippable.yml",
        "commitSha": "18458f0473dbaf25589570313f447ad9590d477c",
        "statusCode": 30,
        "statusMessage": "SUCCESS",
        "startedAt": "2016-02-05T04:59:04.307Z",
        "endedAt": "2016-02-05T05:04:36.179Z",
        "runLengthInMS": 326755,
        "timeoutMS": 5400000,
        "providerId": "561f7fe7a120200d00ac0725",
        "providerName": "GITHUB",
        "providerUrl": "https://api.github.com",
        "providerDomain": "github.com",
        "projectId": "56b42bc7d78fc6fc598f953b",
        "projectName": "sample_python",
        "projectURL": "https://api.github.com/repos/theamerlyn/sample_python",
        "scmURL": "https://github.com/theamerlyn/sample_python.git",
        "subscriptionId": "56b42bc6d78fc6fc598f9539",
        "subscriptionOrgName": "theamerlyn",
        "beforeCommitSha": "96c647549b9ec8523c5437177ee8bafc8bd73bcc",
        "commitRange": "96c647549b9ec8523c5437177ee8bafc8bd73bcc...18458f0473dbaf25589570313f447ad9590d477c",
        "commitMessage": "Update shippable.yml",
        "commitUrl": "https://github.com/theamerlyn/sample_python/commit/18458f0473dbaf25589570313f447ad9590d477c",
        "compareUrl": "https://github.com/theamerlyn/sample_python/compare/96c647549b9ec8523c5437177ee8bafc8bd73bcc...18458f0473dbaf25589570313f447ad9590d477c",
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
            "language": "python",
            "services": [],
            "integrations": {
                "hub": [],
                "deploy": [],
                "key": [],
                "notifications": [
                    {
                        "recipients": [
                            "manisha@shippable.com"
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
            "env": [],
            "jdk": [],
            "gemfile": [],
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
                "pre_prov_boot": [],
                "prov": [],
                "post_prov": [],
                "post_prov_boot": [],
                "smoke_test": [],
                "on_success": [],
                "on_failure": []
            },
            "build": {
                "pre_ci": [],
                "pre_ci_boot": {
                    "image_name": "drydock/u14pyt",
                    "image_tag": "prod",
                    "pull": true,
                    "options": "--privileged=true --net=bridge",
                    "envs": "",
                    "isOfficialImage": true
                },
                "ci": [
                    "pip install -r requirements.txt",
                    "mkdir -p shippable/testresults",
                    "mkdir -p shippable/codecoverage",
                    "which python",
                    "coverage run `which nosetests` test.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml",
                    "coverage xml -o shippable/codecoverage/coverage.xml"
                ],
                "post_ci": [],
                "post_ci_boot": {
                    "image_name": "drydock/u14pyt",
                    "image_tag": "prod",
                    "pull": true,
                    "options": "--privileged=true --net=bridge",
                    "envs": "",
                    "isOfficialImage": true
                },
                "smoke_test": [],
                "on_success": [],
                "on_failure": [],
                "cache": false
            },
            "deploy": {
                "pre_ci": [],
                "pre_start_boot": [],
                "start": [],
                "post_start": [],
                "post_start_boot": [],
                "smoke_test": [],
                "on_success": [],
                "on_failure": []
            },
            "versions": [
                "3.4",
                "2.7"
            ]
        },
        "postCallerId": "56b42b965d77641100004d14",
        "createdBy": "56b42b965d77641100004d14",
        "updatedAt": "2016-02-05T05:04:36.179Z",
        "createdAt": "2016-02-05T04:57:19.207Z",
        "warnMsgs": [],
        "errorMsgs": [],
        "branchCoveragePercent": 0,
        "sequenceCoveragePercent": 0,
        "testsSkipped": 0,
        "testsPassed": 0,
        "testsFailed": 0,
        "totalTests": 0,
        "triggeredBy": {
            "login": "theamerlyn",
            "displayName": null,
            "email": "",
            "avatarUrl": "https://avatars.githubusercontent.com/u/17077788?v=3"
        },
        "lastAuthor": {
            "login": "manishas",
            "displayName": "Manisha",
            "email": "manisha@shippable.com",
            "avatarUrl": "https://avatars.githubusercontent.com/u/2983749?v=3"
        },
        "committer": {
            "login": "manishas",
            "displayName": "Manisha",
            "email": "manisha@shippable.com",
            "avatarUrl": "https://avatars.githubusercontent.com/u/2983749?v=3"
        },
        "isReRun": false,
        "isComplete": true,
        "isReady": false,
        "id": "56b42baff5aaa11100bcd12e"
    }
]
```

#### Sort and filter options


**sortBy**

Field (or comma separated list of fields) to sort builds by (default: 'createdDate')

```Example: ?sortBy=buildGroupNumber```

**sortOrder**

Order (or comma separated list of orders) to sort. Assigned to sortBy fields in order as they appeared in sortBy. Possible values: asc, desc, ascending, descending, 1, and -1 (default: -1)

```Example: ?sortBy=buildGroupNumber,createdDate&sortOrder=asc,-1```
```sorts by buildGroupNumber ascending, then createdDate descending```

**status**

Status (or comma separated list of statuses) of what you want to filter by. Do not include this field to search all statuses. Possible values:
0, waiting (waiting)
10, queued (queued)
20, processing (processing)
30, success (success)
40, skipped (skipped)
50, unstable (unstable)
60, timeout (timeout)
70, canceled (canceled)
80, failed (failed)
idle (equivalent to 0, 10)
incomplete (equivalent to 0, 10, 20)
started (equivalent to 10, 20)
complete (equivalent to 30, 40, 50, 60, 70, 80)
successful (equivalent to 30, 40)
unsuccessful (equivalent to 50, 60, 70, 80)

```Example: ?status=20,successful```

**branch**

Name (or comma separated list of names) of branches you want to filter. Do not include this field to search all branches.

```Example: ?branch=master,beta```

**isPR**

Boolean value for if you want to search for pull request (PR) builds. True means you will only get PR builds, false means you will get only commit builds. Do not include this field to search both PR and commit builds.

```Example: ?isPR=true```

**limit**

Maximum number of results to return. Do not include this field to search all builds you have access to.

```Example: ?limit=100```

**skip**

How many entries to skip before returning the query, usually used with limit for paging.

```Example: ?limit=50&skip=350 this will skip the first 350 builds and return the next 50 after that```

**projectId**

Define a project (or comma separated list of projectIds) to search through. Do not include this field to search for all projects.

```Example: ?projectId=12345 ?projectId=1111,2222,3333```

**subscriptionId**

Define a subscription (or comma separated list of subscriptionIds) to search through. Do not include this field to search for all subscriptions.

```Example: ?subscriptionId=6789 ?subscriptionId=7777,8888&projectId=1111,2222,3333,4444```

### Delete an account

```
DELETE /accounts/:accountId
```

Deletes the specified account

**Response**
```Status 200 OK```

The accounts schema described in GET /accounts/:id is returned.


