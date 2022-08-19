import Phaser from 'phaser'

export default class UI extends Phaser.Scene {
  constructor() {
    super('Ui')
  }

  log(x, y, text) {
    this.add.text(x, y, text, {
      font: '12px Arial',
      color: '#ffffff',
      text,
      wordWrap: {
        width: 180
      }
    })
  }

  create() {
    const { width, height } = this.cameras.main

    this.gameScene = this.scene.get('Game')

    const entities = [...this.gameScene.turnManager.entities]

    entities.forEach((entity, index) => this.log(width - 200, 20 * index, entity.name))
  }
}