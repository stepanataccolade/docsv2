page_title: Build Badges
page_description: How To get build badges for your CI Project
page_keywords: build badge, build dashboard, CI/CD, shippable CI, documentation

# CI Build Badges

## How to get a Build Badge for your project

You can use Build Badges to display the status of your most recent build on your Github or Bitbucket repo page using the API routes below:

- Go to your [Project dashboard](project_dashboard.md) on Shippable and retrieve your Project id as shown below

![build_badge](images/build_badge.gif)

- In the example above, the project id is: `5589afabedd7f2c052339c59`

- You can now use the following routes to display the status of your project by branch:

For master branch:

`https://api.shippable.com/projects/5589afabedd7f2c052339c59/badge/master`

to get this:

![build_badge2](images/build_badge2.gif)

For develop branch:

`https://api.shippable.com/projects/5589afabedd7f2c052339c59/badge/develop`

to get this:

![build_badge2](images/build_badge2.gif)
