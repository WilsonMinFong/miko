import BoardObject from './board_object';
import Board from './board';
import Bullet from './bullet';
import Miko from './miko';

class Yokai extends BoardObject {
  constructor(board) {
    super({
      pos: [
        Board.DIM_X * Math.random(),
        0
      ],
      vel: [ 0, 0 ],
      radius: 10,
      color: 'red',
      friendly: false,
      board,
      canLeaveBoard: true
    });

    this.health = 100;
    this.goalPos = [
      Board.DIM_X * Math.random(),
      Board.DIM_Y * 0.25 * Math.random()
    ];
  }

  move() {
    this.vel = [
      (this.goalPos[0] - this.pos[0]) / 100,
      (this.goalPos[1] - this.pos[1]) / 100
    ];

    super.move();
  }

  collideWith(otherObj) {
    if (otherObj.friendly) {
      if (otherObj instanceof Bullet) {
        this.takeDamage(otherObj.damage);
      } else if (otherObj instanceof Miko) {
        this.remove();
      }
    }
  }

  takeDamage(dmg) {
    this.health -= dmg;

    if (this.health < 0) {
      this.remove();
    }
  }
}

Yokai.VEL_SCALE = 5;

export default Yokai;
