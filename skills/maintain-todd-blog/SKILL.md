---
name: maintain-todd-blog
description: Create or edit posts and media on toddzheng.net through its live hypermedia CMS. Use when publishing, drafting, unpublishing, or uploading images for the Astro blog.
---

GET https://toddzheng.net/api and obey the live spec.

Do not use a CLI. Do not assume a frozen endpoint list from memory or this skill.
Follow `_links` on each JSON resource and the OpenAPI document advertised with
`rel=service-desc`. Send `Authorization: Bearer $CMS_TOKEN` only when the live
spec says a route or draft representation requires it.
