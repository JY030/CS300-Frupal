//This file is where the energy function is. 

//Nate Sherrett, 11/4/2018
/*
const Boulder = 16;
const Tree = 10;
const Blackberry = 4;

Tool List:
---TREE---
1. Hatchet removes tree for 8 energy
2. Axe Removes tree for 6 energy
3. Chainsaw removes tree for 2 energy

---BOULDER---
4. Chisel 15 energy
5. Sledge 12 energy
6. JackHammer 4 energy

---BlackBerries---
7. Shears 2 energy

*/
//This function takes 3 parameters. Might only need 2.. obstacle and terrain.
//Obstacle is the obstacle in the space.
//Terrain is the type of terrain we are encountering
//RETURNS the value of the cost of the move.
function energyCost(obstacle, heroLocation,terrain){
	var cost = 0; //How much energy would be spent by end of move
	
	//Sets cost based on terrain type. He says only 2 types. Either 1 or 2 energy
	if(terrain > 0){
		cost += 2;
	}else{ cost += 1; }
	
	if(obstacle != "None" || obstacle != "Diamond"){
	switch(obstacle){
		case "Boulder" : cost += checkToolBag("Boulder");
				break;
		case "BlackBerries" : cost += checkToolBag("BlackBerries");
					break;
		case "Tree" : cost += checkToolBag("Tree");
		default: break;
	}
	}
	
	return cost;
}

function checkToolBag(Obstacle){
	if(inventory == NULL){
		return Obstacle;
	}
	int lowest_value = 16;
	if(Obstacle == "Boulder"){
		for(int i = 0; i < inventory.length; ++i){
			if(inventory[i]=="JackHammer") return 4;
			if(inventory[i]=="Sledge" && (lowest_value > 12)) {lowest_value = 12; }
			if(inventory[i]=="Chisel" && (lowest_value > 15)) {lowest_value = 15; }
		}
		return lowest_value;
	}
	if(Obstacle == "BlackBerry"){
		for(int i = 0; i < inventory.length; ++i){
			if(inventory[i] == "Shears") return 2;
		}
		return 4;
	}
	if(Obstacle == "Tree"){
		for(int i = 0; i < inventory.length; ++i){
			if(inventory[i] == "Chainsaw") return 2;
			if(inventory[i]=="Axe" && (lowest_value > 6)) {lowest_value = 6; }
			if(inventory[i]=="Hatchet" && (lowest_value > 8)) {lowest_value = 8; }

		}
		return lowest_value;
	}
}

		

