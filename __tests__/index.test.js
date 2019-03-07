'use strict';

const soccer = require('../lib/class');

let unAlphaArray = [
  ['C', 0],
  ['B', 0],
  ['A', 0]
]

let alphOutputArray = [
  ['A', 0],
  ['B', 0],
  ['C', 0]
]

describe('Testing the Soccer class', () => {

  // testing that the class was exported properly
  test('Proof of life', () => {
    expect(soccer.position).toEqual(0);
  })

  test('Should alphabetize the array', () => {
    expect(soccer.alphabetize(unAlphaArray)).toEqual(alphOutputArray);
  })

  test('Should add a new line to the writeString', () => {
    soccer.sortData.push(['team', 2])
    soccer.addLine(0);
    expect(soccer.writeString).toBeTruthy();
  })

  test('Position counter should have been incremented', () => {
    expect(soccer.position).toEqual(1);
    soccer.position = 0;
  })

  test('Should empty the orderTies array', () => {
    soccer.orderedTies.push('some dummy data');
    soccer.emptyOrderedTies();
   expect(soccer.orderedTies).toEqual([]);
  })

  test('Should concat orderTies data into writeString', () => {
    soccer.orderedTies = [['testTeam', 2]];
    soccer.addTiesToWriteString();
    expect(soccer.writeString).toBeTruthy();
  })

  test('Should empty the orderTies array', () => {
    soccer.emptyOrderedTies();
    expect(soccer.orderedTies).toEqual([]); 
  })

  test('should add an item to orderedTies', () => {
    soccer.orderedTies = [];
    soccer.addTieToList(0);
    expect(soccer.orderedTies.length).toBe(1);
  })

  test('Should increment the position counter', () => {
    soccer.position = 0;
    soccer.incrementPostionCounter();
    expect(soccer.position).toEqual(1);
  })

  test('Should sort the teams based on their league score', () => {
    soccer.sortData = [['team2', 3],['team1', 0]];
    soccer.sortTeamsByScore();
    expect(soccer.sortData[1]).toEqual(['team2',3]);
    soccer.sortData = [];
  })

  test('Should construct sortData out of standings', () => {
    soccer.standings = {
      team: 2,
      team2: 0
    };
    soccer.makeSortable()
    expect(soccer.sortData[0][0]).toEqual('team');

  })

  test('Should calulate the standings', () => {
    soccer.teams = ['team1','team2','team1','team2'];
    soccer.scores = [2,0,2,2];
    soccer.standings = {
      team1: 0,
      team2: 0
    }
    soccer.calculateStanding();
    expect(soccer.standings.team1).toEqual(4);
    soccer.standings = {};
  })

  test('Should construct the teams object', () => {
    soccer.createTeamsObject();
    expect(soccer.standings.team1).toEqual(0);
  })

  test('shoult capture the file path and store it', () => {
    soccer.captureFilePath('./this/is/a/test/path');
    expect(soccer.filePath).toEqual('./this/is/a/test/path');
  })

  test('RegEx should capture the team names', () => {
    soccer.fileString = 'Test Team Name 1, Another Test Name 2\nSuperTeam 3, EvenSupererTeam 3\n';
    soccer.teams = [];
    soccer.scores = [];
    soccer.captureNamesAndScores();
    expect(soccer.teams.length).toEqual(4);
  })

  test('RegEx should have captured the scores', () => {
    expect(soccer.scores.length).toEqual(4);

  })





})