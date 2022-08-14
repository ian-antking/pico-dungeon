import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title')
  }

  create() {
    const canvas = document.querySelector('canvas')
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const logo = this.add.image(
      canvas.width / 2,
      canvas.height / 2 - 50,
      'logo'
    )

    logo.setScale((height/logo.height) / 2)
    logo.setOrigin(0.5, 0.5)

    const titleText = this.make.text({
      x: width / 2,
      y: height / 2 + height * 0.2,
      text: 'Press Spacebar',
      style: {
        font: '20px arcade',
        fill: '#ffffff',
      },
    })
    titleText.setOrigin(0.5, 0.5)
    
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Game')
    })
  }
}
