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
    shipFleet: [{ locations: ['0', '0', '0'], hits: ['', '', ''] },
    { locations: ['0', '0', '0'], hits: ['', '', ''] },
    { locations: ['0', '0', '0'], hits: ['', '', ''] }
    ],

    // sets fire based on user guess
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.shipFleet[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                // if all ship locations hits, will add to numShipsSunk count
                if (this.isSunk(ship)) {
                    this.numShipsSunk++;
                    view.displayMessage('You sank my battleship! Ships still floating: ' + (model.numShips - model.numShipsSunk));
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
        }
        return true;
    }, // isSunk ends

    // fills model's ship arrays with locations and checks for overlap
    generateShipLocations: function () {
        var locations;

        // generates new set of locations and checks to see if location overlaps with any existing ships
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShipLocations();
            } while (this.checkOverlap(locations));
            this.shipFleet[i].locations = locations;
        }
    }, // generateShipLoc ends

    // sets ship direction and locations
    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);
        var row;
        var col;

        if (direction === 1) {
            // generates originating location for horizontal ship
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random * ((this.boardSize - this.shipLength) + 1)); // diverging from HFJS code, which has (boardSize - (shipLen + 1)), which I think would make location generation fall short of full available starting locations.
        } else {
            // generates originating location for vertical ship
            row = Math.floor(Math.random * ((this.boardSize - this.shipLength) + 1)); // diverging from HFJS code, which has (boardSize - (shipLen + 1)), which I think would make location generation fall short of full available starting locations.
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                // adds locations to array for new horizontal ship
                newShipLocations.push('' + row + (col + i));
            } else {
                // adds locations to array for new vertical ship
                newShipLocations.push('' + (row + i) + col);
            }
        } // for loop ends

        return newShipLocations;

    }, // generateShip ends

    // checks for overlapping ship locations
    checkOverlap: function (locations) {

        // for each ship already on the board.... 
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.shipFleet[i];

            // ...check to see if location matches an existing ship's array of locations
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            } // inner for loop ends
        } // outer for loop ends

        // if existing ship's locations don't match new location, there is NO overlap so return false
        return false;

    } // checkOverlap ends

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
        var firstChar = guess.charAt(0).toUpperCase(); // gets the first character of guess AND transforms any lowercase letters to uppercase so they strictly match array.
        var row = alphabetRow.indexOf(firstChar); // compares it to alphabet array

        var secondChar = guess.charAt(1) // gets second character of guess
        var column = numberColumn.indexOf(secondChar); // compares to number array

        if (isNaN(row) || isNaN(column)) {
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

    processGuess: function (guess) {
        var location = parseGuess(guess);

        if (location) {
            this.numGuesses++;
            var hit = model.fire(location);

            //if guess was a hit and the number of ships sunk matches numShips, then game is won
            if (hit && model.numShipsSunk === model.numShips) {
                view.displayMessage('You sank all ' + model.numShips + ' of my battleships in ' + this.numGuesses + ' guesses. That makes your hit accuracy ' + Math.round(((model.numShips * model.shipLength) / this.numGuesses) * 100) + '%.');
            }
        }
    } // processGuess ends

} // controller ends

//// testing controller
//controller.processGuess("A1"); // misses

//controller.processGuess("A7"); // all hits
//controller.processGuess("B7");
//controller.processGuess("C7");

//controller.processGuess("C5");
//controller.processGuess("D5");
//controller.processGuess("E5");

//controller.processGuess("B1");
//controller.processGuess("B2");
//controller.processGuess("B3");

// collects user guess via fireButton
function init() {
    // handler for when user presses button
    var fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;

    // handler for when user presses enter key
    var guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);

    // resets form to empty field after submitting
    guessInput.value = '';
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

//// makes init function run after window is loaded. isn't there a more efficient way to make this happen?
window.onload = init;