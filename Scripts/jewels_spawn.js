//THis is for spawning the jewel



function jewel_xy(n){
    //run this twice to get both x and y randomized.
    var x = Math.floor(Math.random() * n);
	if (x >= mapSize) {
		x = jewel_xy(n);
	}
    return x;
}

//this is for the coordinates needed to spawn the sprite return one pixel
//coordinates
function jewel_visual(coordinate){
    
  //comments thomas Honnell frupal jewel program

  //This is the win function not sure how you want to set this up so
  //the j is for jewel coordingates and normal xy for player location

    var pixel = coordinate * 32;
    return pixel;
    
}

function jewel_spawn(x,y){
	
	for(var i = 0; i < mapToLoad.length; i++){
		for(var j = 0; j < mapToLoad[i].length; j++){
				if(mapToLoad[j][i].x == x && mapToLoad[j][i].y == y) {
					mapToLoad[j][i].content = file[7].display;
				}
		}
	}
    //document.getElementById('Diamond'), src = 'http://web.cecs.pdx.edu/~thonnell/Diamond.png' img = document.createElement('img');
    
    //img.src = src;
    //img.style.position = 'absolute';
    //img.style.left = pixelx;
    //img.style.top = pixely;
}

function jewel_found(x,y,jx,jy){

  if (x==jx && y==jy){
	window.alert("you have found the jewel and won the game");
	//I wasn't sure if bool is how you wanted the function to check or not, but
	//returning true means to quit game and returning false means continue,
	//this should be called every time the character moves to my understanding
	 window.location.reload();
	  return true;
   }
   else{
	 return false;
  }
}

