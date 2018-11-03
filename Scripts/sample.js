energy = document.getElementById("Energy");

var starttime;
function loadCharacter() {
  character = document.getElementById('mario');
  character.style.position = 'absolute';
  character.style.left = '250px';
  character.style.top = '150px';
}
 
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
        })
    }
}
 
// switch statement based on key pressed => which direction to move
function getKeyAndMove(input) {				
  var keyCode = (input.keyCode);
  if(energy.value == 0) {
     if(!alert('You ran out of energy!')){window.location.reload();}
  }
  switch(keyCode) {
    case 37: //left arrow key
      energy.value -= 1;
      if(parseInt(character.style.left) < 1) {
        character.style.left = '550px';
      }       
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, character, -50, 100, character.style.left, 'LR') // 50px over .2 seconds
      });
      break;
    case 38: //Up arrow key
      energy.value -= 1;
      if(parseInt(character.style.top) < 1) {
        character.style.top = '550px';
      }
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, character, -50, 100, character.style.top, 'UD'); // 50px over .2 seconds
      });
      break;
    case 39: //right arrow key
      energy.value -= 1; 	
      if(parseInt(character.style.left) > 499) {
        character.style.left = '-50px';
      }      
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, character, 50, 100, character.style.left, 'LR') // 50px over .2 seconds
      });
      break;
    case 40: //down arrow key
      energy.value -= 1;
      if(parseInt(character.style.top) > 499) {
        character.style.top = '-50px';
      }
      requestAnimationFrame(function(timestamp) {
        starttime = timestamp || new Date().getTime();
        moveit(timestamp, character, 50, 100, character.style.top, 'UD'); // 50px over .2 seconds
      });
      break;						
  }
}

window.onload = loadCharacter;

