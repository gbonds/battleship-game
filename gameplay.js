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


// sets board settings and fire method
var model = {
    // sets board size, ship length, and number of ships for future customization
    boardSize: 7,
    numShips: 3,
    shipLength: 3,

    // sets shipSunk status
    shipsSunk: 0,

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
                ships.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                // if all ship locations hits, will add to shipsSunk count
                if (this.shipsSunk(ship)) {
                    view.displayMessage("You sank my battleship! There are " + (numShips - shipsSunk) + " ships still afloat.")
                    this.shipsSunk++
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
};

//// testing model
model.fire("53");
//// TODO figure out why fires below aren't registering on board
model.fire("06");
model.fire("16");
