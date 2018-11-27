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

var binocularcheck = 0;

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
	//Load up the map with everything from the tile set.
	if (rTiles == true) {
		tiles = generateRandomMap(mapSize);
	}
	mapToLoad.forEach(function (row) {
		row.forEach(function (cell) {
			var isInTilesList = false; //This tells us we had found a tile, so don't look at more.
			tiles.forEach(function (tile) {
				//Go through tile list and fill up each cell if we find a match.
				if (isInTilesList == false && tile[0] == cell.x && tile[1] == cell.y) {
					if (tile[3] == 0) {
						cell.image += file[0].display;
						isInTilesList = true;
					}
					
					else if (tile[3] == 1) {
						cell.image += file[1].display;
						isInTilesList = true;
					}
					
					else if (tile[3] == 2) {
						cell.image += file[2].display;
						isInTilesList = true;
					}
					
					else if (tile[3] == 3) {
						cell.image += file[3].display;
						isInTilesList = true;
					}
					
					else if (tile[3] == 4) {
						cell.image += file[4].display;
						isInTilesList = true;
					}
					
					else if (tile[3] == 5) {
						cell.image += file[5].display;
						isInTilesList = true;
					}
					
					else {
						cell.image += file[0].display;
						isInTilesList = true;
					}
					
					//if user put a diamond on a map reset the random jewel.
					if (rJewel == false && tile[4] == "Diamonds") {
						jewelsPosition[0] = cell.x;
						jewelsPosition[1] = cell.y;
						cell.content = tile[4];
					}
					else if (rJewel == true && tile[4] == "Diamonds") {
						cell.content = randomTerrainOrItem(500, false);//Put random one instead.
					}
					else {
						cell.content = tile[4]; //Put obstacle in cell
					}
					cell.visibility = tile[2]; //Put if visable on cell from tile list
				}
			});
			
			//Can't find in tile list?
			if (isInTilesList == false){
				// Then make a meadow that is not visable
				cell.image += file[0].display;
				cell.visibility = 0;

			}
		});
	});
	
	//Spawn the jewel now overwritting what obstacle is in that cell.
	jewel_spawn(jewelsPosition[0], jewelsPosition[1]);
}

//Altered Jewel_random function to match for random item or terrain type.
function randomTerrainOrItem(num, isTerrain) {
	var x = Math.floor(Math.random() * num);
	
	if (isTerrain == true && x > 5) {
		x = randomTerrainOrItem(num, true);
	}
	
	if (isTerrain == false) {
		// var item = x > 20 ? "None" : "type2-treasure";
		var item =
		x > 134 ? "None" :
		(x >= 93 && x <= 133) ? "power-bar" :
		(x >= 62 && x <= 92) ? "bush" :
		(x >= 31 && x <= 61) ? "tree" :
		(x >= 10 && x <= 30) ? "boulder" :
		x == 9 ? "axe" :
		x == 8 ? "hatchet" :
		x == 7 ? "chisel" :
		x == 6 ? "sledge" :
		x == 5 ? "shears" :
		x == 4 ? "jackhammer" :
		x == 3 ? "binoculars" :
		x == 2 ? "chainsaw" :
		x == 1 ? "type2-treasure" :
		"type1-treasure";
		
		return item;
	}
    return x;
}

function showVisibleMap() {
	var text = "";
	
	//Create spans for the size of map window we can see at all times.
	for(var i = 0; i < mapToLoad.length; i++){
		if (i < sizeOfMapWindow) {
			for(var j = 0; j < mapToLoad[i].length; j++){
				
				if (j < sizeOfMapWindow)
				{
					text += '<span id=\"x' + mapToLoad[j][i].x + 'y' + mapToLoad[j][i].y + '\" class=\"tileSize ' + mapToLoad[j][i].image + '\"><span class=\"tileSize ' + mapToLoad[j][i].content + '\"></span></span>';
				}
			}
			text += '<br>';
		}
	}
	
	//Print those spans onto the page.
	var printThis = document.getElementById("printThis");
	printThis.innerHTML += text;
	printThis.style.height = (sizeOfMapWindow*32)+'px';	
	printThis.style.width = (sizeOfMapWindow*32)+'px';
}

function updateTile() {
	//update all tiles for visibility
	var heroX = heroPosition[0];
	if (heroPosition[0] >= mapSize) {
		heroX = 0;
	}
	if (heroPosition[0] < 0) {
		heroX = mapSize - 1;
	}
	
	var heroY = heroPosition[1];
	if (heroPosition[1] >= mapSize) {
		heroY = 0;
	}
	if (heroPosition[1] < 0 ) {
		heroY = mapSize - 1;
	}
	mapToLoad = lineofsight(mapToLoad, sizeOfMapWindow, sizeOfMapWindow, heroPositionOffset, heroPositionOffset, binocularcheck);
	
	for(var i = 0; i < sizeOfMapWindow; i++){
		for(var j = 0; j < sizeOfMapWindow; j++){
			var idToFind = "x" + j.toString().concat("y" + i.toString());
			var foundSpan = document.getElementById(idToFind);
			foundSpan.classList = mapToLoad[j][i].image;
			foundSpan.firstChild.classList = mapToLoad[j][i].content;
			if (mapToLoad[j][i].visibility == 1) {
				foundSpan.classList.remove(file[6].display);
			}
			if (mapToLoad[j][i].visibility == 0) {
				foundSpan.classList.add(file[6].display);
			}
		}
	}
}

function shiftTiles(direction) {
	if (direction == "left") {
			var p = mapToLoad.pop();
			mapToLoad.unshift(p);
	}
	
	if (direction == "right") {
		var s = mapToLoad.shift();
		mapToLoad.push(s);
	}
	
	mapToLoad.forEach(function (row) {
		if (direction == "up") {
			var p = row.pop();
			row.unshift(p);
		}
		
		if (direction == "down") {
			var s = row.shift();
			row.push(s);
		}
	});
}
