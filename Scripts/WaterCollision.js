function isWaterCollision(futureX, futureY) {
	
	if (futureX >= mapSize) {
		futureX = 0;
	}
	if (futureX < 0) {
		futureX = mapSize - 1;
	}
	
	if (futureY >= mapSize) {
		futureY = 0;
	}
	if (futureY < 0 ) {
		futureY = mapSize - 1;
	}
	
	var foundWater = false;
	
	if (checkTileTerrain(futureX, futureY).toLowerCase() == "water") {
		foundWater = true;
		energyBar.value -= 1;
		p.innerHTML = energyBar.value;
		var audio = new Audio('../Assets/Sounds/cantMove.wav');
		audio.play();
		NoActionCustomAlert("blue", "You can't swim! Lose 1 energy.");
	}
	
	if(energyBar.value <= 0){
		var audio = new Audio('../Assets/Sounds/lose.wav');
		audio.play();
		GenericCustomAlert("red", 'You ran out of energy by Going into water!', function() {window.location.reload()});
		return;
	}
	
	return foundWater;
}