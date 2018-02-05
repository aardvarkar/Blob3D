/**
 * This example shows how to use the dragNodes plugin.
 */
var g = {
      nodes: [],
      edges: []
    };

// Generate a random graph:
g.nodes.push({
  id: 'n' + 0,
  label: 'Node ' + 0,
  x: 1,
  y: 2,
  size: 1,
  color: '#666'
});

g.nodes.push({
  id: 'n' + 1,
  label: 'Node ' + 1,
  x: 0,
  y: 0,
  size: 1,
  color: '#666'
});

g.nodes.push({
  id: 'n' + 2,
  label: 'Node ' + 2,
  x: 2,
  y: 0,
  size: 1,
  color: '#666'
});


g.edges.push({
  id: 'e' + 0,
  source: 'n' + 0,
  target: 'n' + 1,
  size: 1,
  color: '#ccc'
});

g.edges.push({
  id: 'e' + 1,
  source: 'n' + 1,
  target: 'n' + 2,
  size: 1,
  color: '#ccc'
});

g.edges.push({
  id: 2,
  source: 'n' + 2,
  target: 'n' + 0,
  size: 1,
  color: '#ccc'
});
// sigma.renderers.def = sigma.renderers.canvas
// Instantiate sigma:
var s = new sigma({
  graph: g,
  container: 'graph-container'
});

// Initialize the dragNodes plugin:
var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

dragListener.bind('startdrag', function(event) {
  console.log(event);
});
dragListener.bind('drag', function(event) {
  console.log(event);
});
dragListener.bind('drop', function(event) {
  console.log(event);
});
dragListener.bind('dragend', function(event) {
  console.log(event);
});

var tabl_text = new Array;
tabl_text[0]= "Blob0";
tabl_text[1]= "Blob1";
tabl_text[2]= "Blob2";
tabl_text[3]= "Blob3";
tabl_text[4]= "Blob4";
tabl_text[5]= "Blob5";
tabl_text[6]= "Blob6";
tabl_text[7]= "Blob7";
tabl_text[8]= "Blob8";
tabl_text[9]= "Blob9";
tabl_text[10]= "Blob10";

function aff_info(id) {
  document.getElementById('ton_texte').innerText=tabl_text[id];
}
