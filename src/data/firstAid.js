import fireMask from '../assets/first-aid/fire-mask.png'
import snowIcon from '../assets/conditions/snow.png'
import dropIcon from '../assets/hike/drop.svg'
import mtnIcon from '../assets/hike/mtn-20.svg'
import heatPhoto from '../assets/first-aid/heat-exposure.png'
import snowPhoto from '../assets/profile/everest.jpg'
import waterPhoto from '../assets/home/wedgemount-lake.jpg'
import scramblePhoto from '../assets/home/mount-brunswick.jpg'
import { withHeatVisuals } from './heatVisuals.js'

/**
 * "Brunswick Mountain Trail Safety" lessons. Order = lesson list order in Figma.
 * Each scenario: `text` (the situation), `hint`; after Check, `title` + `feedback` (what is happening)
 * and `steps` (Next Steps). Heat scenarios also have `photo`, `stepsPhoto` and `key` (see HEAT_PHOTOS).
 *
 * Written for this prototype from general first-aid guidance (Canadian Red Cross /
 * Wilderness Medical Society / NOLS style). It teaches recognition and first
 * steps; it is not a substitute for a certified first-aid course.
 * In BC: call 911 for help in the backcountry; search and rescue does not charge.
 */
export const LESSONS = [
  {
    slug: 'dehydration',
    name: 'Dehydration',
    tag: 'Hydration situations',
    icon: dropIcon,
    photo: waterPhoto,
    intro: [
      'Dehydration happens when you lose more fluid than you drink. On a long, steep climb you lose water and salt through sweat and heavy breathing, often faster than you notice. Early signs are subtle: headache, tiredness, a slower pace and dark urine.',
      'Drink small amounts often instead of waiting until you are thirsty, carry electrolytes or rehydration salts, eat salty snacks, and know how you will treat water on the trail. Too much plain water without salt can also make you sick.',
    ],
    scenarios: [
      {
        text: 'Three hours into the climb, a hiker in your group has a headache, feels unusually tired and says their urine is dark. They have barely touched their water. What do you do?',
        hint: 'Urine colour is a quick hydration check.',
        title: 'Mild dehydration',
        feedback: 'A headache, tiredness and dark urine are early signs of mild dehydration: they are losing more fluid than they drink.',
        steps: 'Stop and rest in the shade. Have them sip water steadily with electrolytes and eat a salty snack, rather than drinking a whole bottle at once. Continue only once the headache eases, and drink small amounts every 15–20 minutes from then on.',
      },
      {
        text: 'Your group runs out of water halfway up. There is a fast-flowing creek just off the trail. What do you do?',
        hint: 'Is the water safe to drink as it is?',
        title: 'Treating creek water',
        feedback: 'Creek water can look clean and still carry bacteria and parasites, so treat it before drinking.',
        steps: 'Collect from the moving part of the creek, then use a filter, purification tablets (wait the full contact time) or boil it. If you truly have no way to treat it and someone is becoming dehydrated, drinking untreated water is the lower risk. Reassess whether to continue with the water you can carry.',
      },
      {
        text: 'A hiker has been drinking plain water all day but has eaten very little. Now they feel nauseous, have a headache, seem confused and their hands look swollen. What do you do?',
        hint: 'Can you drink too much water?',
        title: 'Hyponatremia',
        feedback: 'This could be hyponatremia (low blood sodium), not dehydration, so do not push more water.',
        steps: 'If they are fully alert, give salty snacks or an electrolyte drink and let them rest. Confusion, vomiting or worsening headache make this an emergency: call 911 and do not let them hike out alone.',
      },
      {
        text: 'After a break, your friend stands up quickly, feels dizzy and has to sit back down. Their mouth is dry and their heart is racing. What do you do?',
        hint: 'Rehydration salts work faster than plain water.',
        title: 'Moderate dehydration',
        feedback: 'Dizziness when standing, a dry mouth and a racing heart mean their body is short on fluid. Treat this as moderate dehydration.',
        steps: 'Have them sit or lie down and sip an oral rehydration solution (or water with electrolytes and a snack). Rest until the dizziness passes, then stand up slowly. Slow the pace afterwards and consider turning back if symptoms return.',
      },
      {
        text: 'A hiker has vomited twice and has diarrhea. Every time they drink, it comes back up. What do you do?',
        hint: 'How will they replace what they are losing?',
        title: 'Can’t keep fluids down',
        feedback: 'Someone who cannot keep fluids down cannot rehydrate on the trail.',
        steps: 'Stop, keep them shaded and comfortable, and offer tiny sips (a mouthful every few minutes) of rehydration solution. If it continues, call for help and plan the shortest, easiest way down. Do not wait until they are too weak to walk.',
      },
      {
        text: 'You are planning water for Brunswick Mountain Trail: 14.3 km, 1,539 m of elevation, 7–9 hours. How much should you carry?',
        hint: 'Think in litres per hour of hiking.',
        title: 'Planning your water',
        feedback: 'Plan on roughly 0.5–1 L per hour of hard hiking, more in heat. For a 7–9 hour day that is about 3–4 L per person, plus electrolytes.',
        steps: 'Check where water sources are before you go, and carry a filter or tablets so you can top up safely.',
      },
      {
        text: 'It is a cold, snowy day. Your friend has hardly drunk anything because they say they are not thirsty. What do you do?',
        hint: 'Does thirst work the same way in the cold?',
        title: 'Dehydration in the cold',
        feedback: 'Cold dulls thirst, but you still lose water through sweat under your layers and by breathing cold, dry air.',
        steps: 'Drink on a schedule rather than by thirst. Warm drinks from an insulated bottle help, and keep bottles inside your pack or upside down so they do not freeze shut.',
      },
      {
        text: 'Late in the day, a hiker has severe muscle cramps, has not needed to pee in hours and is becoming confused. What do you do?',
        hint: 'Confusion changes everything.',
        title: 'Severe dehydration',
        feedback: 'Severe cramps, no need to pee for hours and confusion mean this is severe dehydration, and an emergency.',
        steps: 'Stop, get them into shade and keep them still. If they are fully alert, give small sips of rehydration solution; if they are confused or drowsy, do not force fluids. Call 911 for help and keep someone with them at all times.',
      },
    ],
    result: {
      copy: 'Dehydration builds slowly and is easy to miss. Small, regular drinks with electrolytes are better than large amounts at once.',
      takeaways: [
        'Drink 0.5–1 L per hour of hard hiking, more in heat',
        'Add electrolytes and salty snacks, not only plain water',
        'Treat creek water before drinking it',
        'Confusion or vomiting: stop and call 911',
      ],
    },
  },
  {
    slug: 'scramble',
    name: 'Scramble Safety',
    tag: 'Scrambling situations',
    icon: mtnIcon,
    photo: scramblePhoto,
    intro: [
      'A scramble is steep terrain where you need your hands as well as your feet. The final section of Brunswick Mountain Trail is an exposed, rocky scramble where a slip or falling rock can cause serious injury.',
      'Keep three points of contact, test every hold before you trust it, and never climb up something you cannot climb back down. Wear a helmet, spread out so you are not directly below others, and turn around if the rock is wet or the weather changes.',
    ],
    scenarios: [
      {
        text: 'On the final scramble, your partner freezes on a ledge. They are scared and say they cannot move. What do you do?',
        hint: 'Focus on one move at a time.',
        title: 'Frozen on a ledge',
        feedback: 'Fear can freeze anyone on exposed rock, and rushing makes it worse. Stay calm and speak slowly.',
        steps: 'Make sure they have three points of contact, then talk them through one hand or foot placement at a time. Do not rush or pull on them. If going up is not safe, help them climb down the way they came and turn around.',
      },
      {
        text: 'A rock comes loose under your foot and starts falling towards hikers below you. What do you do?',
        hint: 'What should you shout?',
        title: 'Falling rock',
        feedback: 'Shout "ROCK!" loudly, straight away.',
        steps: 'People below should not look up; they should cover their head and move in close to the rock face. Afterwards, check that nobody was hit and spread the group out so no one is directly below another person.',
      },
      {
        text: 'A hiker slips, hits their head on a rock and has a bleeding cut on their scalp. They seem dazed. What do you do?',
        hint: 'Head wounds bleed a lot, and may hide more.',
        title: 'Head injury',
        feedback: 'Head wounds bleed a lot, and can hide a concussion.',
        steps: 'Make sure you are both in a secure spot first. Check ABCs, then press a clean dressing firmly on the wound. Watch for concussion signs: confusion, vomiting, worsening headache or unequal pupils. If they fell any distance or have neck pain, keep them still and call 911.',
      },
      {
        text: 'The route above looks much harder than you expected and clouds are rolling in. Your group wants to push on to the summit. What do you do?',
        hint: 'Can you reverse every move?',
        title: 'Time to turn around',
        feedback: 'Do not climb up what you cannot climb down. Wet rock is slippery and cloud can hide the route.',
        steps: 'This is the time to turn around. The summit will still be there; plan another attempt in better conditions.',
      },
      {
        text: 'You reach for a large flake of rock and it shifts when you pull on it. What do you do?',
        hint: 'Push before you pull.',
        title: 'Loose rock',
        feedback: 'Do not put your weight on it.',
        steps: 'Keep your other three points of contact, then move to solid rock. Test holds by pushing or tapping before you trust them, and warn the people behind you about the loose flake.',
      },
      {
        text: 'Your partner slips a short distance on exposed terrain and now has severe ankle pain. They cannot put weight on it. What do you do?',
        hint: 'Is it safer to move them, or to call for help?',
        title: 'Ankle injury',
        feedback: 'Do not try to carry someone down an exposed scramble.',
        steps: 'Secure them where they are and only move them if they are in immediate danger. Check for other injuries, then pad and splint the ankle. Keep them warm and call 911 for search and rescue.',
      },
      {
        text: 'Your group of four is about to climb a narrow gully full of loose rock. How do you move through it?',
        hint: 'Where does falling rock go?',
        title: 'Loose gully',
        feedback: 'Rock falls down the line of the gully.',
        steps: 'Either move as a tight group so a dislodged rock cannot gain speed, or go one at a time and wait out of the fall line. Wear helmets and call out before moving.',
      },
      {
        text: 'On the ridge you lose the route and cannot see any trail markers. Your phone is at 15% battery. What do you do?',
        hint: 'Stop and think before you go any further.',
        title: 'Lost the route',
        feedback: 'Stop. Do not push into unknown terrain.',
        steps: 'Retrace your steps to the last place you were sure of the route, and check an offline map or GPS. Turn on airplane mode to save battery. If you are still lost, stay where you are, keep warm and call 911.',
      },
    ],
    result: {
      copy: 'Most scrambling accidents come from rushing, loose rock and pushing on when conditions change.',
      takeaways: [
        'Three points of contact on every move',
        'Test holds before you trust them',
        'Never climb up what you cannot climb down',
        'Shout "ROCK!" and spread the group out',
      ],
    },
  },
  {
    slug: 'heat',
    name: 'Heat Exposure',
    tag: 'Heat-related situations',
    icon: fireMask,
    photo: heatPhoto,
    // Copy from Figma 1646:12254.
    intro: [
      'Heat exposure is caused by overexposure to the sun. On a long climb, hard effort and not enough water can add up and effects a lot of people.',
      'Ways to avoid heat exposure by starting your hike early in the cooler part of the day, drinking water consistently, and wearing loose, light clothing. Slow your pace on sunny, exposed sections and rest in the shade whenever you can.',
    ],
    // Photos + key points per scenario: src/data/heatVisuals.js
    scenarios: withHeatVisuals([
      {
        // Figma 1646:12155 scenario.
        text: 'A hiker is experiencing dizziness, weakness and is barely able to continue in exposed terrain. What do you do?',
        hint: 'Get them out of the sun first.',
        title: 'Heat exhaustion',
        feedback: 'This is heat exhaustion: their body is overheating and losing fluid faster than they can replace it.',
        steps: 'Move them into the shade, have them rest and loosen extra layers. Give sips of water with electrolytes and cool them with a wet cloth or by fanning. Treat for shock and reassess every 5–15 minutes. If they are not better within 30 minutes, call for help.',
      },
      {
        text: 'Your friend’s skin is hot, red and dry. They have stopped sweating, are confused and slurring their words. What do you do?',
        hint: 'Notice the change in how they think and speak.',
        title: 'Heat stroke',
        feedback: 'This is heat stroke, a life-threatening emergency. Hot skin with confusion or slurred speech means the brain is overheating.',
        steps: 'Call 911 now. Cool them as fast as you can: shade, remove extra clothing, soak them with water and fan them, with cold packs on the neck, armpits and groin. Do not give drinks unless they are fully alert.',
      },
      {
        text: 'On a steep, sunny section, a hiker is sweating heavily and gets painful cramps in their calves. What do you do?',
        hint: 'Cramping muscles are low on more than water.',
        title: 'Heat cramps',
        feedback: 'These are heat cramps. Heavy sweating washes out salt as well as water.',
        steps: 'Stop and rest in the shade, gently stretch the muscle, and give an electrolyte drink or a salty snack. Do not continue hard climbing until the cramps are gone.',
      },
      {
        text: 'It is midday on an exposed ridge, two hours from the summit. Everyone feels sluggish and half your water is gone. What do you do?',
        hint: 'How much water will you need to get back down?',
        title: 'Your turnaround point',
        feedback: 'Pushing on in the hottest part of the day is how heat exhaustion starts.',
        steps: 'Rest in the shade and slow the pace. If half your water is gone, you need the rest for the descent, so this is your turnaround point.',
      },
      {
        text: 'A hiker recovered from heat exhaustion after resting for 30 minutes. Now they want to keep going to the summit. What do you do?',
        hint: 'Feeling better is not the same as full strength.',
        title: 'After heat exhaustion',
        feedback: 'Feeling better is not the same as full strength. After heat exhaustion they are at higher risk for the rest of the day.',
        steps: 'Recommend heading down. Descend slowly, keep them hydrated and cool, stay together, and watch for symptoms coming back.',
      },
      {
        text: 'A hiker is pale, clammy and nauseous. They try to drink water but vomit it back up. What do you do?',
        hint: 'Can they actually keep fluids in?',
        title: 'Can’t keep fluids down',
        feedback: 'Pale, clammy skin and nausea are signs of heat exhaustion, and someone who keeps vomiting cannot rehydrate.',
        steps: 'Keep them resting in the shade and cool them down. Offer tiny sips often instead of large drinks. If they still cannot keep fluids down, they cannot recover on the trail: call for help and plan the easiest way down.',
      },
      {
        text: 'On a hot afternoon, a hiker collapses and does not respond when you call their name. What do you do?',
        hint: 'Start with the ABCs.',
        title: 'Unresponsive hiker',
        feedback: 'A hiker who collapses in the heat and does not respond needs emergency help straight away.',
        steps: 'Check the scene is safe, then check for a response and breathing. Call 911. If they are not breathing normally, start CPR. If they are breathing, place them in the recovery position in the shade and begin cooling them straight away.',
      },
      {
        text: 'The forecast for your Brunswick Mountain Trail hike is 30°C. What do you change in your plan?',
        hint: 'Think about timing, water and clothing.',
        title: 'Planning for a hot day',
        feedback: 'At 30°C the climb itself becomes a heat risk, so plan around the hottest hours.',
        steps: 'Start very early to climb in the cooler hours. Carry extra water and electrolytes, wear loose light-coloured clothing, a sun hat and sunscreen. Set a turnaround time, take breaks in the shade, and agree as a group to turn back if anyone feels unwell.',
      },
    ]),
  },
  {
    slug: 'snowy-peaks',
    name: 'Snowy Peaks',
    tag: 'Cold-related situations',
    icon: snowIcon,
    photo: snowPhoto,
    intro: [
      'Snowy Peaks covers cold injuries: hypothermia and frostbite. Snow can stay high on the mountain late into the season, and on an exposed summit, wind, wet clothing and a long stop can cool your body quickly, even on a mild day.',
      'Stay dry by removing layers before you sweat, carry a warm layer, hat and gloves, and keep eating and drinking. Watch for the "umbles": stumbles, mumbles, fumbles and grumbles. They are early signs that someone is getting too cold.',
    ],
    scenarios: [
      {
        text: 'On the windy summit your partner is shivering hard and fumbling with their zipper. Their base layer is soaked with sweat. What do you do?',
        hint: 'Watch for the “umbles”: stumbles, mumbles and fumbles.',
        title: 'Mild hypothermia',
        feedback: 'Hard shivering and fumbling hands are early signs of mild hypothermia. Wind and a sweat-soaked base layer cool the body fast.',
        steps: 'Get out of the wind, swap wet layers for dry ones and add a hat, gloves and a jacket. Have them sit on their pack, not the snow. Give a warm, sweet drink and high-energy food if they are alert, then start descending.',
      },
      {
        text: 'After a glove got wet, your friend’s fingertips are white, waxy and numb. What do you do?',
        hint: 'Rubbing does more harm than good.',
        title: 'Frostnip',
        feedback: 'White, waxy, numb skin is an early cold injury. Rubbing does more harm than good.',
        steps: 'Get out of the cold and remove the wet glove. Rewarm the fingers against warm skin, such as in their armpit. Do not rub them, use snow, or hold them near a stove or fire. If the skin stays hard and pale, it may be frostbite: protect it, avoid letting it refreeze, and get medical care.',
      },
      {
        text: 'A hiker was shivering earlier but has now stopped. They are drowsy, confused and stumbling. What do you do?',
        hint: 'Shivering stopping is not a good sign.',
        title: 'Severe hypothermia',
        feedback: 'Shivering that stops, with drowsiness and confusion, means this is moderate to severe hypothermia, an emergency.',
        steps: 'Call 911. Handle them gently and keep them lying down. Insulate them from the ground and wrap them in a sleeping bag or emergency blanket, with heat packs on the chest and armpits (not directly on skin). Do not let them walk, and give no food or drink unless they are fully alert.',
      },
    ],
    result: {
      copy: 'Cold injuries start small. Spotting the early signs means you can fix them before they become emergencies.',
      takeaways: [
        'Stay dry: vent or remove layers before you sweat',
        'Watch for the “umbles”: stumbles, mumbles, fumbles',
        'Rewarm fingers on warm skin, never rub them',
        'Shivering stops and confusion starts: call 911',
      ],
    },
  },
]

export const lessonBySlug = (slug) => LESSONS.find((l) => l.slug === slug)
