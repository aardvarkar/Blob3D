function load(){
    // var x = document.createElement("INPUT");
    // x.setAttribute("type", "file");
    // document.getElementById("buttons").appendChild(x);
    // var loadButton = document.getElementsByID("load");   // Get the first <h1> element in the document
    // var att = document.createAttribute("class");       // Create a "class" attribute
    // att.value = "browse";                           // Set the value of the class attribute
    // loadButton.setAttributeNode(att);
    var doc = document.getElementById("browse").files[0];
    console.log(doc);
    stage.loadFile(doc, {defaultRepresentation: true});
}

document.getElementById("load").addEventListener("click", load);
