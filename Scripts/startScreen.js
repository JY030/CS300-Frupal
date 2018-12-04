window.addEventListener('keydown', enterKey, false);

//Sets onload functions
window.onload = function() {
	//Our flashing text
	var flashingText = document.getElementById("flashingText");
	flashingText.innerHTML = "Press Enter To Start"
}

//Press enter to go to the menu
function enterKey (input) {
	if (input.keyCode == 13) {
		document.getElementById("flashingText").id = "fadeOut";
		setTimeout(loadMenu, 3000);
	}
}

function loadMenu () {
	location.href = "Menu.html"
}