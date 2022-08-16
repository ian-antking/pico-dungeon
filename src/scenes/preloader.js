import Phaser from 'phaser'

import phaserLogo from '../../assets/logo.png'
import sprites from '../../assets/sprites/colored_tilemap.png'

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader')
  }

  preload() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const progressBoxWidth = width * 0.7
    const progressBoxHeight = height * 0.1
    const progressBoxX = (width / 2) - (progressBoxWidth / 2) 
    const progressBoxY = (height / 2) - (progressBoxHeight / 2 )

    const progressBarWidth = progressBoxWidth * 0.99
    const progressBarHeight = progressBoxHeight * 0.9
    const progressBarX = progressBoxX + progressBoxWidth * 0.005
    const progressBarY = progressBoxY + progressBoxHeight * 0.05

    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(progressBoxX, progressBoxY, progressBoxWidth, progressBoxHeight)

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: '',
      style: {
        font: '2px arcade',
        fill: '#ffffff',
      },
    })
    assetText.setOrigin(0.5, 0.5)

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '2px arcade',
        fill: '#ffffff',
      },
    })
    percentText.setOrigin(0.5, 0.5)

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`)
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(progressBarX, progressBarY , progressBarWidth * value, progressBarHeight)
    })

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`)
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      percentText.destroy()
      assetText.destroy()
    })

    this.load.image('logo', phaserLogo)
    this.load.spritesheet('tiles', sprites, {
      frameWidth: 8,
      frameHeight: 8,
      spacing: 1
    })
  }

  create() {
    this.scene.start('Title')
  }
}
