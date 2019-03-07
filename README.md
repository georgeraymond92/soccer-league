## WeConnect Soccer League Assignment

[![Build Status](https://www.travis-ci.com/georgeraymond92/soccer-league.svg?branch=master)](https://www.travis-ci.com/georgeraymond92/00-deployment)

### Author: George Raymond

### Links and Resources

* [repo](https://github.com/georgeraymond92/soccer-league)
* [travis](https://www.travis-ci.com/georgeraymond92/soccer-league)

## Description
Soccer-League is a command line application that calulates league standings when given game results. To run the application you must have node.js installed on your machine. Before running the application you will want to have a `.txt` file handy with game results. If your do not have such a file you may find one in the assets directory of the application. When you run the application you will be prompted for the file location of your input file ( Example: `./assets/sample-input.txt`). After providing a valid path the application will create a `standings.txt` file next to the application directory on your machine. This is calculated according to the following rules:

```txt
Win: 3pts
Tie: 1pt
Loss: 0pts
```

#### Sample Input
```txt
Lions 3, Snakes 3
Tarantulas 1, FC Awesome 0
Lions 1, FC Awesome 1
Tarantulas 3, Snakes 1
Lions 4, Grouches 0
```
#### Sample Output
```txt
1. Tarantulas, 6pts
2. Lions, 5pts
3. FC Awesome, 1pts
3. Snakes, 1pts
4. Grouches, 0pts
```

### Setup
* Install Dependencties: `npm i`

#### Running the app
* `npm start`
* Endpoint: `/index.js`
  * creates output file `standings.txt`

#### Testing
* `npm test`

