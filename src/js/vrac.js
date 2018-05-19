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
