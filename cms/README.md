GET /api then follow OpenAPI; never use a CLI.

This Worker is a thin hypermedia CMS in front of the git-backed Astro blog.
Agents and humans discover the live contract from the site itself. Do not
freeze endpoint lists in local docs or skills.

## Discover

    curl -sS https://toddzheng.net/api
    curl -sS -D - -o /dev/null https://toddzheng.net/api
    curl -sS https://toddzheng.net/api/openapi.json

The discovery JSON has `_links` (self, openapi with rel=service-desc, posts, media).
The same relations are also sent as HTTP Link headers.

Follow `_links` on every JSON resource (self, collection, html, sibling locale, media).

Discovery and OpenAPI are public. Mutating routes and draft content need
an Authorization Bearer token (the CMS_TOKEN secret).

## Create a draft

See the live OpenAPI document for the POST body. New posts default to draft true.
Unpublish with PATCH draft true. POST never overwrites an existing locale+slug (409).
Git history is not deleted.

    curl -sS -X POST https://toddzheng.net/api/posts \
      -H "Authorization: Bearer $CMS_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"locale":"en","title":"Working title","description":"One-line summary","body":"Markdown body. Images: ![alt](/media/key).","tags":["draft"]}'

Upload a hero image, then reference /media/{key}:

    curl -sS -X POST https://toddzheng.net/api/media \
      -H "Authorization: Bearer $CMS_TOKEN" \
      -F file=@hero.png

## Secrets and deploy (manual)

Do not put production secrets in git.
This repo does not create the remote R2 bucket or set production secrets.
Create R2 bucket todd-blog-media once.
Set Worker secrets CMS_TOKEN and GITHUB_TOKEN (contents:write on qiz029/todd-blog).
Local dev: copy .dev.vars.example to .dev.vars.
GITHUB_REPO qiz029/todd-blog and GITHUB_BRANCH main are wrangler vars.

## Types
Env is generated from wrangler config, not hand-written.
Generated types land in worker-configuration.d.ts (worker/tsconfig.json).
To set secrets: npx wrangler secret put CMS_TOKEN
To set secrets: npx wrangler secret put GITHUB_TOKEN
After an Astro build, deploy with wrangler.
