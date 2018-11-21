function NoActionCustomAlert(color, contentText) {
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

function GenericCustomAlert(color, contentText) {
	var custAlert = document.getElementById("alert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
	
	var buttons = document.getElementsByClassName("customAlertButton");
	buttons[1].style.display = "none";
	
	buttons[0].addEventListener("click", Accept);
}

function DecisionCustomAlert(color, contentText) {
	var custAlert = document.getElementById("alert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
}

function Accept() {
	var custAlert = document.getElementById("alert");
	
	setTimeout(function () {
		custAlert.style.opacity = "0";
	}, 1000);
	return true;
}

function Deny() {
	var custAlert = document.getElementById("alert");
	
	setTimeout(function () {
		custAlert.style.opacity = "0";
	}, 1000);
	return false;
}