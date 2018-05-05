function copySource() {
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
  if (fs.lstatSync(temp).isFile()) {
    fs.unlink(temp); //Remove existing file
  }
  const listFiles = fs.createWriteStream(temp, {'flags': 'a'});

  function walk(copyFrom) {
    fs.readdirSync(copyFrom).forEach(file => {

      let fullPath = path.join(copyFrom, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else {
        listFiles.write("+ " + fullPath + "\n");
        console.log(fullPath);
      }
    });
  }
  walk(copyFrom);

}
