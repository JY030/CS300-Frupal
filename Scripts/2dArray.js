//Function: cell Object constructor
//Input: x coordinate, y coordinate, and visibility flag
//Output: Defined cell object
function cell(xc, yc, v, i) {
	this.x = xc;
	this.y = yc;
	this.visibility = v;
	this.image = i;
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
	var text = "";
	
	loadFromLocal();//Load map for any changes
	
	//Create map size and line of sight. 
	var mapToLoad = create2DArray(mapSize, mapSize);
	mapToLoad = lineofsight(mapToLoad, mapSize, mapSize, heroPosition[0], heroPosition[1]);
	
	//This still needs to address hero lineofsight and not just what the map_file has to offer.
	//And needs to address Thomas' jewel creations too.
	for(var i = 0; i < mapToLoad.length; i++){
		for(var j = 0; j < mapToLoad[i].length; j++){
			//Do we want the heroPosition to be a "none". This will get overwritten if someone puts in map_file.
			if (heroPosition[0] == j && heroPosition[1] == i) {
				mapToLoad[i][j].image = file[0].display;
			}
			else {
				mapToLoad[i][j].image = file[0].display;//Make it a "none" by default?
				for (var t = 0; t < tiles.length; t++) {
					//if column = i and row = j and isvisable
					if (tiles[t][0] == i && tiles[t][1] == j && tiles[t][2] == 1) {
						if (tiles[t][4] == 'None') {
							mapToLoad[i][j].image = file[0].display;
						}
						
						else if (tiles[t][4] == 'Diamonds') {
							mapToLoad[i][j].image = file[2].display;
						}
						
						else if (tiles[t][4] == 'Water') {
							mapToLoad[i][j].image = file[3].display;
						}
						
						else if (tiles[t][4] == 'Trees') {
							mapToLoad[i][j].image = file[4].display;
						}
						
						else if (tiles[t][4] == 'Mountains') {
							mapToLoad[i][j].image = file[5].display;
						}
						
						else if (tiles[t][4] == 'Grass') {
							mapToLoad[i][j].image = file[6].display;
						}
						
						else {
							mapToLoad[i][j].image = file[0].display;
						}
					}
					else if (tiles[t][0] == i && tiles[t][1] == j && tiles[t][2] == 0){
						mapToLoad[i][j].image = file[1].display;//Not Visable
					}
				}
			}
			text += mapToLoad[i][j].image;
		}
		text += '<br>';
	}
	//This might load tiles outside the map if someone adds it and makes the map smaller. Needs testing.
	//We should save the map after making it?
	
	var printThis = document.getElementById("printThis");
	printThis.innerHTML += text;
	printThis.style.height = (mapSize*32)+'px';	
	printThis.style.width = (mapSize*32)+'px';	
}