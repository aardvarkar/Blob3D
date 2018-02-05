# Metabolic viewer - SBML/JSON

## TO DO:
* Create a clean SBML file for Physarum

* input function: To convert a SBML file to JSON to be visualized.

* Add a button for directly visualizing JSON File.
    
* Add a way to visualize different files on the same window?.

* js script to expand-collapse the network depending on the pathway? (changing the json?).

* updating sbml2json to parse all kind of SBML files (managing errors and stuff).

* Add different options for the user: Updating the physarum file or visualizing their own file.

* improving the layout.

## JSON file structure:

**Example of the different part needed to construct the network and the information needed.**

```
[
  {
    "group": "nodes", 
    "data": {
      "id": "M_13dpg_c", 
      "name": "M_13dpg_c"
    }
  }, 
  {
    "group": "nodes", 
    "classes": "rxn", 
    "data": {
      "id": "R_ACKr", 
      "name": "R_acetate_kinase"
    }
  }, 
  {
    "group": "edges", 
    "classes": "reactant", 
    "data": {
      "source": "M_atp_c", 
      "id": "M_atp_c_R_ACKr", 
      "target": "R_ACKr"
    }
  }, 
   {
    "group": "edges", 
    "classes": "product", 
    "data": {
      "source": "R_ACKr", 
      "id": "M_adp_c_R_ACKr", 
      "target": "M_adp_c"
    }
  }
]
```
## SBML2JSON:
Can convert a SBML level 2 version 4 to our json structure.

Does not take into account the <notes> and <annotation> tags.

Need to be tested on other SBML files from Biomodels and others to manage the errors and the different levels.

(Does not use libSBML) 

## Credits:

Inspired by https://github.com/funasoul/visualizeSBML

and CytoscapeWeb

Using Cytoscapejs

And cytoscapejs extensions:

- cytoscape-expand-collapse

https://github.com/iVis-at-Bilkent/cytoscape.js-expand-collapse#api

*U. Dogrusoz and B. Genc, "A Multi-Graph Approach to Complexity Management in Interactive Graph Visualization", Computers & Graphics, 30(1), pp. 86-97, 2006.*

- cytoscape-cose-bilkent

https://github.com/cytoscape/cytoscape.js-cose-bilkent

*U. Dogrusoz, E. Giral, A. Cetintas, A. Civril, and E. Demir, "A Layout Algorithm For Undirected Compound Graphs", Information Sciences, 179, pp. 980-994, 2009.*