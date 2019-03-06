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

    filePath = answers.filepath;

    // Read the file and throw an error if path is not valid

      fs.readFile(filePath, (err, data) => { 
        if( err ) {
          console.error('file does not exist')
        } else {

          // Convert the buffer to a string
          let fileString = data.toString();

          // Store Scores and Teams in arrays
          let scores = fileString.match(regScores);
          let teams = fileString.match(regTeams);
  
          // Identify the teams and put them in an object (hash) with a starting value of 0
          for(let i = 0; i < teams.length; i++){
            if(!standings[teams[i]]){
              standings[teams[i]] = 0;
            }
          }

          // Check the game results and add points accordingly to the teams for wins losses or ties
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

          // [[pandas, 3], [turkeys, 0]]
          
          // Convert the data into a 2d array for sorting
          for(let teams in standings)(
            sortData.push([teams, standings[teams]])
          )

          // Sort Teams by points
          sortData.sort( (a, b) => {
            return a[1] - b[1];
          })


          let position = 0;
          let writeString = '';

          // Loop through the sorted teams array from the end and build a string of results
          for( let i = sortData.length-1; i >= 0; i-- ){

            // // If a tie is found do not increment the position counter
            // if ( i !== sortData.length-1 && sortData[i][1] === sortData[i+1][1]){
            //   writeString += (`${position}. ${sortData[i][0]}, ${sortData[i][1]}pts\n`);
            // }else{
            //   position++;
            //   writeString += (`${position}. ${sortData[i][0]}, ${sortData[i][1]}pts\n`);
            // }
            

            // If a tie is found do not increment the position counter
            if ( i !== sortData.length-1 && sortData[i][1] === sortData[i+1][1]){
              orderedTies.push(sortData[i]);
              console.log(`🎇   ${i}`)
              // writeString += (`${position}. ${sortData[i][0]}, ${sortData[i][1]}pts\n`);
            }else if (orderedTies.length >= 1){
              // alphabetize
              for(let i = 0; i < orderedTies.length; i++){
                writeString += `${position}. ${orderedTies[i][0]}, ${orderedTies[i][1]}pts\n`
              }
              console.log(`🚥 ${i}, ${orderedTies}`)
              orderedTies = [];
              position++;
              writeString += (`${position}. ${sortData[i][0]}, ${sortData[i][1]}pts\n`);
            } else {
              position++;
              writeString += (`${position}. ${sortData[i][0]}, ${sortData[i][1]}pts\n`);
            }
          
  

          }

          if (orderedTies.length >= 1){
            // alphabetize
            for(let i = 0; i < orderedTies.length; i++){
              writeString += `${position}. ${orderedTies[i][0]}, ${orderedTies[i][1]}pts\n`
            }
            orderedTies = [];
          }
  
          // Write the Buffered string to a new file or if err throw err
          fs.writeFile('../standingstest.txt', Buffer.from(writeString), (err) => {
            if(err) {
              throw err;
            }
          })
        }
  
      })
  })
  .then( data => {
    // return message to user
    console.log("The league's standings may now be found in the standings.txt file");
  })



  function alphabetize(arr) {

    arr.sort( (a, b) => {
      if(a[0] < b[0]){ return -1}
      if(a[0] > b[0]){ return 1}
      return 0;
    })

  }

  let recurseAlph = ( sortData ) => {
    let alphArr = [];

    if( i !== sortData.length-1 && sortData[i][1] === sortData[i-1][1] ){
      alphArr.push(sortData[i][1]);
    }

  }