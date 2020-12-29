var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var numberOfGuesses = 0;

var isSunk = false;

while (isSunk === false) {
  guess = prompt("Ready, aim, fire! Guess a number between 1 and 6.");
  if (guess < 1 || guess > 6) {
    alert("Please enter a valid number between 1 and 6.");
  } else {
    numberOfGuesses = numberOfGuesses + 1;

    if (guess == location1 || guess == location2 || guess == location3) {
      alert("HIT!");
      hits = hits + 1;
      if (hits = 3) {
        isSunk = true;
        alert("You sank my Battleship!");
      }
    } else {
      alert("MISS!");
    }
  }
}
var stats = "You took " + numberOfGuesses + " guesses to sink the battleship, which means your shooting accuracy was " + hits + " hits out of " + numberOfGuesses + " guesses.";
alert(stats);