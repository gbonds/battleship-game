//ISSUE: the number of hits immediately goes to 3 as soon as 1 hit happens. 
//TODO: once hit # issue fixed, add random number for location1 and +1, +2 for other locations
//TODO: prevent user from guessing the same hit location after it's hit. can guess non-hit locations multiple times.

var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var guessCount = 0;

var isSunk = false;

while (isSunk === false) {
  //prompts user guess
  guess = prompt("Ready, aim, fire! Guess a number between 1 and 6.");

  //validates guess
  if (guess < 1 || guess > 6) {
    alert("Please enter a valid number between 1 and 6.");
  } 
  
  //if guess is valid, add to guess count
    else {
      guessCount = guessCount + 1;

      //checks to see if guess matches one of three locations BUT is this line where issue is coming from?
      if (guess == location1 || guess == location2 || guess == location3) {
        alert("HIT!");
        hits = hits + 1;
        
        if (hits = 3) {
          isSunk = true;
          alert("You sank my Battleship!");
        }
      } 
      
      //if guess doesn't match
      else {
        alert("MISS!");
      }
    }

} //isSunk while ends

var stats = "You took " + guessCount + " guesses to sink the battleship, which means your shooting accuracy was " + hits + " hits out of " + guessCount + " guesses.";
alert(stats);