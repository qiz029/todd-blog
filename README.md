# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## CMS
GET /api then follow OpenAPI; never use a CLI. See cms/README.md.

## Traffic analytics

Cloudflare Web Analytics is enabled for `toddzheng.net` using automatic script installation at the edge. Do not add a second beacon to Astro templates. Local previews and build output do not include the injected script. Cloudflare also measures Astro's client-side navigation automatically.

Open [Web Analytics](https://dash.cloudflare.com/221784d24eb2a95d148bc96b6f06d6be/web-analytics), select `toddzheng.net`, and choose a time range. Use **Exclude Bots = Yes** for a closer estimate of reader traffic; view **Path** for article popularity and **Referer** for traffic sources. These browser metrics differ from zone-level HTTP request and unique-IP counts. Test visits can appear in the reports.

The English and Chinese About pages disclose the use of cookie-free Cloudflare Web Analytics. See [Cloudflare's metrics and dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).

## Text highlights

Use inline HTML in Markdown or MDX (including CMS post bodies):

```html
This is <mark>highlighted in yellow</mark>.
<mark data-color="green">Green highlight</mark>
<mark data-color="blue">Blue highlight</mark>
<mark data-color="pink">Pink highlight</mark>
```

Highlights wrap across lines. The `==text==` shorthand is not supported.
