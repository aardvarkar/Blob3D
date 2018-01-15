// <<<<<<< HEAD
// function load(fileName){
//     console.log("Coucou")
//     stage.loadFile("3a5p.pdb", {defaultRepresentation: true});
// }
//
// console.log("Hello")
// load("3a5p.pdb")
//
// button.addEventListener("click", load());
// =======
function load(){
    // var x = document.createElement("INPUT");
    // x.setAttribute("type", "file");
    // document.getElementById("buttons").appendChild(x);
    // var loadButton = document.getElementsByID("load");   // Get the first <h1> element in the document
    // var att = document.createAttribute("class");       // Create a "class" attribute
    // att.value = "browse";                           // Set the value of the class attribute
    // loadButton.setAttributeNode(att);
    var doc = document.getElementById("browse").files[0];
    stage.loadFile(doc, {defaultRepresentation: true});
}

document.getElementById("load").addEventListener("click", load);
