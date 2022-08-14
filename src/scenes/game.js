import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const titleText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: 'TODO: Make Game',
      style: {
        font: '22px monospace',
        fill: '#ffffff',
      },
    })
    titleText.setOrigin(0.5, 0.5)
  }
}
