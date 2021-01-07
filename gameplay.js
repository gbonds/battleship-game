// set ship locations
// collect user guess
//// validate user guess
////// add to guess count
/////// compare user guess to ship locations
//////// alert to hit or miss
////////// if miss: add miss symbol to cell, miss message
////////// if hit: add to hit count, add symbol, hit message
//////////// if hit count reaches max, alert user to win

// displays message for win, hit, or miss AND adds hit/miss symbols to grid cells
var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
        cell.innerHTML = '<i class="fas fa-bahai hit-icon"></i>';
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
        cell.innerHTML = '<i class="fas fa-times miss-icon"></i>';
    }
};

//// testing view object
//view.displayMiss('01');
//view.displayMiss('53');
//view.displayHit('15');
//view.displayHit('16');
//view.displayHit('17');
//view.displayMessage('Testing one, two, three.');


// sets board settings and fire function
var model = {
    // sets board size, ship length, and number of ships for future customization
    boardSize: 7,
    numShips: 3,
    shipLength: 3,

    // sets shipSunk status
    numShipsSunk: 0,

    // sets ship locations
    //// TODO make ship locations random
    ships: [{ locations: ['06', '16', '26'], hits: ['', '', ''] },
    { locations: ['24', '34', '44'], hits: ['', '', ''] },
    { locations: ['10', '11', '12'], hits: ['', '', ''] }
    ],

    // sets fire based on user guess
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                // if all ship locations hits, will add to numShipsSunk count
                //// TODO review this section, I don't think isSunk is tracking properly
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship! There are " + (numShips - numShipsSunk) + " ships still afloat.");
                    this.numShipsSunk++;
                }
                return true;
            }
        } // for loop ends

        // if user guess is a miss
        view.displayMiss(guess);
        view.displayMessage("MISS!");
        return false;

    }, // fire ends

    isSunk: function (ship) {

        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        } // for loop ends

    } // isSunk ends
}; // model ends

//// testing model.fire
// model.fire("53"); // these two should be misses
// model.fire("05");

// model.fire("06"); // rest should be hits
// model.fire("16");
// model.fire("26");

// model.fire("34");
// model.fire("24");
// model.fire("44");

// model.fire("12");
// model.fire("11");
// model.fire("10");


// validates user guesses
function parseGuess(guess) {
    // TODO once boardSize can be customized, update these hardcoded arrays
    var alphabetRow = ["A", "B", "C", "D", "E", "F", "G"];
    var numberColumn = ["1", "2", "3", "4", "5", "6", "7"]; // setting this array in addition to alphabet

    if (guess === null || guess.length !== 2) {
        view.displayMessage("Not a valid entry length. Please enter a letter and number on the board such as A1 or B2.");
    } 
    
    else {
        // TODO allow users to enter lower case letters. right now, it only accepts upper case letters as valid entry
        var firstChar = guess.charAt(0); // inspects the first character of guess
        var row = alphabetRow.indexOf(firstChar); // compares it to alphabet array

        var secondChar = guess.charAt(1) // inspects second character of guess
        var column = numberColumn.indexOf(secondChar); // compares to number array

        if ( isNaN(row) || isNaN(column) ) {
            view.displayMessage("Not a valid entry combo. Please enter a letter and number on the board such as A1 or B2.")
        }

        else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            view.displayMessage("Not a valid entry. Please enter a letter and number listed on the board.")
        }

        // if all requirements met, then return parsed guess
        else {
            // putting in empty string forces code to treat all entries as a string so that we can concatenate successfully! otherwise, will simply add row + column
            // solution source: https://stackoverflow.com/questions/1723716/how-to-concatenate-two-numbers-in-javascript#:~:text=log%20of%20base.-,Math.,log(base).&text=You%20can%20also%20use%20toString,it%20to%20string%20and%20concatenate.
            return '' + row + column; 
        }
    } // else ends

    // if any checks fail, return null
    return null;

} // parseGuess ends

//// testing parseGuess
//console.log(parseGuess("A1"));
//console.log(parseGuess("B7"));
//console.log(parseGuess("G4"));
//console.log(parseGuess("H1"));
//console.log(parseGuess("A8"));

// tracks guesses, updates model, and determines when game is over
var controller = {
    numGuesses: 0,

    processGuess: function(guess) {
        var location = parseGuess(guess);

        if (location) {
            this.numGuesses++;
            var hit = model.fire(location);

            //if guess was a hit and the number of ships sunk matches numShips, then game is won
            if (hit && model.numShipsSunk === model.numShips) {
                view.displayMessage('You sank all my battleships in ' + this.numGuesses + ' guesses.');
            }
        }
    } // processGuess ends

} // controller ends

//// testing controller
controller.processGuess("A1"); // misses

controller.processGuess("A7"); // all hits
controller.processGuess("B7");
controller.processGuess("C7");

controller.processGuess("C5");
controller.processGuess("D5");
controller.processGuess("E5");

controller.processGuess("B1");
controller.processGuess("B2");
//controller.processGuess("B3");

