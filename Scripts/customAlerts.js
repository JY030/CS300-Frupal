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

	var okButton = document.getElementById("genericCustomAlertButton");
	okButton.addEventListener("click", function genericCustomAlertButton() {
		window.addEventListener('keyup', getKeyAndMove, false);
		callback();
		//okButton.removeEventListener("click", genericCustomAlertButton);
		this.outerHTML = this.outerHTML;
		setTimeout(function () {
			custAlert.style.opacity = "0";
		}, 600);
	});
}

function DecisionCustomAlert(color, contentText, callback) {
	callback = oneCallBack(callback);
	
	var custAlert = document.getElementById("decisionCustomAlert");
	custAlert.style.backgroundColor = color;
	custAlert.firstElementChild.innerHTML = contentText;
	custAlert.style.opacity = "1";
	
	window.removeEventListener('keyup', getKeyAndMove);
	
	//var acceptButton = document.getElementById("decisionCustomAlertAcceptButton");
	//var denyButton = document.getElementById("decisionCustomAlertDenyButton");
	
	document.getElementById("decisionCustomAlertAcceptButton").addEventListener('click', function test() {
		window.addEventListener('keyup', getKeyAndMove, false);
		//this.outerHTML = this.outerHTML;
		callback(true);
		document.getElementById("decisionCustomAlertAcceptButton").removeEventListener('click', test);
		custAlert.style.opacity = "0";
	}, false);
	
	document.getElementById("decisionCustomAlertDenyButton").addEventListener('click', function tset() {
		window.addEventListener('keyup', getKeyAndMove, false);
		//this.outerHTML = this.outerHTML;
		callback(false);
		document.getElementById("decisionCustomAlertDenyButton").removeEventListener('click', tset);
		custAlert.style.opacity = "0";
	}, false);
}

// function DecisionCustomAlert(color, contentText, callback) {
	// var custAlert = document.getElementById("decisionCustomAlert");
	// custAlert.style.backgroundColor = color;
	// custAlert.firstElementChild.innerHTML = contentText;
	// custAlert.style.opacity = "1";
	
	// window.removeEventListener('keyup', getKeyAndMove);
	
	// document.getElementById("decisionCustomAlertAcceptButton").addEventListener("click", DecisionCustomAlertAcceptListener, false);
	
	// document.getElementById("decisionCustomAlertDenyButton").addEventListener("click", DecisionCustomAlertDenyListener, false);
// }

// function DecisionCustomAlertAcceptListener() {
	// window.addEventListener('keyup', getKeyAndMove, false);
		// callback(val);
		// document.getElementById("decisionCustomAlertAcceptButton").removeEventListener("click", DecisionCustomAlertAcceptListener);
		// document.getElementById("decisionCustomAlert").style.opacity = "0";
// }

// function DecisionCustomAlertDenyListener() {
	// window.addEventListener('keyup', getKeyAndMove, false);
		// callback(val);
		// document.getElementById("decisionCustomAlertDenyButton").removeEventListener("click", DecisionCustomAlertDenyListener);
		// document.getElementById("decisionCustomAlert").style.opacity = "0";
// }

function oneCallBack(fn) {
	var hasCalled = false;
	
	return function() {
		if (!hasCalled) {
			hasCalled = true;
			return fn.apply(this, arguments);
		}
	}
}