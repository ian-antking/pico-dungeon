export default class Player {
  constructor(x, y, cursors) {
    this.actionPoints = 1
    this.maxActions = 1
    this.cursors = cursors

    this.x = x
    this.y = y

    this.destination = {
      x: x,
      y: y
    }

    this.sprite = 4
  }

  get over() {
    return this.actionPoints == 0
  }

  confirmMove() {
    this.x = this.destination.x
    this.y = this.destination.y
    this.useAction()
  }

  rejectMove() {
    this.destination = {
      x: this.x,
      y: this.y
    }
  }

  update() {
    if (!this.over) {
      if (this.cursors.left.isDown) {
        this.destination.x -=1
      } 

      if (this.cursors.right.isDown) {
        this.destination.x +=1
      } 

      if (this.cursors.up.isDown) {
        this.destination.y -=1
      }

      if (this.cursors.down.isDown) {
        this.destination.y +=1
      }
    }
  }

  useAction() {
    this.actionPoints - 1 > 0 ? this.actionPoints -= 1 : this.actionPoints = 0
  }

  refreshActions() {
    this.actionPoints = this.maxActions
  }
}