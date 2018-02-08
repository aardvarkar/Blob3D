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
    stage.loadFile(doc).then( function( comp){
        console.log("loading successful");
        listeProts.push(comp);
        // displayProteins();
        comp.addRepresentation(current_representation, {
                                              sele: "polymer",
                                              colorScheme: current_scheme,
                                              colorDomain: [ -0.3, 0.3 ],
                                              surfaceType: "av"
                                            });
        comp.autoView();
        addChoice("mySelect1");
        addChoice("mySelect2");
    });
    stage.signals.hovered.add(function (pickingProxy) {
  if (pickingProxy && (pickingProxy.atom || pickingProxy.bond)){
    var atom = pickingProxy.atom || pickingProxy.closestBondAtom;
    var cp = pickingProxy.canvasPosition;
    tooltip.innerText = "ATOM: " + atom.qualifiedName();
    tooltip.style.bottom = cp.y + 3 + "px";
    tooltip.style.left = cp.x + 3 + "px";
    tooltip.style.display = "block";
  }else{
    tooltip.style.display = "none";
  }
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

function changeRepresentation(representation, current_scheme){
    stage.eachComponent(function( o ){
        console.log(current_scheme);
        o.removeAllRepresentations();
        o.addRepresentation( representation, {
                                              sele: "polymer",
                                              colorScheme: current_scheme,
                                              colorDomain: [ -0.3, 0.3 ],
                                              surfaceType: "av"
                                            });
        current_representation = representation
        o.autoView();
    });
}

function changeColor(scheme, current_representation){
    stage.eachComponent(function( o ){
        console.log(current_scheme);
        o.removeAllRepresentations();
        console.log(current_representation);
        o.addRepresentation( current_representation, {
                                              sele: "polymer",
                                              colorScheme: scheme,
                                              colorDomain: [ -0.3, 0.3 ],
                                              surfaceType: "av"
                                            });
        current_scheme = scheme
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

// Default representation and color scheme
let current_representation = 'cartoon';
let current_scheme = 'chainid';
let spin_flag = false;
var tooltip = document.createElement("div");
Object.assign(tooltip.style, {
  display: "none",
  position: "absolute",
  zIndex: 10,
  pointerEvents: "none",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "lightgrey",
  padding: "0.5em",
  fontFamily: "sans-serif"
});

stage.viewer.container.appendChild(tooltip);
stage.makeImage
// stage.mouseObserver.dispose();


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
	// https://stackoverflow.com/questions/9670222/execute-a-nodejs-script-from-an-html-page
	// https://stackoverflow.com/questions/28516951/calling-method-in-node-js-from-browser-using-express
	// https://expressjs.com/en/starter/basic-routing.html
	$.ajax({
            type: 'POST',
            url: 'http://localhost:8080/subpart/proteins',
	    datatype: 'text',
	    data: {
		'prot1': prot1pdb,
		'prot2': prot2pdb
	    },
            error: function(jqXHR, textStatus, errorThrown) {
		alert('error ' + textStatus + " " + errorThrown);
            }
	});
    }
}


document.getElementById("load").addEventListener("click", load);
document.getElementById("clear").addEventListener("click", clear);

//REPRESENTATION
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

document.getElementById("surface").addEventListener("click", function(){
    changeRepresentation("surface", current_scheme);
    // current_representation = "cartoon";
});


// COLOR
document.getElementById("hydrophobicity").addEventListener("click", function(){
    changeColor("hydrophobicity",  current_representation);
  });
document.getElementById("chainid").addEventListener("click", function(){
    changeColor("chainid",  current_representation);
  });
document.getElementById("atomindex").addEventListener("click", function(){
    changeColor("atomindex",  current_representation);
  });

document.getElementById("electrostatic").addEventListener("click", function(){
    let tmp_scheme = current_scheme;
    changeColor("electrostatic",  "surface");
    current_scheme = tmp_scheme
  });

document.getElementById("spin").addEventListener("click", function(){
  spin_flag = spin_flag === true ? false : true;
  stage.setSpin(spin_flag);
  });
// document.getElementById("dock").addEventListener("click", dock);
