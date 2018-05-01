function doCopy(){
  const fs = require('fs-extra');

  //Read copy paths from stored user inputs
  var copySource = document.getElementById('source-path').innerHTML;
  var copyPathOne = document.getElementById('copy-path-one').value;
  var copyPathTwo = document.getElementById('copy-path-two').value;
  console.log(copySource, copyPathOne, copyPathTwo);

  //Copy indicators
  var firstResult = document.getElementById('first-result');
  var secondResult = document.getElementById('second-result');

  //Check wether a valid copy path exists
  if (!copySource || !copyPathOne || !copyPathTwo) {
    //Displays errors to user
    alert("ERREUR : Un des chemins de copie est invalide")
  } else {
    firstResult.innerHTML = "Première copie en cours";
    secondResult.innerHTML = "Seconde copie en cours";
    //Calculate total copy size and log it to console
    calculateSize(copySource);
    console.log(size)
    //Launch copy process
    fs.copy(copySource, copyPathOne, (err) => {
      if (err) return firstResult.innerHTML = "<span style=\"color:yellow\">ERREUR LORS DE LA PREMIÈRE COPIE<br /></span>" + err;
      do {

      } while (true);
      firstResult.innerHTML = "Première copie faite avec succès";
      console.log('1 - Yay!');
    })

    fs.copy(copySource, copyPathTwo, (err) => {
      if (err) return secondResult.innerHTML = "<span style=\"color:yellow\">ERREUR LORS DE LA SECONDE COPIE<br /></span>" + err;
      secondResult.innerHTML = "Seconde copie faite avec succès";
      console.log('2 - Yay!');

    });
  }
}
