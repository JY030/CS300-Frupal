function NoActionCustomAlert(color, contentText) {
	var custAlert = document.getElementById("noActionAlert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
	
	setTimeout(function () {
		custAlert.style.opacity = "0";
	}, 1000);
}

function GenericCustomAlert(color, contentText, callback) {
	var custAlert = document.getElementById("genericCustomAlert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
	
	window.removeEventListener('keyup', getKeyAndMove);

	var buttons = document.getElementsByClassName("genericCustomAlertButton");
	buttons[0].addEventListener("click", function () {
		window.addEventListener('keyup', getKeyAndMove, false);
		callback();
		buttons[0].removeAttribute("click");
		setTimeout(function () {
			custAlert.style.opacity = "0";
		}, 600);
	});
}

function DecisionCustomAlert(color, contentText, callback) {
	var custAlert = document.getElementById("decisionCustomAlert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
	
	window.removeEventListener('keyup', getKeyAndMove);
	
	var buttons = document.getElementsByClassName("decisionCustomAlertButton");
	buttons[0].addEventListener("click", function () {
		window.addEventListener('keyup', getKeyAndMove, false);
		callback(true);
		buttons[0].removeAttribute("click");
		custAlert.style.opacity = "0";
	});
	
	buttons[1].addEventListener("click", function () {
		window.addEventListener('keyup', getKeyAndMove, false);
		callback(false);
		buttons[1].removeAttribute("click");
		custAlert.style.opacity = "0";
	});
}

// function DecisionCustomAlert(color, contentText, callback) {
	// var custAlert = document.getElementById("decisionCustomAlert");
	// custAlert.style.backgroundColor = color;
	// custAlert.firstElementChild.innerHTML = contentText;
	// custAlert.style.opacity = "1";
	
	// window.removeEventListener('keyup', getKeyAndMove);
	
	// var buttons = document.getElementsByClassName("decisionCustomAlertButton");
	// buttons[0].addEventListener("click", DecisionCustomAlertListener(true, callback, buttons, custAlert), false);
	
	// buttons[1].addEventListener("click", DecisionCustomAlertListener(false, callback, buttons, custAlert), false);
// }

// function DecisionCustomAlertListener(val, callback, buttons, custAlert) {
	// window.addEventListener('keyup', getKeyAndMove, false);
		// callback(val);
		// buttons[1].removeEventListener("click", DecisionCustomAlertListener);
		// custAlert.style.opacity = "0";
// }