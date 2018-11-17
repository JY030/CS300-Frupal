//Johnny Neckar 11/16/2018

var usefulItems = {
	"hatchet":15,
	"axe":30,
	"chainsaw":60,
	"chisel":5,
	"sledge":25,
	"jackhammer":100,
	"machete":25,
	"shears":35
};

/*function removes object from map at given x,y coordinates. returns true if
function successfully removes object, otherwise returns false. possible reasons 
for function failing to remove object: invalid arguments given, coordinates out of
bounds, no object present in tile*/
function removeItemFromMap(x, y) {
	var tileContains = checkTile(x,y);
	if (tileContains == "Out of bounds" || tileContains == "None" || tileContains == "checkTile function fail") 
		return false; 
	for (i in mapToLoad) {
		if (mapToLoad[i][0].x == x) {
			for (j in mapToLoad[i]) {
				if (mapToLoad[i][j].y == y) {
					mapToLoad[i][j].content = "None";
					updateTile();
					return true;
				}
			}
		}
	}
}