export default class TurnManager {
  constructor(dungeon) {
    this.entities = new Set()
    this.lastCall = Date.now()
    this.interval = 150
    this.dungeon = dungeon

    this. currentTurn = 0
  }

  addEntity(entity) {
    this.entities.add(entity)
  } 

  removeEntity(entity) {
    this.entities.remove(entity)
  }

  update() {
    const entities = [...this.entities]
    
    const entity = entities[this.currentTurn % entities.length]

    if (entity.update() && this.dungeon.update(entity)) {
      this.currentTurn += 1
    }

    const remainingActions = entities.reduce((previous, current) => { return previous + current.actionPoints}, 0)
    if (!remainingActions) {
      entities.forEach(entity => entity.refreshActions())
    }
  }
}