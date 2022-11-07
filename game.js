document.getElementById('playerName').innerHTML = player.name
document.getElementById('playerHealth').innerHTML = player.currentHealth
document.getElementById('playerLevel').innerHTML = player.level

var gameMenu = document.getElementById('buttonsActions')
var enterBattleMenu = document.getElementById('enterBattleMenu')
var battleMenu = document.getElementById('battleMenu')
var winMenu = document.getElementById('winMenu')
var deathMenu = document.getElementById('deathMenu')
var levelUp = document.getElementById('levelUpMenu')

let textBox = document.getElementById('textBox')
var enemy

//WinMenu
var expEarned = document.getElementById('expEarned')

var playerPosition = map[player.row][player.col]
document.getElementById('roomDisplay').innerHTML = playerPosition.name
document.getElementById('roomDescription').innerHTML = playerPosition.description
function movePlayer(direction) {
  if (direction === left) {
    player.col--
    if (player.col < 0) {
      player.col = 0
      textBox.innerHTML += "There is no door in that direction!" + '<br>'
    }
    else {
      textBox.innerHTML += "You walk west!" + '<br>'
    }
  }
  if (direction === up) {
    player.row--
    if (player.row < 0) {
      player.row = 0
      textBox.innerHTML += "There is no door in that direction!" + '<br>'
    }
    else {
      textBox.innerHTML += "You walk north!" + '<br>'
    }
  }
  if (direction === right) {
    player.col++
    if (player.col >= map[player.row].length) {
      player.col--
      textBox.innerHTML += "There is no door in that direction!" + '<br>'
    }
    else {
      textBox.innerHTML += "You walk east!" + '<br>'
    }
  }
  if (direction === down) {
    player.row++
    if (player.row >= map.length) {
      player.row--
      textBox.innerHTML += "There is no door in that direction!" + '<br>'
    }
    else {
      textBox.innerHTML += "You walk south!" + '<br>'
    }
  }
  document.getElementById('roomDisplay').innerHTML = map[player.row][player.col].name
  document.getElementById('roomDescription').innerHTML = map[player.row][player.col].description
  playerPosition = map[player.row][player.col]
  enemy = playerPosition.enemy
  if (playerPosition.enemy) {
    textBox.innerHTML += "You encountered " + playerPosition.enemy.name + '<br>'
    textBox.innerHTML += "What will you do?" + '<br>'
    activateStartBattle()
  }
}


// GAME ACTIONS
function playerView() {
  if (playerPosition.item) {
    var itemType = playerPosition.item.type
    var itemDesc = playerPosition.item.description
    textBox.innerHTML += "You look around and find " + itemType + "!" + '<br>' + itemDesc + '<br>'
  }
  else {
    textBox.innerHTML += "You look around but find nothing..." + '<br>'
  }
}

function playerLoot() {
  if (playerPosition.item) {
    var itemType = playerPosition.item.type
    player.inventory.push(playerPosition.item)
    textBox.innerHTML += "You loot " + itemType + "!" + '<br>'
    document.getElementById('inventory').innerHTML = null
    for (var i = 0; i < player.inventory.length; i++) {
      var div = document.createElement("div");
      div.setAttribute("id", "item" + i)
      document.getElementById("inventory").appendChild(div);
      document.getElementById("item" + i).innerHTML = player.inventory[i].type
    }
    playerPosition.item = false
  }
  else {
    textBox.innerHTML += "There is no item to loot!" + '<br>'
  }
}


// ENCOUNTER
function startBattle() {
  activateBattle()
  textBox.innerHTML += "You started a battle!" + '<br>' + "You are fighting " + playerPosition.enemy.name + '<br>'
}

function retreat() {
  activateGameMenu()
  document.getElementById('textBox').innerHTML += "You flee from battle... You appear at the start of the dungeon..." + '<br>'
  player.row = 0
  player.col = 0
  playerPosition = map[player.row][player.col]
  document.getElementById('roomDisplay').innerHTML = map[player.row][player.col].name
  document.getElementById('roomDescription').innerHTML = map[player.row][player.col].description
}


// BATTLE
function battle() {
  if (enemy.health > 0) {
    player.currentHealth -= enemy.damage
    if (player.currentHealth <= 0) {
      activateDeathMenu()
    }
    textBox.innerHTML += enemy.name + " Attack you with " + enemy.damage + " damage points!" + '<br>'
    document.getElementById('playerHealth').innerHTML = player.currentHealth
  }
  else {
    textBox.innerHTML += " Congratulations! You defeated " + enemy.name + "!" + '<br>'
    let expGained = playerPosition.enemy.level * 3
    player.xp += expGained
    expEarned.innerHTML = expGained
    delete playerPosition.enemy

    activateWinMenu()
    if (player.xp >= player.level * 15) {
      player.xp = 0
      player.level += 1
      player.baseDamage += 1
      player.maxHealth += 5
      player.currentHealth = player.maxHealth
      activateLevelUp()
    }
  }
}

function useAttack() {
  enemy.health -= player.damage
  textBox.innerHTML += "You attack the " + enemy.name + " with " + player.damage + " damage points!" + '<br>'
  battle()
}

function useHeal() {
  if (player.potions >= 1) {
    player.currentHealth += 8
    player.potions -= 1
    textBox.innerHTML += "You heal 8 health points!" + '<br>'
  }
  else {
    textBox.innerHTML += "You don't have any potions!" + '<br>'
  }
  battle()
}

function useMagic() {
  if (player.magic >= 1) {
    enemy.health -= 15
    textBox.innerHTML += "You throw a magic spell on " + enemy.name + " with 15 damage points!" + '<br>'
  }
  else {
    textBox.innerHTML += "You don't have any mana!" + '<br>'
  }
  battle()
}


// ACTIVATE MENU's
function activateGameMenu() {
  gameMenu.style.display = "initial";
  gameMenu.style.hidden = "visible";

  enterBattleMenu.style.display = "none";
  enterBattleMenu.style.visibility = "hidden";

  battleMenu.style.display = "none";
  battleMenu.style.visibility = "hidden";

  winMenu.style.display = "none";
  winMenu.style.visibility = "hidden";

  deathMenu.style.display = "none";
  deathMenu.style.visibility = "hidden";

  levelUp.style.display = "none";
  levelUp.style.visibility = "hidden";
}

function activateStartBattle() {
  enterBattleMenu.style.display = "initial";
  enterBattleMenu.style.visibility = "visible";

  battleMenu.style.display = "none";
  battleMenu.style.visibility = "hidden";

  gameMenu.style.display = "none";
  gameMenu.style.hidden = "hidden";

  winMenu.style.display = "none";
  winMenu.style.visibility = "hidden";

  deathMenu.style.display = "none";
  deathMenu.style.visibility = "hidden";

  levelUp.style.display = "none";
  levelUp.style.visibility = "hidden";
}

function activateBattle() {
  battleMenu.style.display = "initial";
  battleMenu.style.visibility = "visible";

  gameMenu.style.display = "none";
  gameMenu.style.hidden = "hidden";

  enterBattleMenu.style.display = "none";
  enterBattleMenu.style.visibility = "hidden";

  winMenu.style.display = "none";
  winMenu.style.visibility = "hidden";

  deathMenu.style.display = "none";
  deathMenu.style.visibility = "hidden";

  levelUp.style.display = "none";
  levelUp.style.visibility = "hidden";
}

function activateWinMenu() {
  winMenu.style.display = "initial";
  winMenu.style.visibility = "visible";

  battleMenu.style.display = "none";
  battleMenu.style.visibility = "hidden";

  gameMenu.style.display = "none";
  gameMenu.style.hidden = "hidden";

  enterBattleMenu.style.display = "none";
  enterBattleMenu.style.visibility = "hidden";

  deathMenu.style.display = "none";
  deathMenu.style.visibility = "hidden";

  levelUp.style.display = "none";
  levelUp.style.visibility = "hidden";
}

function activateDeathMenu() {
  deathMenu.style.display = "initial";
  deathMenu.style.visibility = "visible";

  winMenu.style.display = "none";
  winMenu.style.visibility = "hidden";

  battleMenu.style.display = "none";
  battleMenu.style.visibility = "hidden";

  gameMenu.style.display = "none";
  gameMenu.style.hidden = "hidden";

  enterBattleMenu.style.display = "none";
  enterBattleMenu.style.visibility = "hidden";

  levelUp.style.display = "none";
  levelUp.style.visibility = "hidden";
}

function activateLevelUp() {

  levelUp.style.display = "initial";
  levelUp.style.visibility = "visible";

  deathMenu.style.display = "none";
  deathMenu.style.visibility = "hidden";

  winMenu.style.display = "none";
  winMenu.style.visibility = "hidden";

  battleMenu.style.display = "none";
  battleMenu.style.visibility = "hidden";

  gameMenu.style.display = "none";
  gameMenu.style.hidden = "hidden";

  enterBattleMenu.style.display = "none";
  enterBattleMenu.style.visibility = "hidden";
}