# Miko

## Background

Miko is a Touhou-inspired, bullet hell video game.  The aim of the game is to defeat all enemy yokai (monsters/spirits) while avoiding an onslaught of enemy bullets.  The player can move horizontally and vertically in a 2D canvas, as well as, return fire against enemy units.  Destroying enemy units increase a point counter.  Enemies occasionally drop items, such as extra lives.

## Functionality & MVP

Users will be able to:

- [ ] Start, pause, and reset the game/level
- [ ] Move their character and fire at enemies
- [ ] View their current score along with global high scores

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

## Wireframes

Miko will consist of a game canvas with a side area to display score, remaining lives, and remaining spells.  The game will only utilize keyboard controls.

![wireframe](docs/wireframe.png)

## Architecture & Technologies

Miko will be implemented with the following:

- Vanilla JavaScript for game logic
- Easel.js for rendering the game canvas
- Howler.js for game audio
- Webpack to bundle JS files

The following scripts will be created:

`board.js`: This script will handle rendering of objects on the board.

`board_object.js`: This script will be the parent class that all board objects inherit from.  It will keep track of position, velocity, and friend or foe status.

`miko.js`: This script will contain the shooting and movement logic for the player.

`yokai.js`: This script will contain the shooting and movement logic for enemy units.

`bullet.js`: This script will represent individual bullets.

## Implementation Timeline

**Day 1:**: Set up the game, including creating the game canvas and placing board objects on the canvas.

**Day 2:**: Add miko controls, including movement and firing.

**Day 3:**: Add enemy movement and firing patterns.

## Bonus Features

- [ ] Add global leaderboard
- [ ] Add multiple difficulty levels
- [ ] Add additional bullet patterns
- [ ] Add additional enemy patterns
- [ ] Add enemy item drops
