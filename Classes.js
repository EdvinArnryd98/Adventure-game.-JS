class Item {
  constructor(type, description, damage) {
    this.type = type
    this.description = description
    this.damage = damage
  }
}

class Player {
  constructor(name, currentHealth, maxHealth, baseDamage, weapon, row, col, inventory, potions, magic, level, exp) {
    this.name = name
    this.currentHealth = currentHealth
    this.maxHealth = maxHealth
    this.baseDamage = baseDamage
    this.weapon = weapon
    this.row = row
    this.col = col
    this.inventory = inventory
    this.potions = potions
    this.magic = magic
    this.level = level
    this.exp = exp
  }
}

class Enemy {
  constructor(name, description, health, damage, level) {
    this.name = name
    this.description = description
    this.health = health
    this.damage = damage
    this.level = level
  }
}

class Room {
  constructor(name, description, item, enemy) {
    this.name = name
    this.description = description
    this.item = item
    this.enemy = enemy
  }
}