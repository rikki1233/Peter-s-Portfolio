# Design QA — Peter Gianni portfolio

## Target and implementation

- Selected reference: `C:\Users\Gianni403\.codex\generated_images\01a177f3-98ae-7d82-a7b2-4cde0adab2c4\exec-dc4e1db5-785b-48bc-8221-5bd074d93c7e.png` (787 × 1997).
- Implemented site: `src/App.jsx`, `src/styles.css`, and `public/assets/`.
- Preview: `http://127.0.0.1:4174/`.
- QA captures: `qa/hero-revised-desktop.png` (1440 px viewport), `qa/hero-revised-mobile.png` (390 px viewport), `qa/contact-revised-mobile.png`, plus the earlier greeting, About, motion, project, and Haus of Gianni captures in `qa/`.

## Comparison

| Surface | Reference | Implemented result |
| --- | --- | --- |
| Hero | Large black editorial type on warm white; blue “alive”; sweeping cobalt form | Preserved composition, hierarchy, palette, and visual movement at desktop and mobile widths. |
| About | Asymmetric copy with staggered Imagine / Shape / Build imagery | Preserved oversized copy, right-hand text, staggered process images, and whitespace. |
| Dark chapter | Blue planetary image and stacked moving disciplines | Preserved image-led dark chapter and scroll-reactive large words. Words are Design / Research / Security to represent Peter accurately. |
| Selected work | Quiet project index after a slow visual introduction | Preserved broad pacing before projects; five live-work entries follow the index. |
| Content correction | Reference used “full-stack developer” | Replaced with UI/UX designer and cybersecurity background; project cards separately credit design, frontend, and backend work. |
| Readability and spacing | Large tightly tracked editorial headlines | Reduced negative tracking, increased line spacing, and kept the hero subtitle, contact link, and scroll prompt in separate layout rows. |
| Missing depth | Reference was primarily visual | Added About narrative, four capability areas, a four-step process, and visible overview/challenge/approach text for each live project. |
| Contact | Reference did not show detailed contact information | Added an explicit email address, location, and direct hero link to the contact section. |

## Functional checks

- Greeting sequence includes English, Igbo, Yorùbá, and Hausa, plus Skip intro and Escape. The intro is bypassed when reduced motion is preferred.
- Desktop and 390 px mobile layouts inspected visually in the browser. Mobile menu opens and closes, and its Work link navigates to the project section.
- Rotimax mobile screenshot retains a 16:9 image and the project list stays within the viewport.
- All five project links and contact mailto are present. Haus of Gianni uses a branded typographic preview because its live site's image slots currently contain replacement placeholders.
- Opened `https://hausofgianni.xyz/` and confirmed its streetwear homepage loads. Reloaded the portfolio and verified both Haus of Gianni links resolve to that URL and the card displays the new brand preview.
- At 390 px, checked the hero subtitle/contact/scroll spacing, heading word separation, direct Contact link, visible email and location, and horizontal overflow. At a desktop viewport, checked the expanded skills, process, and three-column project stories; horizontal overflow was absent.
- The mobile menu opens and closes and its new Process link navigates correctly.
- Verified the hero reveal begins after the greeting is removed; the hero image runs `hero-art-reveal` and the headline becomes visible.
- Verified the dark chapter is sticky while scrolling: at 55% progress, Research is active and the scene remains pinned to the top of the viewport. On a 390 px viewport, the scene also remains pinned at 24% progress without horizontal overflow.
- Project introductions, visual previews, and project stories now enter independently as each reaches the viewport.
- Browser error log: no errors.
- `npm run build`: passed.
- `npm run test:sites`: 4/4 passed.

## Final result

**Passed.** The selected design direction is implemented with the requested identity and project corrections. Its extra practice section and language intro are intentional additions to the selected visual reference.
