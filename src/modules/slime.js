import { Grid, AStarFinder } from 'pathfinding'

import Entity from './entity'

export default class Slime extends Entity {
  constructor(config) {
    super(config)

    this.name = 'Slime'
  }

  update() {
    if (this.idle) {
      const { x, y } = this.location
      const { player, dungeon } = this.scene
      const pX = player.location.x
      const pY = player.location.y

      const grid = new Grid(dungeon.dungeon)
      const finder = new AStarFinder()

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