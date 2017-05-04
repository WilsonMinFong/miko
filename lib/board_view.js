class BoardView {
  constructor(board, stage) {
    this.board = board;
    this.stage = stage;
    this.miko = board.addMiko();
  }

  start () {
    this.board.drawObjects(this.stage);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", () => {
      this.board.moveObjects(this.stage);
    });
  }
}

export default BoardView;
