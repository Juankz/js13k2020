class Robot {
  constructor(x,z) {
    this.halfHeight = 2.5;
    this.entity = document.createElement('a-entity');
    this.entity.setAttribute('geometry', {
      primitive: 'robot'
    })
    this.entity.setAttribute('texture-material', {texture: 'floor'})
    this.setPosition(x,z)
  }
  
  setPosition(x,z) {
    this.entity.object3D.position.set(x, this.halfHeight, z);
  }

  getEntity() {
    return this.entity;
  }
}

export default Robot;