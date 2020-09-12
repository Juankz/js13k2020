import Pool from './pool.js';

class MovingWallPool extends Pool {
  createEntity() {
    const mw = document.createElement('a-box');
    mw.classList.add('obstacles');
    mw.setAttribute('texture-material', 'texture: wall');
    mw.setAttribute('height', 3);
    mw.setAttribute('width', 3);
    mw.setAttribute('shadow', 'cast: true;');
    document.querySelector('a-scene').appendChild(mw);
    return mw;
  }
}

export default MovingWallPool;