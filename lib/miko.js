import BoardObject from './board_object';
import Board from './board';

class Miko extends BoardObject {
  constructor() {
    super({
      pos: [Board.DIM_X / 2, Board.DIM_Y * .95],
      vel: [0, 0],
      radius: 10,
      color: 'green',
      friendly: true
    });
  }
}

export default Miko;
