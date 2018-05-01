//Recursively walk trhough dir
var _getAllFilesFromFolder = function(dir) {

    var filesystem = require("fs");
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file));
        } else results.push(file);

    });

    return results;

};

//NEED IMPROVEMENT
//Recursively walk trhough dir
var walk = function(copyFrom) {
  fs.readdir(copyFrom, function(err, files){
    if (err){
      console.log(err);
      return err;
    }
    files.forEach(function(files) {
      var fullPath = path.join(copyFrom, files); //Concatenate path
      fs.stat(fullPath, function(err, d){
        if (err) {
          return err;
        }
        if (d.isDirectory()) {
          walk(fullPath);
        }
        else {
          //Store file path into file
          console.log(fullPath);
        }
      });
    });
  });
};


function calculateSize(dir, size) {
  dir = dir.toString(); // Convert path array to string
  // Calculate total size
  require('du')(dir, function (err, size) {
    // Make size human-readable
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
      size = size / 1000;
      i++;
    } while (size > 1000);

    return size = Math.max(size, 0.1).toFixed(1) + byteUnits[i]; //Return size
  })
  return size;
}

function checkFreeSpace (dir, err){
  const disk = require('diskusage');
  const os = require('os');

  let path = os.platform() === 'win32' ? 'c:' : '/';

  disk.check(path, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info.available);
      console.log(info.free);
      console.log(info.total);
    }
  });

  try {
    let info = disk.checkSync(path);
    console.log(info.available);
    console.log(info.free);
    console.log(info.total);
  }
  catch (err) {
    console.log(err);
  }
}
