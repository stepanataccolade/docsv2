page_title: Shippable API for Status Code Mapping
page_description: How to interface with Shippable's API
page_keywords: shippable, API, HTTP

# Status Code Mapping
Given below is the mapping of a build's statusCode to the build states displayed in the UI.

|statusCode      | Definition | State|   Icon  |
|---------------|--------------------|------------|---------|
|0|waiting | Incomplete | ![add_icon](/navigating_ui/images/ci_build_icon_waiting.png)|
|20|processing | Incomplete |![add_icon](/navigating_ui/images/ci_build_icon_processing.png)|
|30|success |Complete |![add_icon](/navigating_ui/images/ci_build_icon_success.png)|
|50|unstable |Complete |![add_icon](/navigating_ui/images/ci_build_icon_unstable.png)|
|60|timeout |Complete |![add_icon](/navigating_ui/images/ci_build_icon_timeout.png)|
|70|canceled |Complete |![add_icon](/navigating_ui/images/ci_build_icon_cancelled.png)|
|80|failed |Complete |![add_icon](/navigating_ui/images/ci_build_icon_failed.png)|


Here is more information on [build states](/navigatingUI/builds/overview/#build-status).

---
