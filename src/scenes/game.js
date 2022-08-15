import Phaser from 'phaser'

import Dungeon from '../modules/dungeon'
import Player from '../modules/player'
import TurnManager from '../modules/turnManager'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  create() {
    const dungeon = new Dungeon(this)
    const player = new Player({
      scene: this,
      x: 2, 
      y: 2, 
    })

    this.turnManager = new TurnManager(dungeon)

    this.turnManager.addEntity(player)
    dungeon.initialiseEntity(player)
  }

  update() {
    this.turnManager.update()
  }
}
