export default class Entity {
  constructor({ name, scene, x, y, tile, health, speed, range }) {
    this.name = name
    this.scene = scene
    this.health = health
    this.maxHealth = health
    this.movementPoints = speed
    this.speed = speed
    this.moving = false
    this.range = range

    this.destination = { x, y }
    this.location = { x, y }

    this.tile = tile
  }

  get alive() {
    return this.health > 0
  }

  get over() {
    return this.movementPoints === 0 && !this.moving
  }

  get idle() {
    return !this.over && !this.moving
  }

  attack() {
    return 1
  }

  takeDamage(damage) {
    this.health -= damage
  }

  spendAction() {
    this.spendMovement()
  }

  spendMovement() {
    this.movementPoints - 1 > 0 ? this.movementPoints = 0 : this.movementPoints -= 1
  }

  startMove() {
    this.moving = true
  }

  rejectMove() {
    this.destination = { x: this.location.x, y: this.location.y }
  }

  move() {
    this.location = { x: this.destination.x, y: this.destination.y }
    this.spendMovement()
    this.endMove()
  }

  endMove() {
    this.moving = false
  }

  refresh() {
    this.movementPoints = this.speed
    this.actionPoints = this.actions
  }
}