import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title')
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const logo = this.add.image(
      width / 2,
      height / 2 - (height * 0.1),
      'logo'
    )

    logo.setScale((height/logo.height) / 2)
    logo.setOrigin(0.5, 0.5)

    const titleText = this.make.text({
      x: width / 2,
      y: height / 2 + height * 0.2,
      text: '[space]',
      style: {
        font: '10px arcade',
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
