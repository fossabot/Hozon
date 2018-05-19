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

//Copy a file
fs.copy(copySource, copyPathOne, (err) => {
  if (err) return firstResult.innerHTML = "<span style=\"color:yellow\">ERREUR LORS DE LA PREMIÈRE COPIE<br /></span>" + err;
  do {

  } while (true);
  firstResult.innerHTML = "Première copie faite avec succès";

})

fs.copy(copySource, copyPathTwo, (err) => {
  if (err) return secondResult.innerHTML = "<span style=\"color:yellow\">ERREUR LORS DE LA SECONDE COPIE<br /></span>" + err;
  secondResult.innerHTML = "Seconde copie faite avec succès";

});
