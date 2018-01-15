function load(){
    // var x = document.createElement("INPUT");
    // x.setAttribute("type", "file");
    // document.getElementById("buttons").appendChild(x);
    // var loadButton = document.getElementsByID("load");   // Get the first <h1> element in the document
    // var att = document.createAttribute("class");       // Create a "class" attribute
    // att.value = "browse";                           // Set the value of the class attribute
    // loadButton.setAttributeNode(att);
    var doc = document.getElementById("browse").files[0];
    if (protNum > 0){
        if (confirm('Do you want to keep the previous loaded files?')) {
            null;
        }
        else {
            stage.removeAllComponents();
            protNum = 0;
        }
    }
    stage.loadFile(doc, {defaultRepresentation: true});
    protNum += 1;

}

function changeRepresentation(representation){
    stage.eachComponent(function( o ){
        o.removeAllRepresentations();
        o.addRepresentation( representation );
        o.autoView();
    });
}

function clear(){
    stage.removeAllComponents();
    stage.dispose();
    protNum = 0;
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

document.getElementById("load").addEventListener("click", load);
document.getElementById("backbone").addEventListener("click", function(){
    changeRepresentation("backbone");
});
document.getElementById("ballStick").addEventListener("click", function(){
    changeRepresentation("ball+stick");
});
document.getElementById("cartoon").addEventListener("click", function(){
    changeRepresentation("cartoon");
});
