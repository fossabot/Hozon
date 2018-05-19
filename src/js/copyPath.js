function copyFrom() {
  const
    {dialog} = require('electron').remote,
    {app} = require('electron').remote,
    fs = require('fs'),
    path = require('path');

  //Select a directory
  let copyFrom = dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  document.getElementById('copyFrom').value = copyFrom;//Write path in form input
  copyFrom = copyFrom.toString(); //Converts path to string

  let
    n = 0,
    size = 0,
    totalSize = 0,
    fileList = [];

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

  recursiveWalk(copyFrom);//Starts function "walk"

  document.getElementById('file-list').innerHTML = fileList.length + " fichiers à copier.";
  document.getElementById('total-size').innerHTML = "Taille totale : " + convertSize(totalSize);
  console.log(fileList.join('\n'));// TEMP
}

function convertSize (size) {
    // Make size human-readable
    let i = -1;
    const byteUnits = [' ko', ' Mo', ' Go', ' To', ' Po', ' Eo', ' Zo', ' Yo'];
    do {
      size = size / 1000;
      i++;
    } while (size > 1000);

    return size = Math.max(size, 0.1).toFixed(1) + byteUnits[i]; //Return size
}

function getDestOne() {
  const {dialog} = require('electron').remote;

  var copyPath = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  document.getElementById('copy-path-one').setAttribute("value", copyPath);
  console.log(copyPath);
}

function getDestTwo() {
  const {dialog} = require('electron').remote;

  var copyPath = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  document.getElementById('copy-path-two').setAttribute("value", copyPath);
  console.log(copyPath);
}
