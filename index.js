'use strict';

// Dependencies
const inquirer = require('inquirer');
const fs = require('fs');

// Instance of Soccer Class
let soccer = require('./lib/class');


// Prompt the user for the file location
inquirer
.prompt([
  {
    type: 'input',
    message: 'Enter the filepath of the input file',
    name: 'filepath'
  }
])
.then( answers => {

  // Store the file location

  soccer.captureFilePath(answers.filepath);


  // Read the file and throw an error if path is not valid

  fs.readFile(soccer.filePath, (err, data) => { 
    if( err ) {
      console.error('file does not exist')

    } else {

      // Convert the buffer to a string
      soccer.convertFileBufferToString(data);

      // Store Scores and Teams in arrays
      soccer.captureNamesAndScores();

      // Identify the teams and put them in an object (hash) with a starting value of 0
      soccer.createTeamsObject();

      // Check the game results and add points accordingly to the teams for wins losses or ties
      soccer.calculateStanding();

      // Convert the data into a 2d array for sorting
      soccer.makeSortable();

      // Sort Teams by points
      soccer.sortTeamsByScore();

      // Loop through the sorted teams array from the end and build a string of results
      for( let i = soccer.sortData.length-1; i >= 0; i-- ){

        // If Score is equal to next team in standing's score
        if ( i !== 0 && soccer.sortData[i][1] === soccer.sortData[i-1][1]){
          
          soccer.addTieToList(i);

        // If score matches last team's score but not the next's
        } else if (i !== soccer.sortData.length-1 && i !== 0 && soccer.sortData[i][1] === soccer.sortData[i+1][1] && soccer.sortData[i][1] !== soccer.sortData[i-1][1] || i === 0 && soccer.sortData[i][1] === soccer.sortData[i+1][1]){

          soccer.addTieToList(i)
          soccer.incrementPostionCounter();
          soccer.alphabetize(soccer.orderedTies);
          soccer.addTiesToWriteString();
          soccer.emptyOrderedTies();

        } else {

          soccer.addLine(i);

        }
      
      }
      // Write the Buffered string to a new file or if err throw err
      soccer.createStandingsFile();
    }
  })

})
.catch(err => {
  throw err;
});


module.exports = soccer;


