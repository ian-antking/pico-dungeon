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
    this.events.once('preupdate', () => {
      this.scene.launch('Ui')
    })
    const { width, height } = this.cameras.main

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
        health: 5,
        speed: 1,
        tile: 24,
        name: 'Slime',
        range: 2
      }
    )

    this.turnManager = new TurnManager(this.dungeon)

    this.turnManager.addEntity(this.player)
    this.turnManager.addEntity(slime)

    let camera = this.cameras.main
    camera.setViewport(0, 0, width - 64, height)
    camera.setBounds(0, 0, width, height)
    camera.startFollow(this.player.sprite)

    this.events.emit('CreateUI')
  }

  update() {
    this.events.emit('test')
    this.turnManager.update()
  }
}
