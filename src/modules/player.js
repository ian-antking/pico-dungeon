import { GameObjects } from 'phaser'

export default class Player extends GameObjects.Sprite {
  constructor({ scene, x, y, }) {
    super(scene, x, y, 'player')
    this.health = 10
    this.actionPoints = 1
    this.maxActions = 1
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.moving = false

    this.destination = { x, y }
    this.location = { x, y }

    this.tile = 4
  }

  get over() {
    return this.actionPoints == 0
  }

  update() {
    if (!this.over && !this.moving) {
      if (this.cursors.left.isDown) {
        this.destination.x -=1
        return true
      } 

      if (this.cursors.right.isDown) {
        this.destination.x +=1
        return true
      } 

      if (this.cursors.up.isDown) {
        this.destination.y -=1
        return true
      }

      if (this.cursors.down.isDown) {
        this.destination.y +=1
        return true
      }

      return false
    }
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