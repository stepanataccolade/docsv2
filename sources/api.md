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

### Schema

The Runs schema contains all information about the Run. Depending on whether the Run was a build, or a deployment, or infrastructure provisioning, different sections of the Schema become relevant.  

The Run schema is as follows:

```
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

```

### Get a run

```
GET /runs/:id
```

**Response**
The GET call returns the entire schema for Run and the relevant fields are filled out for the ```build``` section. 
 
### Delete a run

```
DELETE /runs/:id
``` 
**Response**
Delete returns the entire schema for Run and the relevant fields for the Run being deleted are filled out. 

### Get a list of jobs for a run

```
GET /runs/:id/jobs
```
**Response**
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


### GET /projects

Will a return a list projects, and some info about the projects

Response

```javascript
[
  {
    "mostRecentBuild": {
      "createdDate": "2015-02-22T02:52:00.526Z",
      "buildGroupNumber": 1,
      "id": "54e9444fac096311007dccd7",
      "status": 80,
      "durationCumulative": "29930",
      "commitSha": "39d50403945fb5a1d591b5ee2a549806ad80819a",
      "branch": "master"
    },
    "id": "54e80f5d91426fd6a78f6280",
    "language": "ruby",
    "autoBuild": true,
    "fullName": "user/example1",
    "name": "example1",
    "repositoryProvider": "github",
    "branches": [
      "master"
    ],
    "sourceDefaultBranch": "master"
  },
  {
    "mostRecentBuild": null,
    "branches": [],
    "repositoryProvider": "github",
    "name": "example2",
    "fullName": "user/example2",
    "autoBuild": false,
    "id": "54e3c35391426fd6a78cfd41"
  }
]
```

  Name               |  Type    | Description
  -------------------|----------|---------------------------------------------------------------------------
  mostRecentBuild    |  object  | An object of information about your most recent build, if available
  id                 |  string  | This project's unique id
  language           |  string  | The langauge of the project, as specified by the repo provider
  autoBuild          |  boolean | States if the project will be auto built on pushes to the containing repo
  fullName           |  string  | The full name of the project, such as org/projectname
  name               |  string  | A more succinct version of the fullName
  repositoryProvider |  string  | The source providing the repo, such as Github or BitBucket
  branches           |  list    | A list of branches available to build from the repo

### GET /projects/:projectId

Will return more in-depth information about the specified project.

Response

```javascript
{
  "id": "54af3b7ld46123jfacaef00c",
  "branches": [
    "master",
    "feature1",
    "test"
  ],
  "autoBuild": true,
  "deployKey": {
    "public": "ssh-rsa SECRETE Shippable\n"
  },
  "settings": {
    "imageOptions": {
      "mounts": [],
      "ports": []
    },
    "environmentVariables": []
  },
  "created": "2015-01-09T02:23:49.586Z",
  "isEnabled": true,
  "enabledDate": "2015-02-09T06:40:25.463Z",
  "name": "project",
  "sourcePushed": "2015-03-17T15:22:00.000Z",
  "sourceCreated": "2015-01-06T05:05:22.000Z",
  "sourceUpdated": "2015-03-11T15:33:38.000Z",
  "language": "ruby",
  "updatedDate": "2015-03-18T23:29:19.334Z",
  "subscriptionId": "54af3b77d46935d5fbc1e00d",
  "sourceId": "28847632",
  "repositoryProvider": "github",
  "sourceRepoOwner": {
    "login": "owner",
    "starred_url": "https://api.github.com/users/owner/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/owner/subscriptions",
    "organizations_url": "https://api.github.com/users/owner/orgs",
    "repos_url": "https://api.github.com/users/owner/repos",
    "events_url": "https://api.github.com/users/owner/events{/privacy}",
    "received_events_url": null,
    "type": "User",
    "site_admin": false,
    "gists_url": "https://api.github.com/users/owner/gists{/gist_id}",
    "following_url": "https://api.github.com/users/owner/following{/other_user}",
    "followers_url": "https://api.github.com/users/owner/followers",
    "html_url": "https://github.com/owner",
    "url": "https://api.github.com/users/owner",
    "gravatar_id": "",
    "avatar_url": "https://avatars.githubusercontent.com/u/184391?v=3",
    "id": 184391
  },
  "isFork": false,
  "isPrivateRepository": true,
  "sourceDefaultBranch": "master",
  "repositorySshUrl": "git@github.com:owner/project.git",
  "repositoryUrl": "https://api.github.com/repos/owner/project",
  "sourceDescription": "",
  "fullName": "owner/project"
}
```

  Name                 | Type    | Description
  ---------------------|---------|--------------------------------------------------------------------------
  id                   | string  | This project's unique id
  branches             | list    | A list of branches available to build from the repo
  autoBuild            | boolean | States if the project will be auto built on pushes to the containing repo
  deployKey            | string  | The ssh key used by shippable for deployments
  settings             | object  | Settings info for project, such as images and environment variables
  created              | string  | When the project was created
  isEnabled
  enabledDate          |         | The date the project was enabled on shippable for auto builds
  name                 | string  | A more succinct version of the fullName
  sourcePushed
  sourceCreated
  sourceUpdated
  language             | string  | The langauge of the project, as specified by the repo provider
  updatedDate          | string
  subscriptionId       | string  | The subscription id connected to this account
  sourceId
  repositoryProvider   | string  | The source providing the repo, such as Github or BitBucket
  sourceRepoOwner      | string  | The owner/org that holds this repo
  isFork               | boolean
  isPrivateRepository  | boolean | Specifies if the project is private or public
  sourceDefaultBranch  | string  | Specifies the default branch for the projec
  repositorySshUrl     | string  | The ssh url for the repo
  repositoryUrl        | string  | The web url for the project
  sourceDescription
  fullName             | string  | The full name of the project, such as org/projectname


### GET /projects/:projectId/searchBuilds

Used to get builds for a specified project. There are similar routes for accounts and subscriptions as well.

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



## Subscriptions

### i. Get a subscription

```
GET/subscriptions/:id
```
`id` is the guid for the subscription.

**Response**
```
{
    "id": "564eb6dfd78fc6fc5965369a",
    "provider": "github",
    "avatarUrl": "https://avatars.githubusercontent.com/u/2983749?v=3",
    "orgName": "manishas",
    "isOrgSubscription": false,
    "type": "scm"
}
```

### ii. Get number of active minions in a subscriptions
This route will tell you how many minions in a subscriptions are currently 'active', i.e. processing builds.

```
GET/subscriptions/:id/activeMinions
```

**Response**

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


