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
  character = document.getElementById('mario'); // loads character in
  character.style.position = 'absolute'; // dw about this
  character.style.left = parseInt(spawnLeft) + 'px'; // spawn coordinates, x 
  character.style.top = parseInt(spawnTop) + 'px'; // spawn coordinates, y
}

// dw about this
function moveit(timestamp, el, dist, duration, pxs, dir) {
    // if browser doesn't support requestAnimationFrame, generate timestamp using Date:
    var timestamp = timestamp || new Date().getTime();
    var runtime = timestamp - starttime; 
    var progress = runtime / duration;
    progress = Math.min(progress, 1);
    if(dir == 'LR') { // left/right
      el.style.left = (dist * progress).toFixed(2) + 'px';
      el.style.left = parseInt(pxs) + parseInt(el.style.left) + 'px';
    }
    else if(dir == 'UD') { // up/down
      el.style.top = (dist * progress).toFixed(2) + 'px';
      el.style.top = parseInt(pxs) + parseInt(el.style.top) + 'px';    
    }
    if (runtime < duration) { // if duration not met yet
        requestAnimationFrame(function(timestamp) { // call requestAnimationFrame again with parameters
            moveit(timestamp, el, dist, duration, pxs, dir);
        });
    }
}
 
// switch statement based on key pressed => which direction to move
function getKeyAndMove(input) {	
  if(energy.value == 0){
    if(!(alert('You ran out of energy!')){window.location.reload();}
  // holds key value of key pressed
  var keyCode = (input.keyCode);
  // stops the user from spamming
  if(moving) { return; }
  else {
    moving = true;
    setTimeout(function() { moving = false; }, speed) }
  switch(keyCode) {
    case 37: //left arrow key
      // bounds for left edge of map
      energy.value -= 1;
      if(parseInt(character.style.left) < edgeLeft) {
        character.style.left = parseInt(edgeRight + movementDistance) + 'px'; // allows for 1 'move' in
      }
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, character, -movementDistance, speed, character.style.left, 'LR'); // 50px over .2 seconds
      });
      break;
    case 38: //Up arrow key
      // bounds for top edge of map
      energy.value -= 1;
      if(parseInt(character.style.top) < edgeTop) {
        character.style.top = parseInt(edgeBottom + movementDistance) + 'px'; // allows for 1 'move' in 
      }
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, character, -movementDistance, speed, character.style.top, 'UD'); // 50px over .2 seconds
      });
      break;
    case 39: //right arrow key
      // bounds for right edge of map
      energy.value -= 1;
      if(parseInt(character.style.left) > (edgeRight - 1)) {
        character.style.left = parseInt(spawnLeft + movementDistance * -1) + 'px'; // allows character to 'move in' from the 'void', assumes 0px is starting location
      }      
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, character, movementDistance, speed, character.style.left, 'LR'); // 50px over .2 seconds
      });
      break;
    case 40: //down arrow key
      // bounds for bottom edge of map
      energy.value -= 1;
      if(parseInt(character.style.top) > (edgeBottom - 1)) {
        character.style.top = parseInt(spawnTop + movementDistance * -1) + 'px'; // allows character to 'move in' from the 'void', assumes 0px is starting location
      }
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime();
        moveit(timestamp, character, movementDistance, speed, character.style.top, 'UD'); // 50px over .2 seconds
      });
      break;						
  }
}

