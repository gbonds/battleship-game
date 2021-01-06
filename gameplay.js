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
view.displayMiss('11');
view.displayMiss('13');
view.displayHit('15');
view.displayHit('16');
view.displayHit('17');
view.displayMessage('Testing one, two, three.');


var model = {
    // sets board size, ship length, and number of ships for future customization
    boardSize: 7,
    numShips: 3,
    shipLength: 3,

    // sets shipSunk status
    shipsSunk: 0,

    // sets ship locations
    //// TODO make ship locations random
    ships: [{ locations: ['17', '27', '37'], hits: ['', '', ''] },
    { locations: ['35', '45', '55'], hits: ['', '', ''] },
    { locations: ['21', '22', '23'], hits: ['', '', ''] }
    ]

};