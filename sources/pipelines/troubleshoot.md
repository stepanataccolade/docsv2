page_title: Troubleshoot Pipelines
page_description: Errors while using Pipelines, the reason they pop up and how to resolve them
page_keywords: concepts, documentation, shippable, CI/CD, Continuous Delivery, Continuous Integration


#Troubleshooting Errors

This document helps in troubleshooting errors generated on the Shippable platform while running Pipelines.

For non-errors and questions, refer our [FAQ section](faq.md).

---

### (Id:4005) postResource for :sourceName
When seeding a pipeline with a public GitHub repo, from another GitHub account that has contributor access to the public repo, the following error is generated:

```
(Id: 4005) postResource for :sourceName <name of the repo>
verbose: resources|postNewSyncRepo|callerId:XXXXXXXXXXXXX|_postSyncRepoResource
500
```

The pipeline is seeded however no version is created. In the SPOG-Resources tab, you can see the pipeline seeded and the version is 0.

Reason: The GitHub integration attached to this subscription must have owner rights. Without owner rights, the webhook will not be created.

**How to avoid:** Change the GitHub integration to use an owner's account and proceed with seeding the pipeline.

---
