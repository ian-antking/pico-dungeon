export default class TurnManager {
  constructor(dungeon) {
    this.entities = new Set()
    this.dungeon = dungeon

    this.currentTurn = 0
  }

  addEntity(entity) {
    this.entities.add(entity)
    this.dungeon.initialiseEntity(entity)
  } 

  removeEntity(entity) {
    this.entities.delete(entity)
  }

  resolveAttack(attacker, defender) {
    const damage = attacker.attack()
    defender.takeDamage(damage)
    attacker.spendAction()

    console.log(`${attacker.name} attacked ${defender.name} and dealt ${damage} damage`)

    if ( !defender.alive ) {
      defender.sprite.destroy()
      this.removeEntity(defender)
      console.log(`${defender.name} is defeated`)
    }
  }

  update() {
    const entities = [...this.entities]
    
    const entity = entities[this.currentTurn % entities.length]

    entity.update() && this.dungeon.update(entity, entities)

    if (entity.canAttack) {
      const targets = this.dungeon.entitiesInRange(entity, entities)

      if (targets.length > 0) {
        this.resolveAttack(entity, targets[0])
      }
    }

    if (entity.movementPoints === 0 && !entity.canAttack) {
      this.currentTurn += 1
    }

    const remainingMoves = entities.reduce((previous, current) => { return previous + current.movementPoints}, 0)

    if (!remainingMoves) {
      entities.forEach(entity => entity.refresh())
    }
  }
}