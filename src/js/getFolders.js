function getSource() {
  const {dialog} = require('electron').remote;

  // Displays directory selection dialog
  const copySource = dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  //List Files


  console.log(copySource);
  document.getElementById('source-path').innerHTML = copySource;
  document.getElementsByName('copy-source').value = copySource;
}

function getDestOne(){
  const {dialog} = require('electron').remote;

  var copyPath = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  document.getElementById('copy-path-one').setAttribute("value", copyPath);
  console.log(copyPath);
}

function getDestTwo(){
  const {dialog} = require('electron').remote;

  var copyPath = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  document.getElementById('copy-path-two').setAttribute("value", copyPath);
  console.log(copyPath);
}
