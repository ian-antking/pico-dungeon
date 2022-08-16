export default class Dungeon {
  constructor(scene) {
    this.scene = scene

    const tileSize = 8

    const dungeon = [
      [144, 145, 145, 145, 145, 147],
      [148, 17, 17, 17, 17, 148],
      [148, 17, 17, 17, 17, 148],
      [148, 17, 17, 17, 17, 148],
      [148, 17, 17, 17, 17, 148],
      [148, 17, 17, 17, 17, 148],
      [148, 17, 17, 17, 17, 148],
      [148, 17, 17, 17, 17, 148],
      [148, 17, 17, 17, 17, 148],
      [150, 145, 145, 145, 145, 153],
    ]

    const config = {
      data: dungeon,
      tileWidth: tileSize,
      tileHeight: tileSize
    }

    this.map = this.scene.make.tilemap(config)

    const tileset = this.map.addTilesetImage('tiles', 'tiles', tileSize, tileSize, 0, 1)

    this.map.createLayer(0, tileset, 0, 0)
  }

  initialiseEntity(entity) {
    const { x, y } = this.mapTileToWorldXY(entity.x, entity.y)
    entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile)
    entity.sprite.setOrigin(0)
    this.move(entity)
  }

  mapTileToWorldXY(x, y) {
    return {
      x: this.map.tileToWorldX(x),
      y: this.map.tileToWorldY(y)
    }
  }

  validateMove({ destination }) {
    const tile = this.map.getTileAt(destination.x, destination.y)

    return tile?.index === 17
  }

  move(entity) {
    entity.startMove()
    const { x, y } = this.mapTileToWorldXY(entity.destination.x, entity.destination.y)
    this.scene.tweens.add({
      targets: entity.sprite,
      onComplete: () => {
        entity.confirmMove()
        entity.x = x
        entity.y = y
        entity.moving = false
        entity.endMove()
      },
      x,
      y,
      ease: 'Power2',
      duration: 200
    })
  }

  update(entity) {
    if (this.validateMove(entity)) {
      this.move(entity)
      return true
    } 

    entity.rejectMove()
    return false
  }
}