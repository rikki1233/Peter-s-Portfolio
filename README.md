# Peter Gianni — portfolio redesign

An editable, responsive React/Vite portfolio based on the selected “Every idea deserves to feel alive” direction.

## Run locally

```bash
npm install
npm run dev
```

If Vite's dependency scan fails in a restricted Windows environment, use the production preview:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4174
```

## Deploy on Vercel

Import this folder as a Vite project. Use `npm run build` as the build command and `dist/client` as the output directory. The built static site is also included in `dist/client`.

## Edit content

- `src/App.jsx`: intro greetings, text, projects, navigation, and contact link.
- `src/styles.css`: layout, colors, type, animation, and responsive behavior.
- `public/assets/`: generated visual assets and screenshots of live project sites.

Haus of Gianni links to its live site. Its portfolio card uses a branded typographic preview while the site's product imagery is being completed. The unpublished designs section is reserved for future work.

Each recent project now has an overview, challenge, and approach. These descriptions are grounded in the currently visible live sites and Peter's stated design/frontend/backend role; they can be refined with project-specific research, constraints, and results when available. The About and Process sections draw on the original portfolio's UI/UX and cybersecurity material.

The contact section displays `Peterchinedum708@gmail.com` and Lagos, Nigeria. The original portfolio did not provide a working LinkedIn URL or verified phone number, so neither is shown as a link.

The opening cycles through English, Igbo, Yorùbá, and Hausa. Visitors can skip it, and it is bypassed for reduced-motion preferences.

## Motion

- The hero image and headline reveal after the greeting finishes, so the entrance is visible rather than hidden behind the intro.
- The hero artwork moves with scrolling, and the scroll arrow has a quiet repeating cue.
- The Imagine / Shape / Build images unveil as they enter view.
- The dark Design / Research / Security chapter stays pinned for three viewport heights. Its highlighted word, artwork scale, and progress line respond to scroll position.
- Each project introduction, image, and case story enters separately; project images use a wipe and scale reveal.
- The site follows the visitor's reduced-motion setting and shows the content without these transitions when motion is reduced.
