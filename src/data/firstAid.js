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
 * `intro`: sections ({ h?, p }) that teach everything the scenarios test; `overview`: bullet summary.
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
      { p: 'Dehydration happens when you lose more fluid than you drink. On a long, steep climb you lose water and salt through sweat and heavy breathing, often faster than you notice.' },
      {
        h: 'Spot the signs',
        p: 'Early signs are subtle: headache, tiredness, a slower pace and dark urine. Urine colour is your quickest check: pale yellow is good, dark yellow means drink more. Severe dehydration shows as severe muscle cramps, not needing to pee for hours, and confusion. That is an emergency: call 911.',
      },
      {
        h: 'Treat it',
        p: 'For early signs, stop and rest in the shade. Sip water with electrolytes and eat a salty snack, instead of drinking a whole bottle at once, then keep drinking small amounts every 15–20 minutes. If someone is vomiting and cannot keep fluids down, give a mouthful of rehydration solution every few minutes. If that does not work, they cannot rehydrate on the trail: call for help and take the shortest, easiest way down. Never force fluids on someone who is confused or drowsy.',
      },
      {
        h: 'Plan your water',
        p: 'Plan on 0.5–1 L per hour of hard hiking, more in heat. For a 7–9 hour day like Brunswick Mountain Trail, that is about 3–4 L per person, plus electrolytes. Creek water can carry bacteria and parasites even when it looks clean: collect from moving water, then filter it, use purification tablets (wait the full contact time) or boil it. If you have no way to treat it and someone is becoming dehydrated, untreated water is the lower risk.',
      },
      {
        h: 'Too much water, and the cold',
        p: 'Drinking lots of plain water without eating or replacing salt can cause hyponatremia (low blood sodium): nausea, headache, confusion and swollen hands. Do not give more water; give salty snacks or an electrolyte drink, and call 911 if they are confused or vomiting. Cold weather dulls thirst, but you still lose water through sweat and breathing. Drink on a schedule, carry warm drinks in an insulated bottle, and keep bottles inside your pack or upside down so they do not freeze shut.',
      },
    ],
    overview: [
      'Early signs: headache, tiredness, dark urine',
      'Rest in shade, sip with electrolytes and a salty snack',
      'Plan 0.5–1 L per hour of hard hiking (3–4 L for Brunswick)',
      'Filter, use tablets or boil creek water',
      'Swollen hands and confusion after lots of plain water: give salt, not water',
      'Drink on a schedule in the cold',
      'Confusion, no peeing for hours, or constant vomiting: call 911',
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
      { p: 'A scramble is steep terrain where you need your hands as well as your feet. The final section of Brunswick Mountain Trail is an exposed, rocky scramble where a slip or falling rock can cause serious injury.' },
      {
        h: 'Move safely',
        p: 'Keep three points of contact on every move. Test each hold by pushing or tapping it before you trust it; if one shifts, keep your weight off it, stay on your other three points and move to solid rock, then warn the people behind you. Wear a helmet and spread out so nobody is directly below someone else. Never climb up something you cannot climb back down.',
      },
      {
        h: 'Know when to turn around',
        p: 'Turn back if the route is harder than you expected, the rock is wet, or cloud rolls in and hides the way. The summit will still be there another day.',
      },
      {
        h: 'Falling rock',
        p: 'If you knock a rock loose, shout “ROCK!” loudly, straight away. If you hear it, do not look up: cover your head and move in close to the rock face. Afterwards, check nobody was hit.',
      },
      {
        h: 'Fear and losing the route',
        p: 'If someone freezes on exposed rock, stay calm and speak slowly. Make sure they have three points of contact, then talk them through one hand or foot placement at a time. Never rush or pull them; if going up is not safe, help them climb back down. If you lose the route, stop. Retrace your steps to the last place you were sure of, and check an offline map or GPS with your phone in airplane mode to save battery. Still lost? Stay where you are, keep warm and call 911.',
      },
      {
        h: 'Injuries on steep ground',
        p: 'Get yourself and the injured person secure first, and only move them if they are in immediate danger. Never try to carry someone down a scramble. For a head wound, check ABCs (airway, breathing, circulation) and press a clean dressing firmly on it. Head wounds bleed a lot and can hide a concussion, so watch for confusion, vomiting, a worsening headache or unequal pupils. If they fell any distance or have neck pain, keep them still. For an ankle they cannot stand on, check for other injuries, pad and splint it, and keep them warm. In both cases call 911 for search and rescue (free in BC).',
      },
    ],
    overview: [
      'Three points of contact; test every hold first',
      'Never climb up what you cannot climb down',
      'Wet rock, cloud or a harder route: turn around',
      'Shout “ROCK!”; below, cover your head and hug the face',
      'Someone frozen: calm voice, one move at a time',
      'Lost: stop, retrace, then stay put and call 911',
      'Injured on a scramble: secure them, don’t carry them, call 911',
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
    // First section = Figma 1646:12254 copy; the rest covers what the scenarios test.
    intro: [
      {
        p: 'Heat exposure is caused by overexposure to the sun. On a long climb, hard effort and not enough water can add up and affects a lot of people. You can avoid heat exposure by starting your hike early in the cooler part of the day, drinking water consistently, and wearing loose, light clothing. Slow your pace on sunny, exposed sections and rest in the shade whenever you can.',
      },
      {
        h: 'Heat cramps',
        p: 'Painful muscle cramps while sweating heavily. Sweat washes out salt as well as water. Rest in the shade, stretch the muscle gently and have an electrolyte drink or salty snack. No hard climbing until the cramps are gone.',
      },
      {
        h: 'Heat exhaustion',
        p: 'Dizziness, weakness, heavy sweating, pale or clammy skin and nausea. Move them into the shade, let them rest and loosen extra layers. Give sips of water with electrolytes and cool them with a wet cloth or by fanning. Treat for shock: rest and reassure them, check their ABCs (airway, breathing, circulation) and help them into a comfortable position. Reassess every 5–15 minutes, and call for help if they are not better within 30 minutes. Even after they recover, they are at higher risk for the rest of the day: head down slowly together, keep them cool and hydrated, and watch for symptoms coming back.',
      },
      {
        h: 'Heat stroke',
        p: 'Hot, red skin (they may stop sweating) with confusion or slurred speech. This is life-threatening: the brain is overheating. Call 911 and cool them as fast as you can: shade, remove extra clothing, soak them with water and fan them, with cold packs on the neck, armpits and groin. Give no drinks unless they are fully alert.',
      },
      {
        h: 'If someone collapses',
        p: 'Check the scene is safe, then check for a response and breathing, and call 911. If they are not breathing normally, start CPR. If they are breathing, place them in the recovery position in the shade and start cooling them.',
      },
      {
        h: 'Plan for the heat',
        p: 'On a hot forecast, start very early, carry extra water and electrolytes, and wear loose, light-coloured clothing, a sun hat and sunscreen. Set a turnaround time, take breaks in the shade, and agree as a group to turn back if anyone feels unwell. Once half your water is gone, the rest is for the descent: that is your turnaround point.',
      },
    ],
    overview: [
      'Start early; carry extra water and electrolytes',
      'Cramps: shade, stretch, salty snack',
      'Exhaustion: shade, rest, sip, cool, treat for shock',
      'Not better in 30 minutes: call for help',
      'Hot skin + confusion = heat stroke: call 911, cool fast',
      'Collapsed: safe scene, breathing, 911, CPR or recovery position',
      'Half your water gone: turn around',
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
      { p: 'Snowy Peaks covers cold injuries: hypothermia and frostbite. Snow can stay high on the mountain late into the season, and on an exposed summit, wind, wet clothing and a long stop can cool your body quickly, even on a mild day.' },
      {
        h: 'Stay warm and dry',
        p: 'Vent or remove layers before you start to sweat, carry a warm layer, hat and gloves, and keep eating and drinking. On breaks, sit on your pack, not the snow. Wet clothing, from sweat or a fall into a creek, pulls heat from your body far faster than cold air: change into dry clothes straight away, add warm layers, eat, and keep moving once dry.',
      },
      {
        h: 'Hypothermia',
        p: 'Early signs are hard shivering and the “umbles”: stumbles, mumbles, fumbles and grumbles. Get them out of the wind, swap wet layers for dry ones, and add a hat, gloves and jacket. Give a warm, sweet drink and high-energy food if they are alert, then start descending. If shivering stops and they become drowsy, confused or stumble, it is severe hypothermia and an emergency: call 911, handle them gently and keep them lying down. Insulate them from the ground, wrap them in a sleeping bag or emergency blanket and put heat packs on the chest and armpits (not directly on skin). Do not let them walk, and give no food or drink unless they are fully alert.',
      },
      {
        h: 'Frostnip and frostbite',
        p: 'White, waxy, numb skin, often on fingers, toes, ears or cheeks. Get out of the cold, remove wet gloves and rewarm the skin against warm skin, such as in an armpit. Never rub it, use snow, or hold it near a stove or fire. If the skin stays hard and pale it may be frostbite: protect it, do not let it refreeze, and get medical care.',
      },
    ],
    overview: [
      'Vent layers before you sweat; sit on your pack',
      'Wet clothes: change into dry ones straight away',
      'Shivering + the “umbles”: out of the wind, dry layers, warm sweet drink, descend',
      'Shivering stops + confusion: call 911, keep them lying down',
      'White, waxy skin: rewarm on warm skin, never rub',
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
      {
        text: 'Crossing a snowmelt creek, your friend slips and goes in up to the waist. It is 3°C and windy. What do you do?',
        hint: 'What is wet clothing doing to their body heat?',
        title: 'Soaked in cold water',
        feedback: 'Wet clothing pulls heat from the body far faster than cold air does, and wind makes it worse. Hypothermia can follow quickly.',
        steps: 'Get them out of the water and out of the wind. Change them into dry clothes straight away and add a hat, gloves and a warm layer. Give food and a warm drink, then keep moving once they are dry so their body makes heat. Watch for the “umbles”.',
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
