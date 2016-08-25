
#Redis

Redis 3.0.0 is pre-installed on all Shippable Official images. However, we do not start it by default since not every build needs Redis.

To start redis, include the following in your shippable.yml:

```
services:
  - redis
```

When started, Redis runs on port 6379 by default. 

###Custom startup command 

To customize the startup command, you should define the SHIPPABLE_REDIS_CMD environment variable in your yml. 

For example, the following yml snippet overrides the default startup command for redis:

```
env:
  global:
    - SHIPPABLE_REDIS_CMD="<command>"
```

