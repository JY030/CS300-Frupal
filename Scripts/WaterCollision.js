function isWaterCollision(futureX, futureY) {
	var foundWater = false;
	
	mapToLoad.forEach(function (row) {
		if (foundWater == false) {
			row.forEach(function (cell){
				if (foundWater == false && cell.x == futureX && cell.y == futureY && cell.image.toLowerCase() == "water") {
					foundWater = true;
					energyBar.value -= 1;
					p.innerHTML = energyBar.value;
					alert("You can't swim! Lose 1 energy.");
				}
			});
		}
	});
	
	if(energyBar.value <= 0){
		if(!(alert('You ran out of energy by Going into water!'))){window.location.reload();}
		return;
	}
	
	return foundWater;
}