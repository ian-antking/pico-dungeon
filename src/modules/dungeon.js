export default class Dungeon {
  constructor(scene) {
    this.scene = scene

    const tileSize = 8

    const dungeon = [
      [0, 1, 1, 1, 1, 3],
      [16, 17, 17, 17, 17, 19],
      [16, 17, 17, 17, 17, 19],
      [16, 17, 17, 17, 17, 19],
      [16, 17, 17, 17, 17, 19],
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

    this.map = this.scene.make.tilemap(config)

    const tileset = this.map.addTilesetImage('tiles', 'sprites', tileSize, tileSize, 0, 1)

    this.map.createLayer(0, tileset, 0, 0)
  }

  validateMove(entity) {
    const { index } = this.map.getTileAt(entity.destination.x, entity.destination.y)
    if (index === 17) {
      entity.confirmMove()
      return true
    } else {
      entity.rejectMove()
      return false
    }
  }

  place(entity) {
    this.map.putTileAt(entity.sprite, entity.x, entity.y)
  }

  clear(x, y) {
    this.map.putTileAt(17, x, y)
  }

  update(entity) {
    const originalLocation = { x: entity.x, y: entity.y }
    if (this.validateMove(entity)) {
      this.place(entity)
      this.clear(originalLocation.x, originalLocation.y)
    }
  }
}