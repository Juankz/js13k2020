class Robot {
  constructor() {
    this.entity = document.createElement('a-entity');
    this.entity.setAttribute('geometry', {
      primitive: 'robot'
    })
    this.entity.setAttribute('texture-material', {texture: 'floor'})
    this.entity.object3D.position.set(0, 0, -8);
  }

  getEntity() {
    return this.entity;
  }
}

export default Robot;