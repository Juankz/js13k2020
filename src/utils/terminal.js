const blueprint = `
xxxxxxxxxxxxx
x-----------x
x-----------x
x-|-|-|-|-|-x
x-----------x
dp---------tx
x-----------x
x-|-|-|-|---x
x----------gd
x-----------x
xxxxxxxxxxxxx

`

const tutorial_mobile = 
`Instructions:
Stand in front of a terminal
to interact with it.
Turn in real life.
Point at the floor and tap
Tap & hold to crouch/stand.
Can you reach the door? ->`;
const tutorial_desktop = 
`Instructions:
Stand in front of a terminal
to interact with it.
Use you mouse to turn,
Move with the keys W A S D,
SPACE to crouch/stand.
Can you reach the door? ->`;
const tutorial_VR = 
`Instructions:
Stand in front of a terminal
to interact with it.
Point at the floor with
your controller and press
the trigger to move. Can
you reach the door? ->`;

const text_404 = `Searching for Ned Snow
...
404 Person not found
`

const text_200 =  `
Searching for Ned Snow
200 found Ned Snow.
Initiating extraction...
Extraction successful
Ned Snow has been liberated.
`

const end =  `
Congratulations!

You made it to the end.

Thanks for playing.
`

const unencryptedData = [
`FACILITY 502

You are on the facility 502.
This instalation is reserved for
individuals who violated Law 409.
`,
`LAW 409
Any individual who opposes power
institutions by "making a stand",
"speak up", or any other form of
manifestation will be put on 
induced coma for an undefined
period.
`,
`NED SNOW PROFILE

Activist. Ned Snow used to advocate
for privacy and opposed to mass
surveillance.

He fought fiercely agains law 409.
`,
`

`
]

const encryptedData = [
`Notes from the diary of subject 406. 1/3
TRANSITION TO TECHNOCRACY.
After it was evident that humans were unrealible
when holding power we tried to move slowly towards
a technocracy.

It seemed like a good idea, an unbiased AI
aiding the government to take decisions.
But machines suffered from the same sins 
of their creators. Soon we had a tech-tyranny.
`,
`Notes from the diary of subject 406. 2/3
INTERFACING OUR BRAINS WITH MACHINES
It was like a miracle. We were able to cure alzhaimer
and other brain problems.
We should have stopped there. But we opened our minds
And when law 409 went to action, even our thoughts
made us criminals.
`,
`Notes from the diary of subject 406. 3/3
"If you want a picture of the future, imagine 
a boot stamping on a human face, forever.
The moral to be drawn from this dangerous nightmare
situation is a simple one: 
Don't let it happen. It depends on you."

-George Orwell about his book 1984.
`,

`
Access to facility 502 granted.
.........................
.........................
Liberating all prisioners
.........................
.........................
.........................
All prisioners are free now.
`,
]

export {blueprint, tutorial_VR, tutorial_desktop, tutorial_mobile, text_404, text_200, unencryptedData, encryptedData, end}