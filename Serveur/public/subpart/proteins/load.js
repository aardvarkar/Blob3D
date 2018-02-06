function initialLoad(){
    var xhttp = new XMLHttpRequest();
}

function load(){
    // var x = document.createElement("INPUT");
    // x.setAttribute("type", "file");
    // document.getElementById("buttons").appendChild(x);
    // var loadButton = document.getElementsByID("load");   // Get the first <h1> element in the document
    // var att = document.createAttribute("class");       // Create a "class" attribute
    // att.value = "browse";                           // Set the value of the class attribute
    // loadButton.setAttributeNode(att);
    var doc = document.getElementById("browse").files[0];
    if (listeProts.length > 0){
        if (confirm('Do you want to keep the previous loaded files?')) {
            null;
        }
        else {
            stage.removeAllComponents();
            listeProts = [];
            clearChoice("mySelect1");
            clearChoice("mySelect2");
        }
    }
    stage.loadFile(doc, {defaultRepresentation: true}).then( function( comp){
        console.log("loading successful");
        listeProts.push(comp);
        // displayProteins();
        addChoice("mySelect1");
        addChoice("mySelect2");
    });

}

function addChoice(selectName){
    var dropdownSelected = document.getElementById(selectName);
    var option = document.createElement("option");
    option.class = "option";
    option.text = listeProts[listeProts.length-1].name;
    dropdownSelected.add(option);
}

function clearChoice(selectName){
    dropdownSelected = document.getElementById(selectName);
    while (dropdownSelected.children[1]) {
        dropdownSelected.removeChild(dropdownSelected.children[1]);
    }
}

// function displayProteins(){
//     var names = "";
//     console.log(listeProts);
//     for (i=0;i<listeProts.length;i++) {
//         console.log(listeProts[i].name);
//         names += listeProts[i].name + "<br />";
//     }
//     document.getElementById("proteins").innerHTML = names;
// }

function changeRepresentation(representation){
    stage.eachComponent(function( o ){
        o.removeAllRepresentations();
        o.addRepresentation( representation );
        o.autoView();
    });
}

function clear(){
    stage.removeAllComponents();
    listeProts = [];
    // displayProteins();
    clearChoice("mySelect1");
    clearChoice("mySelect2");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  // if (!event.target.matches('.dockButton') && !event.target.matches('.dockProts') && !event.target.matches('.option')) {
  //
  //   var dropdowns = document.getElementsByClassName("dockProts");
  //   var i;
  //   for (i = 0; i < dropdowns.length; i++) {
  //     var openDropdown = dropdowns[i];
  //     if (openDropdown.classList.contains('show')) {
  //       openDropdown.classList.remove('show');
  //     }
  //   }
  // }
}

document.addEventListener("load", initialLoad());

function dock(){
    var prot1 = document.getElementById("mySelect1")
    var prot1pdb = prot1.options[prot1.selectedIndex].text

    var prot2 = document.getElementById("mySelect2")
    var prot2pdb = prot2.options[prot2.selectedIndex].text

    if (prot1pdb === "Select first protein..." || prot2pdb === "Select second protein..."){
        alert("Please select two protein files for docking.")
    }
    else{
        window.confirm("Confirm that you want to dock?");
        // TODO : Docking code
    }
}


document.getElementById("load").addEventListener("click", load);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("backbone").addEventListener("click", function(){
    changeRepresentation("backbone");
});
document.getElementById("ballStick").addEventListener("click", function(){
    changeRepresentation("ball+stick");
});
document.getElementById("cartoon").addEventListener("click", function(){
    changeRepresentation("cartoon");
});
//document.getElementById("dock").addEventListener("click", dock);
