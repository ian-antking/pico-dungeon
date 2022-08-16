export default class Entity {
  constructor({ scene, x, y, tile, health, actions }) {
    this.scene = scene
    this.health = health
    this.actionPoints = actions
    this.maxActions = actions
    this.moving = false

    this.destination = { x, y }
    this.location = { x, y }

    this.tile = tile
  }


  get over() {
    return this.actionPoints == 0
  }

  startMove() {
    this.moving = true
  }

  endMove() {
    this.moving = false
  }

  confirmMove() {
    this.location = { x: this.destination.x, y: this.destination.y }
  }

  rejectMove() {
    this.destination = { x: this.location.x, y: this.location.y }
  }

  useAction() {
    this.actionPoints - 1 > 0 ? this.actionPoints -= 1 : this.actionPoints = 0
  }

  refreshActions() {
    this.actionPoints = this.maxActions
  }
}