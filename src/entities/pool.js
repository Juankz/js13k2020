import translationBehaviour from "../components/translationBehaviour";

export default class Pool {
  constructor() {
    this.availableEls = [];
    this.usedEls = [];
  }

  createEntity() {

  }

  requestEntity(){
    let el;
    if(this.availableEls.length > 0){
      el = this.availableEls.pop()
    }else{
      el = this.createEntity()
    }
    this.usedEls.push(el);
    return el;
  }

  retrieveEntity(entityEl){
    var index = this.usedEls.indexOf(entityEl);
    if (index === -1) {
      warn('The returned entity was not previously pooled from ' + this.attrName);
      return;
    }
    this.usedEls.splice(index, 1);
    entityEl.pause();
    entityEl.object3D.visible = false;
    this.availableEls.push(entityEl);
  }

  retrieveAllEntities() {
    while(this.usedEls.length > 0){
      this.retrieveEntity(this.usedEls[0]);
    }
  }
}