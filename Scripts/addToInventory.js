//Johnny Neckar 11/16/2018

var usefulItems = {
	"hatchet":15,
	"axe":30,
	"chainsaw":60,
	"chisel":5,
	"sledge":25,
	"jackhammer":100,
	"machete":25,
	"shears":35,
	"binoculars":50
};

/*function removes object from map at given x,y coordinates. returns true if
function successfully removes object, otherwise returns false. possible reasons 
for function failing to remove object: invalid arguments given, coordinates out of
bounds, no object present in tile*/
function removeItemFromMap(x, y) {
	var tileContains = checkTile(x,y);
	if (tileContains == "out of bounds" || tileContains == "none" || tileContains == "checktile function fail") 
		return false; 
	for (i in mapToLoad) {
		if (mapToLoad[i][0].x == x) {
			for (j in mapToLoad[i]) {
				if (mapToLoad[i][j].y == y) {
					mapToLoad[i][j].content = "none";
					updateTile();
					return true;
				}
			}
		}
	}
}

//adds argument to inventory. might want to update in the future so that it checks argument is a valid inventory object
function addToInventory(toAdd) {
	inventory.push(toAdd);
}

/*removes all instances of object from inventory. returns number of objects removed (0 if none found)*/
function removeFromInventory(toRemove) {
	var numRemoved = 0;
	
	for (i in inventory) {
		if (inventory[i] == toRemove) {
			inventory.splice(i, 1);
			i--;
			numRemoved++;
		}
	}
	
	return numRemoved;
}

/*arguments are xy coordinate of tile. if a useful item exists on the specified tile, checks
how much money the player has. displays message if player doesn't have enough funds. if tile 
has a valid item and player can afford it, asks player whether they want to buy it. if so, 
deducts the cost, adds to inventory, and removes item from the map. returns true if item is 
purchased, else returns false.*/
function checkForPurchase(x, y) {
	var tileObject = checkTile(x, y).toLowerCase();
	
	if (!usefulItems.hasOwnProperty(tileObject))
		return false;
	
	if (money < usefulItems[tileObject]) {
		alert("Can't buy the "+tileObject+", you are too damn poor. Get some more whiffles and come back!");
		return false;
	}
	
//	var buyItem = confirm("Purchase "+tileObject+" for "+usefulItems[tileObject]+" whiffles?");
	if (confirm("Purchase "+tileObject+" for "+usefulItems[tileObject]+" whiffles?") == true) {
		money -= usefulItems[tileObject];
		addToInventory(tileObject);
		removeItemFromMap(x, y);
		alert("You bought the "+tileObject);
		whiffles.innerHTML = "Whiffles: "+money;
		return true;
	}
	
	return false;
}
