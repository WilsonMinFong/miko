import Database from './database';
// useful keycodes
var KEY_UP = 'ArrowUp';
var KEY_LEFT = 'ArrowLeft';
var KEY_RIGHT = 'ArrowRight';
var KEY_DOWN = 'ArrowDown';

class BoardView {
  constructor(board, stage) {
    this.board = board;
    this.stage = stage;
    this.miko = board.miko;

    this.horizontalKeys = {};
    this.verticalKeys = {};

    this.scoreElement = document.getElementById('current-score');
    this.highScoreElement = document.getElementById('high-score');
  }

  bindKeyDown() {
    Object.keys(BoardView.MOVEMENT_DIRS).forEach((key) => {
      document.addEventListener('keydown', (e) => {
        const move = BoardView.MOVEMENT_DIRS[e.key];

        this._setMovementKeyPress(e);

        if (move) {
          e.preventDefault();
          this.miko.setMovement(move);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'z' || e.key === ' ') {
        this.miko.startShooting();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.togglePause();
      }
    });
  }

  bindKeyUp() {
    document.addEventListener('keyup', (e) => {
      const move = BoardView.MOVEMENT_DIRS[e.key];

      this._setMovementKeyPress(e);

      if (move) {
        this.miko.removeMovement(move);

        this._addRemainingMovement(e.key);
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'z' || e.key === ' ') {
        this.miko.stopShooting();
      }
    });
  }

  bindFrameTick() {
    const ticker = createjs.Ticker;

    ticker.removeAllEventListeners();
    ticker.framerate = 60;

    ticker.addEventListener("tick", (e) => {
      if (!ticker.paused) {
        this.board.moveObjects(this.stage);
        this.stage.update(e);

        this.checkYokaiCount();
        this.updateCurrentScore();
        this.updateLives();

        this.checkGameOver();
      }
    });
  }

  checkGameOver() {
    if (this.miko.isDead()) {
      this.setHighScore();

      if (Database.checkLeaderboard(this.board.currentScore)) {
        Database.updateLeaderboard({ name: "Wilson", score: this.board.currentScore });
      }

      this.toggleGameOver();
    }
  }

  checkYokaiCount() {
    if (this.board.yokai.length === 0) {
      this.board.addYokaiWave();
      this.board.drawYokaiWave(this.stage);
    }
  }

  updateCurrentScore() {
    const currentScore = this.board.currentScore;

    if (parseInt(this.scoreElement.innerHTML) !== currentScore) {
      this.scoreElement.innerHTML = this._padScore(currentScore, 10);

      if (currentScore > parseInt(this.highScoreElement.innerHTML)) {
        this._updateHighScoreElement(currentScore);
      }
    }
  }

  getHighScore() {
    const highScore = localStorage.getItem('high_score') || 0;
    this._updateHighScoreElement(highScore);
  }

  setHighScore() {
    localStorage.setItem('high_score', this.board.currentScore);
  }

  toggleGameOver() {
    createjs.Ticker.paused = !createjs.Ticker.paused;

    const modal = document.getElementById('gameOverModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  }

  updateLives() {
    let displayLives = document.getElementById('lives');
    const livesDiff = displayLives.children.length - this.miko.lives;

    if (livesDiff > 0) {
      displayLives.removeChild(displayLives.lastElementChild);
    } else if (livesDiff < 0) {
      while (displayLives.children.length < this.miko.lives) {
        const node = document.createElement("i");
        node.className = "fa fa-star";
        node.setAttribute("aria-hidden", true);
        displayLives.appendChild(node);
      }
    }
  }

  start () {
    this.board.drawObjects(this.stage);

    this.bindKeyDown();
    this.bindKeyUp();
    this.bindFrameTick();
    this.bindInstructionsModal();
    this.bindRestartButton();
    this.bindLeaderboardModal();

    this.getHighScore();
    Database.getLeaderboard();

    createjs.Ticker.paused = true;
  }

  restart() {
    this.board.reset(this.stage);
    this.stage.removeAllEventListeners();
    this.board.drawObjects(this.stage);
    this.bindFrameTick();
    this.getHighScore();
    this.miko = this.board.miko;
  }

  togglePause() {
    createjs.Ticker.paused = !createjs.Ticker.paused;

    const modal = document.getElementById('instructionsModal');

    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
  }

  bindInstructionsModal() {
    const modal = document.getElementById('instructionsModal');

    const span = document.getElementsByClassName("close")[0];

    span.onclick = () => {
      this.togglePause();
    };

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        this.togglePause();
      }
    });
  }

  bindLeaderboardModal() {
    const modal = document.getElementById('leaderboardModal');
    const span = document.getElementsByClassName("closeLeaderboard")[0];
    const modalButton = document.getElementById('openLeaderboard');

    const toggleLeaderboard = () => {
      createjs.Ticker.paused = !createjs.Ticker.paused;
      modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    };

    span.onclick = () => {
      toggleLeaderboard();
    };

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        toggleLeaderboard();
      }
    });

    modalButton.onclick = () => {
      toggleLeaderboard();
    };
  }

  bindRestartButton() {
    const button = document.getElementById('restart-button');

    button.onclick = () => {
      this.restart();
      this.toggleGameOver();
    };
  }

  _addRemainingMovement(key) {
    let otherKey;

    if (Object.keys(this.horizontalKeys).includes(key)) {
      otherKey = Object.keys(this.horizontalKeys).find((dir) => {
        return this.horizontalKeys[dir];
      });
    } else if (Object.keys(this.verticalKeys).includes(key)) {
      otherKey = Object.keys(this.verticalKeys).find((dir) => {
        return this.verticalKeys[dir];
      });
    }

    if (otherKey) {
      const move = BoardView.MOVEMENT_DIRS[otherKey];

      this.miko.setMovement(move);
    }
  }

  _padScore(score, size) {
    const s = "000000000" + score;
    return s.substr(s.length - size);
  }

  _setMovementKeyPress(e) {
    const key = e.key;

    if (key === KEY_LEFT || key === KEY_RIGHT) {
      this.horizontalKeys[key] = e.type === 'keydown';
    } else if (key === KEY_UP || key === KEY_DOWN) {
      this.verticalKeys[key] = e.type === 'keydown';
    }
  }

  _updateHighScoreElement(score) {
    this.highScoreElement.innerHTML = this._padScore(score, 10);
  }
}

BoardView.MOVEMENT_DIRS = {
  [KEY_UP]: [0, -1],
  [KEY_DOWN]: [0, 1],
  [KEY_LEFT]: [-1, 0],
  [KEY_RIGHT]: [1, 0]
};

export default BoardView;
