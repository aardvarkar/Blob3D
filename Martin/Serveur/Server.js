let express = require("express");
let path = require("path");
let fs = require("fs");

app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));

app.get("/", (req, res) => {
    console.log("Welcome");
    res.sendFile(__dirname + "/public/index.html");
})

app.get("public/subpart/proteins/proteins.html", (req, res) => {
            console.log("Proteins")
            let files = fs.readdir(__dirname + "/public/subpart/proteins/PDB", (err, files) => {
            fs.writeFile(__dirname + "/public/subpart/proteins/test.txt", files.map(x =>  x));
            })

            res.sendFile(__dirname + "/public/subpart/proteins/proteins.html");
})

fs.readdir(__dirname + "/public/subpart/proteins/PDB/PDB_BLOB", (err, files) => {
  fs.writeFile(__dirname + "/public/subpart/proteins/test.txt", files.map(x =>  x));
})

app.listen(process.env.PORT || 8080);
