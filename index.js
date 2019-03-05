const inquirer = require('inquirer');
const fs = require('fs');
let scoresArray;


inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter the filepath of the input file',
      name: 'filepath'
    }
  ])
  .then(answers => {
    let filePath = answers.filepath;


    fs.readFile(filePath, (err, data) => { 
      if( err ) {
        throw err;
      } else {
        scoresArray = data.toString().split('\n')        
        console.log(scoresArray);
      }
    })
  })