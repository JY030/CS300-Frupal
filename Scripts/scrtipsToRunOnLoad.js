window.onload = function() {
	
	file = [{
			"display": "meadow"
		},
		{
			"display": "forest"
		},
		{
			"display": "water"
		},
		{
			"display": "wall"
		},
		{
			"display": "bog"
		},
		{
			"display": "swamp"
		},
		{
			"display": "notVisable"
		},
		{
			"display": "diamonds"
		}];
	
	//load all local storage varibles.
	loadFromLocal();
	
	//The window size we can see at all times.
	sizeOfMapWindow = 20;
	if (mapSize < 20) {
		showVisibleMap = mapSize; //If mapSize is less than default 20x20
	}
	
	//create our map based on mapSize.
	mapToLoad = create2DArray(mapSize, mapSize);
	
	//Randomize the jewel in the bounds of the mapsize
	jewelsPosition = [jewel_xy(mapSize), jewel_xy(mapSize)];
	
	//Load up our map with the tile list.
	loadMap(file);
	
	//Create spans for the size of map window we can see at all times.
	showVisibleMap();
	
	//These for loops will position the map to x9y9
	var xShift = heroPosition[0] <= 9 ? (-heroPosition[0] + 9) : (heroPosition[0] - 9);
	var yShift = heroPosition[1] <= 9 ? (-heroPosition[1]) + 9 : (heroPosition[1] - 9);
	for (var i = 0; i < yShift; i++) {
		if (yShift <= 9) {
			shiftTiles("up");
		}
		else {
			shiftTiles("down");
		}
	}
	for (var i = 0; i < xShift; i++) {
		if (xShift <= 9) {
			shiftTiles("left");
		}
		else {
			shiftTiles("right");
		}
	}
	
	//update all tiles for visibility
	updateTile();
	
	whiffles = document.getElementById("WhiffleCount");
	whiffles.innerHTML = 100; // if there is whiffle value in localStorage this should equal that
	energyBar = document.getElementById("Energy");
	energyBar.value = energy;
	energyBar.max = energy;
	p = document.getElementById("EnergyCount");
	p.innerHTML = energy;
	loadCharacter();
}
