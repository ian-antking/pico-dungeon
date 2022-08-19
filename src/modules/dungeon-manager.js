import { Grid, AStarFinder } from 'pathfinding'

export default class Dungeon {
  constructor(scene) {
    this.scene = scene
    this.messages = []

    const tileSize = 8

    const data = [
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

    this.dungeon = data.map(row => row.map(tile => tile === 17 ? 0:1))

    const config = {
      data,
      tileWidth: tileSize,
      tileHeight: tileSize
    }

    this.map = this.scene.make.tilemap(config)

    const tileset = this.map.addTilesetImage('tiles', 'tiles', tileSize, tileSize, 0, 1)

    this.map.createLayer(0, tileset, 0, 0)
  }

  log(message) {
    this.messages.unshift(message)
    this.messages = this.messages.slice(0, 8)
  }

  initialiseEntity(entity) {
    const { x, y } = this.mapTileToWorldXY(entity.location.x, entity.location.y)
    entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile)
    entity.sprite.setOrigin(0)
    entity.sprite.setPosition(x, y)
  }

  mapTileToWorldXY(x, y) {
    return {
      x: this.map.tileToWorldX(x),
      y: this.map.tileToWorldY(y)
    }
  }

  validateMove({ destination }, entities) {
    const tile = this.map.getTileAt(destination.x, destination.y)

    let legal = tile.index === 17

    entities.forEach(entity => {
      if (entity.location.x === destination.x && entity.location.y === destination.y) {
        legal = false
      }
    })

    return legal
  }

  entitiesInRange(entity, entities) {
    return entities.filter(e => {
      if ( entity === e ) {
        return false
      }

      const grid = new Grid(this.dungeon)
      const finder = new AStarFinder({ allowDiagonal: true })

      const path = finder.findPath(entity.location.x, entity.location.y, e.location.x, e.location.y, grid)

      if (path.length <= entity.range) {
        return true
      }

      return false
      
    })
  }

  attack(attacker, defender) {
    attacker.startMove()
    attacker.tweens = attacker.tweens || 0
    attacker.tweens += 1
    const { x, y } = this.mapTileToWorldXY(defender.location.x, defender.location.y)

    this.scene.tweens.add({
      targets: attacker.sprite,
      onComplete: () => {
        attacker.endMove()
        attacker.tweens -= 1

        const damage = attacker.attack()
        defender.takeDamage(damage)
        attacker.spendAction()

        this.log(`${attacker.name} attacked ${defender.name} and dealt ${damage} damage`)

        if ( !defender.alive ) {
          defender.sprite.destroy()
          this.log(`${defender.name} is defeated`)
        }
      },
      x,
      y,
      ease: 'Poser2',
      hold: 20,
      duration: 80,
      delay: attacker.tweens * 200,
      yoyo: true      
    })
  }

  move(entity) {
    entity.startMove()
    const { x, y } = this.mapTileToWorldXY(entity.destination.x, entity.destination.y)
    this.scene.tweens.add({
      targets: entity.sprite,
      onComplete: () => {
        entity.move()
      },
      x,
      y,
      ease: 'Power2',
      duration: 200
    })
  }

  update(entity, entities) {
    if (this.validateMove(entity, entities)) {
      this.move(entity)
      return true
    } 

    entity.rejectMove()
    return false
  }
}