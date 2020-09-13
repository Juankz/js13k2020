import * as terminalData from './terminal.js';

const BEHAVIOURS = {
  TRANSLATION: 0,
  ROTATION: 1,
}

/*
x: column
o: small obstacle
d: door
p: player
g: goal
0-9: Robots
*/

const blueprints = [

  // Level 0

  {
    level:
    `
    xxxxxxx
    x-----x
    dp---Tx
    x-----x
    x------x
    x-----gd
    x------x
    xxxxxxxx
    
    `,
    terminals: [
      {
        tutorial: true
      }
    ]
  },

  // Level 1

  {
    level:
    `
    xxxxxxxxxxxxxxxxxxxx
    x----x-------------x
    dp--Tx------------tx
    x----x--xx--xxx----xxxx
    x---------------------x
    x--------------------gd
    xxxxx---xxx--xxxxxxxxxx
    ---x----------x
    ---x----------x
    ---x-0--------x
    ---xxxxxxxxxxxx
    `,
    terminals: [
      {
        text: `
Find Ned Snow!
Search for more terminals
But don't let them see you!
`,
      },
      {
        text: terminalData.unencryptedData[0]
      }
    ],
    robots: [
      {
        behaviour: BEHAVIOURS.TRANSLATION,
        target: new THREE.Vector3(7, 0, 0),
        await: 5000,
        rotationY: Math.PI,
        delay: 6000
      }
    ]
  },

  // Level 2

  {
    level:
    `
    xxxxx
    x---x
    dp-Tx
    x---xxxxxxxxxxx
    x-------------x
    x------------gd
    x--xoooooooxxxx
    x--x----------x
    x--x----------x
    x--x---0------x
    xxxxxxxxxxxxxxx
    `,
    terminals: [
      {text: 'Crouch'}
    ],
    robots: [
      {
        rotationY: Math.PI
      },{
        rotationY: Math.PI
      }
    ]
  },

  // Level 3

  {
    level: terminalData.blueprint,
    terminals: [{text: terminalData.text_404}]
  },

  // Level 4

  {
    level:
     `
     xxxxxxxxxxxxxxxxxxx
     dp--x-------------x
     x---x-------------x
     x---xxxx----------x
     x-----------------x
     x--------x--x-----x
     x------o------x---x
     x------o---x------x
     x-----------------x
     x-----o---0--x---gd
     x-----o------x----x
     x-----------------x
     x---x----ooo------x
     x---x-------------x
     x---x-------------x
     x-$-x-------------x
     xxxxxxxxxxxxxxxxxxx

     `,
     terminals: [
       {
         text: terminalData.encryptedData[0],
         rotation: Math.PI
       }
     ],
     robots: [
       {
         behaviour: BEHAVIOURS.ROTATION,
         targets: [Math.PI],
         await: 2000,
         delay: 2000,
         rotationY: -Math.PI/2
       }
     ]
  },

  // Level 5

  {
    level: // 5
    `
    xxxxxxxxxxxxxxxxxxx
    x---o--o----------x
    dp--o--o----------x
    x---oooo--oooo----x
    x------------o----x
    x------------o--o-x
    xxxxooooooo--o----x
    x---o--o--o--o-o--x
    x---oooo--oooo----x
    x-----------------x
    x-----------------x
    x---ooo---oooooooxx
    x---o-------------x
    x---o-------------x
    x---o---0---------x
    x---o-------------x
    x-g-o-------------x
    xxdxxxxxxxxxxxxxxxx
    `,
    robots: [
      {
        behaviour: BEHAVIOURS.TRANSLATION,
        target: new THREE.Vector3(7, 0, 0),
        await: 5000,
        rotationY: Math.PI,
        delay: 4000
      }
    ]
  },

  // Level 6
  {
    level:
      `
      ------xxxxxxxxxxxxxx
      ------x------x--t--x
      ------x------x-----x
      xxxxxxx------x-----x
      x------------------x
      x$-----------------x
      x-----x------x-----x
      x-----x------x-----x
      xxxxxxxxx--xxxxxxxx
      x-----------------x
      x----------------gd
      x----------------x
      x---xx-W------xxxx
      x---o----------x
      x---o----------x
      dp--o----------x
      x---o----0-----x
      xxxxxxxxxxxxxxxx
      `,
      terminals: [
        {
          text: terminalData.unencryptedData[1],
          rotation: Math.PI*2
        },
        {
          text: terminalData.encryptedData[1],
          rotation: Math.PI/2
        },
      ],
      movingWalls: [
        {
          target: new THREE.Vector3(5, 0, 0),
          await: 5000,
          delay: 3000,
          speed: 1,
        }
      ],
      robots: [
        {
          rotationY: Math.PI
        },
      ]
    
  },

  // Level 7

  {
    level: terminalData.blueprint,
    terminals: [{text: terminalData.text_404}]
  },
  // Level 8
  {
    level: `
    -------------------xxdxx
    xxxxxxxxxxxxxxxxxxxx-g-x
    x------------------x---x
    x------------------x---x
    x----x----o--------x---x
    x----o---------o-------x
    x----o---------o---x---x
    dp--------0--------x---x
    x----------------------x
    x----o---------o-------x
    x------------------x---x
    xx--xxx-xx-xx-xxxxxxxxxx
    x-------------------x
    x------------------tx
    x-------------------x
    xxxxxxxxxxxxxxxxxxxxx
    `,
    terminals: [
      {text: terminalData.unencryptedData[2]}
    ],
    robots: [
      {
        behaviour: BEHAVIOURS.ROTATION,
        targets: [0],
        speed: -Math.PI/4,
        delay: 0,
        await: 0,
        rotationY: Math.PI
      }
    ]
  },

  // Level 9
  {
    level:
    `
    xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    x--------------------------x
    dp------------------------$x
    xooooooo---xx--------------x
    x------o--------xxxoo---xxxx
    x------o--------o---o---x
    x------oo-------o---o---x
    xxxxx-W-----------------x
    ----x-------------W-----x
    ----x-------------------x
    ----x-------------------x
    ----dg------------------x
    ----x------ooooooxxxxxxxx
    ----x------o---x
    ----x------o-0-x
    ----x------o---x
    ----xxxxxxxxxxxx
    `,
    terminals: [
      {
        text: terminalData.encryptedData[2],
      }
    ],
    movingWalls: [
      {
        target: new THREE.Vector3(10, 0, 0),
        await: 0,
        delay: 0,
        speed: 2.5,
      },

      {
        target: new THREE.Vector3(-10, 0, 0),
        await: 0,
        delay: 0,
        speed: 2.5,
      },


      {
        target: new THREE.Vector3(8, 0, 0),
        await: 0,
        delay: 0,
        speed: 3,
      }
    ],
    robots:[{
      rotationY: Math.PI
    }]
  },
  // Level 10

  {
    level:
    `
    xxxxxxxxxxxxx
    x-----------x
    x-----------x
    x-|-|-|-|--tx
    x-----------x
    dp----------x
    x-----------x
    x-|-|-|-|--$x
    x-----------x
    x---------g-x
    xxxxxxxxxxdxx

    `,
    terminals: [{text: terminalData.text_200}, {text: terminalData.encryptedData[3]}]
  },
  
  // Level 11
  {
    level: `
    xxxxxx
    x----x
    dp--Tx
    x----x
    xxxxxx
    `,
     terminals: [
       {text: terminalData.end}
     ]
  }
  // Level 12

];

export {BEHAVIOURS, blueprints};