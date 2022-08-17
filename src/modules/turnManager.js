export default class TurnManager {
  constructor(dungeon) {
    this.entities = new Set()
    this.dungeon = dungeon

    this.currentTurn = 0
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

    entity.update() && this.dungeon.update(entity)

    if (entity.movementPoints === 0) {
      this.currentTurn += 1
    }

    const remainingMoves = entities.reduce((previous, current) => { return previous + current.movementPoints}, 0)

    if (!remainingMoves) {
      entities.forEach(entity => entity.refresh())
    }
  }
}