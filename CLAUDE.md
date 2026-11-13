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

Prototype page: "Stage 4 prototype" (`1646:2450`). Some prototype links point at a frame nested inside the real screen frame (Training overview `1637:5340` inside `1780:3125`, Hike details `1637:5520` inside `1780:3160`, Completed hike `1646:13376` inside `1767:8813`, Completed hike-fav `1646:13399` inside `1673:3790`); those are treated as links to the outer screen. Screen code lives in `src/screens/<area>/`.

| Route | Figma frame(s) | Notes |
| --- | --- | --- |
| `/` | Open App `1738:7209` → `7216` → `7223` → `7230` → `7237` | Splash. Tap the wordmark to start (as prototyped), then auto-advances to `/welcome`. |
| `/welcome` | sign up/login `1767:8411` | Sign In → Home (Saved); Create Account → onboarding. |
| `/onboarding/welcome` … `/safety` | `1646:6565`, `6617`, `6660`, `6690`, `6711` | Sheets: workout `1646:11728`, injury `11749`, health conditions `11769`. |
| `/home/saved`, `/explore`, `/training` | `1892:3398`, `1892:3571`, `1892:4108` | Tab highlight switches on click; content follows 300ms later (prototype delay). |
| `/hike` | Hike Details `1780:3160` | Start Preperation → `/first-aid/practice`. |
| `/training` | Training overview `1780:3125` | Packing List → packing; Continue lesson → `/first-aid`; Hike Completed! → hiker log. |
| `/packing/all`, `/to-pack`, `/packed`, `/edit` | `1646:11433`, `11597`, `11656`, `11507` | Tab colour fades 300ms, then the screen changes (smart animate). |
| `/first-aid` | First aid module `1646:12184` | The prototype's starting frame. Cards slide in from the right. |
| `/first-aid/lesson` | `1646:12254` | Heat Exposure intro. |
| `/first-aid/practice` | `1646:12155` | Skip slides out to the left → `/first-aid/correct`. |
| `/first-aid/correct` | Right or wrong `1646:12263` | Retry → practice. |
| `/first-aid/legal` | Right or wrong `1646:12394` | |
| `/first-aid/certified` | Right or wrong `1646:12465` | Course level buttons toggle. |
| `/log/congrats` … `/log/review` | `1646:11007`, `11107`, `11133`, `11189`, `11151`, `11168`, `11053` | Hiker log (6 steps + review). |
| `/new-training` … `/schedule` | new training 19, 20, 21, 23, 8, 22 (`1646:5644`, `5688`, `5714`, `5788`, `5732`, `5749`) | Nav "+" opens it. Invite Friends sheet `2175:7829`. Done → Training overview. |
| `/profile` | Profile `1646:13300` | |
| `/profile/health`, `/health/edit` | Health info `1646:13208`, Edit Health Stats `1646:13446` | |
| `/profile/friends`, `/friends/search`, `/friends/add` | Friendlist `1646:13323`, Add `2234:4055`, Add `2136:3603` | Search bar → search screen; "add friends" → add screen. |
| `/profile/hikes`, `/hikes/favourites` | Completed Hikes `1767:8813`, fav completed hike `1673:3790` | Recent/Favourited toggle slides, then switches screen. |
| `/profile/privacy` | Privacy `1646:13422` | |

| `/hike` | Hike Details (hifi) `1780:3160` | back → `/home/saved`; "Start Preperation" → `/first-aid/practice` |
| `/training` | Training overview (hi-fi) `1780:3125` | Packing List → `/packing/all`; Continue lesson → `/first-aid`; Hike Completed! → `/log/congrats` |
| `/packing/all`, `/to-pack`, `/packed`, `/edit` | `1646:11433`, `11597`, `11656`, `11507` | tabs switch screens (smart); back → `/training`; pencil → edit; edit ✓ → packed, Save → all |
| `/first-aid` | First aid module `1646:12184` | Heat Exposure row → `/first-aid/heat`, cards → `/legal`, `/certified` (slide in ←); back → `/training` |
| `/first-aid/heat`, `/practice`, `/correct` | `1646:12254`, `12155`, Right or wrong `12263` | Start lesson → practice; Skip → correct (slide out ←); Retry → practice |
| `/first-aid/legal`, `/certified` | Right or wrong `1646:12394`, `12465` | back → `/first-aid` |
| `/log/congrats` … `/review` | Hiker Log `11007` → `11107` → `11133` → `11189` → `11151` → `11168` → `11053` | each back → previous step |
| `/new-training` … `/schedule` | new training 19 `5644` → 20 → 21 → 23 → 8 → 22 | 23 opens Invite Friends sheet `2175:7829`; Done → `/training` (smart) |

| `/profile` | Profile `1646:13300` | cards → completed / health / friends / privacy (smart) |
| `/profile/health`, `/health/edit` | Health info `13208`, Edit Health Stats `13446` | round back → profile; pencil → edit; edit back/✓ → health |
| `/profile/friends`, `/friends/add`, `/friends/search` | Friendlist `13323`, Add `2136:3603`, Add `2234:4055` | "add friends" → add; search bar → search; both back → friends |
| `/profile/completed`, `/completed/favourited` | Completed Hikes `1767:8813`, fav completed hike `1673:3790` | Recent/Favourited pill swaps, screen follows 100ms later |
| `/profile/privacy` | `Frame 1410103912` `13422` | round back → profile |

All prototype-reachable screens are built.

Same-named frames that no live screen links to, and that are **not** built: Packing - All Items `2181:3983`, Onboarding - Hiking Exp. `2142:3855`, Home - Saved2 `2240:6301`, new training 24/25 `2240:6324`/`6349` (presentation-slide flow), Right or wrong `1646:12330`, op 1/2/3, and the hi-fi drafts inside "Hi-fi: Home + Training overview".

### Checking work locally

Headless Chrome is used for screenshots and click-throughs (scripts live in the session scratchpad, not the repo). Chrome's minimum window width is 500px, so compare at 402px by loading routes inside 402px-wide iframes or a 402px puppeteer viewport.

## Hosting on GitHub Pages (implementation)

Only `.github/workflows/deploy.yml` may publish to Pages. It runs `npm ci` + `npm run build` and publishes `dist/`. Do **not** add GitHub's suggested "Static HTML" or "Jekyll" Pages workflows: they publish the raw source (`/src/main.jsx` is never built), which shows a blank page, and they race with `deploy.yml`. Both were removed on 2026-11-12 for this reason.

1. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions** (one-time).
2. Commit and push to `main`. The "Deploy to GitHub Pages" run appears under the Actions tab (about 1 minute).
3. Open https://yesnt27.github.io/Peak_Prep/ — on a phone it fills the screen; on a computer it shows the phone frame centred.
4. Deep links work, e.g. https://yesnt27.github.io/Peak_Prep/#/first-aid (the prototype's starting frame).

## Status

- 2026-11-12 — Brief written. Project scaffolded (Vite + React + Pages workflow).
- 2026-11-12 — Figma connected through the claude.ai Figma connector. Navigation graph read from the prototype.
- 2026-11-12 — Built and checked against Figma: app shell, splash animation, sign-in, onboarding (5 steps + 3 bottom sheets), Home (3 tabs), nav bar.
- 2026-11-12 — (Mac session) Built and checked: Profile (9 screens). Every route renders without errors (headless sweep). `first-aid` split into `Module` / `Practice` / `Resources` + `parts.jsx`.
- 2026-11-12 — (Mac session) Built and checked: Hike details, Training overview, Packing (4), First aid (6), Hiker Log (7), New training (6 + invite sheet). Shared pieces: `components/FlowStep.jsx` (step shell, option rows), `data/hikes.js`. Updated to current Figma: list-row tick/hover now green, Add Item hover `#d4e6b8`.

## Open questions

Things the Figma file does not answer. Nothing has been invented for these; each is left as the prototype has it.

1. **Splash start:** the prototype starts the splash animation on a tap of the "Peak Prep" wordmark. On the web there is no hint to tap. Keep the tap, or auto-play on load?
2. **Unwired buttons:** on Training overview two green buttons have a hover state but no destination (`1750:8313`, `1637:5519`); on Hiker Log – Review Details the final button (`1646:11106`) has none either.
3. **Unreachable screens:** nothing in the prototype links to Training Schedule (`2068:5154`) and, through it, the three Training detail screens (`2068:5528`, `2084:6318`, `2084:6351`).
4. **Static form fields:** text fields (Name, Age, emergency contact…), search bars, the workout count stepper and the "remove" (×) icons have no interaction in the prototype, so they are static here too. Should any become real inputs for testing?
5. **Selections don't carry over:** picking workouts/injuries in a bottom sheet does not change the list underneath (same as the prototype).
6. **More links with no destination in the prototype** (left as hover-only or static): back buttons on Training overview, Heat Exposure and Hiker Log Congrats; "View Training Schedule", "Get First-aid certified", "20 mins", Review Details "Done"; New training Goal rows and day tags (hover only); in the month grid only "July" has a hover; the Hike details heart shows the same icon in both states.
7. **Copy that looks like typos / mismatches (kept exactly as in Figma):** "Start Preperation", "Brunsick Mountain Safety", "protecs", "AYS" (Completed hikes stat), "6ft3”t"; Health info says Male / 168lbs but Edit Health Stats says Female / 186lbs; Hiker Log shows "The Black Tusk" / "Garibaldi Provincial Park, B" over a Brunswick photo; "Trail challenges · 3 flagged" lists 4; Packing title "Black Tusk Winter Hike Packing List" while the training is Brunswick; several invite handles are "@john_bo2"; Friend search lists Christopher Nolan / Miley Cyrus / Bob Dylan.
8. **Figma layout quirks copied as-is:** Get certified frame is 923px and clips the third course card; Review Details "Completed" chip label is wider than its pill; on "Correct!" the blur strip behind the bottom buttons scrolls in Figma — here it is pinned with them.
9. **Shared components updated to current Figma:** list-row tick + hover are now green (were yellow) and "Add Item" hover is `#d4e6b8` (was yellow). This also changes Home → Training and onboarding.

## Working rules for this frontend prototype (token-efficient, quality-first)

Goal: build a high-quality frontend prototype while keeping token use low. Spend tokens on design decisions and working code, not on re-reading files, rewriting whole files, or narrating.

### 1. Plan before touching code
- Before writing anything, give me a short plan of no more than 10 lines: screens/components, file structure, and styling approach. Wait for my OK on anything large.
- Ask me at most 2–3 clarifying questions up front. Don't drip questions out mid-build.

### 2. Set up a design foundation once, then reuse it
- Define design tokens (colors, type scale, spacing, radius, shadows) in ONE file, e.g. `tokens.css` or the Tailwind config, at the start.
- Build small reusable primitives first (Button, Card, Input, Stack/Layout). Compose screens from them; don't restyle each screen from scratch.
- Reference tokens/primitives by name instead of repeating raw values.

### 3. Read surgically
- Don't re-read files you've already read this session unless they've changed.
- Use grep or targeted line ranges instead of opening whole large files.
- Don't scan node_modules, build output, lockfiles, or assets.
- Don't explore the repo "just in case". Only read what the current step needs.

### 4. Edit, don't rewrite
- Use targeted edits (diffs) on existing files. Never regenerate a whole file to change a few lines.
- Keep components focused. Split any file over ~200 lines so later edits stay small.
- Don't add speculative features, extra variants, or abstractions I didn't ask for.

### 5. Keep it prototype-appropriate
- Use mock data in a single `mockData` file. No real backend, auth, or state libraries unless I ask.
- Skip tests, extensive error handling, and heavy accessibility audits for now. Do keep semantic HTML, focus states, and adequate contrast, since those are cheap and keep quality up.
- Prefer the existing stack and already-installed packages over adding new dependencies.

### 6. Verify cheaply
- After each meaningful chunk, run the dev server/build once and fix errors. Don't loop on screenshots or re-renders.
- If something fails twice, stop and tell me what's wrong instead of trying variations blindly.

### 7. Communicate briefly
- No narration between steps. When a step is done, reply in 1–3 lines: what changed (file names) and what's next.
- Don't paste back code you just wrote into the file. I can see the diff.
- If you notice a design or UX problem, flag it in one sentence. Don't silently skip it, and don't write an essay about it.

### Order of work
1. Plan → my OK
2. Tokens + primitives
3. Layout shell/navigation
4. Screens, one at a time, from primitives
5. Polish pass: spacing, hierarchy, states (hover/empty/loading)
6. Short summary of what's built and any known gaps

## User-testing refinements

### Round 1 — dead buttons + first aid (from Kenny, 2026-11-12)

- Link buttons that did nothing; fix back buttons. Done:
  - Home avatar → `/profile`.
  - Completed hikes avatar → `/profile`.
  - Training overview back → `/home/training`.
  - Hiker Log Congrats back → `/training`.
  - Review Details "Done" → `/profile/completed`.
  - Heat Exposure back → `/first-aid`.
  - Practice back → `/first-aid/heat`.
  - Legal side "Get First-aid certified" → `/first-aid/certified`.
  - Correct! "20 mins" → `/first-aid`.
- Heat Exposure: the full text is shown, with no Figma fade, and "Start lesson" sits below it.
- Completion turns green:
  - Reaching "Correct!" completes Heat Exposure.
  - The lesson list rows go green, the progress count and bar update, and the Training overview Hiking safety steps go green with "Up next" advancing.
  - Progress lives in `src/app/progress.js`, which uses sessionStorage only and resets in a new tab.
- Get certified:
  - The course cards open each organisation's site in a new tab.
  - The page is no longer clipped at 923px, so the St. Johns card can be reached.

### Round 2 — minor fixes (from Kenny, 2026-11-12)

- **Hover states:**
  - Get certified level buttons and the "next" lesson row now have hover states.
  - The hover colours match the rest of the app: `#d4e6b8` and yellow-2, 300ms.
- **Footer blur:**
  - Hike details and "Correct!" now use the nav bar's `ProgressiveBlur`.
  - The blur sits below the buttons instead of above them.
- **Typing on mobile:** the static text boxes are now real inputs, using `TypeField` in `components/controls.jsx`.
  - Figma's text is used as the placeholder.
  - Filled-in Figma values ("Black Tusk", "10/30/2027", "Joanna B") are used as the starting value.
  - The viewport has `maximum-scale=1`, so iOS doesn't zoom in when a field is focused.
- **Training overview calendar:** any day can be selected. The green pill moves to the tapped day, and training-day dots stay.
- **Heat Exposure:** the full text is shown and scrolls, with no fade.
- **Profile blank on Pages:** the Pages build was failing on unresolved merge conflicts. These are now resolved in favour of the Mac build. Pages updates after the next push to `main`.
