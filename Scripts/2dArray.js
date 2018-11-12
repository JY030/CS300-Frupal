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
//Output: array with visibility tags for the line of sight of all cells seen
function lineofsight(a, rows, cols, playerx,  playery){
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

function loadMap(file) {
	//Load up the map with everything from the tile set.
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
					cell.content = tile[4]; //Put obstacle in cell
					cell.visibility = tile[2]; //Put if visable on cell from tile list
				}
			});
			
			//Can't find in tile list. Make a meadow that is not visable.
			if (isInTilesList == false){
				cell.image += file[0].display;
				cell.visibility = 0; 
			}
		});
	});
	
	//Spawn the jewel now overwritting what obstacle is in that cell.
	jewel_spawn(jewelsPosition[0], jewelsPosition[1]);
}

function traverseTiles() {
	
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
	printThis.innerHTML = text;
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
	mapToLoad = lineofsight(mapToLoad, sizeOfMapWindow, sizeOfMapWindow, 9, 9);
	
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