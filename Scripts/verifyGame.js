//11/1/2018 Johnny Neckar
	
/*localStorage.setItem("mapName", "Sample Frupal Map");
localStorage.setItem("mapSize", 25);
localStorage.setItem("heroPosition", JSON.stringify([22,12]));
localStorage.setItem("energy", 103);
localStorage.setItem("money", 1000);
localStorage.setItem("inventory", JSON.stringify(["Axe", "Axe", "Shears", "Pretty Rock"]));
localStorage.setItem("tiles", JSON.stringify([[12,12,1,1,"None"],[13,12,0,1,"Tree"],[14,12,0,2,"Diamonds"]]));
*/
	
/*checks gamestate variables in localstorage for validity. returns false if any required gamestate variables
are not present on local storage or are in an invalid format, and shows an alert specifying where it found a problem. 
if it returns true, everything in localStorage is present, parsable, and in bounds... but no guarentee that its working 
as intended.


note about position: hero position and tiles are located by their XY coordinates. [0,0] is the top left corner of the map,
and [size-1,size-1] is the bottom right.

for reference: here is basic info about all elements required for valid gamestate and the formats they must be stored as:

mapName: string containing name of map. not checked by this function since it shouldnt ever break functionality
mapSize: integer value > 0, 25 specifies a 25x25 map. remember that max position on size 25 map is [24,24]
heroPosition: specifies XY coordinates for current hero position, array of 2 ints. both must be int between 0 and mapsize-1
energy: remaining energy, must be int >= 0
money: whiffles in da bank. must be int >= 0
inventory: array of unspecified size containing string elements.
tiles: specified tiles. array of unspecified size, each element being an array with 5 elements, specification follows:
tiles[0]: x position of tile, 0<= x < mapSize
tiles[1]: y position, same
tiles[2]: visibility of tile, must be 1 or 0, 1 indicates tile is visible
tiles[3]: terrain type, must be int between 0 and numTerrains. number of valid terrain types can be adjusted 
in this function by changing numTerrains value
tiles[4]: string specifying object, if any, present in tile. "None" specifies no object present. note that a valid
tile containing "Diamonds" MUST exist in order for the game state to be valid - this tile must be found to win the game*/

function isValidState() { 

	var numTerrains = 5; //not sure how many different valid terrain types there will be, adjust if needed

	var checkSize = Number(localStorage.getItem("mapSize")); 
	if (checkSize == null || isNaN(checkSize) || checkSize < 1 || !(checkSize % 1 === 0)) {
		alert("Error: Invalid game state - unable to read map size");
		return false;
		}

	var checkPosition = JSON.parse(localStorage.getItem("heroPosition"));
	if (checkPosition[0] == null || checkPosition[1] == null || Math.max(...checkPosition) >= checkSize 
		|| Math.min(...checkPosition) < 0) {
		alert("Error: Invalid game state - hero out of bounds");
		return false;
		}
		
	var checkEnergy = Number(localStorage.getItem("energy")); 
	if (checkEnergy == null || isNaN(checkEnergy) || checkEnergy < 0 || !(checkEnergy % 1 === 0)) {
		alert("Error: Invalid game state - unable to read energy");
		return false;
		}
		
	var checkMoney = Number(localStorage.getItem("money"));
	if (checkMoney == null || isNaN(checkMoney) || checkMoney < 0 || !(checkMoney % 1 === 0)) {
		alert("Error: Invalid game state - unable to read money");
		return false;
		}
		
	var checkInventory = JSON.parse(localStorage.getItem("inventory"));//Everything in here should be strings
	if (checkInventory === undefined) {
		alert("Error: Invalid game state - unable to read inventory");
		return false;
		}
	for (i in checkInventory) {
		if (typeof checkInventory[i] != "string") {
			alert("Error: Invalid game state - inventory contains invalid object");
			return false;
			}
		}
	
	var checkTiles = JSON.parse(localStorage.getItem("tiles"));
	
	var hasDiamonds = false;
	
	if (checkTiles == null ) {
		alert("Error: Invalid game state - can't read tiles");
		return false;
		}
		
	for (i in checkTiles) {
		
		if ( isNaN(checkTiles[i][0]) || isNaN(checkTiles[i][1]) ) {
			alert("Error: Invalid game state - tile specified at invalid position, tile:"+i);
			return false;
			}
			
		if ( checkTiles[i][0] < 0 || checkTiles[i][1] < 0 || checkTiles[i][0] >= localStorage.getItem("mapSize") 
			|| checkTiles[i][1] >= localStorage.getItem("mapSize")) {
			alert("Error: Invalid game state - specified tile is out of bounds, tile:"+i);
			return false;
			}
		
		if ( checkTiles[i][2] != 0 && checkTiles[i][2] != 1 ) {
			alert("Error: Invalid game state - specified tile has invalid visibility, tile:"+i);
			return false;
			}

		if ( isNaN(checkTiles[i][3]) || checkTiles[i][3] < 0 || checkTiles[i][3] > numTerrains) {
			alert("Error: Invalid game state - terrain type invalid, tile:"+i);
			return false;
			}
		if ( tileTerrain = checkTiles[i][4] == "Diamonds" ) {
			hasDiamonds = true; 
			}
			
		
	}
	if (hasDiamonds == false) {
		alert("Error: Invalid game state - map doesn't contain diamonds (specified tile MUST exist that contains \'Diamonds\' in object field");
			return false;
		}

	return true;			
}

/*returns string representation of object that exists in specified tile. 
arguments int x, int y, (xy coordinate of tile), return string
if tile is not specified by game state, returns "None". 
assumes arguments are valid, default return of "None" */
function checkTile(toCheckX, toCheckY) {
	
	toCheckX = Math.floor(Number(toCheckX));
	toCheckY = Math.floor(Number(toCheckY));
	
	if (toCheckX < 0 || toCheckX >= mapSize || toCheckY < 0 || toCheckY >= mapSize) {
		return "out of bounds";
	}
	
	for (i in mapToLoad) {
		if (mapToLoad[i][0].x == toCheckX) {
			for (j in mapToLoad[i]) {
				if (mapToLoad[i][j].y == toCheckY) {
					return mapToLoad[i][j].content.toLowerCase();
				}
			}
		}
	}
	
	return "checkTile function fail";
}

/*similar to checkTile function, returns terrain type as string
instead of object in tile*/
function checkTileTerrain(toCheckX, toCheckY) {
	
	toCheckX = Math.floor(Number(toCheckX));
	toCheckY = Math.floor(Number(toCheckY));
	
	if (toCheckX < 0 || toCheckX >= mapSize || toCheckY < 0 || toCheckY >= mapSize) {
		return "Out of bounds";
	}
	
	for (i in mapToLoad) {
		if (mapToLoad[i][0].x == toCheckX) {
			for (j in mapToLoad[i]) {
				if (mapToLoad[i][j].y == toCheckY) {
					return mapToLoad[i][j].image;
				}
			}
		}
	}
	
	return "checkTileTerrain function fail";
}
