export default class Entity {
  constructor({ scene, x, y, tile, health, speed }) {
    this.scene = scene
    this.health = health
    this.movementPoints = speed
    this.speed = speed
    this.moving = false

    this.destination = { x, y }
    this.location = { x, y }

    this.tile = tile
  }


  get over() {
    return this.movementPoints == 0
  }

  get idle() {
    return !this.over && !this.moving
  }

  startMove() {
    this.moving = true
  }

  rejectMove() {
    this.destination = { x: this.location.x, y: this.location.y }
  }

  move() {
    this.location = { x: this.destination.x, y: this.destination.y }
    this.movementPoints - 1 > 0 ? this.movementPoints -= 1 : this.movementPoints = 0
    this.moving = false
  }

  refresh() {
    this.movementPoints = this.speed
  }
}