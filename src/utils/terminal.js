const blueprint = `
xxxxxxxxxxxxx
x-----------x
x--|--|--|--x
x-----------x
x--|--|--|--x
x-----------x
dp---------tx
x-----------x
x--|--|-----x
x----------gd
x--|--|-----x
x-----------x
xxxxxxxxxxxxx

`

const tutorial_mobile = 
`Instructions:
Stand in front of a terminal
to interact with it.

Point at the floor and tap
Tap & hold to crouch/stand.
Can you reach the door? ->`;
const tutorial_desktop = 
`Instructions:
Stand in front of a terminal
to interact with it.

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

const text_404 = `Searching Ned Snow
404 Person not found
`

const unencryptedData = [
`FACILITY 502

You are on the facility 502.
This instalation is reserved for
dangerous individuals according
to Law 409.
`,
`LAW 409
Any individual who opposes power
institutions by "making a stand",
"speak up", or any other form of
manifestation will be put on 
aritificial coma for an undefined
period.
`,
`NED SNOW PROFILE

Activist. Ned Snow used to advocate
for privacy and opposed to mass
surveillance.
`
]

const encryptedData = [
`Notes from the diary of subject 406. 1/5
TRANSITION TO TECHNOCRACY.
After it was evident that humans were unrealible
when holding power we tried to move slowly towards
a technocracy.

It seemed like a really good idea, an unbiased
machine aiding government to take decisions.
But machines suffered from the same sins 
of their creators. Soon we had a techtyranny.
`,
`Notes from the diary of subject 406. 2/5
INTERFACING OUR BRAINS WITH MACHINES
It was like a miracle. We were able to cure alzhaimer and other brain problems.
We should have stopped there.
`,
`Notes from the diary of subject 406. 3/5
Previously the crazy drunk person were telling stupid things at the bar,
everyone could ignore him.
Then internet came, the crazy drunk found other crazy drunks, they craeted their own cult
full of conspiracy theories. Soon they became too dangerous to be ignored.
`,
`Notes from the diary of subject 406. 5/5
George Orwell wrote 1984. The most terrifying book in history. He left us a warning:
"If you want a picture of the future, imagine a boot stamping on a human face, forever.
  The moral to be drawn from this dangerous nightmare situation is a simple one: 
  don't let it happen. It depends on you."
  I won't let it happen!
`,
]

export {blueprint, tutorial_VR, tutorial_desktop, tutorial_mobile, text_404, unencryptedData, encryptedData}