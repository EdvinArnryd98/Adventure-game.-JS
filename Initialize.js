let playerName = localStorage.getItem("textvalue")
let player = new Player(playerName, 30, 2, 0, 0, [], 0, 0, 1, 0)


let knife = new Item("Knife", "A sharp knife that can cut", 2)
let sword = new Item("Sword", "A strong weapon used for battle!", 7)
let axe = new Item("Axe", "An axe! Used to chop down things", 4)


let sewerRat = new Enemy("Sewer Rat", "It's an abnormally big rat!", 7, 2, 1)
let skeleton = new Enemy("Skeleton", "This guy looks dead, but he's still moving!", 15, 5, 2)
let troll = new Enemy("Troll", "A giant troll with a big hammer!", 25, 12, 3)
let dragon = new Enemy("Dragon", "A mighty red dragon! Beware of the fire!", 45, 22, 4)


let hallWay = new Room("Hallway", "It's a long and open hallway that leads into the dungeon...", knife)
let pinkRoom = new Room("Pink Room", "The entire room is filled with pink furniture...", axe)
let sewers = new Room("The sewers", "It's very wet and it smells bad in here!", null, sewerRat)

let darkCave = new Room("Dark Cave", "It's so dark in here... Look out! Oh, it's just a bat...", sword)
let thePit = new Room("The Pit", "Watch out! It's a long fall, you wouldn't want to fall down there...", null)
let graveyard = new Room("Graveyard", "There are so many graves here, very spooky!", null)

let forest = new Room("Forest", "There are a lot of trees here!", null)
let garden = new Room("Garden", "A bunch of flowers! Maybe there is something over there...", null)
let farm = new Room("The farm", "There are a lot of crops over here!", null)

map = [
  [hallWay, pinkRoom, sewers],
  [darkCave, thePit, graveyard],
  [forest, garden, farm]
]