const {dialog} = require('electron').remote,
  {app} = require('electron').remote,
  fs = require('fs'),
  path = require('path');

let totalSize = 0,
  fileList = [];

function copyFrom() {

  //Select a directory
  let copyFrom = dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  document.getElementById('copyFrom').value = copyFrom; //Write path in form input
  copyFrom = copyFrom.toString(); //Converts path to string

  let
    n = 0,
    size = 0;

  function recursiveWalk(dir) {

    fs.readdirSync(dir).forEach(file => {

      let fullPath = path.join(dir, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        recursiveWalk(fullPath);
      } else {
        size = fs.statSync(fullPath).size; //Get size of file
        totalSize += size; //Calculate total size
        fileList.push(fullPath); //Add copy path into array fileList
      }

    });

    return fileList;
  }

  recursiveWalk(copyFrom); //Starts function "walk"

  document.getElementById('file-list').innerHTML = fileList.length + " fichiers à copier.";
  document.getElementById('total-size').innerHTML = "Taille totale : " + convertSize(totalSize);
  console.log(fileList.join('\n')); // TEMP
}


function copyDest(n) {

  var copyPath = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (n == 1) {
    document.getElementById('copy-path-one').setAttribute("value", copyPath);

    return copyPath;
  }
  if (n == 2) {
    document.getElementById('copy-path-two').setAttribute("value", copyPath);

    return copyPath;
  }

}

function doCopy() {

  //Read copy paths from inputs
  const copySource = document.getElementById('source-path').innerHTML,
    copyPathOne = document.getElementById('copy-path-one').value,
    copyPathTwo = document.getElementById('copy-path-two').value;

  //Copy indicators
  const firstResult = document.getElementById('first-result'),
    secondResult = document.getElementById('second-result');

  let n = 0,
    i = n - 1;

  //Check wether a valid copy path exists
  if (!copySource || !copyPathOne || !copyPathTwo) {
    //Displays errors to user
    alert("ERREUR : Un des chemins de copie est invalide")
  } else {
    firstResult.innerHTML = "Première copie en cours";
    secondResult.innerHTML = "Seconde copie en cours";

    //Launch copy process
    do {
        writeStream = fs.createWriteStream(path.join(copyPathOne, "test.xml"));
      ++n;
      writeStream.write(fileList[i]);

    } while (n < fileList.length);

  }
}

function convertSize(size) {
  // Make size human-readable
  let i = -1;
  const byteUnits = [' ko', ' Mo', ' Go', ' To', ' Po', ' Eo', ' Zo', ' Yo'];
  do {
    size = size / 1000;
    i++;
  } while (size > 1000);

  return size = Math.max(size, 0.1).toFixed(1) + byteUnits[i]; //Return size
}
