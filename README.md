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

Miko utilizes EaselJS for 2D rendering.  Every object in the game canvas has an EaselJS `Container`.  This allows for easy update and removal of all EaselJS objects associated with a game object.

### High Score

The user's personal high score is stored using Web API's local storage,
so the high score is persisted across browser sessions until local
storage is cleared.

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
