export default class TurnManager {
  constructor(dungeon) {
    this.entities = new Set()
    this.lastCall = Date.now()
    this.interval = 150
    this.dungeon = dungeon
  }

  addEntity(entity) {
    this.entities.add(entity)
    this.dungeon.place(entity)
  } 

  removeEntity(entity) {
    this.entities.remove(entity)
  }

  turn() {
    for (var entity of this.entities) {
      if (!entity.over) {
        entity.update()
        this.dungeon.update(entity)
        break
      }
      this.entities.forEach(entity => entity.refreshActions())
    }
  }

  update() {
    const now = Date.now()
    const limit = this.lastCall + this.interval
    if (now > limit) {
      this.turn()

      this.lastCall = Date.now()
    }
  }
}