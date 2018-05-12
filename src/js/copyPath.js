function copyFrom() {
  const
    {dialog} = require('electron').remote,
    {app} = require('electron').remote,
    fs = require('fs'),
    path = require('path');

  // Select a directory
  let copyFrom = dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  // Store path
  document.getElementById('copyFrom').value = copyFrom;

  // List files
  copyFrom = copyFrom.toString(); // Converts path to string
  const temp = app.getPath('desktop') + '/copyList.xml'; // TEMP
  // Check wether a copy list already exists
  if (fs.existsSync(temp)) {
    fs.unlink(temp); // Remove existing file
  }
  // Create write stream to list files
  // 'a' flag stands for 'append'
  const listFiles = fs.createWriteStream(temp, {'flags': 'a'});

function walk(dir){
  let
    n = 0,
    size = 0,
    totalSize = 0;

  function walk(dir) {

    fs.readdirSync(dir).forEach(file => {

      let fullPath = path.join(dir, file);
      ++n;

      if (fs.lstatSync(fullPath).isDirectory()) {
        --n;
        walk(fullPath);
      } else {
        size =+ fs.statSync(fullPath).size;// Get size of file
        totalSize += size; // Calculate total size
        listFiles.write(fullPath + "\n");// Write file path into copyList.xml
      }

    });
  }
  return walk(dir);
}

  walk(copyFrom);// Starts function "walk"
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
