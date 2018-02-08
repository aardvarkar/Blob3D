var spawn   = require('child_process').spawn;
var express = require("express");
var path = require("path");
var fs = require("fs");

app = express();
// Ajout
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
//

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));

app.get("/acceuil", (req, res) => {
    console.log("Welcome");
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/subpart/proteins", (req, res) => {
            console.log("Proteins")
            var files = fs.readdir(__dirname + "/public", (err, files) => {
            fs.writeFile(__dirname + "/public/test.txt", files.map(x =>  x));
            })

            res.sendFile(__dirname + "/public/subpart/proteins/proteins.html");
})
	

app.post("/subpart/proteins", (req, res) => {
    var dir = __dirname + '/public/subpart/proteins/PDB/tmpFolder';
    if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
    }
    var macroPath =  __dirname + '/public/subpart/proteins/PDB/tmpFolder/macro.mac';
    var line1 = "open_receptor " + __dirname + "/public/subpart/proteins/PDB/PDB_BLOB/" + req.body['prot1'] + "\n";
    var line2 = "open_ligand " + __dirname + "/public/subpart/proteins/PDB/PDB_BLOB/" + req.body['prot2'] + "\n";
    var line3 = "activate_docking\n";
    var line4 = "save_both " + __dirname + "/public/subpart/proteins/PDB/tmpFolder//docking_" + req.body['prot1'].substr(0,req.body['prot1'].length-4) + "_" + req.body['prot2'].substr(0,req.body['prot2'].length-4) + ".pdb\n";
    var line5 = "exit\n";
    var logger = fs.createWriteStream(macroPath, {
	flags: 'w'
    })
    logger.write(line1);
    logger.write(line2);
    logger.write(line3);
    logger.write(line4);
    logger.write(line5);
    logger.end();
    console.log("N passage");
    var command ="bash " +  __dirname + "/public/subpart/proteins/hex/bin/hex -e " + macroPath;
    const exec = require('child_process').exec;
    var yourscript = exec(command,
			  (error, stdout, stderr) => {
			      console.log(`${stdout}`);
			      console.log(`${stderr}`);
			      if (error !== null) {
				  console.log(`exec error: ${error}`);
			      }
			  });
    //res.send('Success');
    /*
    const exec = require('child_process').exec;
    var tmpcommand = "bash " + __dirname + "/public/subpart/proteins/commandline1.sh";
    var yourscript = exec(tmpcommand,
			  (error, stdout, stderr) => {
			      console.log(`${stdout}`);
			      console.log(`${stderr}`);
			      if (error !== null) {
				  console.log(`exec error: ${error}`);
			      }
			      });*/
})
/*
const exec = require('child_process').exec;
console.log(__dirname);
var tmpcommand = "bash " + __dirname + "/public/subpart/proteins/commandline1.sh";
var yourscript = exec(tmpcommand,
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });*/
    

//var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
//res.download(file);
console.log('HalfSuccess');


app.listen(8080);
