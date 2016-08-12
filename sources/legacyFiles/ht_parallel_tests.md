page_title: Parallelizing Tests
page_description: How to run parallel tests across your builds
page_keywords: parallel, testing, CI/CD

# Parallelizing Tests across Your Builds
This guide explains how you can run builds in parallel on Shippable and run your tests faster than ever! This can be done by partitioning your tests into groups, and having each one of your minions run one of the groups. This example will be in the context of a rails app with rspec, but the same concept can be applied to whatever stack.

The first step is to add this to your app's shippable.yml file:

```bash
env:
  matrix:
    - TEST_GROUP=1of3
    - TEST_GROUP=2of3
    - TEST_GROUP=3of3
```

Here, we are setting up 3 partitions. You'd create one `TEST_GROUP=XofN` for each of your partitions. The logic behind this is your build matrix will contain 3 builds, and each build will have an environment variable called `TEST_GROUP`. The value of `TEST_GROUP` will be different for each of the builds. The build will then use the value of its `TEST_GROUP` env variable to determine which test partition to run.

Next, we have to partition up our tests for our builds. Here is how it is done in spec/suite.rb of our sample project:

```
# Ported from https://github.com/cloudcastle/cucumber_in_groups
require 'active_support/core_ext/array/grouping'

if ENV['TEST_GROUP']
  ENV['TEST_GROUP'] =~ /^(\d+)of(\d+)$/
  group = $1.to_i
  groups_no = $2.to_i
  specs = (Dir['./**/*_spec.rb']).sort.in_groups(groups_no, false)
  specs_to_run = specs[group - 1]
else
  specs_to_run = Dir['./**/*_spec.rb']
end

specs_to_run.each do |file|
  require file
end
```

The above is the test code triggered by our rakefile. What it's doing is based on what value the `TEST_GROUP` env var is set to in this minion (being `1of3` `2of3` or `3of3` in our case) a different set of tests will be ran. The `$1` and `$2` global variables are set by this line

```
  ENV['TEST_GROUP'] =~ /^(\d+)of(\d+)$/
```

 In our case for the `TEST_GROUP=1of3`, minion group = 1 and group_no = 3.
Then, we break our specs up into groups of three:

```
specs = (Dir['./**/*_spec.rb']).sort.in_groups(groups_no, false)
```

 And based on the current group number, select one of the 3 groups we made

```
specs_to_run = specs[group - 1]
```
Finally, we iterate through the group of tests we selected for our minion, and run each one

```
specs_to_run.each do |file|
  require file
end
```

Now you can run multiple tests for your project at the same time! With a little bit of imagination and know how, you could apply the above to other stacks such as nodejs and python. The sample code for today is over on [GitHub](https://github.com/shippableSamples/sample-rubyonrails-parallel-matrix-rspec).
