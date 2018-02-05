function reloadCanvas() {
  var cy = window.cy;
  var layout = cy.layout({
      name: 'cose'
  });
  layout.run();
  console.log('reload');
}
