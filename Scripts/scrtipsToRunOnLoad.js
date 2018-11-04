window.onload = function() {
	loadMap(
		[{
			"display": "<span class=\"tileSize none\"></span>"
		},
		{
			"display": "<span class=\"tileSize notVisable\"></span>"
		},
		{
			"display": "<span class=\"tileSize diamonds\"></span>"
		},
		{
			"display": "<span class=\"tileSize water\"></span>"
		},
		{
			"display": "<span class=\"tileSize tree\"></span>"
		},
		{
			"display": "<span class=\"tileSize mountains\"></span>"
		},
		{
			"display": "<span class=\"tileSize grass\"></span>"
		}]
	)
	
	loadFromLocal();
	
	energyBar = document.getElementById("Energy");
	energyBar.value = energy;
	energyBar.max = energy;
	loadCharacter();
}