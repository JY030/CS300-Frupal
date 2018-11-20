function genericCustomAlert(color, contentText) {
	var custAlert = document.getElementById("alert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
	
	var buttons = document.getElementsByClassName("customAlertButton");
	buttons[0].style.display = "none";
	buttons[1].style.display = "none";
	
	setTimeout(function () {
		custAlert.style.opacity = "0";
	}, 1000);
}

function decisionCustomAlert(color, contentText) {
	var custAlert = document.getElementById("alert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
	
	setTimeout(function () {
		custAlert.style.opacity = "0";
	}, 1000);
}