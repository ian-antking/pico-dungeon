import Phaser from 'phaser'

import phaserLogo from '../../assets/logo.png'

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader')
  }

  preload() {
    const canvas = document.querySelector('canvas')
    const progressBarX = canvas.width / 2 - 160
    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(progressBarX, 270, 320, 50)

    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 100,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    })
    loadingText.setOrigin(0.5, 0.5)

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    })
    percentText.setOrigin(0.5, 0.5)

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    })
    assetText.setOrigin(0.5, 0.5)

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`)
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(progressBarX + 10, 280, 300 * value, 30)
    })

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`)
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
    })

    this.load.image('logo', phaserLogo)
  }

  create() {
    this.scene.start('Title')
  }
}
