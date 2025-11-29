import { Scenario } from '../models/game-scenario.model';

export const CORE_SCENARIOS: readonly Scenario[] = [
  {
    id: 'missing-cat',
    title: 'The Case of the Missing Cat',
    summary:
      'A missing cat. Four friends. Zero time. Can you find Muffin before the storm hits?',
    longDescription: [
      'Emma and Alex are hosting their friends Jake and Mia for a chill evening… until they realize their indoor cat, Muffin, has vanished. The balcony door is wide open, the neighbor is grilling fish again, and Muffin’s toy mouse lies abandoned on the floor.',
      'The storm is rolling in fast. Search quickly, communicate constantly, and don’t overlook anything—cats are experts at being hidden right under your nose.',
    ],
    defaultDurationMinutes: 20,
    numberOfPlayers: 4,
    seasonalTags: ['mystery', 'family'],
    roles: [{
      id: 'emma',
      name: 'Emma',
      emoji: '🌿',
      shortDescription: 'The Plant Whisperer',
      description: 'Plants love her. She talks to them. They don’t talk back… usually. If something outdoors has been nudged, pawed, or knocked over, Emma sees it first.',
      startingInventory: [{name: 'Watering Can', description: 'surprisingly handy in emergencies.'}]
    },{
      id: 'alex',
      name: 'Alex',
      emoji: '🧰',
      shortDescription: 'The Tool Guy',
      description: 'Handy, practical, and strangely excited about screws. If it locks, jams, rattles, or clicks, Alex is already halfway to fixing it.',
      startingInventory: [{name: 'Multi-Tool', description: 'tiny, mighty, and occasionally dangerous.'}]
    },{
      id: 'jake',
      name: 'Jake',
      emoji: '🏃‍♂️',
      shortDescription: 'The Athletic One',
      description: 'Runs fast, climbs anything, jumps off balconies like it’s nothing. Jake’s motto: “If it looks unsafe, I’ll try it first.”',
      startingInventory: [{name: 'Sweatband', description: 'does absolutely nothing, but he insists it’s lucky.'}]
    },{
      id: 'mia',
      name: 'Mia',
      emoji: '😎',
      shortDescription: 'The Charmer',
      description: 'She smiles, people talk. Neighbors trust her instantly… sometimes more than they should.',
      startingInventory: [{name: 'Mint Drops', description: 'minty fresh diplomacy.'}]
    }]
  }
];

