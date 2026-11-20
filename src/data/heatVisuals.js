import exposedTrail from '../assets/first-aid/heat/exposed-trail.jpg'
import shadeRest from '../assets/first-aid/heat/shade-rest.jpg'
import heatSigns from '../assets/first-aid/heat/heat-signs.jpg'
import cooling from '../assets/first-aid/heat/cooling.jpg'
import cramp from '../assets/first-aid/heat/cramp.jpg'
import electrolytes from '../assets/first-aid/heat/electrolytes.jpg'
import exposedSlope from '../assets/first-aid/heat/exposed-slope.jpg'
import drinkSun from '../assets/first-aid/heat/drink-sun.jpg'
import steepSlope from '../assets/first-aid/heat/steep-slope.jpg'
import descend from '../assets/first-aid/heat/descend.jpg'
import sips from '../assets/first-aid/heat/sips.jpg'
import unwell from '../assets/first-aid/heat/unwell.jpg'
import cpr from '../assets/first-aid/heat/cpr.jpg'
import sunSafety from '../assets/first-aid/heat/sun-safety.jpg'
import recovery from '../assets/first-aid/heat/recovery.jpg'
import sunHat from '../assets/first-aid/heat/sun-hat.jpg'

/**
 * Heat Exposure quiz feedback visuals, one entry per scenario (same order as firstAid.js).
 * `photo` = feedback card (where Figma 1646:12263 has the thermometer → heat waves),
 * `stepsPhoto` = round photo in Next Steps (where Figma has the eye ring), `key` = the
 * points beside it (scenario 1 keeps Figma's "Treating for Shock").
 * Photo options: `alt`, `pos` (object-position for the crop), `fit: 'whole'` (no crop, e.g. charts).
 * All photos are openly licensed from Wikimedia Commons (researched 2026-11-20), resized to 800px.
 */
const commons = (file) => `https://commons.wikimedia.org/wiki/File:${file}`

const HEAT_VISUALS = [
  {
    photo: {
      src: exposedTrail,
      alt: 'Hikers on an exposed, sunny canyon trail',
      credit: { artist: 'Grand Canyon NPS', license: 'Public domain', source: commons('Grand_Canyon_National_Park,_Hikers_Descending_South_Kaibab_Trail_0233_-_Flickr_-_Grand_Canyon_NPS.jpg') },
    },
    stepsPhoto: {
      src: shadeRest,
      alt: 'A group of hikers resting in the shade of a rock overhang',
      pos: '78% 72%',
      credit: { artist: 'Yaniv Ben-Arie', license: 'CC BY-SA 2.0', source: commons('A_little_rest_in_the_shade_(474386662).jpg') },
    },
    key: { title: 'Treating for Shock', caps: true, items: ['Warmth', 'ABCs', 'Rest and Reassure', 'Treatment', 'Suitable Position'] },
  },
  {
    photo: {
      src: heatSigns,
      alt: 'Chart comparing the signs of heat exhaustion and heat stroke: heat stroke brings confusion and unconsciousness, so call 911',
      fit: 'whole',
      credit: { artist: 'National Weather Service, CDC, NIOSH', license: 'Public domain', source: commons('Heat-symptoms-2022-final.png') },
    },
    stepsPhoto: {
      src: cooling,
      alt: 'A heat stroke patient on a stretcher being cooled with water',
      pos: '50% 78%',
      credit: { artist: 'The National Guard', license: 'CC BY 2.0', source: commons('Heat_stroke_treatment,_Baton_Rouge,_2016_Louisiana_floods.jpg') },
    },
    key: { title: 'Cool them fast', items: ['Call 911', 'Shade, fewer layers', 'Soak with water and fan', 'Cold packs: neck, armpits, groin'] },
  },
  {
    photo: {
      src: cramp,
      alt: 'A teammate gently stretching an athlete’s cramping leg',
      pos: '50% 40%',
      credit: { artist: 'Marie-Lan Nguyen', license: 'CC BY 3.0', source: commons('Andrea_Baldini_teams_2014_CIP_t132153.jpg') },
    },
    stepsPhoto: {
      src: electrolytes,
      alt: 'A sachet of oral rehydration salts',
      credit: { artist: 'Shubjt', license: 'CC BY-SA 4.0', source: commons('Ors_sachet.jpg') },
    },
    key: { title: 'Ease the cramp', items: ['Rest in the shade', 'Stretch gently', 'Electrolytes or a salty snack', 'No hard climbing yet'] },
  },
  {
    photo: {
      src: exposedSlope,
      alt: 'Hikers crossing a bare, sun-exposed volcanic slope',
      pos: '50% 70%',
      credit: { artist: 'Hawai‘i Volcanoes NPS', license: 'Public domain', source: commons('Hikers_descending_Mauna_Loa_Trail_from_Pu‘u_‘Ula‘ula_(43310953700).jpg') },
    },
    stepsPhoto: {
      src: drinkSun,
      alt: 'Silhouette of a person drinking water under a bright sun',
      pos: '42% 40%',
      credit: { artist: 'U.S. Army, Roland Schedel', license: 'Public domain', source: commons('Heatwave_–_Don’t_get_beat_by_the_heat!_(7321403).jpg') },
    },
    key: { title: 'Half-water rule', items: ['Rest in the shade', 'Slow the pace', 'Half your water gone: turn back'] },
  },
  {
    photo: {
      src: steepSlope,
      alt: 'Hikers climbing a steep, exposed ridge high above the clouds',
      pos: '40% 60%',
      credit: { artist: 'Photos of Japan', license: 'CC0', source: commons('Mt._Fuji_Yoshida_Trail_Jun_21_621am.jpg') },
    },
    stepsPhoto: {
      src: descend,
      alt: 'A group of hikers heading down a trail together',
      pos: '60% 60%',
      credit: { artist: 'Yellowstone NPS', license: 'Public domain', source: commons('Hikers_descend_Mt_Sheridan_Trail_(51353175113).jpg') },
    },
    key: { title: 'Heading down', items: ['Descend slowly', 'Keep them cool and hydrated', 'Stay together', 'Watch for symptoms'] },
  },
  {
    photo: {
      src: unwell,
      alt: 'An exhausted hiker lying on an open mountainside beside their pack',
      pos: '50% 70%',
      credit: { artist: 'Alan Reid', license: 'CC BY-SA 2.0', source: commons('Exhausted_in_Glen_Tilt_-_geograph.org.uk_-_5062102.jpg') },
    },
    stepsPhoto: {
      src: sips,
      alt: 'Health workers helping a patient take small sips of rehydration solution',
      pos: '45% 55%',
      credit: { artist: 'CDC', license: 'Public domain', source: commons('Cholera_rehydration_nurses.jpg') },
    },
    key: { title: 'Small sips', items: ['Rest in the shade', 'Cool them down', 'Tiny sips, often', 'Still vomiting: call for help'] },
  },
  {
    photo: {
      src: cpr,
      alt: 'Chest compressions on a CPR training manikin',
      pos: '50% 45%',
      credit: { artist: 'U.S. Air Force, Tanner Doerr', license: 'Public domain', source: commons('42nd_CES_perform_CPR_training_(9106100).jpg') },
    },
    stepsPhoto: {
      src: recovery,
      alt: 'A medic rolling a patient into the recovery position',
      pos: '42% 78%',
      credit: { artist: 'U.S. Army, Robert Yde', license: 'Public domain', source: commons('15th_BSB_medics_provide_first_aid_training_to_AAFES_employees_DVIDS58219.jpg') },
    },
    key: { title: 'Check in order', items: ['Scene is safe', 'Response and breathing', 'Call 911', 'CPR, or recovery position'] },
  },
  {
    photo: {
      src: sunSafety,
      alt: 'EPA sun safety poster: slip on a shirt, slop on sunscreen, slap on a hat and wrap on sunglasses',
      fit: 'whole',
      credit: { artist: 'U.S. EPA SunWise', license: 'Public domain', source: commons('On_"Don\'t_Fry_Day"_(and_Every_Day),_Slip,_Slop,_Slap_&_Wrap!_-_NARA_-_6061277.jpg') },
    },
    stepsPhoto: {
      src: sunHat,
      alt: 'A hiker in a sun hat, sunglasses and light layers on a sunny desert trail',
      pos: '38% 40%',
      credit: { artist: 'Joshua Tree NPS', license: 'Public domain', source: commons('Hiker_ready_for_desert_weather_(52030114156).jpg') },
    },
    key: { title: 'Hot-day plan', items: ['Start very early', 'Extra water and electrolytes', 'Hat, sunscreen, light layers', 'Set a turnaround time'] },
  },
]

export const withHeatVisuals = (scenarios) => scenarios.map((s, i) => ({ ...s, ...HEAT_VISUALS[i] }))
