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
	//place the jewel wherever we set it to.
	for(var i = 0; i < mapToLoad.length; i++){
		for(var j = 0; j < mapToLoad[i].length; j++){
				if(mapToLoad[j][i].x == x && mapToLoad[j][i].y == y) {
					//If we had a water terrain with the jewel keep rerolling until we get a none water terrain.
					while (mapToLoad[j][i].image === "water") {
						mapToLoad[j][i].image = file[randomTerrainOrItem(6, true)].display;
					}
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
		var audio = new Audio('../Assets/Sounds/Win.mp3');
		audio.play();
		GenericCustomAlert("green", 'You have found the jewel and won the game!', function() {window.location.reload()});
		return true;
   }
   else{
		return false;
  }
}

