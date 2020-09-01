const BEHAVIOURS = {
  TRANSLATION: 0
}
const robotBehaviours = [
  [
    {
      behaviour: BEHAVIOURS.TRANSLATION,
      target: new THREE.Vector3(5, 0, 0),
      await: 5000,
      delay: 1000
    }
  ]
]

export {BEHAVIOURS, robotBehaviours};