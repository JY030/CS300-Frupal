<script>

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
	}

function loadFromLocal() {
	if (isValidState()) {
		mapName = localStorage.getItem("mapName");
		mapSize = localStorage.getItem("mapSize");
		heroPosition = JSON.parse(localStorage.getItem("heroPosition"));
		energy = localStorage.getItem("energy");
		money = localStorage.getItem("money");
		inventory = JSON.parse(localStorage.getItem("inventory"));
		tiles = JSON.parse(localStorage.getItem("tiles"));
		return true;
	}
//	alert("Failed to load game from local storage")
	return false;
}
	

</script>