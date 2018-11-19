//Function: cell Object constructor
//Input: x coordinate, y coordinate, and visibility flag
//Output: Defined cell object
function cell(xc, yc, v, i) {
	this.x = xc;
	this.y = yc;
	this.visibility = v;
	this.image = i; //Terrain Image
	this.content = ''; //Obstacles
}

//Function: create2DArray
//Input: row size, column size starting from 0
//Output: array[x][y] of cell objects
function create2DArray(rows, cols){
	var a = new Array(rows); //create an array of size rows
	for(var i=0; i< a.length; i++) // for each array create another array of columns
	{
		a[i] = new Array(cols);
	}

	for(var i=0; i<rows; i++)
	{
		for(var j=0; j<rows; j++)
		{
			a[i][j] = new cell(i,j,0,""); 
		}
	}
	return a;
}

//Function: lineofsight
//Input: array, row boundary, column boundar, player x coordinate, player y coordinate
//Update Input bincocularcheck if binocular is in inventory binocularcheck is 1 else 0
 //Output: array with visibility tags for the line of sight of all cells seen
function lineofsight(a, rows, cols, playerx,  playery, binocularcheck){
	if(binocularcheck == 1)
	{
	if (playerx-1 >= 0) //player sight back 1 tile
	{
		a[playerx-1][playery].visibility = 1;
		if (playery-1 >=0)
		{
			a[playerx-1][playery-1].visibility = 1; //assuming map size x and y are the same
		}
		if (playery-2 >=0)
		{
			a[playerx-1][playery-2].visibility = 1; //assuming map size x and y are the same
		}
		if (playery+1 <= rows-1)
		{
			a[playerx-1][playery+1].visibility = 1;
		}
		if (playery+2 <= rows-1)
		{
			a[playerx-1][playery+2].visibility = 1;
		}
	}
	if (playerx-2 >= 0) //player sight back 1 tile
	{
		a[playerx-2][playery].visibility = 1;
		if (playery-1 >=0)
		{
			a[playerx-2][playery-1].visibility = 1; //assuming map size x and y are the same
		}
		if (playery-2 >=0)
		{
			a[playerx-2][playery-2].visibility = 1; //assuming map size x and y are the same
		}
		if (playery+1 <= rows-1)
		{
			a[playerx-2][playery+1].visibility = 1;
		}
		if (playery+2 <= rows-1)
		{
			a[playerx-2][playery+2].visibility = 1;
		}
	}
	
	if (playery-1 >= 0) //player sight above player
	{
			a[playerx][playery-1].visibility = 1; // 1 tile below player
	}
	if (playery-2 >= 0)
	{ 
			a[playerx][playery-2].visibility = 1; // 2 tile below player
	}
	
	if (playerx >= 0)
	{
		a[playerx][playery].visibility = 1; //player location
	}
	
	if (playerx+1 <= cols-1)
	{
		a[playerx+1][playery].visibility = 1; //1 tile right of player
		if (playery+1 <= rows-1)
		{
			a[playerx+1][playery+1].visibility = 1; //1 tile right 1 tile up of player
		}
			if (playery+2 <= rows-1)
		{
			a[playerx+1][playery+2].visibility = 1; //1 tile right 2 tile up of player
		}
		if (playery-1 >= 0)
		{
			a[playerx+1][playery-1].visibility = 1; //1 tile right 1 tile down of player
		}
		if (playery-2 >= 0)
		{
			a[playerx+1][playery-2].visibility = 1; //1 tile right 2 tile down of player
		}
	}
	
	if (playerx+2 <= cols-1)
	{
		a[playerx+2][playery].visibility = 1; //1 tile right of player
		if (playery+1 <= rows-1)
		{
			a[playerx+2][playery+1].visibility = 1; //1 tile right 1 tile up of player
		}
			if (playery+2 <= rows-1)
		{
			a[playerx+2][playery+2].visibility = 1; //1 tile right 2 tile up of player
		}
		if (playery-1 >= 0)
		{
			a[playerx+2][playery-1].visibility = 1; //1 tile right 1 tile down of player
		}
		if (playery-2 >= 0)
		{
			a[playerx+2][playery-2].visibility = 1; //1 tile right 2 tile down of player
		}
	}
	
	if (playery+1 <= rows-1)
	{
		a[playerx][playery+1].visibility = 1;
	}
	if (playery+2 <= rows-1)
	{
		a[playerx][playery+2].visibility = 1;
	}
	
	return a;
	}
	
	if(binocularcheck == 0)
	{
	if (playerx-1 >= 0)
	{
		a[playerx-1][playery].visibility = 1;
		if (playery-1 >=0)
		{
			a[playerx-1][playery-1].visibility = 1; //assuming map size x and y are the same
		}
		if (playery+1 <= rows-1)
		{
			a[playerx-1][playery+1].visibility = 1;
		}
	}
	
	if (playery-1 >= 0)
	{
			a[playerx][playery-1].visibility = 1;
	}
	
	if (playerx >= 0)
	{
		a[playerx][playery].visibility = 1;
	}
	
	if (playerx+1 <= cols-1)
	{
		a[playerx+1][playery].visibility = 1;
		if (playery+1 <= rows-1)
		{
			a[playerx+1][playery+1].visibility = 1;
		}
		if (playery-1 >= 0)
		{
			a[playerx+1][playery-1].visibility = 1;
		}
	}
	
	if (playery+1 <= rows-1)
	{
		a[playerx][playery+1].visibility = 1;
	}
	
	return a;
	}
}

function loadMap(file) {
	var text = "";
	
	mapToLoad = lineofsight(mapToLoad, mapSize, mapSize, heroPosition[0], heroPosition[1], 1);// the 1 is bincocularcheck set to default for now
	
	//This is fun. With the custom map we made, go through each Column and then each Row of that Column.
	//If it is not visibile, just set add the notVisable string to the "image".
	//If it is visibile, check that Row and then start comparing to our list of tiles.
	//After going through the list of tiles and adding strings to "image", set the jewel we randomly made to "content"
	//Create a <span> for the [x,y] we setup. If "content" is not empty, we need to add another span so "content" will show over "image".
	//Add a <br> after the end of a Row.
	//Update "printThis" on the index.html to have our map. 
	for(var i = 0; i < mapToLoad.length; i++){
		for(var j = 0; j < mapToLoad[i].length; j++){
			if (mapToLoad[j][i].visibility == 0) {
				mapToLoad[j][i].image = file[6].display; //Add the "notVisable" class
			}
			else {
				var isInTilesList = false; //This tells us we had found a tile, so don't look at more.
				for (var t = 0; t < tiles.length; t++) {
					if (isInTilesList == false && tiles[t][0] == mapToLoad[j][i].x && tiles[t][1] == mapToLoad[j][i].y) {
						if (tiles[t][3] == 0) {
							mapToLoad[j][i].image = file[0].display;
							isInTilesList = true;
						}
						
						else if (tiles[t][3] == 1) {
							mapToLoad[j][i].image = file[1].display;
							isInTilesList = true;
						}
						
						else if (tiles[t][3] == 2) {
							mapToLoad[j][i].image = file[2].display;
							isInTilesList = true;
						}
						
						else if (tiles[t][3] == 3) {
							mapToLoad[j][i].image = file[3].display;
							isInTilesList = true;
						}
						
						else if (tiles[t][3] == 4) {
							mapToLoad[j][i].image = file[4].display;
							isInTilesList = true;
						}
						
						else if (tiles[t][3] == 5) {
							mapToLoad[j][i].image = file[5].display;
							isInTilesList = true;
						}
						
						else {
							mapToLoad[j][i].image = file[0].display;
							isInTilesList = true;
						}
					}
				}
				if (isInTilesList == false){
					mapToLoad[j][i].image = file[0].display;
				}
				jewel_spawn(jewelsPosition[0], jewelsPosition[1]);
			}
			if (mapToLoad[j][i].content != '') {
				text += '<span class=\"tileSize ' + mapToLoad[j][i].image + '\"><span class=\"tileSize ' + mapToLoad[j][i].content + '\"></span></span>';
			}
			else {
				text += '<span class=\"tileSize ' + mapToLoad[j][i].image + '\"></span>';
			}
		}
		text += '<br>';
	}
	
	var printThis = document.getElementById("printThis");
	printThis.innerHTML = text;
	printThis.style.height = (mapSize*32)+'px';	
	printThis.style.width = (mapSize*32)+'px';	
}