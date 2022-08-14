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
    const player = new Player(2, 2, this.input.keyboard.createCursorKeys())

    this.turnManager = new TurnManager(dungeon)

    this.turnManager.addEntity(player)
  }

  update() {
    this.turnManager.update()
  }
}
