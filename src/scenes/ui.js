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

  createUI() {
    const { width } = this.cameras.main
    const entities = [...this.gameScene.turnManager.entities]

    entities.forEach((entity, index) => entity.createUI({
      scene: this,
      x: width - 64,
      y: 10 * index}
    ))
  }

  create() {
    this.gameScene = this.scene.get('Game')

    this.createUI()
  }
}