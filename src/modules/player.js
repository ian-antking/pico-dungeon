import Phaser from 'phaser'
import Entity from './entity'

export default class Player extends Entity {
  constructor(config) {
    super(config)

    this.actions = config.actions
    this.actionPoints = config.actions
    
    this.cursors = this.scene.input.keyboard.createCursorKeys()
  }

  get canAttack() {
    return this.actionPoints > 0 && !this.moving
  }

  get over() {
    return this.movementPoints === 0 && !this.moving && !this.canAttack
  }

  spendAction() {
    this.actionPoints - 1 > 0 ? this.actionPoints -= 1 : this.actionPoints = 0
  }

  update() {
    let moved
    if (this.idle) {
      if (this.cursors.left.isDown) {
        this.destination.x -=1
        moved = true
      } 

      if (this.cursors.right.isDown) {
        this.destination.x +=1
        moved = true
      } 

      if (this.cursors.up.isDown) {
        this.destination.y -=1
        moved = true
      }

      if (this.cursors.down.isDown) {
        this.destination.y +=1
        moved = true
      }

      return moved
    }

    if (this.health <= (this.maxHealth / 2)) {
      this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0)
    } else {
      this.sprite.clearTint()
    }
  }
}