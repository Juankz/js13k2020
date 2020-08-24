export default AFRAME.registerSystem('level-generator', {
  generate: function(blueprintId) {
    let level = document.createElement('a-entity');
    level.id = "level";
    level.setAttribute('geometry', `primitive: level; blueprintId: ${blueprintId}`)
    level.setAttribute('material','color: gray');
    this.el.appendChild(level);
  }
});