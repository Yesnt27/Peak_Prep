/**
 * Hike Details content for every hike (layout from Figma "Hike Details (hifi)" 1780:3160).
 * Brunswick keeps the Figma copy. The others were written from trail guides and park pages
 * (BC Parks, Metro Vancouver, Grouse Mountain, Outdoor Vancouver, Vancouver Trails, Wikivoyage)
 * on 2026-11-19. Figures vary between sources, so the copy uses rounded / "about" values.
 *
 * `profile`: [km, metres] points for the elevation chart; `signal`: the dashed-line note.
 * Challenge `icon`: sun | scramble | signal | water | alert | snow.
 */
export const HIKE_DETAILS = {
  brunswick: {
    about:
      'A steep out-and-back from Lions Bay to the highest peak on the Howe Sound Crest. Expect a long forested grind, open ridgelines and a short Class 3 scramble to the summit, with views across Howe Sound.',
    summit: { m: 1788, km: 7.2 },
    profile: [[0, 250], [1.5, 450], [3, 750], [4.2, 950], [5.5, 1300], [6.5, 1600], [7.2, 1788], [8, 1600], [9, 1300], [10.3, 950], [11.5, 750], [13, 450], [14.3, 250]],
    signal: 'No cell signal after 4.2 km',
    signalKm: 4.2,
    pace: { value: '6.5–8 hrs', sub: 'Based on your logged hikes' },
    startBy: { value: '07:15 AM', sub: 'Daylight margin for the descent' },
    wildlife: { title: 'Wildlife corridor', chip: 'Bear spray', body: 'Active grizzly and black bear habitat in the sub-alpine meadows. Keep bear spray within reach.' },
    pass: { title: 'Pass required', body: 'BC Parks day-use pass needed in peak summer season.' },
    access: { title: 'Access & parking', body: 'Lions Bay lot fills early. Arrive before 6:45 AM.' },
    report: { title: 'BC Parks trail report', sub: 'Updated today at 6:30 AM', url: 'https://bcparks.ca/' },
    emergency: 'Search and rescue · call 911',
    challenges: [
      { icon: 'sun', title: 'Sun exposure', chip: 'High UV', body: 'Open alpine ridgelines with strong UV reflection and no shade.' },
      { icon: 'scramble', title: 'Scramble', chip: 'Class 3', body: 'Class 3 knife-edge scramble near the summit. Helmet recommended.' },
      { icon: 'signal', title: 'Cell service limit', chip: 'Cutoff KM 4.2', body: 'No signal after the lower switchbacks. Carry a satellite messenger.' },
      { icon: 'water', title: 'Limited water', chip: 'Carry 3 L', body: 'No reliable water sources past the first creek crossing. Carry 3 L.' },
    ],
    weeks: 6,
  },
  panorama: {
    about:
      'A long day from the Rubble Creek trailhead: switchbacks through forest to Garibaldi Lake, across the Taylor Meadows wildflower meadows, then up a rocky ridge to one of BC’s best viewpoints, looking down on the turquoise lake, the Black Tusk and the Sphinx Glacier.',
    summit: { m: 2103, km: 15 },
    profile: [[0, 600], [3, 900], [6, 1250], [8.5, 1500], [11, 1650], [13.5, 1900], [15, 2103], [16.5, 1900], [19, 1650], [21.5, 1500], [24, 1250], [27, 900], [30.1, 600]],
    signal: 'Little or no cell signal past Garibaldi Lake',
    pace: { value: '10–12 hrs', sub: 'Most hikers take a full day; camping at the lake splits it' },
    startBy: { value: '06:00 AM', sub: 'Long day: leave time to get back to the lot before dark' },
    wildlife: { title: 'Bear country', chip: 'Bear spray', body: 'Black bears forage in the meadows around Taylor Meadows and the lake. Make noise and carry bear spray.' },
    pass: { title: 'Day-use pass', body: 'A free BC Parks day-use pass is needed at Rubble Creek from early June to early October. Book 2 days ahead at 7 AM.' },
    access: { title: 'Access & parking', body: 'Rubble Creek lot off Highway 99, south of Whistler. Display your pass on the dashboard.' },
    report: { title: 'BC Parks: Garibaldi', sub: 'Trail conditions and pass dates', url: 'https://bcparks.ca/garibaldi-park/' },
    emergency: 'Search and rescue · call 911',
    challenges: [
      { icon: 'alert', title: 'Very long day', chip: '~30 km', body: 'About 30 km and 1,500 m of climbing round trip. Pace yourself and set a turnaround time.' },
      { icon: 'snow', title: 'Late snow', chip: 'Until July', body: 'Snow can cover the upper ridge into early summer. Check conditions and bring traction if needed.' },
      { icon: 'sun', title: 'Sun exposure', chip: 'High UV', body: 'The ridge is open alpine with no shade. Bring sun protection and extra water.' },
      { icon: 'scramble', title: 'Rocky ridge', chip: 'Loose rock', body: 'The final climb is over loose rock and scree. Watch your footing, especially coming down.' },
    ],
    weeks: 8,
  },
  blackTusk: {
    about:
      'From Rubble Creek up long switchbacks to Taylor Meadows, then a steep climb over loose scree to the shoulder below the Black Tusk, the eroded core of an old volcano at 2,319 m. The hiking trail ends at the shoulder; the chimney above is a loose, exposed scramble for experienced scramblers only.',
    summit: { m: 2319, km: 13.2 },
    profile: [[0, 600], [3, 900], [6, 1300], [8, 1500], [10, 1700], [12, 2100], [13.2, 2319], [14.4, 2100], [16.4, 1700], [18.4, 1500], [20.4, 1300], [23.4, 900], [26.4, 600]],
    signal: 'Patchy cell signal above Taylor Meadows',
    pace: { value: '9–11 hrs', sub: 'Round trip from Rubble Creek' },
    startBy: { value: '06:00 AM', sub: 'Reach the shoulder before afternoon storms build' },
    wildlife: { title: 'Bear country', chip: 'Bear spray', body: 'Black bears are common in the meadows. Make noise on blind corners and carry bear spray.' },
    pass: { title: 'Day-use pass', body: 'A free BC Parks day-use pass is needed at Rubble Creek in summer. Book 2 days ahead at 7 AM.' },
    access: { title: 'Access & parking', body: 'Rubble Creek lot off Highway 99. Camping at Taylor Meadows makes it a shorter day.' },
    report: { title: 'BC Parks: Garibaldi', sub: 'Trail conditions and pass dates', url: 'https://bcparks.ca/garibaldi-park/' },
    emergency: 'Search and rescue · call 911',
    challenges: [
      { icon: 'scramble', title: 'Scree slope', chip: 'Loose', body: 'The climb to the shoulder is on steep, loose scree. Poles help; take care on the way down.' },
      { icon: 'alert', title: 'Summit chimney', chip: 'Experts only', body: 'Above the shoulder is an exposed chimney with rockfall risk. Most hikers stop at the shoulder.' },
      { icon: 'sun', title: 'Exposed shoulder', chip: 'Storms', body: 'No shelter near the top. Turn back if clouds build or you hear thunder.' },
      { icon: 'water', title: 'Water', chip: 'Carry 3 L', body: 'Fill up at the lake or meadows; there is no water on the scree slope.' },
    ],
    weeks: 8,
  },
  wedgemount: {
    about:
      'One of the steepest hikes near Whistler: about 1,200 m of climbing in roughly 6 km, through forest, past Wedgemount Falls and up a boulder field to a turquoise glacial lake below Wedge Mountain, the highest peak in Garibaldi Park.',
    summit: { m: 1900, km: 6 },
    profile: [[0, 700], [1, 900], [2, 1150], [3, 1350], [4, 1550], [5, 1750], [6, 1900], [7, 1750], [8, 1550], [9, 1350], [10, 1150], [11, 900], [12, 700]],
    signal: 'Patchy cell signal near the lake',
    pace: { value: '6–8 hrs', sub: 'Steep both ways; the descent is slow on the knees' },
    startBy: { value: '07:00 AM', sub: 'Leave time for the boulder field on the way down' },
    wildlife: { title: 'Bear country', chip: 'Bear spray', body: 'Black bears live in the forest below the lake. Carry bear spray and pack out all food waste.' },
    pass: { title: 'Pass on dashboard', body: 'Parking is free, but a BC Parks day-use pass or camping permit must be displayed. Check BC Parks before you go.' },
    access: { title: 'Access & parking', body: 'Gravel road off Highway 99 north of Whistler. The last stretch is rough; drive slowly.' },
    report: { title: 'BC Parks: Garibaldi', sub: 'Trail conditions and passes', url: 'https://bcparks.ca/garibaldi-park/' },
    emergency: 'Search and rescue · call 911',
    challenges: [
      { icon: 'alert', title: 'Relentless grade', chip: 'Very steep', body: 'Steep, rooty trail with little flat ground. Not recommended as a first big hike.' },
      { icon: 'scramble', title: 'Boulder field', chip: 'Hands on', body: 'The last section crosses large boulders and scree. Test each rock before stepping.' },
      { icon: 'snow', title: 'Glacier', chip: 'Stay off', body: 'Do not walk onto the glacier above the lake: crevasses and meltwater channels.' },
      { icon: 'snow', title: 'Late snow', chip: 'Until July', body: 'Snow lingers on the upper trail into summer. Check conditions first.' },
    ],
    weeks: 6,
  },
  saintMark: {
    about:
      'Starts at the Cypress Mountain ski area and follows the first part of the Howe Sound Crest Trail through old-growth forest, climbing gradually to a rocky summit with views over Howe Sound, Bowen Island and the Sunshine Coast. A good first “real” mountain hike.',
    summit: { m: 1371, km: 5.5 },
    profile: [[0, 920], [1, 960], [1.6, 1000], [2.5, 1080], [3.5, 1150], [4.5, 1260], [5.5, 1371], [6.5, 1260], [7.5, 1150], [8.5, 1080], [9.4, 1000], [10, 960], [11, 920]],
    signal: 'Cell signal is usually good on this route',
    pace: { value: '4–5 hrs', sub: 'Round trip, with time at the viewpoint' },
    startBy: { value: '09:00 AM', sub: 'Plenty of daylight; the lot fills on sunny weekends' },
    wildlife: { title: 'Bear country', chip: 'Be aware', body: 'Black bears are seen on the North Shore mountains. Keep dogs leashed and food packed away.' },
    pass: { title: 'No pass needed', body: 'No BC Parks day-use pass was required as of 2024. Check BC Parks before you go.' },
    access: { title: 'Access & parking', body: 'Cypress Mountain ski area lot, at the top of the Cypress Bowl Road in West Vancouver.' },
    report: { title: 'BC Parks: Cypress', sub: 'Trail conditions', url: 'https://bcparks.ca/cypress-park/' },
    emergency: 'North Shore Rescue · call 911',
    challenges: [
      { icon: 'water', title: 'Mud and roots', chip: 'Slippery', body: 'Wet, rooty sections even in summer. Wear boots with good grip.' },
      { icon: 'snow', title: 'Snow season', chip: 'Nov–June', body: 'Snow covers the trail much of the year. Microspikes or snowshoes may be needed.' },
      { icon: 'alert', title: 'Fog', chip: 'Views vary', body: 'Cloud often sits on the ridge. Stay on the marked trail when visibility is low.' },
    ],
    weeks: 3,
  },
  grouse: {
    about:
      'Known as “Mother Nature’s Stairmaster”: about 2.5 km and 2,830 steps straight up the face of Grouse Mountain, climbing roughly 800 m from the base at 290 m to the chalet at 1,090 m. The trail is uphill only; hikers ride the Skyride gondola down.',
    summit: { m: 1090, km: 2.5 },
    profile: [[0, 290], [0.4, 400], [0.8, 520], [1.2, 650], [1.6, 780], [2, 930], [2.5, 1090]],
    signal: 'Cell signal on most of the trail',
    pace: { value: '1–2 hrs', sub: 'One way up; the record is under 25 minutes' },
    startBy: { value: 'Any time', sub: 'Go early on hot days; check the trail is open' },
    wildlife: { title: 'Bear country', chip: 'Be aware', body: 'Black bears live on Grouse Mountain. Stay on the trail and never feed wildlife.' },
    pass: { title: 'Uphill only', body: 'Downhill hiking is not allowed. Take the Skyride gondola (paid) or the BCMC trail down.' },
    access: { title: 'Access & parking', body: 'Base of Grouse Mountain at the top of Capilano Road, North Vancouver. Pay parking or transit.' },
    report: { title: 'Grouse Grind status', sub: 'Open dates and conditions', url: 'https://www.grousemountain.com/grousegrind' },
    emergency: 'North Shore Rescue · call 911',
    challenges: [
      { icon: 'alert', title: 'Nonstop climbing', chip: '2,830 steps', body: 'Steep stairs from start to finish with no flat sections. Start slowly and keep a steady pace.' },
      { icon: 'snow', title: 'Seasonal trail', chip: '~May–Oct', body: 'Closed in winter and spring because of snow higher up. Check it is open before you go.' },
      { icon: 'water', title: 'Heat and sweat', chip: 'Carry 1 L', body: 'Humid forest and hard effort. Bring water and electrolytes, especially in summer.' },
    ],
    weeks: 2,
  },
  everest: {
    about:
      'The classic Himalayan trek: fly to Lukla, then walk through Sherpa villages, Namche Bazaar and Tengboche to Everest Base Camp, with a dawn climb of Kala Patthar (5,545 m) for the closest views of Everest. Rest days are built in to acclimatise, so most itineraries take about 12–14 days.',
    summit: { m: 5545, km: 65 },
    profile: [[0, 2860], [10, 2650], [20, 3440], [30, 3870], [40, 4410], [52, 5160], [58, 5364], [65, 5545], [75, 4410], [90, 3870], [105, 3440], [118, 2650], [130, 2860]],
    signal: 'Paid Wi-Fi in lodges; patchy mobile signal high up',
    pace: { value: '12–14 days', sub: 'Includes acclimatisation days' },
    startBy: { value: 'Oct–Nov', sub: 'Spring (Mar–May) and autumn have the most stable weather' },
    wildlife: { title: 'Altitude sickness', chip: 'Acclimatise', body: 'Symptoms can start above 2,400 m. Climb slowly, take rest days, and descend if headache, nausea or confusion get worse.' },
    pass: { title: 'Permits', body: 'Sagarmatha National Park permit and a Khumbu municipality permit. Recent rules require a licensed guide.' },
    access: { title: 'Getting there', body: 'Flights from Kathmandu to Lukla are often delayed by weather. Leave buffer days.' },
    report: { title: 'Wikivoyage: EBC trek', sub: 'Itineraries, permits and tips', url: 'https://en.wikivoyage.org/wiki/Everest_Base_Camp_Trek' },
    emergency: 'Helicopter evacuation · get travel insurance that covers it',
    challenges: [
      { icon: 'alert', title: 'High altitude', chip: '5,000 m+', body: 'Gorak Shep, the last stop, is at about 5,160 m. Thin air makes every step harder.' },
      { icon: 'snow', title: 'Cold nights', chip: 'Below 0 °C', body: 'Nights in the upper valley drop well below freezing. Bring a warm sleeping bag.' },
      { icon: 'water', title: 'Safe water', chip: 'Treat it', body: 'Treat or filter all drinking water to avoid stomach illness on the trek.' },
      { icon: 'sun', title: 'Strong sun', chip: 'High UV', body: 'UV is intense at altitude, especially on snow. Use sunglasses and sunscreen.' },
    ],
    weeks: 12,
  },
}
