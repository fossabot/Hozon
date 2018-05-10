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
