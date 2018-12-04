/*11/2/2018 Johnny Neckar

Functions to save and load to local storage. pretty straightforward
*/


function saveToLocal() {
	localStorage.setItem("mapName", mapName);
	localStorage.setItem("mapSize", mapSize);
	localStorage.setItem("heroPosition", JSON.stringify(heroPosition));
	localStorage.setItem("energy", energy);
	localStorage.setItem("money", money);
	localStorage.setItem("inventory", JSON.stringify(inventory));
	localStorage.setItem("tiles", JSON.stringify(tiles));
	
	localStorage.setItem("rJewel", JSON.stringify(rJewel));
	localStorage.setItem("rTiles", JSON.stringify(rTiles));
	localStorage.setItem("rHero", JSON.stringify(rHero));
	
}

function loadFromLocal() {
	if (isValidState()) {
		mapName = localStorage.getItem("mapName");
		mapSize = Number(localStorage.getItem("mapSize"));
		heroPosition = JSON.parse(localStorage.getItem("heroPosition"));
		energy = Number(localStorage.getItem("energy"));
		money = Number(localStorage.getItem("money"));
		inventory = JSON.parse(localStorage.getItem("inventory"));//Everything in here should be strings
		tiles = JSON.parse(localStorage.getItem("tiles"));
	
		rJewel = JSON.parse(localStorage.getItem("rJewel"));
		rTiles = JSON.parse(localStorage.getItem("rTiles"));
		rHero = JSON.parse(localStorage.getItem("rHero")); 
		
		return true;
	}
//	alert("Failed to load game from local storage")
	return false;
}