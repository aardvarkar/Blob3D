document.addEventListener("DOMContentLoaded", function () {
    var stage = new NGL.Stage("viewport");
    stage.loadFile("ProteinPDB/3a5p.pdb", {defaultRepresentation: true});
});
