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

### Round 16 — Training spacing + calendar arrows (from Kenny, 2026-11-19)

- **Training overview spacing:** sections 44px apart (was 28), 20px inside a section (was 16), 28px top padding; Prep status and the Hiking safety card have 20px padding and gaps; "Daily training" label has 4px extra above. Hiking safety is now its own section (it sat inside Bag check, 16px under Packing List). Bag check tiles fill the column width (were 353px, short of the buttons' edge).
- **Calendar arrows** (`src/screens/hike/TrainingCalendar.jsx`, used by Training overview and Training Schedule): ‹ / › step one month (October 2026 → September 2026, December 2026 → January 2027), no limit. The selected day number is kept (clamped to the month's length) and the strip shows the Sun–Sat week around it. October 2026 shows the Figma week and dots; other months show real dates with no training dots (no data in Figma). Arrows have the round-button `#e7e7e7` hover. The daily training list doesn't change with the month.
- **Heat Exposure graphic (open):** Figma `2525:4433` is the Hiking safety card with an empty 214px area at the top of the card (no image layer in the frame). Waiting on Kenny for the graphic and where it goes.
