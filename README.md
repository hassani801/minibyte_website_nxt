# Minibyte – Next.js (TypeScript)

The five static pages (`index`, `about`, `capabilities`, `research`, `work`) converted
into a Next.js App Router project. Markup, CSS and page scripts are carried over
unchanged.

## Run

```bash
npm install
npm run dev      # http://localhost:3005
npm run build && npm start
```

## Routes

| Original          | Route            |
| ----------------- | ---------------- |
| `index.html`        | `/`              |
| `about.html`        | `/about`         |
| `capabilities.html` | `/capabilities`  |
| `research.html`     | `/research`      |
| `work.html`         | `/work`          |

Deep links such as `/work#p-03`, `/research#p-01`, `/capabilities#c-02` work as before.

## How it is organised

```
src/
  app/
    (home)/          layout.tsx  page.tsx  home.css
    (about)/         layout.tsx  about/page.tsx  about.css
    (capabilities)/  ...
    (research)/      ...
    (work)/          ...
  components/        <Page>Script.tsx  – client component that starts the page script
  scripts/           <page>.ts         – the original <script> of each page
```

* Each page is a **route group with its own root layout**, so it has its own `<html>`/`<body>`
  and its own stylesheet, exactly like the separate HTML files. Moving between pages is a
  normal full page load (same as before) and CSS from one page can never leak into another.
* `gsap` 3.12.5 and `three` r128 (same versions as the old CDN tags) are installed from npm.
* Fonts (Geist, Geist Mono) are loaded from Google Fonts with the same `<link>` as before.
