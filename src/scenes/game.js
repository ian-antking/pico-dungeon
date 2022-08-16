import Phaser from 'phaser'

import Dungeon from '../modules/dungeon'
import Player from '../modules/player'
import Slime from '../modules/slime'
import TurnManager from '../modules/turnManager'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  create() {
    this.dungeon = new Dungeon(this)
    this.player = new Player({
      scene: this,
      x: 2, 
      y: 2, 
      health: 10,
      actions: 1,
      tile: 4
    })

    const slime = new Slime(
      {
        scene: this,
        x: 4, 
        y: 4, 
        health: 10,
        actions: 1,
        tile: 24
      }
    )

    this.turnManager = new TurnManager(this.dungeon)

    this.turnManager.addEntity(this.player)
    this.turnManager.addEntity(slime)

    this.dungeon.initialiseEntity(this.player)
    this.dungeon.initialiseEntity(slime)
  }

  update() {
    this.turnManager.update()
  }
}
