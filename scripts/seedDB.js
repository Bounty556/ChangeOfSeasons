const mongoose = require('mongoose');
const db = require('../models');

// This file empties the Books collection and inserts the books below

/*
TRIGGERS:
   ONDEATH
   ONPLAY
   ONATK

OPERATORS:
   DRAW # - If FULL, give cards until hand is full
   RES TARGET # - SELF, OPP - gives target resources
   DMG # - Implied 'ALL' target
   HEAL TARGET # - SINGLE, ALL, ATKROW, DEFROW, DEALT
   KILL TARGET - SELF, OPP, ALL, OPPDEFROW
   TOPDECK - Moves the card back to the top of the players deck
   RAISEATK TARGET # - ALL, ATKROW, DEFROW
   SETATK TARGET # - OPPATKROW
   ADDEFFECT "..." - Implied 'ALL' target
*/

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/changeOfSeasons');

const cardSeed = [
  {
    season: 'Spring',
    cardId: 1,
    isCreature: true,
    resourceCost: 2,
    attack: 2,
    health: 3,
    name: 'Gudrun',
    img: 'buddy.png'
  },
  {
    season: 'Summer',
    cardId: 2,
    isCreature: true,
    resourceCost: 2,
    attack: 3,
    health: 2,
    name: 'Jacinto',
    img: 'mask_01.png'
  },
  {
    season: 'Fall',
    cardId: 3,
    isCreature: true,
    resourceCost: 2,
    attack: 4,
    health: 1,
    name: 'Revna',
    img: 'crow_01.png'
  },
  {
    season: 'Winter',
    cardId: 4,
    isCreature: true,
    resourceCost: 2,
    attack: 1,
    health: 4,
    name: 'Obasi',
    img: 'hound.png'
  },
  {
    season: 'Spring',
    cardId: 5,
    isCreature: true,
    resourceCost: 3,
    attack: 1,
    health: 1,
    effect: 'When played, gain +1 resource',
    effectScript: 'ONPLAY RES SELF 1',
    name: 'Hinode',
    img: 'turtle_01.png'
  },
  {
    season: 'Summer',
    cardId: 6,
    isCreature: true,
    resourceCost: 3,
    attack: 3,
    health: 3,
    name: 'Yōsei',
    img: 'snake_01.png'
  },
  {
    season: 'Fall',
    cardId: 7,
    isCreature: true,
    resourceCost: 3,
    attack: 1,
    health: 1,
    effect: 'Draw a card when this dies',
    effectScript: 'ONDEATH DRAW 1',
    name: 'Dodokeki',
    img: 'bone_beast.png'
  },
  {
    season: 'Winter',
    cardId: 8,
    isCreature: true,
    resourceCost: 3,
    attack: 2,
    health: 4,
    name: 'Akashita',
    img: 'banshee.png'
  },
  {
    season: 'Spring',
    cardId: 9,
    isCreature: true,
    resourceCost: 3,
    attack: 3,
    health: 3,
    name: 'Maia',
    img: 'plant_monster_01.png'
  },
  {
    season: 'Summer',
    cardId: 10,
    isCreature: true,
    resourceCost: 3,
    attack: 1,
    health: 3,
    effect: 'When played, deal 1 damage to a minion or player',
    effectScript: 'ONPLAY DMG 1',
    name: 'Fanus',
    img: 'phoenix_01.png'
  },
  {
    season: 'Fall',
    cardId: 11,
    isCreature: true,
    resourceCost: 3,
    attack: 3,
    health: 3,
    name: 'Consus',
    img: 'demon_07.png'
  },
  {
    season: 'Winter',
    cardId: 12,
    isCreature: true,
    resourceCost: 3,
    attack: 1,
    health: 3,
    effect: 'When played, +2 health to any player or creature',
    effectScript: 'ONPLAY HEAL SINGLE 2',
    name: 'Hathor',
    img: 'yeti_01.png'
  },
  {
    season: 'Spring',
    cardId: 13,
    isCreature: false,
    resourceCost: 0,
    attack: 0,
    health: 0,
    effect: 'Gain +1 resource',
    effectScript: 'ONPLAY RES SELF 1',
    name: 'Vivifcate',
    img: 'emerald_9.png'
  },
  {
    season: 'Summer',
    cardId: 14,
    isCreature: false,
    resourceCost: 4,
    attack: 0,
    health: 0,
    effect: 'Give attack row +1 ATK',
    effectScript: 'ONPLAY RAISEATK ATKROW 1',
    name: 'Solstice',
    img: 'green_9.png'
  },
  {
    season: 'Fall',
    cardId: 15,
    isCreature: false,
    resourceCost: 3,
    attack: 0,
    health: 0,
    effect: 'Destroy 1 of your minions - give the rest +1 ATK',
    effectScript: 'ONPLAY KILL SELF RAISEATK ALL 1',
    name: 'indignity',
    img: 'violet_3.png'
  },
  {
    season: 'Winter',
    cardId: 16,
    isCreature: false,
    resourceCost: 4,
    attack: 0,
    health: 0,
    effect: 'Give defense row +2 health ',
    effectScript: 'ONPLAY HEAL DEFROW 2',
    name: 'Dark Shell',
    img: 'violet_11.png'
  },
  {
    season: 'Spring',
    cardId: 17,
    isCreature: true,
    resourceCost: 4,
    attack: 4,
    health: 3,
    name: 'Zevran',
    img: 'golem_02.png'
  },
  {
    season: 'Summer',
    cardId: 18,
    isCreature: true,
    resourceCost: 4,
    attack: 3,
    health: 4,
    name: 'Arven',
    img: 'bug.png'
  },
  {
    season: 'Fall',
    cardId: 19,
    isCreature: true,
    resourceCost: 4,
    attack: 3,
    health: 4,
    name: 'Jarian',
    img: 'emerald_7.png'
  },
  {
    season: 'Winter',
    cardId: 20,
    isCreature: true,
    resourceCost: 4,
    attack: 0,
    health: 7,
    name: 'Bastille',
    img: 'red_34.png'
  },
  {
    season: 'Spring',
    cardId: 21,
    isCreature: true,
    resourceCost: 4,
    attack: 3,
    health: 4,
    name: 'Zothogth',
    img: 'insect_02.png'
  },
  {
    season: 'Summer',
    cardId: 22,
    isCreature: true,
    resourceCost: 4,
    attack: 5,
    health: 2,
    name: 'Dromaeo',
    img: 'demon_05.png'
  },
  {
    season: 'Fall',
    cardId: 23,
    isCreature: true,
    resourceCost: 4,
    attack: 6,
    health: 1,
    name: 'Thuolond',
    img: 'jin.png'
  },
  {
    season: 'Winter',
    cardId: 24,
    isCreature: true,
    resourceCost: 4,
    attack: 2,
    health: 5,
    name: 'Shuasheme',
    img: 'frost_giant_01.png'
  },
  {
    season: 'Spring',
    cardId: 25,
    isCreature: true,
    resourceCost: 5,
    attack: 4,
    health: 5,
    name: 'Yiennare',
    img: 'living_armor_02.png'
  },
  {
    season: 'Summer',
    cardId: 26,
    isCreature: true,
    resourceCost: 5,
    attack: 5,
    health: 4,
    name: 'Vegness',
    img: 'lizardman_01.png'
  },
  {
    season: 'Fall',
    cardId: 27,
    isCreature: true,
    resourceCost: 5,
    attack: 6,
    health: 3,
    name: 'Nithrilar',
    img: 'orc_03.png'
  },
  {
    season: 'Winter',
    cardId: 28,
    isCreature: true,
    resourceCost: 5,
    attack: 4,
    health: 5,
    name: 'Lykoo',
    img: 'crystal_golem_01.png'
  },
  {
    season: 'Spring',
    cardId: 29,
    isCreature: true,
    resourceCost: 5,
    attack: 3,
    health: 3,
    effect: 'Gain +1 resource',
    effectScript: 'ONPLAY RES SELF 1',
    name: 'Rynia',
    img: 'green_13.png'
  },
  {
    season: 'Summer',
    cardId: 30,
    isCreature: true,
    resourceCost: 5,
    attack: 3,
    health: 3,
    effect: 'Deal 3 damage to a minion or player',
    effectScript: 'ONPLAY DMG 3',
    name: 'Vyniho',
    img: 'red_1.png'
  },
  {
    season: 'Fall',
    cardId: 31,
    isCreature: true,
    resourceCost: 5,
    attack: 3,
    health: 3,
    effect: 'Destroy 1 enemy resource',
    effectScript: 'ONPLAY RES OPP -1',
    name: 'Tirdyha',
    img: 'skeleton_02.png'
  },
  {
    season: 'Winter',
    cardId: 32,
    isCreature: true,
    resourceCost: 5,
    attack: 3,
    health: 3,
    effect: 'Draw a card',
    effectScript: 'ONPLAY DRAW 1',
    name: 'Nymymnas',
    img: 'blue_26.png'
  },
  {
    season: 'Spring',
    cardId: 33,
    isCreature: false,
    resourceCost: 7,
    attack: 0,
    health: 0,
    effect: 'Draw 3 cards',
    effectScript: 'ONPLAY DRAW 3',
    name: 'Siphon',
    img: 'yellow_22.png'
  },
  {
    season: 'Summer',
    cardId: 34,
    isCreature: false,
    resourceCost: 6,
    attack: 0,
    health: 0,
    effect: 'Give +4 defense to all your creatures',
    effectScript: 'ONPLAY HEAL ALL 4',
    name: 'Gaea`s Cure',
    img: 'green_22.png'
  },
  {
    season: 'Fall',
    cardId: 35,
    isCreature: false,
    resourceCost: 7,
    attack: 0,
    health: 0,
    effect: 'Give all your creatures +2 ATK',
    effectScript: 'ONPLAY RAISEATK ALL 2',
    name: 'Dark Ambush',
    img: 'yellow_37.png'
  },
  {
    season: 'Winter',
    cardId: 36,
    isCreature: false,
    resourceCost: 7,
    attack: 0,
    health: 0,
    effect: 'Give all your creatures +2 ATK',
    effectScript: 'ONPLAY RAISEATK ALL 2',
    name: 'Frosts` Bite',
    img: 'blue_1.png'
  },
  {
    season: 'Spring',
    cardId: 37,
    isCreature: true,
    resourceCost: 6,
    attack: 5,
    health: 5,
    name: 'Slughorth',
    img: 'green_27.png'
  },
  {
    season: 'Summer',
    cardId: 38,
    isCreature: true,
    resourceCost: 6,
    attack: 5,
    health: 5,
    name: 'Vrunteghe',
    img: 'emerald_4.png'
  },
  {
    season: 'Fall',
    cardId: 39,
    isCreature: true,
    resourceCost: 6,
    attack: 6,
    health: 4,
    name: 'Ito',
    img: 'deamon_03.png'
  },
  {
    season: 'Winter',
    cardId: 40,
    isCreature: true,
    resourceCost: 6,
    attack: 4,
    health: 6,
    name: 'Brethraod',
    img: 'blue_37.png'
  },
  {
    season: 'Spring',
    cardId: 41,
    isCreature: true,
    resourceCost: 6,
    attack: 3,
    health: 4,
    effect: 'Draw a card',
    effectScript: 'ONPLAY DRAW 1',
    name: 'Wiubhun',
    img: 'green_18.png'
  },
  {
    season: 'Summer',
    cardId: 42,
    isCreature: true,
    resourceCost: 6,
    attack: 3,
    health: 4,
    effect: 'When played, give your attack row +1 ATK +1 DEF',
    effectScript: 'ONPLAY RAISEATK ATKROW 1 HEAL ATKROW 1',
    name: 'Koedranduk',
    img: 'golem_01.png'
  },
  {
    season: 'Fall',
    cardId: 43,
    isCreature: true,
    resourceCost: 6,
    attack: 3,
    health: 4,
    effect: 'When played, give your attack row +2 ATK',
    effectScript: 'ONPLAY RAISEATK ATKROW 2',
    name: 'Omdib',
    img: 'doll_01.png'
  },
  {
    season: 'Winter',
    cardId: 44,
    isCreature: true,
    resourceCost: 6,
    attack: 3,
    health: 4,
    effect: 'When played, give your defense row +4 health',
    effectScript: 'ONPLAY HEAL DEFROW 4',
    name: 'Chilnershir',
    img: 'madman.png'
  },
  {
    season: 'Spring',
    cardId: 45,
    isCreature: true,
    resourceCost: 7,
    attack: 5,
    health: 6,
    name: 'Reldo',
    img: 'gremlin_01.png'
  },
  {
    season: 'Summer',
    cardId: 46,
    isCreature: true,
    resourceCost: 7,
    attack: 5,
    health: 6,
    name: 'Sherthok',
    img: 'l_02.png'
  },
  {
    season: 'Fall',
    cardId: 47,
    isCreature: true,
    resourceCost: 7,
    attack: 5,
    health: 6,
    name: 'Grarthu',
    img: 'joker_02.png'
  },
  {
    season: 'Winter',
    cardId: 48,
    isCreature: true,
    resourceCost: 7,
    attack: 5,
    health: 6,
    name: 'Snorbaglel',
    img: 'bear.png'
  },
  {
    season: 'Spring',
    cardId: 49,
    isCreature: true,
    resourceCost: 7,
    attack: 3,
    health: 5,
    effect: 'When played, give your attack row +3 ATK',
    effectScript: 'ONPLAY RAISEATK ATKROW 3',
    name: 'Buggraulm',
    img: 'demon_05.png'
  },
  {
    season: 'Summer',
    cardId: 50,
    isCreature: true,
    resourceCost: 7,
    attack: 3,
    health: 5,
    effect: 'Deal 4 damage to a minion or player',
    effectScript: 'ONPLAY DMG 4',
    name: 'Legrash',
    img: 'parasit_01.png'
  },
  {
    season: 'Fall',
    cardId: 51,
    isCreature: true,
    resourceCost: 7,
    attack: 3,
    health: 5,
    effect: 'Restore life equal to the damage this deals',
    effectScript: 'ONATK HEAL DEALT',
    name: 'Fardel',
    img: 'pumpkin.png'
  },
  {
    season: 'Winter',
    cardId: 52,
    isCreature: true,
    resourceCost: 7,
    attack: 3,
    health: 2,
    effect: 'When this dies return it to your hand',
    effectScript: 'ONDEATH TOPDECK DRAW 1',
    name: 'Volmuloelle',
    img: 'blue_32.png'
  },
  {
    season: 'Spring',
    cardId: 53,
    isCreature: true,
    resourceCost: 8,
    attack: 6,
    health: 6,
    name: 'Lailzon',
    img: 'dark_knight_04.png'
  },
  {
    season: 'Summer',
    cardId: 54,
    isCreature: true,
    resourceCost: 8,
    attack: 6,
    health: 6,
    name: 'Nemastos',
    img: 'violet_21.png'
  },
  {
    season: 'Fall',
    cardId: 55,
    isCreature: true,
    resourceCost: 8,
    attack: 6,
    health: 6,
    name: 'Alcinysius',
    img: 'red_2.png'
  },
  {
    season: 'Winter',
    cardId: 56,
    isCreature: true,
    resourceCost: 8,
    attack: 6,
    health: 6,
    name: 'Icariss',
    img: 'goblin_01.png'
  },
  {
    season: 'Spring',
    cardId: 57,
    isCreature: true,
    resourceCost: 8,
    attack: 4,
    health: 5,
    effect: 'When this attacks, draw a card',
    effectScript: 'ONATK DRAW 1',
    name: 'Phantisto',
    img: 'skeleton_01.png'
  },
  {
    season: 'Summer',
    cardId: 58,
    isCreature: true,
    resourceCost: 8,
    attack: 4,
    health: 5,
    effect: 'Draw 2 cards',
    effectScript: 'ONPLAY DRAW 2',
    name: 'Elenone',
    img: 'skeleton_03.png'
  },
  {
    season: 'Fall',
    cardId: 59,
    isCreature: true,
    resourceCost: 8,
    attack: 4,
    health: 5,
    effect: 'Give all your minions +2 ATK +1 health',
    effectScript: 'ONPLAY RAISEATK ALL 2 HEAL ALL 1',
    name: 'Xanderise',
    img: 'skeleton_07.png'
  },
  {
    season: 'Winter',
    cardId: 60,
    isCreature: true,
    resourceCost: 8,
    attack: 4,
    health: 5,
    effect: 'Give all your minions +1 ATK +2 health',
    effectScript: 'ONPLAY RAISEATK ALL 1 HEAL ALL 2',
    name: 'Artesa',
    img: 'skeleton_05.png'
  },
  {
    season: 'Spring',
    cardId: 61,
    isCreature: false,
    resourceCost: 9,
    attack: 0,
    health: 0,
    effect: 'Draw cards until your hand is full',
    effectScript: 'ONPLAY DRAW FULL',
    name: 'Deep Pockets',
    img: 'gray_5.png'
  },
  {
    season: 'Summer',
    cardId: 62,
    isCreature: false,
    resourceCost: 9,
    attack: 0,
    health: 0,
    effect: 'Deal 8 damage to a minion or player',
    effectScript: 'ONPLAY DMG 8',
    name: 'Sun Flare',
    img: 'violet_28.png'
  },
  {
    season: 'Fall',
    cardId: 63,
    isCreature: false,
    resourceCost: 9,
    attack: 0,
    health: 0,
    effect: "Choose a card to have the 'Return to hand on death' effect",
    effectScript: 'ONPLAY ADDEFFECT "ONDEATH TOPDECK DRAW 1"',
    name: 'Endless Death',
    img: 'emerald_3.png'
  },
  {
    season: 'Winter',
    cardId: 64,
    isCreature: false,
    resourceCost: 9,
    attack: 0,
    health: 0,
    effect: 'Give all your minions +4 ATK',
    effectScript: 'ONPLAY RAISEATK ALL 4',
    name: 'Winter`s End',
    img: 'violet_4.png'
  },
  {
    season: 'Spring',
    cardId: 65,
    isCreature: true,
    resourceCost: 9,
    attack: 6,
    health: 7,
    name: 'Sühkgüi',
    img: 'violet_11.png'
  },
  {
    season: 'Summer',
    cardId: 66,
    isCreature: true,
    resourceCost: 9,
    attack: 6,
    health: 7,
    name: 'Enezorig',
    img: 'dark_knight_01.png'
  },
  {
    season: 'Fall',
    cardId: 67,
    isCreature: true,
    resourceCost: 9,
    attack: 6,
    health: 7,
    name: 'Nertsetseg',
    img: 'yellow_40.png'
  },
  {
    season: 'Winter',
    cardId: 68,
    isCreature: true,
    resourceCost: 9,
    attack: 6,
    health: 7,
    name: 'Hontuyaa',
    img: 'orc_05.png'
  },
  {
    season: 'Spring',
    cardId: 69,
    isCreature: true,
    resourceCost: 9,
    attack: 5,
    health: 5,
    effect: 'While this is in play give all your creatures +2 ATK +4 health',
    effectScript: 'ONPLAY RAISEATK ALL 2 HEAL ALL 4 ONDEATH RAISEATK ALL -2 DMG ALL 4',
    name: 'Irikmolush',
    img: 'dragon_01.png'
  },
  {
    season: 'Summer',
    cardId: 70,
    isCreature: true,
    resourceCost: 9,
    attack: 5,
    health: 5,
    effect: 'While this is in play give all your creatures +3 ATK +3 health',
    effectScript: 'ONPLAY RAISEATK ALL 3 HEAL ALL 3 ONDEATH RAISEATK ALL -3 DMG ALL 3',
    name: 'Otgonbaatar',
    img: 'dragon_04.png'
  },
  {
    season: 'Fall',
    cardId: 71,
    isCreature: true,
    resourceCost: 9,
    attack: 5,
    health: 5,
    effect: 'When this dies destroy your opponent\'s defense row',
    effectScript: 'ONDEATH KILL OPPDEFROW',
    name: 'Nertulga',
    img: 'dragon_03.png'
  },
  {
    season: 'Winter',
    cardId: 72,
    isCreature: true,
    resourceCost: 9,
    attack: 5,
    health: 5,
    effect: 'Reduce your opponents attack row attack to 0',
    effectScript: 'ONPLAY SETATK OPPATKROW 0',
    name: 'Batgüi',
    img: 'dragon_05.png'
  }
];

db.Card.remove({})
  .then(() => db.Card.collection.insertMany(cardSeed))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
