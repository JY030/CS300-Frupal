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

//this is for displaying inventory
function in_div_display()
{
	var inventoryListDisplay = document.getElementById("inventoryList");
	
	if (inventoryListDisplay.style.display === "block") {
		inventoryListDisplay.style.display = "none";
	}
	else {
		inventoryListDisplay.style.display = "block";
	}
	in_display();
}
//this is the function to update inventory display
function in_display(){

	
	//this is displaying objects

	//hatchet
	var obj = "hatchet";
	var hatchet = in_count(obj,inventory)
	document.getElementById("hatchet").innerHTML = "Price: 15, Quantity: " + hatchet;

	var obj = "axe";
        var axe = in_count(obj,inventory)
        document.getElementById("axe").innerHTML ="Price: 30, Quantity: " +  axe;

	var obj = "chainsaw";
        var chainsaw = in_count(obj,inventory)
        document.getElementById("chainsaw").innerHTML = "Price: 60, Quantity: " + chainsaw;

	var obj = "chisel";
        var chisel = in_count(obj,inventory)
        document.getElementById("chisel").innerHTML = "Price: 5, Quantity: " + chisel;

	var obj = "sledge";
        var sledge = in_count(obj,inventory)
        document.getElementById("sledge").innerHTML = "Price: 25, Quantity: " + sledge;

        var obj = "jackhammer";
        var jackhammer = in_count(obj,inventory)
        document.getElementById("jackhammer").innerHTML = "Price: 100, Quantity: " + jackhammer;

	var obj = "machete";
        var machete = in_count(obj,inventory)
        document.getElementById("machete").innerHTML = "Price: 25, Quantity: " + machete;

	var obj = "shears";
        var shears = in_count(obj,inventory)
        document.getElementById("shears").innerHTML = "Price: 35, Quantity: " + shears;

	var obj = "binoculars";
        var binoculars = in_count(obj,inventory)
        document.getElementById("binoculars").innerHTML = "Price: 50, Quantity: " + binoculars;    
}

