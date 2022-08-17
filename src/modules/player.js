import Entity from './entity'

export default class Player extends Entity {
  constructor(config) {
    super(config)
    
    this.cursors = this.scene.input.keyboard.createCursorKeys()
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
  }
}