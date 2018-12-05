//Sets onload functions
window.onload = function() {
	localStorage.setItem("rJewel", JSON.stringify(false));
	localStorage.setItem("rTiles", JSON.stringify(false));
	localStorage.setItem("rHero", JSON.stringify(false));
	loadFromLocal();
	
	document.getElementById("menuContainer").classList = "fadeIn";
}

function StartGame() {
	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	setTimeout(function() {
			location.href = "Index.html";
		}, 600);
}

function validate() {
	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	
	mapName = document.getElementsByName("mapName")[0].value;
	mapSize = document.getElementsByName("mapSize")[0].value;
	heroPosition = JSON.parse(document.getElementsByName("heroPosistion")[0].value);
	energy = document.getElementsByName("energy")[0].value;
	money = document.getElementsByName("money")[0].value;
	inventory = JSON.parse(document.getElementsByName("inventory")[0].value);
	tiles = JSON.parse(document.getElementsByName("tiles")[0].value);
	
	rJewel = document.getElementsByName("randomJewel")[0].checked;
	rTiles = document.getElementsByName("randomTiles")[0].checked;
	rHero = document.getElementsByName("randomStart")[0].checked;
	
	saveToLocal();
	alert("Settings Updated");
	SettingsBack();
}

function LoadSettings() {
	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	
	document.getElementById("startContent").classList = "doNotDisplay";
		
	document.getElementsByName("mapName")[0].value = mapName;
	document.getElementsByName("mapSize")[0].value = mapSize;
	document.getElementsByName("heroPosistion")[0].value = JSON.stringify(heroPosition);
	document.getElementsByName("energy")[0].value = energy;
	document.getElementsByName("money")[0].value = money;
	document.getElementsByName("inventory")[0].value = JSON.stringify(inventory);
	document.getElementsByName("tiles")[0].value = JSON.stringify(tiles);
	
	document.getElementsByName("randomJewel")[0].checked = rJewel;
	document.getElementsByName("randomTiles")[0].checked = rTiles;
	document.getElementsByName("randomStart")[0].checked = rHero;
		
	document.getElementById("settingsContent").classList = "display";
}

function SettingsBack() {
	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	
	document.getElementById("settingsContent").classList = "doNotDisplay";
	document.getElementById("startContent").classList = "display";
}

function LoadGlossary() {
	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	
	document.getElementById("startContent").classList = "doNotDisplay";
	document.getElementById("glossaryContent").classList = "display";
}

function GlossaryBack() {
	var audio = new Audio('../Assets/Sounds/Alert.wav');
	audio.play();
	
	document.getElementById("glossaryContent").classList = "doNotDisplay";
	document.getElementById("startContent").classList = "display";
}