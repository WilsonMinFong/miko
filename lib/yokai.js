import BoardObject from './board_object';
import Board from './board';

class Yokai extends BoardObject {
  constructor() {
    super({
      pos: [
        Board.DIM_X * Math.random(),
        Board.DIM_Y * 0.25 * Math.random()
      ],
      vel: [
        Yokai.VEL_SCALE * Math.random(),
        Yokai.VEL_SCALE * Math.random()
      ],
      radius: 25,
      color: 'red',
      friendly: false
    });
  }
}

Yokai.VEL_SCALE = 1;

export default Yokai;
