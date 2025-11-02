import { Scenario } from '../models/game-scenario.model';

export const CORE_SCENARIOS: readonly Scenario[] = [
  {
    id: 'midnight-breakdown',
    title: 'Midnight Breakdown',
    summary:
      'Your crew is stranded in the dark after a highway failure. Decide whether to repair the car or trek through the woods before the storm hits.',
    longDescription:
      'Fuel is low, cell coverage is spotty, and the highway patrol will not arrive for another hour. Players must split up to scout for resources, triage injuries, and coordinate a repair-or-rescue strategy before the cold sets in.',
    defaultDurationMinutes: 30,
    recommendedPlayers: {
      min: 3,
      max: 5
    },
    seasonalTags: ['survival', 'night'],
    startingInventory: [
      'Damaged multitool',
      'Half-charged flashlight',
      'Thermal blanket with a tear',
      'Mystery box from the trunk'
    ],
    keyMechanics: [
      'Location scouting and timed rendezvous',
      'Injury management and carry penalties',
      'Shared inventory with long-distance trading'
    ]
  },
  {
    id: 'holiday-homebound',
    title: 'Holiday Homebound',
    summary:
      'Make it to the family gathering with the perfect gift before the snowstorm closes the last rail line.',
    longDescription:
      'Players navigate a festive city maze, uncovering clues about loved ones while juggling travel disruptions. Budget management, public transit gambles, and last-minute favors determine whether grandma gets her dream present in time.',
    defaultDurationMinutes: 25,
    recommendedPlayers: {
      min: 2,
      max: 6
    },
    seasonalTags: ['holiday', 'urban'],
    startingInventory: [
      'Transit pass with limited rides',
      'Crinkled wishlist fragment',
      'Local bakery voucher',
      'Run-down electric scooter key'
    ],
    keyMechanics: [
      'Time-splitting between errands and intel gathering',
      'Trust-based clue sharing',
      'Dynamic weather complications that alter routes'
    ]
  },
  {
    id: 'orbital-rescue',
    title: 'Orbital Rescue',
    summary:
      'A supply shuttle collision destabilizes the station. Patch the hull, reroute power, and escort civilians to escape pods before the orbit decays.',
    longDescription:
      'Zero-G hazards force the team to coordinate tether usage, manage depressurised zones, and reprogram maintenance drones. Every minute counts as the orbital decay meter rises, threatening a catastrophic re-entry.',
    defaultDurationMinutes: 35,
    recommendedPlayers: {
      min: 4,
      max: 6
    },
    seasonalTags: ['sci-fi', 'high-stakes'],
    startingInventory: [
      'Malfunction-prone EVA rig',
      'Emergency patch foam',
      'Broken navigation tablet',
      'Prototype drone firmware chip'
    ],
    keyMechanics: [
      'Shared oxygen economy and tether negotiation',
      'Environmental puzzles with modular station sections',
      'Coop skill checks with consequence stacking'
    ]
  }
];
