var starttime; // don't worry about this
var moving = false; // don't worry about this
var spawnLeft = 32; // pixels left you want character to spawn at
var spawnTop = 32; // pixels top ...var moving = false;
var speed = 200; // don't mess
var movementDistance = 32; // how far character moves, in pixels
var edgeTop = 1 + spawnTop; // if characer coordinates falls below this number he is transported to the other side
var edgeBottom = 256; // bottom map bound
var edgeLeft = 1 + spawnLeft; // left map bound
var edgeRight = 256; // right map bound
window.addEventListener('keyup', getKeyAndMove, false); // event for getting keys pressed

function loadCharacter() {
	character = document.getElementById('hero'); // loads character in
	//character.style.position = 'absolute'; // dw about this
	//character.style.left = (parseInt(spawnLeft) * heroPositionOffset + printThis.offsetLeft) + 'px'; // spawn coordinates, x center of map
	character.style.top = (parseInt(spawnTop) * heroPositionOffset + printThis.offsetTop) + 'px'; // spawn coordinates, y center of map
	
	//Might move elsewhere. Sets the edges to the border of our box and the mapSize the user chooses
	edgeTop = printThis.offsetTop;
	edgeLeft = printThis.offsetLeft;
	edgeBottom = printThis.offsetTop + (mapSize * 32);
	edgeRight = printThis.offsetLeft + (mapSize * 32);
}

// dw about this
function moveit(timestamp, el, dist, duration, pxs, dir) {
    // if browser doesn't support requestAnimationFrame, generate timestamp using Date:
    // var timestamp = timestamp || new Date().getTime();
    // var runtime = timestamp - starttime; 
    // var progress = runtime / duration;
    // progress = Math.min(progress, 1);
    // if(dir == 'LR') { // left/right
		// el.style.left = (dist * progress).toFixed(2) + 'px';
		// el.style.left = parseInt(pxs) + parseInt(el.style.left) + 'px';
    // }
    // else if(dir == 'UD') { // up/down
		// el.style.top = (dist * progress).toFixed(2) + 'px';
		// el.style.top = parseInt(pxs) + parseInt(el.style.top) + 'px';  
    // }
    // if (runtime < duration) { // if duration not met yet
        // requestAnimationFrame(function(timestamp) { // call requestAnimationFrame again with parameters
            // moveit(timestamp, el, dist, duration, pxs, dir);
        // });
    // }
}
 
// switch statement based on key pressed => which direction to move
function getKeyAndMove(input) {
	if (energyBar.value <= 0) {
		if(!(alert('You ran out of energy!'))){window.location.reload();}
		return;
	}
	
	//holds key value of key pressed
	var keyCode = (input.keyCode);
	
	//stops the user from spamming
	if (moving) { return; }
	
	else {
	var moving = true;
	setTimeout(function() { moving = false; }, speed + 50) }
	
	switch(keyCode) {
	case 37: //left arrow key
		// bounds for left edge of map
		
		input.preventDefault();
		if (!isWaterCollision(heroPosition[0] - 1, heroPosition[1]) && checkEnergy(heroPosition[0] - 1, heroPosition[1])) {
			if(parseInt(character.style.left) <= edgeLeft) {
				character.style.left = parseInt(edgeRight) + 'px'; // allows for 1 'move' in
			}
			requestAnimationFrame(function(timestamp) {
				starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
				moveit(timestamp, character, -movementDistance, speed, character.style.left, 'LR'); // 50px over .2 seconds
				if (-movementDistance < 0) {
					heroPosition[0] = ((heroPosition[0] - 1 + mapSize) % mapSize); 
					checkForPurchase(heroPosition[0], heroPosition[1]);
					energyBar.value -= energyCost(heroPosition[0], heroPosition[1]);
					p.innerHTML = energyBar.value;
					if (jewelsPosition){
						jewel_found(heroPosition[0],heroPosition[1],jewelsPosition[0],jewelsPosition[1]);
					}
					shiftTiles("left");
					updateTile();
				}
			});
		}
		
		break;
	case 38: //Up arrow key
		// bounds for top edge of map
		
		input.preventDefault();
		if (!isWaterCollision(heroPosition[0], heroPosition[1] - 1) && checkEnergy(heroPosition[0], heroPosition[1] - 1)) {
			if(parseInt(character.style.top) <= edgeTop) {
				character.style.top = parseInt(edgeBottom) + 'px'; // allows for 1 'move' in 
			}
			requestAnimationFrame(function(timestamp) {
				starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
				moveit(timestamp, character, -movementDistance, speed, character.style.top, 'UD'); // 50px over .2 seconds
				if (-movementDistance < 0) {
					heroPosition[1] = ((heroPosition[1] - 1 + mapSize) % mapSize); 
					checkForPurchase(heroPosition[0], heroPosition[1]);
					energyBar.value -= energyCost(heroPosition[0], heroPosition[1]);
					p.innerHTML = energyBar.value;
					if (jewelsPosition){
						jewel_found(heroPosition[0],heroPosition[1],jewelsPosition[0],jewelsPosition[1]);
					}
					shiftTiles("up");
					updateTile();
				}
			});
		}
		
		break;
	case 39: //right arrow key
		// bounds for right edge of map
		
		input.preventDefault();
		if (!isWaterCollision(heroPosition[0] + 1, heroPosition[1]) && checkEnergy(heroPosition[0] + 1, heroPosition[1])) {
			//The 32 if becuase this is based on the left side of the hero
			if((parseInt(character.style.left) + 32) >= (edgeRight)) {
				character.style.left = parseInt(edgeLeft + movementDistance * -1) + 'px'; // allows character to 'move in' from the 'void', assumes 0px is starting location
			}      
			requestAnimationFrame(function(timestamp) {
				starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
				moveit(timestamp, character, movementDistance, speed, character.style.left, 'LR'); // 50px over .2 seconds
				if (movementDistance > 0) {
					heroPosition[0] = ((heroPosition[0] + 1 + mapSize) % mapSize); 
					checkForPurchase(heroPosition[0], heroPosition[1]);
					energyBar.value -= energyCost(heroPosition[0], heroPosition[1]);
					p.innerHTML = energyBar.value;
					if (jewelsPosition){
						jewel_found(heroPosition[0],heroPosition[1],jewelsPosition[0],jewelsPosition[1]);
					}
					shiftTiles("right");
					updateTile();
				}
			});
		
		}
		
		break;
	case 40: //down arrow key
		// bounds for bottom edge of map
		
		input.preventDefault();
		if (!isWaterCollision(heroPosition[0], heroPosition[1] + 1) && checkEnergy(heroPosition[0], heroPosition[1] + 1)) {
			//The 32 if becuase this is based on the top side of the hero
			if((parseInt(character.style.top) + 32) >= (edgeBottom - 1)) {
				character.style.top = parseInt(edgeTop + movementDistance * -1) + 'px'; // allows character to 'move in' from the 'void', assumes 0px is starting location
			}
			requestAnimationFrame(function(timestamp) {
				starttime = timestamp || new Date().getTime();
				moveit(timestamp, character, movementDistance, speed, character.style.top, 'UD'); // 50px over .2 seconds
				if (movementDistance > 0) {
					heroPosition[1] = ((heroPosition[1] + 1 + mapSize) % mapSize);
					checkForPurchase(heroPosition[0], heroPosition[1]);
					energyBar.value -= energyCost(heroPosition[0], heroPosition[1]);
					p.innerHTML = energyBar.value;
					if (jewelsPosition){
						jewel_found(heroPosition[0],heroPosition[1],jewelsPosition[0],jewelsPosition[1]);	
					}
					shiftTiles("down");
					updateTile();
				}
			});
		}
		
		break;						
	}
}

// format to use function: 
//  whiffles.value = updateWhiffles(whiffles.innerHTML, intToAdd, intToSubtract); whiffles.innerHTML = whiffles.value;
// ex: add 5: whiffles.value = updateWhiffles(whiffles.innerHTML, 5, 0); whiffles.innerHTML = whiffles.value;
// format for copy-paste: whiffles.value = updateWhiffles(whiffles.innerHTML, X, X); whiffles.innerHTML = whiffles.value;
function updateWhiffles(total, add, subtract) {
	if(parseInt(total)+add-subtract >= 0) {
		total = parseInt(total) + add - subtract;
		return total;
	}
	else {
		alert("not enough whiffles");
		return total;
	}
}
