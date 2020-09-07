const BEHAVIOURS = {
  TRANSLATION: 0
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
    terminal: 'tutorial'
  },
  {
    level:
    `
    xxxxxxxxxxxxxxxxx
    x----x----------x
    dp--Tx--xx------x
    x----x-------xxxx
    x---------------x
    x--------------gd
    xxxxx---xxx-----x
    x-------------xxx
    x---------------x
    x----0----------x
    xxxxxxxxxxxxxxxxx
    `,
    terminal: `Don't let them see you!`,
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
  {
    level:
    `
    xxxxxxxxxxxxxxxxx
    x---------------x
    dp--------------x
    x---------------x
    x--------------gd
    x--xoooooooooxxxx
    x--x------------x
    x--x------------x
    x--x---0--------x
    xxxxxxxxxxxxxxxxx
    `,
    robots: [
      {
        rotationY: Math.PI
      },{
        rotationY: Math.PI
      }
    ]
  },
  {
    level:
    `
    xxxxxxx
    x-----x
    dp---Tx
    x-----x
    x------x
    x------x
    x------x
    xxxxxxxx
    
    `,
    terminal: 'The End'
  },
];

export default blueprints;