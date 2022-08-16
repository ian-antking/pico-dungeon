import Entity from './entity'

export default class Player extends Entity {
  constructor(config) {
    super(config)
    
    this.cursors = this.scene.input.keyboard.createCursorKeys()
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