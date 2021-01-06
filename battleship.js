//TODO: prevent user from guessing the same hit location after it's hit. can guess non-hit locations multiple times.
//TODO: build out responsive user-facing design in index.html

var location1 = (Math.floor(Math.random() * 4))+1; //should result in random number between 1 and 4
var location2 = location1+1;
var location3 = location1+2;

var guess;
var hitCount = 0;
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
        hitCount = hitCount + 1;
        
        if (hitCount == 3) { //must use equality operator == so that program is checking IF hitCount has reached 3.
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

var stats = "You took " + guessCount + " guesses to sink the battleship, which means your shooting accuracy was " + hitCount + " hits out of " + guessCount + " guesses.";
alert(stats);