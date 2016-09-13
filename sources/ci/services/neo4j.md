
#Continuous Integration with Neo4j

Neo4j 2.2.1 is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Neo4j.

To start Neo4j, include the following in your shippable.yml:

```
services:
  - neo4j
```

When started, Neo4j runs on port 7474 by default.

###Custom startup command

To customize the startup command, you should define the SHIPPABLE_NEO4J_CMD environment variable in your yml.

For example, the following yml snippet overrides the default startup command for Neo4j:

```
env:
  global:
    - SHIPPABLE_NEO4J_CMD="<command>"
```
