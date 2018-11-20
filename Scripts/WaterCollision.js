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
		alert("You can't swim! Lose 1 energy.");
	}
	
	if(energyBar.value <= 0){
		if(!(alert('You ran out of energy by Going into water!'))){window.location.reload();}
		return;
	}
	
	return foundWater;
}