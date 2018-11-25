//THis is the display inventory
//THomas Honnell


//this is the function to count objects 
function in_count(object,inventory)
{
    var count=0;
    for (i in inventory){
	if (inventory[i] == object){
	    count++;
	}
    }
    return count;
    

}

//this is the function to display inventory
//the variable is whether to actively display or not
function in_display(){
    var inventoryListDisplay = document.getElementById("inventoryList");
	
	if (inventoryListDisplay.style.display === "block") {
		inventoryListDisplay.style.display = "none";
	}
	else {
		inventoryListDisplay.style.display = "block";
	}
	
	//this is displaying objects

	//hatchet
	var obj = "hatchet";
	var hatchet = in_count(obj,inventory)
	document.getElementById("hatchet").innerHTML = "hatchet price 15 quantity " + hatchet;

	var obj = "axe";
        var axe = in_count(obj,inventory)
        document.getElementById("axe").innerHTML ="axe price 30 quantity " +  axe;

	var obj = "chainsaw";
        var chainsaw = in_count(obj,inventory)
        document.getElementById("chainsaw").innerHTML = "chainsaw price 60 quantity " + chainsaw;

	var obj = "chisel";
        var chisel = in_count(obj,inventory)
        document.getElementById("chisel").innerHTML = "chisel price 5 quantity " + chisel;

	var obj = "sledge";
        var sledge = in_count(obj,inventory)
        document.getElementById("sledge").innerHTML = "sledge price 25 quantity " + sledge;

        var obj = "jackhammer";
        var jackhammer = in_count(obj,inventory)
        document.getElementById("jackhammer").innerHTML = "jackhammer price 100 quantity " + jackhammer;

	var obj = "machete";
        var machete = in_count(obj,inventory)
        document.getElementById("machete").innerHTML = "machete price 25 quantity " + machete;

	var obj = "shears";
        var shears = in_count(obj,inventory)
        document.getElementById("shears").innerHTML = "shears price 35 quantity " + shears;

	var obj = "binoculars";
        var binoculars = in_count(obj,inventory)
        document.getElementById("binoculars").innerHTML = "binoculars price 50 quantity " + binoculars;

    
    
}

