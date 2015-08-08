page_title: Auto Deploy to Elastic Beanstalk from within Shippable
page_description: How to automatically deploy your application to Amazon Elastic Beanstalk after building an image in Shippable
page_keywords: amazon elastic beanstalk, auto-deployment, continuous deployment, CI/CD

# Amazon Elastic Beanstalk

There are two different ways you can deploy your application on Amazon Elastic Beanstalk automatically after doing CI on Shippable.

- **Deploy custom runtime environments via Docker containers:** This gives the developer full flexibility in the configuration of the technology stack.

- **Deploy your codebase on predefined runtime environments:** EBS features pre-defined runtime environments for different languages (Java, PHP, Node.js, Python and Ruby). You can configure Shippable minions to automatically deploy applications targeting these environments. All languages are supported except Go.

Read on for further details on both.

## Deploy via Docker containers

**Pre-requisites**

- AWS Credentials: You will need to obtain Access Keys to integrate your account with Shippable. Please refer to [this documentation](http://docs.aws.amazon.com/general/latest/gr/getting-aws-sec-creds.html) for details on obtaining the keys.

- You have an Elastic Beanstalk Application on a Docker based Environment.

- You have an S3 bucket on AWS to upload artifacts required to deploy the application. This S3 bucket needs to be accessible by the EBS application.

**Next Steps**

Go to your source repository on Github or Bitbucket and add a JSON file called `Dockerrun.aws.json` (case-sensitive)
to the root of the repo.
For the purpose of this document, I will use this [sample project](https://github.com/lekhab/sample-radar-ui-ebs/). This is a public project. Feel free to fork the project and walk through the example with me on your EBS environment.

For Public images, use the example below. Replace the `ContainerPort` with your Container Port number.

```
  {
    "AWSEBDockerrunVersion": "1",
    "Image": {
      "Name": "<IMAGE_NAME>:<TAG>",
      "Update": "true"
    },
    "Ports": [
      {
        "ContainerPort": "3000"
      }
    ]
  }
```

For Private images, there is an additional section in the JSON file as below. The S3 bucket you specify in the JSON must be able to connect to the EBS application.

```
  {
   "AWSEBDockerrunVersion": "1",
   "Image": {
     "Name": "<IMAGE_NAME>:<TAG>",
     "Update": "true"
   },
   "Ports": [
     {
       "ContainerPort": "3000"
     }
   ],
   "Authentication": {
     "Bucket": "shippablesamples",
     "Key": "<DOCKER_CONFIG>"
   }
  }
```


**Create an AWS Account Integration on Shippable**

- Go to your Account Settings on [Shippable](www.shippable.com) and click on the Integrations tab
- Click on the ![add_icon](images/add_icon.gif) on the top left to add a new integration
- Select a name for your integration that's easy to remember. See example below
- Select AWS as the Master Integration
- Enter your AWS credentials in the text boxes provided

    ![aws_acct_integration](images/aws_acct_integration.gif)


**Create a Docker Integration on Shippable**

- Go to your Account Settings and click on the Integrations tab
- Click on the ![add_icon](images/add_icon.gif) on the top left to add a new integration
- Select a name for your integration that's easy to remember. See example below
- Select Docker as the Master Integration
- Enter your Docker credentials in the text boxes provided


**Go to your Project page on Shippable and click on Settings**

- Set Dockerbuild to ON
- DockerBuild Order: You can choose either of these options. Read our [DockerBuild guide](docker_build.md) to learn more. I have selected Pre-CI for my sample
- Push Build: Yes
- Push Image: Select the Docker repository where the Image will be pushed to. Make sure you have turned on Docker Integration in the Integrations section
- Push Image tag: Use the dropdown to select an appropriate tag. By default, build numbers are used as tags
- Source Location: Enter the location in the code where the build needs to run

  ![ebs_proj_int](images/ebs_proj_int1.gif)


**Scroll down to the Deployment Section under Settings**

- Click on the `Add Deployment` button and select `Elastic Beanstalk`
- Add the AWS Integration Name from the dropdown
- Add the S3 Bucket Name, EBS Application Name and EBS Environment as shown in the screenshot below
- Make sure you have added Docker Integration to the project

  ![ebs_proj_int2](images/ebs_proj_int2.gif)


Go back to the **Status** tab and run the project by clicking on the play icon. Your build output will indicate the steps being taken which includes:

  - Doing the CI steps and pushing to the Docker repo
  - Uploading artifacts to S3
  - Deploying a new application version to EBS

  A screenshot of the build output:

  ![build_output](images/ebs_build_output.gif)

You should now be able to go to your EBS Dashboard and see that the latest version was updated and deployed.

> **Note:**
>
> If there is an EBS deployment already in progress, then kicking off another build in parallel
> will result in a failed deployment.

---------

## Use Predefined Runtime Environments

To interact with Elastic Beanstalk, one needs to use command line tools supplied by Amazon, from which the most commonly used is `eb` command. These tools must be available to Shippable in order to perform deployment. The easiest way of doing so is to install them in
`before_install` step:

```yaml
before_install:
  - SUDO=$(which sudo) && $SUDO pip install awsebcli
```

You also need to obtain Access Key to connect `eb` tool with Elastic Beanstalk API. Please refer to [this documentation](http://docs.aws.amazon.com/general/latest/gr/getting-aws-sec-creds.html) for details on obtaining the keys. It is recommended to save your access key as secret in Shippable, as is discussed in secure_env_variables, since this will be used in your Shippable YML.
To use code from this tutorial, store the secret access key variable as `AWSSecretKey`. It is safe to keep your access key id in plain text.

After having the basic setup done, it is time to create an application in Elastic Beanstalk. You can use Web GUI for this task, by going to the main page in the Elastic Beanstalk console, and then choosing 'Create a New Application' button in the sidebar. After entering name for application, proceed to define an environment. When you have the environment ready, create a file in your repository called `config.yml`  with your settings:

```
branch-defaults:
  master:
    environment: sample-nodejs-env
global:
  application_name: sample-nodejs
  default_region: us-west-2
  profile: eb-cli
  sc: git
```

> **Note**
>
> You can also create this file interactively, by running `eb init` command on your workstation and making a copy or checking into the
> repository the file it creates (`.elasticbeanstalk/config.yml`).

In the runtime environment, RDS database connection details are injected by Elastic Beanstalk as environment variables. It is secure and
convenient, as we do not need to store them in any other place. However, during tests on Shippable, we need to supply the same variables with values correct for Shippable minion in `shippable.yml` (please note the `secure` definition for our AWS access key):

```yaml
env:
  global:
    - RDS_HOSTNAME=127.0.0.1 RDS_USERNAME=shippable RDS_PASSWORD="" RDS_DB_NAME=test RDS_PORT=3306
    - AWSAccessKeyId=AKIAJJL2U6T3F3Y5JIGA
    - secure: K7qw2XSFBaW+zEzrs0ODKMQq/Bo9AZqGotCXc50fao+et6WaxEmedlK//MO9JozmPdcxDRq5k8A0pmjTLsMLstkh7PUFLu3Z6xowU2OhMyjQ0pS2J8Hw16SgZ9n2EW+3cps4dIijEzOwjA0Yx5rTOC7F9N8nvr/1l4Yp4i11qgW08cefEKuwiF/ypgrkK5BYJyJreZOEJt3lJ6/aXyXxPPl3X3Z+L+ca9mQmTN6q1wnlEcYLDU5EJtkk87KtOfVyoi/+aOFh49eDpwStSD4zDnygia8eAnCGK/p0XGFJCAwWK1nnFY7aklJrvElD+V/2lbr14TwF0rhmiba6Y6ylnw==
```

You can see above that we included AWS keys, with the secret key being stored as an encrypted variable. Remember to replace both values with the ones downloaded from your AWS Management Console. Below, you can see that we copy these keys to the `.aws/config` file, which is used by `eb` tool to read the credentials. The first line outputted to the file marks it as `eb-cli` profile, which is the default name used by the `eb` tool.

You can use multiple profiles, choosing the correct one in your `config.yml` file (see above).

Then, we need to add some steps to `shippable.yml` to update `eb` configuration and then launch it after successful build.

```yaml
before_script:
  - mkdir -p ~/.aws
  - echo '[profile eb-cli]' > ~/.aws/config
  - echo "aws_access_key_id = $AWSAccessKeyId" >> ~/.aws/config
  - echo "aws_secret_access_key = $AWSSecretKey" >> ~/.aws/config

script:
  - mkdir -p .elasticbeanstalk
  - cp config.yml .elasticbeanstalk/

after_success :
  - eb init && eb deploy
```

Finally, we can connect to the database using environment variables as defined above.

### PHP

```
$con = mysqli_connect(
  $_SERVER['RDS_HOSTNAME'],
  $_SERVER['RDS_USERNAME'],
  $_SERVER['RDS_PASSWORD'],
  $_SERVER['RDS_DB_NAME'],
  $_SERVER['RDS_PORT']
);
```

Elastic Beanstalk serves your repository root as the document root of the webserver, so e.g. `index.php` file will be interpreted when you access the root context of your Elastic Beanstalk application. See full sample PHP code using Elastic Beanstalk available [on GitHub](https://github.com/shippableSamples/sample-php-mysql-beanstalk).

### Ruby

```
con = Mysql2::Client.new(
  :host => ENV['RDS_HOSTNAME'],
  :username => ENV['RDS_USERNAME'],
  :password => ENV['RDS_PASSWORD'],
  :port => ENV['RDS_PORT'],
  :database => ENV['RDS_DB_NAME']
)
```

Elastic Beanstalk runtime expects that the entry point of your application will be found in `config.ru` file. See [Amazon documentation](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_Ruby_sinatra.html) for details. Full sample Ruby code using Sinatra and MySQL on Elastic Beanstalk is available [on GitHub](https://github.com/shippableSamples/sample-ruby-mysql-beanstalk).

### Python

```
self.db = MySQLdb.connect(
  host = os.environ['RDS_HOSTNAME'],
  user = os.environ['RDS_USERNAME'],
  passwd = os.environ['RDS_PASSWORD'],
  port = int(os.environ['RDS_PORT']),
  db = os.environ['RDS_DB_NAME'])
```

Elastic Beanstalk runtime expects that the entry point of your application will be found in `application.py` file. See [Amazon documentation](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_Python_flask.html) for details. Full sample Python code using Flask and MySQL on Elastic Beanstalk is available [on GitHub](https://github.com/shippableSamples/sample-python-mysql-beanstalk).

### Node.js

```
var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME
});
```

Elastic Beanstalk expects that the entry point of your application will be found in app.js or server.js file in the repository root. See [Amazon documentation](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html)
for details. Full sample Node.js code using Express and MySQL on Elastic Beanstalk is available [on GitHub](https://github.com/shippableSamples/sample-nodejs-mysql-beanstalk).

### Java

For JVM, the connection setting are passed as system properties, rather than environment variables:

```
private final String dbName = System.getProperty("RDS_DB_NAME");
private final String userName = System.getProperty("RDS_USERNAME");
private final String password = System.getProperty("RDS_PASSWORD");
private final String hostname = System.getProperty("RDS_HOSTNAME");
private final int port = Integer.parseInt(System.getProperty("RDS_PORT"));
private final String databaseUrl = "jdbc:mysql://" + hostname + ":" + port + "/" + dbName;
```

Because of this difference, dummy connection details for Shippable environment need to be passed as arguments during JVM invocation. Here
is an example for Maven:

```
script:
  - mkdir -p .elasticbeanstalk
  - cp config.yml .elasticbeanstalk/
  - mvn clean cobertura:cobertura
  - mvn test -DRDS_PORT=3306 -DRDS_DB_NAME=test -DRDS_HOSTNAME=localhost -DRDS_PASSWORD= -DRDS_USERNAME=shippable
```

Finally, Elastic Beanstalk [expects exploded WAR](https://forums.aws.amazon.com/thread.jspa?messageID=329550) in the root of the repository, so we need to copy and commit its contents as the final build step, prior to the deployment:

```
after_success:
  - mvn compile war:exploded
  - cp -r target/App/* ./
  - git add -f META-INF WEB-INF
  - git commit -m "Deploy"
  - eb init && eb deploy
```

See the full sample of Java web application featuring MySQL connection [on GitHub](https://github.com/shippableSamples/sample-java-mysql-beanstalk) for details.

### Scala

Scala deployment is very similar to the one described for Java above. First, RDS connection details need to be obtained from system
properties, rather then environment variables. Here is an example for [Slick](http://slick.typesafe.com/):

```
val dbName = System.getProperty("RDS_DB_NAME")
val userName = System.getProperty("RDS_USERNAME")
val password = System.getProperty("RDS_PASSWORD")
val hostname = System.getProperty("RDS_HOSTNAME")
val port = Integer.parseInt(System.getProperty("RDS_PORT"))
val databaseUrl = s"jdbc:mysql://${hostname}:${port}/${dbName}"

def connect = Database.forURL(
  url = databaseUrl, user = userName, password = password, driver = "com.mysql.jdbc.Driver")
```

Because of this difference, dummy connection details for Shippable
environment need to be passed as arguments during JVM invocation. Here
is an example for `sbt` (please note copying the coverage results, as
[sbt-scoverage](https://github.com/scoverage/sbt-scoverage) does not
allow customizing the path via options):

```
script:
  - mkdir -p .elasticbeanstalk
  - cp config.yml .elasticbeanstalk/
  - sbt -DRDS_PORT=3306 -DRDS_DB_NAME=test -DRDS_HOSTNAME=localhost -DRDS_PASSWORD= -DRDS_USERNAME=shippable scoverage:test
  - cp target/scala-2.10/coverage-report/cobertura.xml shippable/codecoverage/coverage.xml
```

Finally, Elastic Beanstalk [expects exploded
WAR](https://forums.aws.amazon.com/thread.jspa?messageID=329550) in the
root of the repository, so we need to copy and commit its contents as
the final build step, prior to the deployment:

```
after_success:
  - sbt package
  - unzip "target/scala-2.10/*.war" -d ./
  - git add -f META-INF WEB-INF
  - git commit -m "Deploy"
  - eb init && eb deploy
```

See the full sample of Scalatra+Slick web application featuring MySQL
connection [on GitHub](https://github.com/Shippable/sample-scala-mysql-beanstalk) for
details.
