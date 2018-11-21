//This file is where the energy function is. 

//Nate Sherrett, 11/4/2018
/*
const boulder = 16;
const tree = 10;
const Blackberry = 4;

Tool List:
---tree---
1. Hatchet removes tree for 8 energy
2. Axe Removes tree for 6 energy
3. Chainsaw removes tree for 2 energy

---boulder---
4. Chisel 15 energy
5. Sledge 12 energy
6. JackHammer 4 energy

---bush---
7. Shears 2 energy

*/
//This function takes 3 parameters. Might only need 2.. obstacle and terrain.
//Obstacle is the obstacle in the space.
//Terrain is the type of terrain we are encountering
//RETURNS the value of the cost of the move.
function energyCost(x,y){
	var cost = 0; //How much energy would be spent by end of move
	var obstacle = checkTile(x,y).toLowerCase();
	var terrain = checkTileTerrain(x,y).toLowerCase();
	//Sets cost based on terrain type. He says only 2 types. Either 1 or 2 energy
	//Can be updated here if we need more dynamic terrain types. Won't be hard
	switch(terrain){
		case "bog" : cost += 2; break;
		case "meadow" : cost += 1; break;
		case "forest" : cost += 1; break;
		case "swamp" : cost += 2; break;
		case "wall" : cost += 1; break;
		default : cost += 1; break;
	}
	
	if(obstacle != "None" || obstacle != "Diamond"){
	switch(obstacle){
		case "boulder" : cost += checkToolBag("boulder");
						removeItemFromMap(x,y);
						break;
		case "bush" : cost += checkToolBag("bush");
						removeItemFromMap(x,y);
					break;
		case "tree" : cost += checkToolBag("tree");
					removeItemFromMap(x,y);
					break;
		case "power-bar" : if(money == 0) {
					alert("Can't buy the power bar, you are too damn poor. Get some more whiffles and come back!");
					break;
				   }
				   	cost -= 20;
					money -= 1;
					whiffles.innerHTML = "Whiffles: " +money;
					removeItemFromMap(x,y);
					break;			
		default: break;
	}
	}
	return cost;
}


//This function is only called by the one up above, just an inventory checker
//Takes and obstacle and returns the cost of removing that obstacle given the inventory
function checkToolBag(Obstacle){
	var lowest_value = 16;
	if(Obstacle == "boulder"){
		for(i = 0; i < inventory.length; ++i){
			if(inventory[i]==null) return 16;
			if(inventory[i]=="jackhammer") return 4;
			if(inventory[i]=="sledge" && (lowest_value > 12)) {lowest_value = 12; }
			if(inventory[i]=="chisel" && (lowest_value > 15)) {lowest_value = 15; }
		}
		return lowest_value;
	}
	if(Obstacle == "bush"){
		for(i = 0; i < inventory.length; ++i){
			if(inventory[i]==null) return 4;
			if(inventory[i] == "shears") return 2;
		}
		return 4;
	}
	if(Obstacle == "tree"){
		lowest_value = 10;
		for(i = 0; i < inventory.length; ++i){
			if(inventory[i]==null) return 10;
			if(inventory[i] == "chainsaw") return 2;
			if(inventory[i]=="axe" && (lowest_value > 6)) {lowest_value = 6; }
			if(inventory[i]=="hatchet" && (lowest_value > 8)) {lowest_value = 8; }

		}
		return lowest_value;
	}
}

function checkEnergy(x,y){
	var obstacle = checkTile(x,y).toLowerCase();
	var cost = checkToolBag(obstacle);
	if(cost > energyBar.value){
		energyBar.value -= 1;
		p.innerHTML = energyBar.value;
		alert("You don't have enough energy");
		return false;
	}
	return true;
}

		

