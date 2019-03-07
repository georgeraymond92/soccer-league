'use strict';


// Dependencies
const fs = require('fs');



class Soccer {
  constructor(){

    // Global Variables
    this.regScores = /[\d]/g; 
    this.regTeams = /[^/n , \s]+[a-z A-z A-Z]+[^0-9 \s \n]/g;
    this.standings = {};
    this.sortData = [];
    this.filePath;
    this.orderedTies = [];
    this.position = 0;
    this.writeString = '';
    this.scores;
    this.teams;
    this.fileString;

  }

  // Alphabetizes a 2d array by the first element in each child array
  alphabetize(arr) {

    arr.sort( (a, b) => {
      if(a[0] < b[0]){ return -1}
      if(a[0] > b[0]){ return 1}
      return 0;
    });

    return arr;
  
  }
  
  // Constructs and adds a line to the write String 
  addLine(i) {
    this.incrementPostionCounter();
    this.writeString += (`${this.position}. ${this.sortData[i][0]}, ${this.sortData[i][1]}pts\n`);
    return;
  }
  
  // Empties the orderedTies array
  emptyOrderedTies() {
    this.orderedTies = [];
    return;
  }
  
  // Loops through the orderedTies array constructing lines and adding the to the writeString
  addTiesToWriteString(){
    for(let i = 0; i < this.orderedTies.length; i++){
      this.writeString += `${this.position}. ${this.orderedTies[i][0]}, ${this.orderedTies[i][1]}pts\n`
    }
    return;
  }
  
  // Adds element to the orderedTies Array
  addTieToList(i) {
    this.orderedTies.push(this.sortData[i]);
    return;
  
  }
  
  // Increments the position counter by one
  incrementPostionCounter(){
    this.position++
    return;

  }
  
  // Takes the writeString and creates a file called standings.txt with it's value. This file can be found at the application's root
  createStandingsFile() {
    fs.writeFile('../standings.txt', Buffer.from(this.writeString), (err) => {
      if(err) {
        throw err;
      }
    })
    console.log('League Results, can now be found in standings.txt')
    return;
  }
  
  // Sorts the sortData in place by score
  sortTeamsByScore() {
    this.sortData.sort( (a, b) => {
      return a[1] - b[1];
    })
  }
  
  // Stores the values from the standings object in the sortData Array to play nicley with the sorting function
  makeSortable() {
    for(let teams in this.standings)(
      this.sortData.push([teams, this.standings[teams]])
    )
    return;
  }
  
  // Calculates games results and Increments the teams points in the standing object accordingly
  calculateStanding() {
    for(let i = 0; i < this.scores.length; i += 2){
      if( this.scores[i] === this.scores[(i+1)]){
        this.standings[this.teams[i]]++;
        this.standings[this.teams[(i+1)]]++;
      }else if( this.scores[i] < this.scores[(i+1)]){
        this.standings[this.teams[(i+1)]] = (this.standings[this.teams[(i+1)]] + 3)
      }else {
        this.standings[this.teams[i]] = (this.standings[this.teams[i]] + 3)
      }
    }
    return;
  }
  
  // Loops through the teams array and stores in the Standings object with an inital value of 0
  createTeamsObject() {
    for(let i = 0; i < this.teams.length; i++){
      if(!this.standings[this.teams[i]]){
        this.standings[this.teams[i]] = 0;
      }
    }
    return;
  }
  
  // Stores the argument given to this.filePath
  captureFilePath(path){
    this.filePath = path;
    return;
  }
  
  // Uses RegEx to grab team names and games scores from the input file
  captureNamesAndScores() {
    this.scores = this.fileString.match(this.regScores);
    this.teams = this.fileString.match(this.regTeams);
    return;
  }
  
  // converts a buffer to a string and stores it to this.fileString
  convertFileBufferToString(buffer) {
    this.fileString = buffer.toString();
    return;
  }

}

// exports an instance of the Soccer class
module.exports = new Soccer();