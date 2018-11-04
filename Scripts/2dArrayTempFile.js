window.onload = function() {
	loadMap(
		[{
			"display": "#"
		},
		{
			"display": "B"
		},
		{
			"display": "C"
		}]
	)
	
	loadFromLocal();
	
	energyBar = document.getElementById("Energy");
	energyBar.value = energy;
	energyBar.max = energy;
	loadCharacter();
}