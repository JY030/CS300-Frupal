/*11/2/2018 Johnny Neckar

Functions to save and load to local storage. pretty straightforward
*/


function saveToLocal() {
	localStorage.setItem("mapName", mapName);
	localStorage.setItem("mapSize", mapSize);
	localStorage.setItem("heroPosition", JSON.stringify(heroPosition));
	localStorage.setItem("energy", energy);
	localStorage.setItem("money", money);
	localStorage.setItem("inventory", JSON.stringify(JSON.stringify(inventory)));//To keep in line with the load function
	localStorage.setItem("tiles",  JSON.stringify(JSON.stringify(tiles)));//To keep in line with the load function
	}

function loadFromLocal() {
	if (isValidState()) {
		mapName = localStorage.getItem("mapName");
		mapSize = Number(localStorage.getItem("mapSize"));
		heroPosition = JSON.parse(localStorage.getItem("heroPosition")).split(',').map(Number);//Maps to numbers from string
		energy = Number(localStorage.getItem("energy"));
		money = Number(localStorage.getItem("money"));
		
		inventory = JSON.parse(localStorage.getItem("inventory"));//Everything in here should be strings
		inventory = JSON.parse(inventory);//Because it was string of a json for some reason?

		tiles = JSON.parse(localStorage.getItem("tiles"));
		tiles = JSON.parse(tiles);//Because it was string of a json for some reason?
	
		return true;
	}
//	alert("Failed to load game from local storage")
	return false;
}