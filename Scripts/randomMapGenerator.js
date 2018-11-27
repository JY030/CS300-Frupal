/*Johnny Neckar 11/22/2018
function outputs tiles for a random map. takes desired map size as argument,
function bounded between 20 and 256 mapsize. outputs array of strings, each 
element being a tile specification in string format. function places diamonds 
in random valid location.
*/
function generateRandomMap(size) {
	
	
	if (size < 20)
		size = 20;
	if (size > 256)
		size = 256;
	
	//create two empty 2d arrays of mapsize x mapsize. first represents terrain type,
	//second represents object in tile.
	let rMapTerrain = Array(size).fill().map(() => Array(size).fill(0));
	let rMapObject = Array(size).fill().map(() => Array(size).fill("None"))
	
	//randomly select a tile diagonal to xy position, returns [x,y]
	function nextTile(x, y) {
		var rand = Math.random();
		switch (true) {
			case (rand < 0.25):
				return [(x + 1 + size) % size, (y + 1 + size) % size];
			case (rand < 0.5):
				return [(x - 1 + size) % size, (y + 1 + size) % size];
			case (rand < 0.75):
				return [(x + 1 + size) % size, (y - 1 + size) % size];
			default:
				return [(x - 1 + size) % size, (y - 1 + size) % size];
			
		}
	}

	//set tile and tiles directly NSEW to value
	function setSurrounding(value, x, y) {
		rMapTerrain[x][y] = value;
		rMapTerrain[(x + 1 + size) % size][y] = value;
		rMapTerrain[(x - 1 + size) % size][y] = value;
		rMapTerrain[x][(y + 1 + size) % size] = value;
		rMapTerrain[x][(y - 1 + size) % size] = value;
		return;
	}

	//draw a group of forest tiles
	function addForest(x, y) {
		setSurrounding(1, x, y);
		tile = [x,y];
		while (Math.random() < 0.82) {
			next = nextTile(tile[0], tile[1]);
			setSurrounding(1, next[0], next[1]);
			tile = next;
		}
	}

	//draw a group of bog tiles
	function addBog(x, y) {
		setSurrounding(4, x, y);
		tile = [x,y];
		while (Math.random() < 0.82) {
			next = nextTile(tile[0], tile[1]);
			setSurrounding(4, next[0], next[1]);
			tile = next;
		}
	}

	//draw a group of swamp tiles	
	function addSwamp(x, y) {
		setSurrounding(5, x, y);
		tile = [x,y];
		while (Math.random() < 0.82) {
			next = nextTile(tile[0], tile[1]);
			setSurrounding(5, next[0], next[1]);
			tile = next;
		}
		
	}

	//draw a group of water tiles
	function addLake(x, y) {
		setSurrounding(2, x, y);
		tile = [x,y];
		while (Math.random() < 0.82) {
			next = nextTile(tile[0], tile[1]);
			setSurrounding(2, next[0], next[1]);
			tile = next;
		}
		
	}

	//draw roughly linear water tiles
	function addRiver(x, y) {
		
		rMapTerrain[x][y] = 2;
		
		if (Math.random() > .5) {
			var nextRiv = [x,y];
			while (Math.random() < 0.93) {
				if (Math.random() > .92) {
					nextRiv[1] = (nextRiv[1] + 1 + size) % size;
				}
				else if (Math.random() > .915) {
					nextRiv[1] = (nextRiv[1] - 1 + size) % size;
				}
				else {
					nextRiv[0] = (nextRiv[0] + 1 + size) % size;
				}
				rMapTerrain[nextRiv[0]][nextRiv[1]] = 2;
			}
			return;
		}
		
		else {
			rMapTerrain[x][y] = 2;
			var nextRiv = [x,y];
			while (Math.random() < 0.85) {
				if (Math.random() > .92) {
					nextRiv[1] = (nextRiv[1] + 1 + size) % size;
				}
				else if (Math.random() > .91) {
					nextRiv[1] = (nextRiv[1] - 1 + size) % size;
				}
				else {
					nextRiv[0] = (nextRiv[0] + 1 + size) % size;
				}
				rMapTerrain[nextRiv[0]][nextRiv[1]] = 2;
			}			
		}
	}

	//set number of tile groups randomly based on map size. number in max/min declarations can
	//be adjusted to change density of tile groups (increasing number will reduce density)
	var max = Math.ceil((size * size) / 300);
	var min = Math.floor((size * size) / 750);	
	var numForest = Math.floor(Math.random() * (max - min)) + min;
	var numBog = Math.floor(Math.random() * (max - min)) + min;	
	var numSwamp = Math.floor(Math.random() * (max - min)) + min;
	var numRiver = Math.floor(Math.random() * (max - min)) + min;
	var numLake = Math.floor((Math.random() * (max - min) + min)/2);
	
	//call the draw functions randomly selected number of times
	var i = 0;
	while (i <= numForest) {
		addForest(Math.floor(Math.random() * size), Math.floor(Math.random() * size));
		i++;
	}
	i = 0;
	while (i <= numBog) {
		addBog(Math.floor(Math.random() * size), Math.floor(Math.random() * size));
		i++;		
	}	
	i = 0;
	while (i <= numSwamp) {
		addSwamp(Math.floor(Math.random() * size), Math.floor(Math.random() * size));
		i++;		
	}	
	i = 0;
	while (i <= numLake) {
		addLake(Math.floor(Math.random() * size), Math.floor(Math.random() * size));
		i++;		
	}	
	i = 0;
	while (i <= numRiver) {
		addRiver(Math.floor(Math.random() * size), Math.floor(Math.random() * size));
		i++;		
	}	

	//this huge block add objects to tiles (items, obstacles, chests, powerbars)
	//object probabilty can be adjusted based on terrain type
	for (j=0; j < size; j++) {
		for (k=0; k < size; k++) {
			switch(true) {
				case (rMapTerrain[j][k] == 2):
					break;
				case (rMapTerrain[j][k] == 0):
					var roll = Math.random();
					switch (true) {
						case (roll < .8):
							break;
						case (roll < .82):
							rMapObject[j][k] = "bush";
							break;
						case (roll < .85):
							rMapObject[j][k] = "tree";
							break;
						case (roll < .905):
							rMapObject[j][k] = "boulder";
							break;
						case (roll < .93):
							rMapObject[j][k] = "power-bar";
							break;	
						case (roll < .95):
							rMapObject[j][k] = "type1-treasure";
							break;							
						case (roll < .96):
							rMapObject[j][k] = "type2-treasure";
							break;		
						case (roll < .97):
							rMapObject[j][k] = "binoculars";
							break;
						case (roll < .98):
							rMapObject[j][k] = "shears";
							break;	
						case (roll < .99):
							rMapObject[j][k] = "jackhammer";
							break;							
						default:
							rMapObject[j][k] = "chainsaw";
					}
					break;
				case (rMapTerrain[j][k] == 4 || rMapTerrain[j][k] == 5):
					var roll = Math.random();
					switch (true) {
						case (roll < .75):
							break;
						case (roll < .905):
							rMapObject[j][k] = "bush";
							break;
						case (roll < .93):
							rMapObject[j][k] = "power-bar";
							break;	
						case (roll < .95):
							rMapObject[j][k] = "type1-treasure";
							break;							
						case (roll < .96):
							rMapObject[j][k] = "type2-treasure";
							break;		
						case (roll < .97):
							rMapObject[j][k] = "binoculars";
							break;
						case (roll < .98):
							rMapObject[j][k] = "shears";
							break;	
						case (roll < .99):
							rMapObject[j][k] = "jackhammer";
							break;							
						default:
							rMapObject[j][k] = "chainsaw";
					}
					break;				
				case (rMapTerrain[j][k] == 1):
					var roll = Math.random();
					switch (true) {
						case (roll < .5):
							break;
						case (roll < .905):
							rMapObject[j][k] = "tree";
							break;
						case (roll < .93):
							rMapObject[j][k] = "power-bar";
							break;	
						case (roll < .95):
							rMapObject[j][k] = "type1-treasure";
							break;							
						case (roll < .96):
							rMapObject[j][k] = "type2-treasure";
							break;		
						case (roll < .97):
							rMapObject[j][k] = "binoculars";
							break;
						case (roll < .98):
							rMapObject[j][k] = "shears";
							break;	
						case (roll < .99):
							rMapObject[j][k] = "jackhammer";
							break;							
						default:
							rMapObject[j][k] = "chainsaw";
					}
					break;				
			}
		}
	}
	
	//find an empty tile and place diamonds
	var tempX, tempY;
	do {
		tempX = Math.floor(Math.random() * size);
		tempY = Math.floor(Math.random() * size);
	} while (rMapTerrain[tempX][tempY] == 2 || rMapObject[tempX][tempY] != "None");
	rMapObject[tempX][tempY] = "Diamonds";
	
	//save generated tiles to array of strings. sparsely populated (meadow tiles with no object don't get at entry)
	tilesToSave = []
	var tempTile;
	for (j=0; j<size; j++) {
		for (k=0; k<size; k++) {
			if (rMapTerrain[j][k] != 0 || rMapObject[j][k] != "None") {
				tempTile = [j, k, 0, rMapTerrain[j][k], rMapObject[j][k]];
				tilesToSave.push(tempTile);
			}
		}
	}
	
	return tilesToSave;
			
}
