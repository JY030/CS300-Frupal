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
		},
		{
			"display": "chainsaw"
		},
		{
			"display": "jackhammer"
		},
		{
			"display": "chest"
		},
		{
			"display": "shears"
		},
		{
			"display": "power-bar"
		}];
	
	//load all local storage varibles.
	loadFromLocal();
	
	//The window size we can see at all times.
	sizeOfMapWindow = 20;
	if (mapSize < 20) {
		sizeOfMapWindow = mapSize; //If mapSize is less than default 20x20
	}
	
	heroPositionOffset = Math.floor(sizeOfMapWindow / 2);
	
	//create our map based on mapSize.
	mapToLoad = create2DArray(mapSize, mapSize);
	
	//Randomize the jewel in the bounds of the mapsize
	jewelsPosition = [jewel_xy(mapSize), jewel_xy(mapSize)];
	
	//Load up our map with the tile list.
	loadMap(file);
	
	//Create spans for the size of map window we can see at all times.
	showVisibleMap();
	
	//These for loops will position the map to the center
	var xShift = heroPosition[0] <= heroPositionOffset ? (-heroPosition[0] + heroPositionOffset) : (heroPosition[0] - heroPositionOffset);
	var yShift = heroPosition[1] <= heroPositionOffset ? (-heroPosition[1] + heroPositionOffset) : (heroPosition[1] - heroPositionOffset);
	for (var i = 0; i < yShift; i++) {
		if (yShift <= heroPositionOffset) {
			shiftTiles("up");
		}
		else {
			shiftTiles("down");
		}
	}
	for (var i = 0; i < xShift; i++) {
		if (xShift <= heroPositionOffset) {
			shiftTiles("left");
		}
		else {
			shiftTiles("right");
		}
	}
	
	//update all tiles for visibility
	updateTile();
	
	whiffles = document.getElementById("WhiffleCount");
	whiffles.innerHTML += localStorage.getItem("money"); // if there is whiffle value in localStorage this should equal that
	energyBar = document.getElementById("Energy");
	energyBar.value = energy;
	energyBar.max = energy;
	p = document.getElementById("EnergyCount");
	p.innerHTML += energy;
	loadCharacter();
}
