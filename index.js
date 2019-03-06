'use strict';

// Dependencies
const inquirer = require('inquirer');
const fs = require('fs');

// RegEx patterns
const regScores = /[\d]/g; 
const regTeams = /[^/n , \s]+[a-z A-z A-Z]+[^0-9 \s \n]/g;

// Global variables
let standings = {};
let sortData = [];
let filePath;
let orderedTies = [];
let position = 0;
let writeString = '';
let scores;
let teams;
let fileString;


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

    captureFilePath(answers.filepath);


    // Read the file and throw an error if path is not valid

      fs.readFile(filePath, (err, data) => { 
        if( err ) {
          console.error('file does not exist')
        } else {

          // Convert the buffer to a string
          convertFileBufferToString(data);

          // Store Scores and Teams in arrays
          captureNamesAndScores();
  
          // Identify the teams and put them in an object (hash) with a starting value of 0
          createTeamsObject();

          // Check the game results and add points accordingly to the teams for wins losses or ties
          calculateStanding();

          // Convert the data into a 2d array for sorting
          makeSortable();

          // Sort Teams by points
          sortTeamsByScore();

          // Loop through the sorted teams array from the end and build a string of results
          for( let i = sortData.length-1; i >= 0; i-- ){

            // If Score is equal to next team in standing's score
            if ( i !== 0 && sortData[i][1] === sortData[i-1][1]){
              
              addTieToList(i);

            // If score matches last team's score but not the next's
            }else if(i !== sortData.length-1 && i !== 0 && sortData[i][1] === sortData[i+1][1] && sortData[i][1] !== sortData[i-1][1] || i === 0 && sortData[i][1] === sortData[i+1][1]){

              addTieToList(i)
              incrementPostionCounter();
              alphabetize();
              addTiesToWriteString();
              emptyOrderedTies();

            } else {

              addLine(i);

            }
          
          }

          // Write the Buffered string to a new file or if err throw err
          createStandingsFile();
        }
  
      })
  })
  .then( data => {
    // return message to user
    console.log("The league's standings may now be found in the standings.txt file");

  })
  .catch(err => {
    throw err;
  });




// --------------- Helper Functions --------------- //

function alphabetize() {

  orderedTies.sort( (a, b) => {
    if(a[0] < b[0]){ return -1}
    if(a[0] > b[0]){ return 1}
    return 0;
  })

}

function addLine(i) {
  incrementPostionCounter();
  writeString += (`${position}. ${sortData[i][0]}, ${sortData[i][1]}pts\n`);
}

function emptyOrderedTies() {
  orderedTies = [];
}

function addTiesToWriteString(){
  for(let i = 0; i < orderedTies.length; i++){
    writeString += `${position}. ${orderedTies[i][0]}, ${orderedTies[i][1]}pts\n`
  }
}

function addTieToList(i) {

  orderedTies.push(sortData[i]);

}

function incrementPostionCounter(){
  position++
}

function createStandingsFile() {
  fs.writeFile('../standingstest.txt', Buffer.from(writeString), (err) => {
    if(err) {
      throw err;
    }
  })
}

function sortTeamsByScore() {
  sortData.sort( (a, b) => {
    return a[1] - b[1];
  })
}

function makeSortable() {
  for(let teams in standings)(
    sortData.push([teams, standings[teams]])
  )
}

function calculateStanding() {
  for(let i = 0; i < scores.length; i += 2){
    if( scores[i] === scores[(i+1)]){
      standings[teams[i]]++;
      standings[teams[(i+1)]]++;
    }else if( scores[i] < scores[(i+1)]){
      standings[teams[(i+1)]] = (standings[teams[(i+1)]] + 3)
    }else {
      standings[teams[i]] = (standings[teams[i]] + 3)
    }
  }
}

function createTeamsObject() {
  for(let i = 0; i < teams.length; i++){
    if(!standings[teams[i]]){
      standings[teams[i]] = 0;
    }
  }
}

function captureFilePath(path){
  filePath = path;
}

function captureNamesAndScores() {
  scores = fileString.match(regScores);
  teams = fileString.match(regTeams);
}

function convertFileBufferToString(buffer) {
  fileString = buffer.toString();
}