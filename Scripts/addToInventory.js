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
	"binoculars":50,
	"power-bar":1
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
	in_display();
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
	in_display();
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

	if (tileObject == "binoculars" && binocularcheck == 1) {
		var audio = new Audio('../Assets/Sounds/Alert.wav');
		audio.play();
		audio.volume = 0.01;
		NoActionCustomAlert("purple", "You've already got some sweet binocs, you don't need another pair.");
		return false;
	}

	if (money < usefulItems[tileObject]) {
		var audio = new Audio('../Assets/Sounds/Alert.wav');
		audio.play();
		audio.volume = 0.01;
		NoActionCustomAlert("purple", "Can't buy the "+tileObject+", you are too damn poor. Get some more whiffles and come back!");
		return false;
	}

	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	audio.volume = 0.01;
	DecisionCustomAlert("purple", "Purchase "+tileObject+" for "+usefulItems[tileObject]+" whiffles?", function(answer) {
		if (answer == true) {
			money -= usefulItems[tileObject];

			//Here is for the specific case of buying a power-bar... Really hard to do other wise, sorry.
			if(tileObject == "power-bar"){
				removeItemFromMap(x, y);
				NoActionCustomAlert("purple", "You bought the "+tileObject);
				energyBar.value += 20; p.innerHTML = energyBar.value;
				whiffles.innerHTML = "Whiffles: "+money;
				var audio = new Audio('../Assets/Sounds/powerbar.wav');
				audio.play();
				audio.volume = 0.01;
				return true;
			}

			addToInventory(tileObject);
			removeItemFromMap(x, y);
			if (tileObject == "binoculars") {
				binocularcheck = 1;
			}
			whiffles.innerHTML = "Whiffles: "+money;
			
			var audio = new Audio('../Assets/Sounds/ItemPickUp.wav');
			audio.play();
			audio.volume = 0.01;
			return false;
		}
	});
}


/*		//Here is for the specific case of buying a power-bar... Really hard to do other wise, sorry.
		if(tileObject == "power-bar"){
			removeItemFromMap(x, y);
			alert("You bought the "+tileObject);
			whiffles.innerHTML = "Whiffles: "+money;
			energyBar.value += 20; p.innerHTML = energyBar.value;
			return true;
		}
*/
