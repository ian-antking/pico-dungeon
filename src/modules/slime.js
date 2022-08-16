import Entity from './entity'

export default class Slime extends Entity {
  constructor(config) {
    super(config)
  }

  update() {
    return true
  }
}