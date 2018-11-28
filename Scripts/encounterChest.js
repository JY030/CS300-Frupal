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
	
	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	DecisionCustomAlert("purple", "Open the chest?", function(answer) {
		if (answer == true) {
			ChestType = chestContents[tileObject];
			if (ChestType == 1) {
				money += 100;
				whiffles.innerHTML = "Whiffles: "+money;
				var audio = new Audio('../Assets/Sounds/coins.wav');
				audio.play();
				NoActionCustomAlert("green", "You opened the chest! You got 100 Whiffles!");
			
			}
			if (ChestType == 2) {
				money = 0;
				whiffles.innerHTML = "Whiffles: "+money;
				var audio = new Audio('../Assets/Sounds/badNoise.wav');
				audio.play();
				NoActionCustomAlert("red", "You opened the chest! Lost all of your whiffles!");
			}
			removeItemFromMap(x, y);
			
			return true;
		}
	});
	
	return false;
}
