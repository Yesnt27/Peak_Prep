# PeakPrep — project brief

Living reference for this project. Add to it as instructions, decisions and user-testing feedback arrive.
Sections marked **(from Kenny)** record what was asked for; sections marked **(implementation)** are build choices made along the way and can be changed.

## What PeakPrep is (from Kenny)

PeakPrep is a hiking preparation app for people of all levels who are interested in hiking but don't know where to start. It offers a comprehensive preparation system built on:

- **Training** — repeated and tracked
- **First aid**
- **Collaboration** — a friend system

## What we are building (from Kenny)

- A web-hosted interface built with **React and CSS**, hosted through **GitHub**.
- It is a **visual prototype**: no backend, no hosting of data, no information storage for now.
- It must be viewable and testable through a **GitHub Pages link** and **fully viewable on mobile**.
- After this first build, further refinement instructions will follow, based on user testing.

## Design source (from Kenny)

The Figma file is the source of truth, read through the Figma MCP.

- Whole file: https://www.figma.com/design/qHF3OHRCkD6jQuFIeTaCAP/334-final?node-id=1646-2450&m=dev
- Prototype only: https://www.figma.com/proto/qHF3OHRCkD6jQuFIeTaCAP/334-final?node-id=1738-7209&m=dev&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1646%3A12184&show-proto-sidebar=1&page-id=1646%3A2450&t=B232KlqDPBOKJABN-1

Identifiers taken from those links:

| What | Value |
| --- | --- |
| File key | `qHF3OHRCkD6jQuFIeTaCAP` |
| Page | `1646:2450` |
| Prototype starting frame | `1646:12184` |
| Node linked in the prototype URL | `1738:7209` |

## Design principles (from Kenny)

1. Components, buttons and hover states are all prototyped in the Figma file. Read them and implement them as designed.
2. Build each page as it appears in Figma.
3. Navigation must go to the sections the Figma prototype connections point to.
4. Transitions and animations should stay relatively the same as in the prototype.

## Working rules (from Kenny)

- **Do not invent design decisions.** If something is missing, ambiguous or unreadable in Figma, flag it and ask.
- Flag any issue that needs clarification, including the Figma MCP not working.
- **Use only the names and data in Figma.** Never make up placeholder names, text or numbers; copy what the Figma frames show.
- **Reference page:** "Stage 4: Prototype" (`1646:2450`) is the single, most up-to-date source. Every interaction is wired through components there. Where frames share a name, the one the prototype connections actually reach is the screen to build.
- **Ignore the "USER TESTING" section** (`1786:5225`) on that page. It is the team's notes for later refinement, not a build instruction.

## Implementation notes (implementation)

- **Tooling:** Vite + React (JavaScript/JSX), plain CSS.
- **Routing:** `react-router-dom` with `HashRouter`, so refreshing or sharing a deep link works on GitHub Pages (which has no server-side routing).
- **Asset paths:** Vite `base: './'`, so the build works under the `/Peak_Prep/` sub-path without hardcoding the repo name.
- **Deploy:** `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. This needs Pages enabled once in the repo: Settings → Pages → Source: **GitHub Actions**.
- **Expected URL:** https://yesnt27.github.io/Peak_Prep/
- **Local commands:** `npm install`, `npm run dev` (local preview), `npm run build` (production build into `dist/`).

- **Fonts:** Poppins, Black Han Sans and Inter are bundled through `@fontsource` (Latin subsets), so nothing loads from a font CDN. SF Pro text in the design falls back to the system font.
- **Design size:** every Figma screen is a 402 × 874 frame. `src/app/Device.jsx` scales the whole app with CSS `zoom` so the layout is always 402 design px wide. On a phone (viewport ≤ 500px) it fills the screen; on anything wider it shows the 402 × 874 frame centered on a dark background, scaled down if the window is shorter than 874px.
- **Screens:** `src/components/Screen.jsx` = one prototype screen. Its children scroll; anything passed as `fixed` stays pinned (Figma "fixed when scrolling" layers such as the nav bar and bottom buttons).
- **Navigation + transitions:** `useGo()` (`src/app/useGo.js`) → `go('/path')` is an instant change; `go('/path', 'smart')` etc. plays a transition. `src/app/AnimatedRoutes.jsx` keeps the old screen mounted while it plays. Mapping from Figma: Smart animate/dissolve → `smart` (300ms ease-out fade-in over the old screen), Slide in ← → `slide-in-left`, Slide out ← → `slide-out-left`, overlays "move in" → bottom sheet slides up 300ms.
- **Hover states:** applied under `@media (hover: hover)` so they don't stick after a tap on touch screens.
- **Tokens:** `src/styles/tokens.css` holds the Figma colour variables and text styles.
- **Assets:** downloaded from Figma into `src/assets/` (never hot-linked; Figma asset URLs expire).

### Route ↔ Figma frame map

Prototype page: "Stage 4 prototype" (`1646:2450`). Some prototype links point at a frame nested inside the real screen frame (Training overview `1637:5340` inside `1780:3125`, Hike details `1637:5520` inside `1780:3160`, Completed hike `1646:13376` inside `1767:8813`); those are treated as links to the outer screen.

| Route | Figma frame | Notes |
| --- | --- | --- |
| `/` | Open App `1738:7209` → `7216` → `7223` → `7230` → `7237` | Splash. Tap the wordmark to start (as prototyped), then auto-advances to `/welcome`. |
| `/welcome` | sign up/login `1767:8411` | Sign In → Home (Saved); Create Account → onboarding. |
| `/onboarding/welcome` … `/safety` | `1646:6565`, `6617`, `6660`, `6690`, `6711` | Sheets: workout `1646:11728`, injury `11749`, health conditions `11769`. |
| `/home/saved`, `/explore`, `/training` | `1892:3398`, `1892:3571`, `1892:4108` | Tab highlight switches on click; content follows 300ms later (prototype delay). |

**Still to build.** Read from the prototype connections on 2026-11-12. Nav bar: Home → `/home/saved`, Create → new training 19, Profile → Profile. Routes are proposed and get fixed as each screen is built.

| Proposed route | Figma frame | Prototype links out |
| --- | --- | --- |
| `/hike` | Hike Details (hifi) `1780:3160` | back → Home Saved; green button → First aid module `12155` |
| `/training` | Training overview (hi-fi) `1780:3125` | green button → Packing All Items; button → First aid module `12184`; button → Hiker Log Congrats |
| `/packing/all`, `/to-pack`, `/packed` | `1646:11433`, `11597`, `11656` | 3-choice tab nav switches between them; back → Training overview; button → Packing Edit |
| `/packing/edit` | Packing - Edit `1646:11507` | back → Packed; button → All Items |
| `/first-aid/…` | First aid module `1646:12155`, `12184`, `12254` | 12184: back → Training overview, cards slide in → `12254`, `12394`, `12465`; 12254 → 12155; 12155 → 12184 (back), Right or wrong `12263` (slide out ←) |
| `/first-aid/quiz/…` | Right or wrong `1646:12263`, `12394`, `12465` | 12263: back → 12184, button → 12155; 12394/12465: back → 12184 |
| `/log/…` | Hiker Log: Congrats `11007` → Details `11107` → Difficulty `11133` → Emergency Prep. `11189` → Physical Prep. `11151` → General Notes `11168` → Review Details `11053` | each back button returns to the previous step |
| `/new-training/…` | new training 19 `5644` → 20 `5688` → 21 `5714` → 23 `5788` → 8 `5732` → 22 `5749` | 19 back → Home Saved; 23 opens health conditions sheet `2175:7829`; 22 → Training overview |
| `/profile` | Profile `1646:13300` | cards → Completed Hikes `1767:8813`, Health info `13208`, Friendlist `13323`, `Frame 1410103912` `13422` |
| `/profile/health` | Health info `13208` | → Profile; → `Frame 1410103913` `13446` |
| `/profile/friends` | Friendlist `13323` | back → Profile; "add friends" → Add `2136:3603`; search bar → Add `2234:4055` |
| `/profile/completed` | Completed Hikes `1767:8813` + fav completed hike `1673:3790` | favourite toggle (Component 5) swaps between them |

Same-named frames that no live screen links to, and that are **not** built: Packing - All Items `2181:3983`, Onboarding - Hiking Exp. `2142:3855`, Home - Saved2 `2240:6301`, new training 24/25 `2240:6324`/`6349` (presentation-slide flow), Right or wrong `1646:12330`, op 1/2/3, and the hi-fi drafts inside "Hi-fi: Home + Training overview".

### Checking work locally

Headless Chrome is used for screenshots and click-throughs (scripts live in the session scratchpad, not the repo). Chrome's minimum window width is 500px, so compare at 402px by loading routes inside 402px-wide iframes or a 402px puppeteer viewport.

## Status

- 2026-11-12 — Brief written. Project scaffolded (Vite + React + Pages workflow).
- 2026-11-12 — Figma connected through the claude.ai Figma connector. Navigation graph read from the prototype.
- 2026-11-12 — Built and checked against Figma: app shell, splash animation, sign-in, onboarding (5 steps + 3 bottom sheets), Home (3 tabs), nav bar.

## Open questions

Things the Figma file does not answer. Nothing has been invented for these; each is left as the prototype has it.

1. **Splash start:** the prototype starts the splash animation on a tap of the "Peak Prep" wordmark. On the web there is no hint to tap. Keep the tap, or auto-play on load?
2. **Unwired buttons:** on Training overview two green buttons have a hover state but no destination (`1750:8313`, `1637:5519`); on Hiker Log – Review Details the final button (`1646:11106`) has none either.
3. **Unreachable screens:** nothing in the prototype links to Training Schedule (`2068:5154`) and, through it, the three Training detail screens (`2068:5528`, `2084:6318`, `2084:6351`).
4. **Static form fields:** text fields (Name, Age, emergency contact…), search bars, the workout count stepper and the "remove" (×) icons have no interaction in the prototype, so they are static here too. Should any become real inputs for testing?
5. **Selections don't carry over:** picking workouts/injuries in a bottom sheet does not change the list underneath (same as the prototype).

## User-testing refinements

_None yet._
