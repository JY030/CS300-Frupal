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
	
	energy = document.getElementById("Energy");
	loadCharacter();
	
	loadFromLocal();
}