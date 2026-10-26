# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## User decisions for this prototype

- Visual target: the second revised concept, with the headline “Every idea deserves to feel alive,” a spacious light hero, an About chapter, a dark motion chapter, and projects appearing later in the scroll.
- Include a short welcome sequence in English, Igbo, Yorùbá, and Hausa before the homepage. The sequence must be skippable and respect reduced motion.
- Describe Peter as a UI/UX designer with a cybersecurity background. Do not call him a full-stack developer, even though he handled design, frontend, and backend for the showcased projects.
- Reuse the original portfolio's UI/UX, cybersecurity, research, prototyping, and tool details. Avoid unsupported statistics.
- Showcase Rotimax, Haus of Gianni, Shobab Farm, FIF & Co, and Pullover, plus space for unpublished designs. The Haus website link now works; use its live URL and a branded typographic preview while its product image slots are unfinished.
- Motion should be clearly visible: show the hero entrance after the greeting, use image and project reveals, and give the Design / Research / Security chapter a pinned scroll interaction with enough distance to notice each change. Continue to respect reduced-motion preferences.
