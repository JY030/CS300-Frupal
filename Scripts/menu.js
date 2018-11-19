//Sets onload functions
window.onload = function() {
	loadFromLocal();
	
	document.getElementById("menuContainer").classList = "fadeIn";
}

function StartGame() {
	location.href = "Index.html";
}

function validate() {
	mapName = document.getElementsByName("mapName")[0].value;
	mapSize = document.getElementsByName("mapSize")[0].value;
	heroPosition = JSON.parse(document.getElementsByName("heroPosistion")[0].value);
	energy = document.getElementsByName("energy")[0].value;
	money = document.getElementsByName("money")[0].value;
	inventory = JSON.parse(document.getElementsByName("inventory")[0].value);
	tiles = JSON.parse(document.getElementsByName("tiles")[0].value);
	saveToLocal();
	alert("Settings Updated");
	SettingsBack();
}

function LoadSettings() {
	document.getElementById("startContent").classList = "doNotDisplay";
		
	document.getElementsByName("mapName")[0].value = mapName;
	document.getElementsByName("mapSize")[0].value = mapSize;
	document.getElementsByName("heroPosistion")[0].value = JSON.stringify(heroPosition);
	document.getElementsByName("energy")[0].value = energy;
	document.getElementsByName("money")[0].value = money;
	document.getElementsByName("inventory")[0].value = JSON.stringify(inventory);
	document.getElementsByName("tiles")[0].value = JSON.stringify(tiles);
		
	document.getElementById("settingsContent").classList = "display";
}

function SettingsBack() {
	document.getElementById("settingsContent").classList = "doNotDisplay";
	document.getElementById("startContent").classList = "display";
}

function LoadGlossary() {
	document.getElementById("startContent").classList = "doNotDisplay";
	document.getElementById("glossaryContent").classList = "display";
}

function GlossaryBack() {
	document.getElementById("glossaryContent").classList = "doNotDisplay";
	document.getElementById("startContent").classList = "display";
}