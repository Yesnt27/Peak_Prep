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

1. ~~**Splash start**~~ — resolved Round 8: auto-plays.
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
  - Correct! "20 mins" → `/first-aid`, relabelled "Continue" (from Kenny).
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
- **Trail Etiquette 101 cards:** the row side-scrolls by swipe on touch or drag with a mouse, and snaps card by card.
- **Home sort dropdown** (asked by Kenny, not in Figma):
  - "Sort: …" opens a menu with Distance / Elevation / Time.
  - Picking an option sorts the Saved and Explore cards lowest first.
  - The cards stay in Figma order until something is picked.
  - The Training tab is not sorted.

### Round 3 — selections + Training Schedule (from Kenny, 2026-11-12)

- **New training → Hike Date:**
  - The year arrows change the year (no earlier than 2026).
  - Months can be selected one at a time. They use the tag styles: hover `#e7e7e7`, selected `#d4e6b8`.
- **New training → Goal:** the rows are selectable, like the Trip Type rows.
- **New training → Your training schedule:** the day tags can be multi-selected.
- **Training overview → "View Training Schedule"** now opens `/training/schedule`, Figma "Training Schedule" `2068:5154` (smart animate). Its back button returns to `/training`.
  - Training overview and Training Schedule share `PrepStatus` and `WeekStrip`, exported from `TrainingOverview.jsx`.
  - The row chevrons have no destination yet. The three Training detail screens (`2068:5528`, `2084:6318`, `2084:6351`) are still not built.
- **Fix:** `ListItem` used `checkGreen` without importing it, and now imports it.

### Round 4 — mobile taps, likes, share, first aid lessons (from Olivia, 2026-11-18)

- **Mobile taps:** every `@media (hover: hover)` rule has a matching `@media (hover: none)` copy using `:active`, so on touch the hover look shows while a finger is held down and the tap works first time. Buttons get `touch-action: manipulation` and a default 300ms background fade (`base.css`); `main.jsx` adds an empty `touchstart` listener so iOS applies `:active`.
- **Back buttons:** all use the Figma dark hover (`darkHover` now defaults to true). Share uses the same dark hover.
- **Likes:** the hike card heart (`HikeCard.jsx`) and the Hike details heart toggle filled ↔ outline. The card is a `div role="button"` so the heart can be its own button.
- **Home → Training:** Endurance shows "20 min". "Full analytics" → `/training/schedule`; its back returns to wherever it was opened from (`go(path, transition, from)`).
- **Brunswick naming:** every title is "Brunswick Mountain Trail" (hike card, Home subtitle); the safety module is "Brunswick Mountain Trail Safety". "Start Preparation" (spelling fixed) → `/training`.
- **Share:** `src/app/share.js` opens the native share sheet with https://yesnt27.github.io/Peak_Prep/; where there is none (most desktops) it copies the link and shows "Link copied".
- **Fonts:** Poppins + SF Pro only (Black Han Sans stays for the logo wordmark). Inter removed. SF Pro can't be bundled (Apple licence), so `--font-sf` uses the system font: real SF Pro on Apple devices, the closest system font elsewhere.
- **First aid lessons** (content in `src/data/firstAid.js`, written from Red Cross / Wilderness Medical Society / NOLS guidance; Heat Exposure intro + scenario 1 keep the Figma copy):
  - Routes: `/first-aid/:lesson` (intro, Heat Exposure layout) → `/first-aid/:lesson/practice` → `/first-aid/:lesson/complete`. Slugs: `dehydration`, `scramble`, `heat`, `snowy-peaks`. Old `/first-aid/practice` and `/correct` redirect to the Heat versions.
  - Scenario counts follow the lesson list: 8 / 8 / 8 / 3.
  - Lesson rows are all buttons: grey → yellow-1 on hover/press; done rows green → `#d4e6b8`. Nothing is pre-selected.
  - Practice: 3:00 countdown per scenario, "Scenario n of N", no image, answer box without "?", Hint tag reveals a hint, Check is grey until something is typed, then green. Check shows a "Suggested answer" card and turns into "Next scenario" / "See results". Skip moves on.
  - Results: Heat Exposure keeps the Figma thermometer + Treating for Shock cards (heading now "Lesson complete!"); the others show "Lesson complete!" + "Key takeaways". Reaching results completes the lesson.
  - Lesson photos reuse existing assets (Wedgemount Lake, Brunswick, the Everest photo); tag icons reuse drop / mountain / snow icons.
- **Trail Etiquette cards:** all five use the same text spacing and centred icons.

### Round 5 — schedule, packing edit, health, friend profiles (from Olivia, 2026-11-18)

- **Training Schedule** (`/training/schedule`): "Training" title and "Black Tusk…" subtitle removed; page now starts with "Daily Training", and the green Prep status box sits at the bottom.
- **Brunswick everywhere it's linked from the Brunswick training:** Packing subtitle "Brunswick Mountain Trail Packing List"; Hiker Log trail card, search field and review title now say Brunswick Mountain Trail, Lions Bay, BC, 14.3 km, 1,539 m. (Home's separate Black Tusk card and the New training example are other hikes and stay.)
- **Packing edit:** the max-weight stepper −/+ works (1–99); switching kg ↔ lb converts the number. "Add Item" opens a new row with a text field; the weight is guessed from the name (`guessWeight` in `src/app/packing.js`, e.g. "Water (2L)" → 2.0 kg, unknown → 0.3 kg). Added items are kept in sessionStorage and show on the list tabs after Save. The bag stats (8 of 11, 7.8 kg) stay as the Figma values.
- **Packing "?":** tap opens the yellow-1 callout from the reference ("This packing list is recommended based on your health data and potential trail hazards"); tap again or anywhere else closes it.
- **Health Information** (`/profile/health`, from "Health info.png"): no calories/macros card, no BP or Water tiles, no separate edit screen (`/profile/health/edit` redirects here). Gender is a dropdown; Age / Weight / Height edit in place via the pencil. Height typo "6ft3”t" shown as "6ft3”".
- **Dropdown:** Home's sort menu is now the shared `components/Dropdown.jsx`, also used for Gender.
- **Friend List:** title is "Friend List" (and on the Profile card). "View" opens `/profile/friends/:id` (`FriendProfile.jsx`, data in `src/data/friends.js`), one profile per friend, laid out from "view-friend.png" on the app grid (23px gutters, 125px title line, shared HikeCard). Natalia Wang uses the reference's numbers and hikes. The Friend-search results (Figma names) are not linked.
- `data/hikes.js` now also holds Saint Mark Summit, Mt. Everest ("DAYS", Figma had "AYS") and Grouse Grind.

### Round 6 — Profile tab redesign (from Olivia, 2026-11-18)

- Friend profile button: "+ Add friend" (light green) ↔ "− Unfriend" (grey `#e7e7e7`), Round 10.
- `/profile` now uses the friend-profile layout (`ProfileView`, exported from `FriendProfile.jsx`) for Hudson Kemp: friend count (tap → Friend List), "7+ Years Exp.", level bar, then two side-by-side buttons **Health Stats** → `/profile/health` and **Settings** → `/profile/settings`, then **Completed Hikes** (Saint Mark, Grouse Grind, Mt. Everest) with "See all ›" → `/profile/completed`.
- (Superseded in Round 7: the Profile card screen was removed; Settings is now the Privacy screen.)
- Level "Advanced", the progress bar (60%) and "3 hikes" on Hudson's profile are not in Figma; set to fit the friend-profile layout.

### Round 7 — Profile cards, Settings, New training (from Olivia, 2026-11-18)

- **Profile:** Health Stats and Settings are the Figma "profile card" tiles again (icon + label, hover `#e7e7e7`), side by side.
- **Settings** = the Figma Privacy screen (1646:13422) retitled "Settings" at `/profile/settings`; `/profile/privacy` redirects there. Back → `/profile`. Standard back button + 125px title line. The old card-grid screen is gone.
- **Share:** `components/ShareButton.jsx` (native share sheet / "Link copied") is used by the Hike details hero and the Invite Friends sheet.
- **New training → Target Hike:** "Not sure yet? See hikes for your level" → `/new-training/level`, hike cards for an advanced hiker (Black Tusk, Brunswick, Panorama Ridge, Wedgemount). Tapping a card returns to `/new-training?hike=<key>` with that hike as the target.
- **Invite Friends sheet:** "copy invite link" removed; share button top right (`BottomSheet` now takes `action` and `onDone`). "Add" toggles to a green check; Done adds the ticked friends under "Invite friends to train together" on Who's coming; closing without Done discards changes.
- **Goal:** "Add your own goal" opens a text row; the goal becomes a selectable option (flag icon) and is selected. `Options` can now be controlled (`value` / `onChange`).

### Round 8 — splash, tiles, bottom bars, nav selected state (from Olivia, 2026-11-18)

- **Splash** auto-plays 600ms after load (no tap), then goes to `/welcome` as before.
- **New training → Your training schedule:** Training Availability days and Time per session use the month tiles' shape (12px radius, same padding) via `.nt-tiles`; hover/selected colours unchanged.
- **Bottom bars match the nav bar:** Hike details ("Start Preparation" + heart) and the lesson results bar (Retry / Continue) use the NavBar box exactly: 402 × 202, same blur, pill `inset: 52.97% 5.09% 14.36% 5.09%` (361 × 66, 29px from the bottom) with border + shadow, 53px-tall controls inside.
- **Nav bar selected state:** the tab for the current page (`/home…`, `/new-training…`, `/profile…`) keeps the filled green (Figma hover) icon; `aria-current="page"`.

### Round 9 — Create flow buttons (from Olivia, 2026-11-18)

- New training steps pass `pinned={false}` to `FlowStep`'s `Step`: Continue / Done sits at the end of the page (pushed to the screen bottom on short pages, after the content on long ones), not fixed. Hiker Log keeps the pinned button.
- Each step's button is greyed out (`ready={false}` → disabled `.btn`) until an answer is picked: Target Hike = tap the hike card (green ring; a hike picked on "Hikes for your level" arrives already picked); Hike Date = a month; Trip Type / Who's coming / Goal = an option; Schedule = at least one day and a time per session.
- `TagGroup`, `ToggleTag` and `HikeCard` (`selected`) can now be controlled.

### Round 10 — Log In vs Sign Up accounts (from Olivia, 2026-11-18)

- **Accounts** (`src/app/account.js`, sessionStorage, `useAccount()` hook): Welcome now says **Log In** (→ demo account: Hudson Kemp, every screen as designed) and **Sign Up** (→ a new, empty account, then the 5 sign-up steps). A new tab starts on the demo account.
- **Sign-up steps save into the account:** name, age, weight, height, sex (`FieldCard` now takes `values` / `onChange`), **Years hiking** (new field on Hiking Experience, not in Figma) and how often they hike.
- **Level** = `levelFor(years)`: < 2 Beginner, < 5 Intermediate, else Advanced.
- **New account screens:**
  - Profile: their name, 0 friends, their years, level, 0 hikes, empty "Completed Hikes" (no "See all"). Photo starts as their initial; tapping it opens the phone's photo picker (`<input type="file" accept="image/*">`), the image is downscaled (`readPhoto`) and kept in the account. Home's avatar uses it too.
  - Friend List: "No friends yet" + Add friends.
  - Health Stats: rows show what they entered ("Add"/"Choose" when empty) and edits save back; steps / monthly charts replaced by "No activity yet"; Heart Rate / Sleep show "--".
  - Home: no hikes liked. Explore hearts save into the account; Saved lists them ("No saved hikes yet" + Explore hikes when empty). Training tab: "No training yet" + **Start training journey** → `/new-training`.
  - Finishing New training saves `training: { hike }`; Home → Training then shows that hike at 0%, and `/training` shows it at 0%: its photo/name/stats, empty readiness ring, no done days, 0 of 3 daily, 0 packed, lessons 0 of 4 (lesson progress is per account).
  - "Hikes for your level" uses their level (Beginner: Grouse Grind, Saint Mark, Wedgemount; Intermediate: Wedgemount, Saint Mark, Panorama; Advanced: as before).
- Shared pieces: `components/Avatar.jsx`, `components/EmptyState.jsx`; `HikeCard` takes `onLike` (controlled heart); `FlowStep` `Step` takes `onNext`.
- **Sign Out** (Settings → Account, red row) resets to the demo account state and goes to `/welcome` (Log In / Sign Up).
- **Sign-up option tags** (`.onb .tag`) use the New training tile shape (12px radius, same padding); the small tags inside expanding rows keep 8×16px padding.

### Round 11 — sign-up lists, steppers, contact text, adding friends (from Olivia, 2026-11-18)

- **Body & Health:** nothing pre-selected (Figma's "Knee Injury" row removed). Sheets are titled "Add Injuries" / "Add Health Conditions"; ticks only count after Done (closing discards), chosen items appear as rows above the Add button and × removes them.
- **Tick rows (`CheckRow`)** match the app's selection pattern: 356 × 57px, 12px radius, white → hover `#e7e7e7` → selected `#d4e6b8` + semibold with the green tick (yellow hover/selected icons dropped).
- **Current Activity:** "Weekly Exercise routine" starts empty; workouts ticked in the "Add Workouts" sheet are added on Done, each with a working −/+ (times per week, 1–7).
- **Safety Setup:** contact fields start with the Figma values (Sarah Lee, +1, Friend) as real text in body grey `#414141`.
- **Friends (new account):** "add friends" / the search bar open a working search over everyone (`PEOPLE` = the 5 friends + Joanna Brown, Joanne Blue, John Bo, who now have profiles). "Add" adds them (chip reads "Added"), the rest of the row opens their profile, whose button shows "+ Add friend" / "− Unfriend" from the account; back returns to where it was opened. Friend List and the Profile friend count use `account.friends`.

### Round 12 — packing icons, Hiker Log, conditions, lesson cards (from Olivia, 2026-11-18)

- **Packing:** back → `/training` (unchanged, confirmed). The ✎ edit and ✓ done corner buttons are vector `IconButton`s (`components/controls.jsx`) in the back-button style (dark hover, white icon) instead of the blurry Figma exports. The edit screen matches "Packing - Edit.png"; Add Item + weight guessing as in Round 5.
- **Hiker Log** answers are kept in `src/app/hikerLog.js` (sessionStorage): date, time, feel, emergency prep, typed emergencies, body, notes.
  - "Add Emergency" opens a text row; entries list above it with × to remove.
  - "How did your body handle this hike?" options: Extremely strenuous / Very challenging / Moderately challenging / Comfortable throughout.
  - Review Details shows what was entered (or "Not answered"), uses the shared HikeCard (the old Figma card base clipped the longer name and "Completed" chip), title wraps, page flows with a 160px clearance for Done.
- **Sign-up conditions:** "None of these" clears the other tags; picking a condition clears "None of these".
- **First aid:** the "i" and "+" badges are removed from the results cards and the "Suggested answer" card.
- **HikeCard:** long names wrap beside the rating instead of overlapping it.

### Round 13 — intro centring, phone bars, bottom strip (from Olivia, 2026-11-18)

- **Splash** keeps the Figma green background; the wordmark is centred on any screen height (`calc(50% - half size)`), not pinned to the 874px frame.
- **Phone browser bars:** `index.html` has `<meta name="theme-color" content="#f5f5f8">`; the splash sets it to green while it shows and back to grey when it leaves, and `html`/`body` are `--app-grey`, so Safari's bars are grey on every screen after the intro.
- **Bottom white strip on iPhone:** `zoom` with `height: 100%` left a gap in iOS Safari. On phones `Device.jsx` now sets the frame to 402 × (screen height ÷ scale) design px, so it exactly fills the screen in Safari and Chrome.
- **Profile top spacing (Round 14):** your Profile tab starts at 68px like Home (`.fp-page--tab`); friend profiles start at 108px, just under the back button.
- **Splash centring (Round 14):** `.splash` is a flex container that centres the wordmark (no `%` offsets inside `zoom`, which iOS Safari resolves differently).
- **Packing corner buttons fix (Round 14):** `.pk-content` (now in normal flow from the top of the page) was covering the ‹ / ✎ / ✓ buttons and swallowing taps; `.pk-back` and `.pk-corner` now have `z-index: 2`. Checked with real taps (hit-testing), not `element.click()`.
- **Packing corner buttons (Round 14):** no dark hover on ‹ / ✎ / ✓; light-grey `#e7e7e7` hover instead (`darkHover={false}`, `.icon-btn`).
- **Round buttons (Round 14, replaces the Round 4 dark hover):** every back, share, ✎ and ✓ button uses one light-grey `#e7e7e7` hover/press (`.back-btn` in `controls.css`, `.share-btn`). The dark-grey hover, the `darkHover` prop and the light-chevron overlay are gone.

### Round 15 — Completed Hike log polish (from Olivia, 2026-11-18)

- **Congrats:** the trail card is the Home `HikeCard` (Brunswick); tapping it selects it (green ring). The old Figma `TrailCard` is gone.
- **Search bars (`.fs-search`):** icon centred on the text line. **`.fs-input` / `.fs-search` text** is body grey; placeholders (e.g. MM/DD/YYYY) are light grey `#ababab`.
- **Every log step's button is greyed out until answered** (pinned button, `ready`): card selected; date + time; feel; emergency prep; body; notes typed.
- **Time to complete:** rounded tiles via the shared `.fs-tiles .tag` (FlowStep.css).
- **Completed Hikes page** (`/profile/completed`): cards are the shared `HikeCard` with the "With Siena & Mark" row; "AYS" shown as "DAYS".

### Round 16 — trail cards, per-hike details, new Training overview (from Olivia, 2026-11-19)

- **Sign-up → Hiker profile / Toughest hike:** the "input" placeholder text is gone (empty until typed / picked).
- **`components/TrailCard.jsx`** ("trail card.png") replaces `HikeCard` everywhere (Home, friend profiles, Completed Hikes, Hiker Log, New training). Difficulty (yellow-1) + type chips from the tag, working heart (own state, or `saved` + `onLike`), swipeable photo carousel (scroll-snap; mouse drag on desktop; dots pick a photo) over a dark bottom fade, rating beside the location, grey stat boxes. Tapping opens `/hike/:id` unless `onClick` is given; `selected` = green ring.
  - With `progress={{ pct, text }}` + `date` it is the "trail-prep-progress card" (date chip, Prep status bar). Used for hikes being trained for (Home → Training; a new account's training hike); these open `/training`.
- **Photos:** each hike has 2–4 photos (`photos` in `data/hikes.js`): the Figma image plus openly licensed Wikimedia Commons photos in `src/assets/hikes/` (resized to 800px). Credits + licences in `src/data/photoCredits.js`, shown at the bottom of each Hike Details page.
- **Hike Details for every hike** (`/hike/:id`; `/hike` = Brunswick), content in `src/data/hikeDetails.js` (researched 2026-11-19 from BC Parks, Metro Vancouver, Grouse Mountain, trail guides, Wikivoyage; Brunswick keeps the Figma copy):
  - More spacing (40px between sections); white key stats; "About this hike" clamped to 2 lines, tap to expand; elevation chart drawn from each hike's profile (`ElevationChart.jsx`); "Fit for you" computed from the demo's logged bests (6.8 km / 726 m; a new account shows "No hikes logged"); "Hazards & logistics" and "Trail challenges" are closed dropdowns (`Collapsible` in `HikeSections.jsx`).
  - Footer: "Start Preparation" → the Create flow with that hike picked (`/new-training?hike=id`), or "View Training Plan" → `/training` for the hike you're training for. Heart = like (new accounts save it). Back returns to where it was opened.
  - Corrected stats (Figma values were off): Saint Mark Summit 11 km / 460 m / 4–5 hrs; Grouse Grind 2.5 km / 800 m / 1–2 hrs.
- **Training overview** ("training overview 3.png"): hero with just the date chip and hike name (`HikeHero minimal`), white readiness card, four tiles (Training Schedule teal → schedule, Bag Check green → packing, Hiking Safety yellow → first aid, About this trail white → `/hike/:id`) with the light-grey round ›. "Hike Completed!" stays below (not in the image) so the hike log is reachable. A new account's page uses their hike and the month/year picked in Create.
- `HikeCard.jsx/.css` deleted.

### Round 17 — card colours, spacing, connected apps (from Olivia, 2026-11-19)

- **First aid module:** "Go Further" and "Trail Etiquette 101" cards are white (were yellow-3); Go Further hover is light grey `#e7e7e7`; the "Suggested · 20 hrs" pill track is app grey.
- **Training overview:** shorter hero (`.hk-hero--minimal`, 310px; was 420px, briefly 260px).
- **Hike Details:** every card has 20px padding with roomier gaps (readiness gap, pace / start-by tiles, hazards, challenges, links); "N flagged" removed from Trail challenges; "Siena & 3 friends training" shows on every hike's banner (a new account only once it has friends).
- **Daily Training** (`/training/schedule`): the Prep status box is removed.
- **Settings:** has the nav bar; new **Connected Apps** row under Account → `/profile/settings/apps` (nav bar too): Apple Watch, Apple Health, Strava, Garmin Connect, Google Fit, Fitbit with switches (`ToggleSwitch` takes `defaultOn`); the demo account starts with Apple Watch + Apple Health on, a new account with none.
- **Packing edit (Round 17):** no pencil next to the "Packing" title.
- **Hike Details banner (Round 17):** 12px between chips, name, location and friends line (was 6px).

### Round 18 — quiz feedback layout (from Kenny, 2026-11-20)

- **After Check** the question card is replaced by the Figma "Right or wrong" (`1646:12263`) cards (`first-aid/Feedback.jsx` + `Feedback.css`), for every lesson:
  - Card 1: the situation's name as the title (answers are free text, so no "Correct!"), a photo (Heat only), then what is happening (`feedback`).
  - Card 2: **Next Steps** (`steps`), then a round 121px photo in the eye-ring slot (yellow-1 ring) beside the key points, styled like "Treating for Shock" (scenario 1 keeps Figma's W·A·R·T·S).
  - Pinned Retry / Next bar (Figma group `2124:5149`, now the shared `ActionBar` in `parts.jsx`, also used by Results). Retry restarts the same scenario (empty answer, 3:00); the main button reads "Next scenario" / "See results".
- **Data:** each scenario's old `answer` is split into `title` / `feedback` / `steps`, keeping the original sentences. Heat photos, credits and key points live in `src/data/heatVisuals.js`.
- **Photos** are openly licensed from Wikimedia Commons, resized to 800px in `src/assets/first-aid/heat/`, credited in small print under the cards. This environment now allows `commons.wikimedia.org`, `upload.wikimedia.org` and `thumb.wikimedia.org`.

### Round 19 — quiz photos fixed, Profile spacing, one training page per hike (from Kenny, 2026-11-20)

- **Quiz photos:** every Heat scenario now has both photos (16 files in `src/assets/first-aid/heat/`). The missing ones had failed on Wikimedia's rate limit (HTTP 429) for full-size originals; they are now taken as standard-size thumbnails (`thumb.wikimedia.org`). Scenario 8's feedback image is the EPA "Slip, Slop, Slap & Wrap" sun-safety poster (playful animal theme; swap if it feels off).
- **Profile spacing** (`FriendProfile.css`, so friend profiles match): sections 25 → 36px, header lines 12 → 16px, photo ↔ text 20 → 24px, title → first card 16 → 20px, between hike cards 16 → 24px.
- **One training page per hike:**
  - `/training` shows the training you opened last (`account.activeTraining`, set by `openTraining(hike)`); `useTraining()` / `trainingsFor(account)` in `app/account.js`.
  - Demo trainings live in `src/data/trainings.js`: Brunswick (Figma values) and Black Tusk (from its Home card: Jun 23–24, 34%, 7 months to go; "On track" set to fit).
  - Home → Training lists every training; each card opens its own page. Hike Details shows "View Training Plan" for any hike you train for.
  - New training works on both accounts (`planTraining`, `startTraining`): Done adds the hike to Home → Training at 0% (newest first) and opens it. The single `account.training` field is replaced by `trainings: []` (old sessions still read).
  - The readiness ring is drawn from the training's % (SVG, was a fixed 82% image).
  - Packing subtitle, Hiking Safety title and the Hike Completed log (search field, trail card, review title) use the opened hike's name.
  - Still shared across hikes: packing items, lesson progress, the week strip and Home's "Today's training" (Brunswick).

### Round 20 — practice screen from Figma 2579:6448, bottom fades, keyboard (from Kenny, 2026-11-20)

- **Practice question** (`first-aid/Practice.jsx` + `Practice.css`) follows Figma "First aid module" `2579:6448`; every box was measured against the frame (back, title, timer, tag, image, sheet, count, question, answer box, "?", pill, Skip, Check all at the Figma x/y/size):
  - 50px `#d9d9d9` back button; "First aid fundamentals" + "Practice" (Medium 30px); timer in a 79×63 light-teal box (yellow-3 at 0:00); lesson tag under the title.
  - 402×308 image block (Figma grey placeholder) = the lesson photo (Heat: the Heat Exposure photo; not the per-scenario photos, which give answers away). White sheet overlaps it by 89px.
  - Sheet: "Scenario n of N", the question at 222px wide, yellow-3 answer box 320×172 with placeholder "Type your answer___" and the 33px `#595959` "?" (tap = shows the hint under the question).
  - Bottom: `#f5f5f5` pill with **Skip** (green, 124px) and **Check** (yellow-2, 204px). Check is always enabled, as in the frame (Round 4 had it grey until typed).
- **Shared header:** `PracticeTop` in `parts.jsx` is used by the question, the feedback after Check and the lesson results, so the screens no longer jump between header styles. `PracticeHeader` / `ScenarioBar` and the old question CSS were removed.
- **Bottom fades:** the question bar has a white fade (clear → white over 80px) under the pill; the Retry / Next and Retry / Continue bars fade to the page grey `#f4f4f4` under their blur.
- **Mobile keyboard** (`app/Device.jsx`, app-wide): on phones the frame follows `window.visualViewport` (height + iOS `offsetTop`), so it shrinks to the area above the keyboard and pinned bars ride on top of it; the focused field is scrolled into view (`scroll-margin` on the answer box clears the bar). Checked with a simulated 336px keyboard on a 390×844 screen: question, typed text and Skip / Check all stay visible.

### Round 21 — practice: hint below, no timer, lighter box while typing, aligned text (from Kenny, 2026-11-20)

- **Hint** is back below the answer box (Round 4 style): grey "Hint" tag (hover `#e7e7e7`, selected `#d4e6b8`), tap shows the hint text under it. The "?" circle inside the box is gone. On a full-size phone the Hint tag sits just under the Skip / Check bar, so it is reached by scrolling a little.
- **No timer** anywhere in the lesson (question, feedback, results): it's a learning module. The countdown and the teal timer box are removed.
- **Answer box while typing:** fills lighter (`#fff6e3`, yellow-3 halfway to white) with the yellow-2 outline; back to yellow-3 when you leave it.
- **Alignment:** "Scenario n of N", the question and the hint start at the answer box's left edge (x 32) and use its 320px width (were indented 5px and 222px wide).
- **Keyboard fix hardened** (`Device.jsx`): the focused field is scrolled into view in a layout effect after the frame resizes, not before (it could run against the old frame size).

### Round 18 — first aid content, course filters, sign-up required fields (from Olivia, 2026-11-22)

- **Dropdown standard:** the Home "Sort" menu (`components/Dropdown.jsx`) is the one dropdown. Sign-up option rows (Sex, Toughest hike Distance / Elevation / Time) now open it; `FieldCard`'s expanding tag panels are gone.
- **Placeholders:** light grey `#ababab` everywhere (`.type-field--light`, field-card "Choose", practice answer box). The practice box uses body text (Poppins 16px, `#414141`); its placeholder is "Type your answer. . .". (The timer was already removed.)
- **Lessons** (`data/firstAid.js`): `intro` is now sections `{ h?, p }` that teach everything the scenarios test; `overview` bullets show in a white "Overview" card above Start lesson. Repeated scenarios cut. Counts are now Dehydration 7, Scramble 7, Heat 7, Snowy Peaks 4 (added "Soaked in cold water"). The heat visuals for the removed "Can't keep fluids down" scenario were removed with it.
- **Legal side:** no chevrons on the "Steps to take" boxes.
- **Get certified:** courses in `data/courses.js` (11 real courses, links checked 2026-11-22). Course level and category (single-select each) filter the list; nothing picked = all. "Wilderness" category added (not in Figma). Cards show the length and "See dates" (Figma's dates/prices had passed); each opens its own course page. Categories and courses are now in normal flow.
- **Sign-up:** "Create Account" (was Sign Up). Required fields get a red `*` before the title and grey out the button until filled: Name, Years hiking, Daily steps, Weekly exercise routine (≥1 workout). Steps with only optional fields (Body & Health, Safety Setup) say **"Skip for now"** until something is entered (`SKIP_LABEL` in `Onboarding.jsx`).
  - Weight / Height have a unit toggle (lbs ↔ kg, ft ↔ cm); saved with the unit, e.g. "150 lbs".
  - "How often do you hike?", "Lower Back Pain".
  - Emergency contact fields are empty with grey placeholders (Jane Doe / +1 / Friend).
  - Toughest hike: a search bar opens a "Toughest Hike" bottom sheet (search + the Explore hikes). Picking one fills Distance / Elevation / Time. `BottomSheet` takes `onSearch` and `searchPlaceholder`.
- **Sign-up answers carry over** (new account fields in `account.js`): Health Stats shows an "Activity & Health" section (daily steps, weekly exercise, injuries, conditions, emergency contact). Hike Details "Fit for you" compares the hike against the toughest hike entered (the picked hike's stats, or the top of the chosen ranges).

### Round 19 — spacing + styling pass, Legal steps, "None" exercise (from Olivia, 2026-11-22)

App-wide patterns (measured on every route at 402px; outliers fixed):

| Pattern | Standard |
| --- | --- |
| Side gutter | 23px (Hike Details, Training, First aid module, Legal / Get certified cards, Practice / Results were 20–32px) |
| Back button | 45px circle at (23, 48); Practice / Results had a 50px grey Figma variant, Completed hikes sat at 60px |
| Page title | 700 30px `--body-copy-gray`, first line at y 125 (kicker pages: kicker at 125); `#474747` and 500/600 weights removed |
| Section heading | 600 20px body grey (`.fa-section-title` was 16px black) |
| Vertical rhythm | title → first section 28px, between sections 32px, heading → content 20px (Health, Settings) |
| Main button | 356 × 68, 41px from the bottom when pinned (Packing Save, Training "Hike Completed!" were off) |
| Two-button bar | nav-bar pill with 53px controls: Practice Skip / Check now uses the shared `ActionBar` (`retryLabel`, `nextVariant`) |
| Cards / tiles | 12px radius, 16–20px padding (course level tiles were 20px radius) |

- **Legal side:** all three "Steps to take" boxes, without arrows; heights now fit their text. "Get First-aid certified" sits after the steps (not pinned) so it never covers step 3. The page is in normal flow.
- **Get certified:** in normal flow from the title down.
- **Practice:** question text 16px body; answer box and hint use the full 356px width.
- **Sign-up → Weekly Exercise routine:** "None" tag (`account.noExercise`) answers the required question; adding a workout clears it. Health Stats shows "None".

### Round 20 — training pages, packing per hike, Manage Profile, units (from Olivia, 2026-11-22)

- **First aid intro:** the Overview card sits right after the first paragraph.
- **Weight / height units:** `components/MeasureInput.jsx` keeps the unit beside the number while typing (Health Stats edit, sign-up, Manage Profile). Height in ft has separate ft and " boxes. Stored as "186 lbs" / `6ft 3"` / "173 cm". Sign-up rows have an lbs|kg and ft|cm switch.
- **Settings → Manage Profile** (`/profile/settings/profile`, `ManageProfile.jsx`): Name + every sign-up field, using the same components. The sign-up steps are now thin wrappers around `ExperienceFields` / `ActivityFields` / `HealthFields` / `SafetyFields` (+ `ProfileCard`) in `Onboarding.jsx`. Bottom sheets render through `ScreenPortal` (`Screen.jsx`), so they stay pinned wherever they're used. Profile fields (`PROFILE_KEYS` in `account.js`) also save on the demo account; Hudson's defaults are the Figma values (+ "Knee Injury", which puts the Knee Brace on his packing list). Settings title → first section is now 36px (Health too).
- **Training Schedule** (`/training/schedule`): month/year and week strip follow today's date; ‹ › change week. Dots = training days (faded until done). A new training only trains on the days picked in New training → Your training schedule (saved with the training, with time per session and trip type); other days show "Rest day". Rows: tick on the left, name + › open the exercise.
- **Exercise page** (`/training/exercise/:id?date=`, "Training - Endurance.png"): title = the row text, "Month D Workout n/N", photo/drawing, 5:00 timer, progress bar, ‹ / Start → pause/play / ›. Finishing ticks the exercise off (`app/workouts.js`, sessionStorage). Exercises + daily plans in `data/exercises.js`; images from Wikimedia Commons (credited on the page).
- **Training overview** ("training overview 5.png"): "About this trail" dropdown (key stats, about text, link to Hike Details), readiness card, Training Schedule card (today's next exercise, n/N completed, "View today's training"), Hiking Safety (lessons done / 4) and Bag Check (items packed). Nav bar kept; "Hike Completed!" kept below.
- **Trip Type:** options that aren't realistic for the hike are greyed out with a reason (`tripLimits` in `data/hikes.js`; e.g. Mt. Everest → no Day hike / Overnight).
- **Packing:** opens on To Pack (`/packing` → `/packing/to-pack`). Lists come from `data/packing.js` per training: hike, month (snow Nov–Apr or 3,000 m+ → Winter Gear, else Layers; Jun–Sep → sun hat/sunscreen/sunglasses), scramble → helmet + gloves, overnight/multi-day → Camping, BC → bear spray, knee injury → knee brace. Food & Water follows the first aid lessons (water ≈ 0.5 L/hour, electrolytes, salty snacks, filter/tablets, thermos in the cold). No calories anywhere. Ticks, added items, bag and weight limit are kept per training (`app/packing.js`); Packed / Weight stats are computed. "Bag" text field under the subtitle. Camping uses the mountain icon and Layers the winter-gear icon until new icons are provided.

### Round 21 — no repeated profile content, unit dropdowns, packing remove, typo pass (from Olivia, 2026-11-22)

- **Training overview:** "About this trail" stat boxes are white.
- **Health Information vs Settings (nothing repeats):**
  - Health Information owns Gender / Age / Weight / Height and Activity & Health (daily steps, weekly exercise, injuries, health conditions, emergency contact).
  - Tapping an Activity & Health row opens the sign-up field for it underneath (`FieldOptions` hides labels/asterisks; `ActivityFields` / `HealthFields` take `parts`).
  - Weight / Height: number (tap to type) + a unit dropdown (`UnitDropdown`, Home "Sort" look) that converts the value (`convertWeight` / `convertHeight` in `MeasureInput.jsx`). Sign-up step 1 uses the same dropdowns.
  - Settings → Manage Profile keeps only Name + Hiking Experience, with no asterisks.
- **Packing → Edit:** each item has a "−" (instead of the tick circle) that removes it from this training's list (`removed` in `app/packing.js`; re-adding the same name brings it back). The Camping (mountain) icon is shown at 18px.
- **Home → Training "Today's training":** today's date and the same exercises/ticks as Daily Training.
- **Typos fixed** (supersedes Open question 7 where they overlap): "protects", "real-life courses give", "it’s good to recuperate", "Hydration and rest", "5–15 minutes", "83 bpm", "affects a lot of people" / "You can avoid heat exposure", "There were no emergencies", "Kathmandu, Nepal", "St. John Ambulance", "Weekly exercise routine", "6:45 AM" / "6:30 AM", "Stair Climber · lv. 6". Checked with the macOS spell + grammar checker and a read-through of all UI copy.

### Round 22 — one "−/+" style, grey inputs, years stepper (from Olivia, 2026-11-22)

- **Health Information:** no pencil icons; tapping the value still edits it.
- **Inputs:** every text input box is the grey field (#ededed, 12px radius, 16px text, #ababab placeholder, light-green focus ring). Changed: Home / Friend List / Completed hikes search bars (were white, 13px) and the First aid practice answer box (was yellow).
- **"−" / "+" everywhere = `components/Stepper.jsx`:** `SignButton` (Figma green stepper circle, 36px tap target, light-grey hover/press, faded when disabled), `SignIcon`, and `Stepper` ("− n +" in a white box). Used by: weekly workout sessions (sign-up / Health), max packing weight, Years hiking, Packing Edit's remove button, and the friend profile's Add friend / Unfriend. (The orange "×" remove icon in sign-up lists and the Hiker Log is a different control and is unchanged.)
- **Years hiking** (sign-up step 2 + Manage Profile): a stepper (0–70) instead of typing. It shows a grey 0 until answered; on a blank stepper "−" answers 0, "+" goes to 1. Continue unlocks once answered.

### Round 23 — "×" → "−", white chosen rows (from Olivia, 2026-11-22)

- Every remove "×" (orange `remove-item.svg`) is now the shared green `SignButton` "−", on the left of the row like Packing → Edit: sign-up / Health injuries and health conditions, the picked toughest hike, and Hiker Log emergencies.
- Chosen-item rows (`.onb__chosen`: workouts, injuries, conditions, toughest hike) are white (were yellow #ffe9bd).
- Manage Profile: Years hiking has no asterisk (`FieldOptions required: false`); the asterisk stays only on the sign-up step where the answer is required.

### Round 24 — "−" look (from Olivia, 2026-11-22)

- Every "−" (`SignButton` / `SignIcon` in `components/Stepper.jsx`) is a light-grey circle (#e7e7e7) with a dark bar, turning light red (#f6c6c1) on hover / press. "+" keeps the green Figma circle. On the grey Unfriend pill the "−" circle is white so it stays visible (light red when the pill is hovered).

### Round 25 — shared profile card, age stepper, unpinned sign-up button (from Olivia, 2026-11-22)

- **`components/ProfileCard.jsx`** is the one Gender > Age > Weight > Height card, used by sign-up step 1 ("Hiker profile") and Health Information ("Basic Information"). Edit it there, not per screen. Replaces Health's separate white rows and tap-to-edit.
- **Age** is a −/+ stepper (`.stepper--compact`, 1–120) in both places, with no pencil. Blank shows a grey 18 (not from Figma) and saves nothing until tapped: "−" answers 18, "+" goes to 19.
- **Gender** (was "Sex" in sign-up) has one option list: Female / Male / Non-binary / Prefer not to say. Still stored as `account.sex`.
- **Health → Activity & Health** rows are the grey sign-up field (#ededed), with the same value text and arrow as the card. The editors underneath are the sign-up components.
- **Sign-up steps:** Continue / Skip for now / Done is in the page flow on all 5 steps (bottom of the screen on short pages, after the content on long ones). Bottom-sheet Done buttons stay pinned.
- **`MeasureInput`** saves on every keystroke, so half-typed values must parse back unchanged: "84." (decimal being typed), `ft 3"` (feet cleared), `6ft "` (inches cleared).

### Round 26 — "Sex", saved starting age, press and hold (from Olivia, 2026-11-22)

- The profile card's first row says **Sex** (replaces "Gender" from Round 25), on sign-up and Health Information. Same four options.
- **Age starts saved at 18** for new accounts (`START_AGE` in `app/account.js`), shown as a real value (replaces Round 25's unsaved grey 18).
- **Press and hold on every `Stepper`** (`components/useHoldRepeat.js`): a tap is one step; holding repeats after 400ms (120ms apart, then 70ms) until released or at the limit. Remove "−" buttons (`SignButton` on its own) don't repeat.

### Round 27 — "+" look (from Olivia, 2026-11-22)

- Every `SignButton` / `SignIcon` "+" is a light-green circle (`--light-green`) with a dark "+", turning PeakPrep green (`--main-green`) with a white "+" on hover / press. No grey ring around "+" or "−" (replaces the Round 22 ring and green Figma circle). On the light-green Add friend pill the circle is white, like "−" on Unfriend.
- The "+" inside "Add …" rows (`AddItem`) is a different control and keeps its Figma icon.

### Round 28 — one "+" on every screen, Intersex (from Olivia, 2026-11-22)

- **Sex** options: Female / Male / Intersex / Prefer not to say. An earlier saved "Non-binary" is not converted; it shows "Choose".
- **Every "+" is `SignIcon sign="plus"` inside a `.plus-btn`** (replaces Round 27's exceptions). Light-green circle + dark mark → PeakPrep green + white mark on hover, press and hold. Nothing else on the control changes. Never add a per-button "+" colour; use this class.
  - Steppers, every "Add …" row (`AddItem`, no row tint any more), Add friend (pill is now white so the circle shows, no tint), the profile-photo badge and the nav bar Create tab (25px `large` icon; stays green on `/new-training…`).
- `src/app/pressed.js` sets `data-held` on the pressed "+" / "−", since phones drop `:active` during a long press.

### Round 29 — nav "+" exception, emergency contact moved (from Olivia, 2026-11-22)

- **The nav bar Create "+" is the one and only exception** to the Round 28 "+" style. It keeps its Figma icon (plain dark "+" → green "+", 300ms). Don't give it `plus-btn` / `SignIcon`.
- **Emergency contact** (name, phone, relationship, share trip plan) is edited in Settings → Manage Profile, under its own "Emergency Contact" heading, and no longer appears on Health Information (replaces Round 21's split). Sign-up step 5 is unchanged and uses the same saved values.
