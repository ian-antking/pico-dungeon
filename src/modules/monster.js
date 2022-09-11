import { Grid, AStarFinder } from 'pathfinding'

import Entity from './entity'

export default class Slime extends Entity {
  constructor(config) {
    super(config)
  }

  get canAttack() {
    return this.movementPoints > 0 && !this.moving
  }

  get over() {
    return this.movementPoints == 0
  }

  createUI({ scene, x, y }) {
    scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0)
    scene.add.text(x + 10, y, this.name, {
      font: '8px Arial',
      fill: '#ffffff'
    })
  }

  update() {
    if (this.idle) {
      const { x, y } = this.location
      const { player, dungeon } = this.scene
      const pX = player.location.x
      const pY = player.location.y

      const grid = new Grid(dungeon.dungeon)
      const finder = new AStarFinder({ allowDiagonal: true })

      const path = finder.findPath(x, y, pX, pY, grid)

      if (path.length > 2) {
        this.destination = {
          x: path[1][0],
          y: path[1][1]
        }
        return true
      }
    }

    return true
  }
}