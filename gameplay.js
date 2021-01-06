// set ship locations

// collect user guess
    // validate user guess
        // compare user guess to ship locations
            // add to guess count
            // alert to hit or miss
                // if miss: add miss symbol to cell, miss message
                // if hit: add to hit count, add symbol, hit message
                    // if hit count reaches max, alert user to win

//// displays message for win, hit, or miss AND adds hit/miss symbols to grid cells
var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
        cell.innerHTML = '<i class="fas fa-bahai hit-icon"></i>';
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
        cell.innerHTML = '<i class="fas fa-times miss-icon"></i>';
    }
};

//// testing view object
view.displayMiss("01");
view.displayMiss("03");
view.displayHit("05");
view.displayHit("06");
view.displayHit("07");
view.displayMessage("Testing one, two, three.");