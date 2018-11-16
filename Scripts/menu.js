//Sets onload functions
window.onload = function() {
		document.getElementById("menuContainer").classList = " fadeIn";
		document.getElementById("startGame").onclick = function () {
		location.href = "Index.html";
	};
	
	document.getElementById("settings").onclick = function () {
		//Fade out text and fade in settings text
		//Then fade out settings when done and then fade in menu text
	};
}
