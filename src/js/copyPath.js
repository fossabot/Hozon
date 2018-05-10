function copyFrom() {
  const {dialog} = require('electron').remote;
  const {app} = require('electron').remote;
  const fs = require('fs');
  const path = require('path');

  // Select a directory
  let copyFrom = dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  //Store path
  document.getElementById('copyFrom').value = copyFrom;

  //List files
  copyFrom = copyFrom.toString(); //Converts path to string
  const temp = app.getPath('desktop') + '/copyList.xml'; // TEMP
  if (fs.existsSync(temp)) {
    fs.unlink(temp); //Remove existing file
  }
  const listFiles = fs.createWriteStream(temp, {'flags': 'a'});

  function walk(dir) {
    fs.readdirSync(dir).forEach(file => {

      let fullPath = path.join(dir, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else {
        let size = fs.statSync(fullPath).size;
        listFiles.write(fullPath + " (" + size + ")\n");
        console.log(fullPath);
        console.log(size);
      }
    });
  }
  walk(copyFrom);

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