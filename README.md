# Miko

[miko]: http://www.wilsonfong.me/miko
[Live site][miko]

![main](assets/game.png)

## Background

Miko (shrine maiden) is a shooting game based off of Touhou, the popular
Japanese bullet hell shooter.  The game is written in JavaScipt and uses
EaselJS for game rendering.

## How to Play

The goal of Miko is to weave through the barrage of enemy bullets for as
long as possible before losing all of your lives.  You lose a life when
an enemy or enemy bullet makes contact with your green life orb. Try to
beat your personal high score.

Move your character using `←`, `↑`, `→`, and `↓`.  Shoot with `z` or
`SPACE`.

## Features

### 2D Rendering

Miko utilizes EaselJS for 2D rendering.  All game objects inherit from
`BoardObject`, which includes:

  - `container` property - All EaselJS `DisplayObject`s associated with
    a `BoardObject` are added to this container before drawing on the
    EaselJS `stage`.
  - `draw` method - Adds a `BoardObject` to the EaselJS `stage`.
  - `move` method - Updates the position of an object.

Object movement is bound to EaselJS `Ticker`'s tick event for smooth
canvas updates.

```javascript
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
```

### High Score

The user's personal high score is stored under the `high_score` key
using Web API's local storage, so the high score is persisted across
browser sessions until local storage is cleared.

```javascript
getHighScore() {
  const highScore = localStorage.getItem('high_score') || 0;
  this._updateHighScoreElement(highScore);
}

setHighScore() {
  localStorage.setItem('high_score', this.board.currentScore);
}
```

## Future Features

- [ ] Global leaderboard
- [ ] Multiple difficulty levels
- [ ] Additional bullet patterns
- [ ] Additional enemy patterns
- [ ] Enemy item drops
