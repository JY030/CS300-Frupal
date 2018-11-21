function NoActionCustomAlert(color, contentText) {
	var custAlert = document.getElementById("noActionAlert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	
	setTimeout(function () {
		custAlert.style.opacity = "1";
	}, 1);
	custAlert.style.display = "block";
	
	setTimeout(function () {
		custAlert.style.opacity = "0";
	}, 1000);
}

function GenericCustomAlert(color, contentText, callback) {
	callback = oneCallBack(callback);

	var custAlert = document.getElementById("genericCustomAlert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	
	setTimeout(function () {
		custAlert.style.opacity = "1";
	}, 1);
	custAlert.style.display = "block";
	
	window.removeEventListener('keyup', getKeyAndMove);

	var okButton = document.getElementById("genericCustomAlertButton");
	okButton.addEventListener("click", function genericCustomAlertButton() {
		window.addEventListener('keyup', getKeyAndMove, false);
		callback();

		this.outerHTML = this.outerHTML;
		custAlert.style.opacity = "0";
		setTimeout(function () {
			custAlert.style.display = "none";
		}, 50);
	}, false);
}

function DecisionCustomAlert(color, contentText, callback) {
	callback = oneCallBack(callback);
	
	var custAlert = document.getElementById("decisionCustomAlert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	
	setTimeout(function () {
		custAlert.style.opacity = "1";
	}, 1);
	custAlert.style.display = "block";
	
	window.removeEventListener('keyup', getKeyAndMove);
		
	document.getElementById("decisionCustomAlertAcceptButton").addEventListener('click', function test() {
		window.addEventListener('keyup', getKeyAndMove, false);
		callback(true);
		document.getElementById("decisionCustomAlertAcceptButton").removeEventListener('click', test);
		custAlert.style.opacity = "0";
		setTimeout(function () {
			custAlert.style.display = "none";
		}, 50);
	}, false);
	
	document.getElementById("decisionCustomAlertDenyButton").addEventListener('click', function tset() {
		window.addEventListener('keyup', getKeyAndMove, false);
		callback(false);
		document.getElementById("decisionCustomAlertDenyButton").removeEventListener('click', tset);
		custAlert.style.opacity = "0";
		setTimeout(function () {
			custAlert.style.display = "none";
		}, 50);
	}, false);
}

function oneCallBack(fn) {
	var hasCalled = false;
	
	return function() {
		if (!hasCalled) {
			hasCalled = true;
			return fn.apply(this, arguments);
		}
	}
}