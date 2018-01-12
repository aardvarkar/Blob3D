function load(fileName){
    console.log("Coucou")
    stage.loadFile("3a5p.pdb", {defaultRepresentation: true});
}

console.log("Hello")
load("3a5p.pdb")

button.addEventListener("click", load());
