let spawn = require('child_process').spawn;
let express = require("express");
let path = require("path");
let fs = require("fs");
//let FileReader = require('filereader'); //Ajout

app = express();


let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));

app.get("/", (req, res) => {
    console.log("Welcome");
    res.sendFile(__dirname + "/public/index.html");
})


fs.readdir(__dirname + "/public/subpart/proteins/PDB/PDB_BLOB", (err, files) => {
  fs.writeFile(__dirname + "/public/subpart/proteins/listPDBServer.txt", files.map(x =>  x));
})

app.post("/subpart/proteins", (req, res) => {
    console.log("in server");
    let dir = __dirname + '/public/subpart/proteins/PDB/' + req.body['nomprojet'];
    if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
	//
	console.log(typeof req.body['pdbFiles1']);
	//var readerPdb1 = new FileReader();
	/*readerPdb1.addEventListener("loadend", function() {
	    console.log(readerPdb1.result);
	});
	readerPdb1.readAsText(req.body['pdbFiles1']);*/
	//var pdbFile1 = new File([req.body['pdbFiles1']], filename, {type: contentType, lastModified: Date.now()});
	//var pdbFile2 = new File([req.body['pdbFiles2']], filename, {type: contentType, lastModified: Date.now()});
	//
	let macroPath =  __dirname + '/public/subpart/proteins/PDB/' + req.body['nomprojet'] + '/macro.mac';
	let line1 = "open_receptor " + __dirname + "/public/subpart/proteins/PDB/PDB_BLOB/" + req.body['prot1'] + "\n";
	let line2 = "open_ligand " + __dirname + "/public/subpart/proteins/PDB/PDB_BLOB/" + req.body['prot2'] + "\n";
	let line3 = "activate_docking\n";
	let line4 = "save_both " + __dirname + "/public/subpart/proteins/PDB/" + req.body['nomprojet'] + "//resultDocking.pdb\n";
	let line5 = "exit\n";
	let logger = fs.createWriteStream(macroPath, {
  	    flags: 'w'
	})
	logger.write(line1);
	logger.write(line2);
	logger.write(line3);
	logger.write(line4);
	logger.write(line5);
	logger.end();
	console.log("N passage");
	let command ="bash " +  __dirname + "/public/subpart/proteins/hex/bin/hex -e " + macroPath;
	const exec = require('child_process').exec;
	let yourscript = exec(command,
  			      (error, stdout, stderr) => {
  				  console.log(`${stdout}`);
  				  console.log(`${stderr}`);
  				  if (error !== null) {
  				      console.log(`exec error: ${error}`);
  				  }
  			      });
        res.send( {msg: 'Success'});
    }
    else{
	res.send({ msg:'This project name already exists!'});
    }
})

app.listen(process.env.PORT || 8080);
