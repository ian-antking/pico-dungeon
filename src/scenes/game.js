import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  create() {
    const tileSize = 8

    const dungeon = [
      [0, 1, 1, 1, 1, 3],
      [16, 17, 17, 17, 17, 19],
      [16, 17, 17, 17, 17, 19],
      [16, 17, 17, 17, 17, 19],
      [16, 17, 17, 17, 17, 19],
      [32, 1, 1, 1, 1, 35],
    ]

    const config = {
      data: dungeon,
      tileWidth: tileSize,
      tileHeight: tileSize
    }
  

    const map = this.make.tilemap(config)

    const tileset = map.addTilesetImage('tiles', 'sprites', tileSize, tileSize, 0, 1)

    map.createStaticLayer(0, tileset, 0, 0)
  }
}
