page_title: Shippable API for Projects
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# Projects

The Projects endpoint will provide you with information about your projects.

## Get a list of all projects

Will a return a list projects, and some info about the projects

```
GET /projects
```

###Query parameters

|Type      |    Name     |    Description    |     Required    |    Schema    |  Default    |
|----------|-------------|-------------------|----------------|--------------|-------------|
| QueryParameter| projectIds| Filter by one or more project ids.| no | string | |
| QueryParameter| subscriptionIds| Filter by subscription.| no | string | |
| QueryParameter| autoBuild| If set to true, returns all projects enabled on Shippable. If set to false, returns all projects not enabled on Shippable.| no | boolean | |
| QueryParameter| isPrivateRepository| If set to true, returns all private repositories. If set to false, returns all public repositories. | no | boolean | |
| QueryParameter| isFork| If set to true, returns all repositories that are forked from another repo. If set to false, will return repositories that are not forks.| no | boolean | |
| SortParameter| enabledDate| When combined with autoBuild=true, sort=enabledDate will sort all enabled repositories by when they were enabled on Shippable.| no | string | |


###Response
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
---

## Get a specific project

This route returns in-depth information about the specified project.

```
GET /projects/:projectId
```

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|
|500|Internal Server Error. Check job id.|

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
---

##Get latest run for a branch

```
/projects/:projectId/branchRunStatus
```

###Response

|HTTP Code      |    Description     |
|---------------|--------------------|
|200|success|  |
|500|Internal Server Error| Check project id.|

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

---

## Trigger a new run

This route triggers a new build for the default branch of a project.

```
POST /projects/:projectId/newBuild
```

###Response

|HTTP code      |    Status     |    Description    |
|----------|-------------|-------------------|
| 200| OK| New build was successfully triggered|
| 500| Internal Server Error| Check project id|

```
{
  "runId": "56cfe31f388a4f2d00382db1"
}
```

###Trigger a run for a specific branch
You can specify the branch for which you want to trigger a run by specifying a `branchName` in the JSON payload in the request body of the `POST`.

```
{
  "branchName": "xyzFeature"
}
```

Alternatively, branch name can also be specified as a parameter like this:
`POST /projects/:projectId/newBuild?branch=xyzFeature`


###Injecting Global Env Variables
You can also inject global environment variables into the new build by specifying key-value pairs in the JSON payload in the request body of the `POST`. These key-value pairs have to be set in the `globalEnv` property.

```
{
  "globalEnv": {
    "FOO": "bar",
    "FIZZ": "buzz"
  }
}
```
---
