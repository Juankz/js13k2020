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
    dp--Tx----------x
    x----x--xx--xx--x
    x---------------x
    x--------------gd
    xxxxx---xxx-----x
    ---x----------xxx
    ---x----------x
    ---x-0--------x
    ---xxxxxxxxxxxx
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
    xxxxxxxxxxxxxxx
    x-------------x
    dp------------x
    x-------------x
    x------------gd
    x--xoooooooxxxx
    x--x----------x
    x--x----------x
    x--x---0------x
    xxxxxxxxxxxxxxx
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
     x--------ooo------x
     x-----------------x
     x-----------------x
     x-----------------x
     xxxxxxxxxxxxxxxxxxx

     `,
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

export {BEHAVIOURS, blueprints};