import BoardObject from './board_object';
import Board from './board';

class Miko extends BoardObject {
  constructor() {
    super({
      pos: [Board.DIM_X / 2, Board.DIM_Y * .85],
      vel: [0, 0],
      radius: 10,
      color: 'green',
      friendly: true
    });
  }

  setMovement(dir) {
    // this.vel = dir.map((el) => el * Miko.VEL_SCALE);
    this.vel[0] = dir[0] !== 0 ? Miko.VEL_SCALE * dir[0] : this.vel[0];
    this.vel[1] = dir[1] !== 0 ? Miko.VEL_SCALE * dir[1] : this.vel[1];
  }

  removeMovement(dir) {
    this.vel[0] = dir[0] !== 0 ? 0 : this.vel[0];
    this.vel[1] = dir[1] !== 0 ? 0 : this.vel[1];
  }
}

Miko.VEL_SCALE = 5;

export default Miko;
