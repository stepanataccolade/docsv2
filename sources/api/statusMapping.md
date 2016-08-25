page_title: Shippable API for Status Code Mapping
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# Status Code Mapping
Given below is the mapping of a build's statusCode to the build states displayed in the UI.

|statusCode      | Definition | State|   Icon  |
|---------------|--------------------|------------|---------|
|0|waiting | Incomplete | ![add_icon](../navigatingUI/images/builds/buildWaiting.png)|
|20|processing | Incomplete |![add_icon](../navigatingUI/images/builds/buildProcessing.png)|
|30|success |Complete |![add_icon](../navigatingUI/images/builds/buildSuccess.png)|
|50|unstable |Complete |![add_icon](../navigatingUI/images/builds/buildUnstable.png)|
|60|timeout |Complete |![add_icon](../navigatingUI/images/builds/buildTimeout.png)|
|70|canceled |Complete |![add_icon](../navigatingUI/images/builds/buildCancelled.png)|
|80|failed |Complete |![add_icon](../navigatingUI/images/builds/buildFailed.png)|


Here is more information on [build states](/navigatingUI/builds/overview/#build-status).

---
