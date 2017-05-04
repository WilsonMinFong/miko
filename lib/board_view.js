class BoardView {
  constructor(board, stage) {
    this.board = board;
    this.stage = stage;
    this.miko = board.addMiko();
  }

  start () {
    this.board.drawObjects(this.stage);

    setInterval(() => {
      this.board.moveObjects(this.stage);
    } , 1000/60);
  }
}

export default BoardView;
