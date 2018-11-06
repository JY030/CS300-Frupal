window.onload = function() {
	
	file = [{
			"display": "<span class=\"tileSize meadow\"></span>"
		},
		{
			"display": "<span class=\"tileSize forest\"></span>"
		},
		{
			"display": "<span class=\"tileSize water\"></span>"
		},
		{
			"display": "<span class=\"tileSize wall\"></span>"
		},
		{
			"display": "<span class=\"tileSize bog\"></span>"
		},
		{
			"display": "<span class=\"tileSize swamp\"></span>"
		},
		{
			"display": "<span class=\"tileSize notVisable\"></span>"
		},
		{
			"display": "<span class=\"tileSize diamonds\"></span>"
		}];
	
	loadFromLocal();
	mapToLoad = create2DArray(mapSize, mapSize);
	var x = 10;
	jewelsPosition = [jewel_xy(x), jewel_xy(x)];
	loadMap(file);
	
	energyBar = document.getElementById("Energy");
	energyBar.value = energy;
	energyBar.max = energy;
	//EnergyCount.value = energy;
	loadCharacter();
}
