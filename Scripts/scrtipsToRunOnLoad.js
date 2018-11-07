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
	
	loadFromLocal();
	mapToLoad = create2DArray(mapSize, mapSize);
	var x = 10;
	jewelsPosition = [jewel_xy(x), jewel_xy(x)];
	loadMap(file);
	
	energyBar = document.getElementById("Energy");
	energyBar.value = energy;
	energyBar.max = energy;
	p = document.getElementById("EnergyCount");
	p.innerHTML = energy;
	loadCharacter();
}
