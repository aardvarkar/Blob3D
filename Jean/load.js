
let current_representation = 'cartoon';
let current_scheme = 'chainid';

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
        }
    }
    stage.loadFile(doc, {defaultRepresentation: true}).then( function( comp){
        console.log("loading successful");
        listeProts.push(comp);
        displayProteins();
    });



}

function displayProteins(){
    var names = "";
    console.log(listeProts);
    for (i=0;i<listeProts.length;i++) {
        console.log(listeProts[i].name);
        names += listeProts[i].name + "<br />";
    }
    document.getElementById("proteins").innerHTML = names;
}

function changeRepresentation(representation, current_scheme){
    stage.eachComponent(function( o ){
        console.log(current_scheme);
        o.removeAllRepresentations();
        o.addRepresentation( representation, {colorScheme: current_scheme});
        current_representation = representation
        o.autoView();
    });
}
//
function changeColor(scheme, current_representation){
    stage.eachComponent(function( o ){
        console.log(current_scheme);
        o.removeAllRepresentations();
        console.log(current_representation);
        o.addRepresentation( current_representation, {colorScheme: scheme});
        current_scheme = scheme
        o.autoView();
    });
}

function clear(){
    stage.removeAllComponents();
    listeProts = [];
    displayProteins();
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
}

function dock(){
    var win = window.open("https://cluspro.bu.edu/home.php");
}


document.getElementById("load").addEventListener("click", load);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("backbone").addEventListener("click", function(){
    changeRepresentation("backbone", current_scheme);
    // current_representation = "backbone";
});
document.getElementById("ballStick").addEventListener("click", function(){
    changeRepresentation("ball+stick", current_scheme);
    // current_representation = "ball+stick";
});
document.getElementById("cartoon").addEventListener("click", function(){
    changeRepresentation("cartoon", current_scheme);
    // current_representation = "cartoon";
});

document.getElementById("color").addEventListener("click", function(){
    changeColor("hydrophobicity",  current_representation);
  });
document.getElementById("dock").addEventListener("click", dock);
