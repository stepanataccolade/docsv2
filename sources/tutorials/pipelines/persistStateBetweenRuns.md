page_title: Using integrations with your runSh job
page_description: Continuous deployment tutorials
page_keywords: containers, lxc, docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, Tokens, account settings

#Persisting state between runs

The `runSh` job type is a custom job that lets you run custom scripts as part of your deployment pipeline. This tutorial is only relevant to jobs of type `runSh` since managed jobs automatically handle the scenario described on this page.

If you have a custom job in your deployment pipeline on Shippable you might have situations where you want to persist something from one run to the next.

You can do this by moving whatever you want to persist to the `/build/state` folder in your custom scripts. The contents of the folder will be available in the `/build/previousState` folder during the subsequent run. 

Let us see how to implement this scenario.

The custom job is defined in `shippable.jobs.yml` as shown below. The job just runs a script `doSomething.sh`:


```
jobs:

  - name: myCustomJob
    type: runSh
    steps:
      - TASK:
        - script: ./IN/mexec-repo/gitRepo/doSomething.sh
```

Let us assume a statefile foo.txt is created during the execution of the script and this needed for the subsequent run. You should save the statefile to the `/build/state` folder. Here is how you can do it:

```
save_statefile() {
  cp <path>/foo.txt /build/state/
}
```

Now, during the subsequent run of the custom job, you can retrieve the statefile, if required, from the `/build/previousState` folder:

```
get_previous_statefile() {
  local previous_statefile_location="/build/previousState/foo.txt"
  if [ -f "$previous_statefile_location" ]; then
    cp -vr previousState/foo.txt <to path>
  else
    echo "no previous statefile exists"
  fi
}
```

