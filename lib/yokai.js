import BoardObject from './board_object';
import Board from './board';

class Yokai extends BoardObject {
  constructor(board) {
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
      friendly: false,
      board,
      canLeaveBoard: true
    });
  }

  collideWith(otherObj) {
    if (otherObj.friendly) {
      this.remove();
    }
  }
}

Yokai.VEL_SCALE = 5;

export default Yokai;
