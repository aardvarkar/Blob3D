// function load(){
var page = $.get("https://cluspro.bu.edu/home.php")
// var win = new Window("https://cluspro.bu.edu/home.php");
console.log(page.document.body);
console.log(page.document.getElementsByName("jobname"));
win.close();
var bd = win.document.getElementById("doc");
console.log(bd.childNodes());
// }
//
// document.getElementById("load").addEventListener("click", load);
