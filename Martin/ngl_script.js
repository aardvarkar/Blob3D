// document.addEventListener("DOMContentLoaded", function () {
//
// });

var stage = new NGL.Stage("viewport");
//stage.loadFile("3a5p.pdb", {defaultRepresentation: true});

function load(fileName){
    console.log("Coucou")
    stage.loadFile("3a5p.pdb", {defaultRepresentation: true});
}

// document.getElementById("load").addEventListener("click", load("3a5p.pdb"));
