
#Riak

Riak 2.0.5 is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Riak.

To start Riak, include the following in your shippable.yml:

```
services:
  - riak
```

