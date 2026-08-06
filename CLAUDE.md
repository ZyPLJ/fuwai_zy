# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog "ZY知识库" (https://blog.pljzy.top) built on the [Fuwari](https://github.com/saicaca/fuwari) Astro template with heavy customizations (desktop pet, music player, Clarity analytics, Twikoo comments, Lsky Pro image gallery, friend-link feed). Site language is Chinese (zh_CN). Posts are written in Chinese.

## Commands

Package manager is **pnpm** (enforced by `preinstall: only-allow pnpm`).

| Command | Action |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | `astro build` + pagefind index + `node scripts/generate-friends-json.js` → `dist/` |
| `pnpm preview` | Preview the built site |
| `pnpm check` | `astro check` (type-checks .astro/.ts files) |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations` |
| `pnpm new-post <filename>` | Scaffold a new post (see below) |
| `pnpm format` / `pnpm lint` | Biome format / lint+fix on `./src` |

CI (`.github/workflows/build.yml`) runs `astro check` and `astro build` on Node 22/23 with `pnpm install --frozen-lockfile`.

## Writing a post (the most common task)

1. Run `pnpm new-post <title>` — creates `src/content/posts/<title>/<title>.md` with frontmatter skeleton.
2. Frontmatter schema (`src/content/config.ts`): `title`, `published` (date), `description`, `image`, `tags`, `category`, `draft`, `lang`, `pinned`. `updated`, `prevTitle/prevSlug/nextTitle/nextSlug` are optional.
3. Each post lives in its own directory named after the post — image assets referenced via `image: ./cover.jpg` go beside the `.md`.
4. Extended markdown is available: admonitions (`:::note/tip/important/caution/warning`), GitHub repo cards (`:::github{repo="..."}`), KaTeX math, Expressive Code blocks, TOC (handled by `remarkSectionize`).

Commit convention (from git history): `docs: 《post title》` for new posts, `docs: 添加《name》友链` for friend links, `feat:` for feature changes.

## Architecture

### Content

- `src/content/posts/<slug>/<slug>.md` — blog posts (content collection `posts`, zod-validated).
- `src/content/spec/` — standalone pages: `about.md`, `links.md` (collection `spec`).
- `src/data/friend-links.ts` — friend-link sections. **`scripts/generate-friends-json.js` parses this file with a regex + `eval` at build time** to produce `dist/friend.json`; keep the `export const friendLinkSections: FriendLinkSection[] = [...]` declaration format intact or the build breaks.
- `src/content/config.ts` — content collection schemas.

### Config (all site settings live in `src/config.ts`)

`siteConfig` (title, theme hue, banner, favicon, clarity, musicPlayer, pet), `navBarConfig`, `profileConfig`, `licenseConfig`, `commentConfig` (Twikoo at `https://img.pljzy.top:4334`), `expressiveCodeConfig`, `imageLibraryConfig` (Lsky Pro 兰空图床 API — contains a live API token, do not rotate), `friendLinkFeedConfig`. Types in `src/types/config.ts`.

### Routing

`src/pages/`: `index.astro` (home + `[...page]` pagination), `posts/[...slug].astro` (post pages), `about.astro`, `archive.astro`, `links.astro`, `feed.astro` (友链朋友圈), `images.astro` (Lsky Pro gallery), `rss.xml.ts`, `robots.txt.ts`. Layouts: `src/layouts/Layout.astro` (swup page transitions, `#toc` container), `MainGridLayout.astro`.

### Components

Astro components for static/SSR content; **Svelte 5 components** for interactive widgets (`src/components/*.svelte`: Search, DisplaySettings, LightDarkSwitch, ArchivePanel, ImagePanel, FriendLinkFeed). Icons via `astro-icon` + `@iconify-json/fa6-*` sets.

### Markdown pipeline (`src/plugins/` + `astro.config.mjs`)

remark: math, reading-time, excerpt, GitHub admonitions→directives, directives, sectionize, custom directive parser. rehype: katex, slug, autolink headings, components (admonition + github card), expressive-code. Styling: Tailwind 3 + postcss-nesting + Stylus.

### i18n

`src/i18n/` — `translation.ts`, `languages/` (en/zh_CN/zh_TW/ja/ko/es/th), `i18nKey.ts`. UI strings are translated via `useTranslations`; new UI text should be added to all language files. Site default is `zh_CN`.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`: builds with `withastro/action`, SCPs `dist/` + `docker/` + `docker-compose.yml` to the server (`/www/wwwroot/default/newblog`, secrets: `SERVER_IP`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`), then runs `docker-compose down && docker-compose up -d --build`. The Docker image is plain nginx:alpine serving the static dist on port 4321. `build.yml` runs astro check + build in parallel. `vercel.json` is vestigial (from the previous framework) — the site deploys via Docker, not Vercel.

## Notes

- `src/config.ts` `imageLibraryConfig.apiToken` and Twikoo `envId` are live credentials already embedded in the public site — treat them as non-secret but don't change them casually.
- Banner/pet spritesheet are served from the user's CDN (`cdn.pljzy.top`) — local assets live in `src/assets/images/` and `public/pets/`.
- Biome config (`biome.json`) uses double quotes and tab indentation, and disables some rules for `.svelte`/`.astro` files; run `pnpm format` after editing component files.
