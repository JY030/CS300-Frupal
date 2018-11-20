//Peter Bui 11/19/2018

var chestContents = {
	"type1-treasure":1,
	"type2-treasure":2
}

/*arguments are xy coordinate of tile. if a chest exists on the specified tile, asks player 
whether they want to open it, changing their whiffles, and removes chest from the map. returns true if chest is 
opened, else returns false.*/
function checkChest(x, y) {
	var tileObject = checkTile(x, y).toLowerCase();
	var chestType;
	
	if (!chestContents.hasOwnProperty(tileObject))
		return false;
	
	if (confirm("Open "+tileObject+"?") == true) {
		ChestType = chestContents[tileObject];
		alert("You opened the "+tileObject);
		if (ChestType == 1) {
			money += 100;
			whiffles.innerHTML = "Whiffles: "+money;
			alert("You got 100 Whiffles!");
		}
		if (ChestType == 2) {
			money = 0;
			whiffles.innerHTML = "Whiffles: "+money;
			alert("Lost all of your whiffles!");
		}
		removeItemFromMap(x, y);
		
		return true;
	}
	
	return false;
}
