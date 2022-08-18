import Phaser from 'phaser'

import DungeonManager from '../modules/dungeon-manager'
import Player from '../modules/player'
import Monster from '../modules/monster'
import TurnManager from '../modules/turnManager'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  create() {
    this.dungeon = new DungeonManager(this)
    this.player = new Player({
      scene: this,
      x: 2, 
      y: 2, 
      health: 10,
      speed: 1,
      tile: 4,
      actions: 1,
      name: 'Hero',
      range: 2
    })

    const slime = new Monster(
      {
        scene: this,
        x: 4, 
        y: 4, 
        health: 10,
        speed: 1,
        tile: 24,
        name: 'Slime',
        range: 2
      }
    )

    this.turnManager = new TurnManager(this.dungeon)

    this.turnManager.addEntity(this.player)
    this.turnManager.addEntity(slime)
  }

  update() {
    this.turnManager.update()
  }
}
