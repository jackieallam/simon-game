var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

// Detect User's button clicks and add to array, animate, play sound:
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); // create array of clicked colours
  animatePress(userChosenColour);
  playSound(userChosenColour);
  // console.log("User pattern: " + userClickedPattern);

  checkAnswer(userClickedPattern.length - 1); // true or false

}); // end of click detector

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) { // Has user finished clicking?
      // console.log("finished");

      setTimeout(function() {
        nextSequence(); // Game shows next item in sequence after 1 second delay
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver();
  }
} // end of checkAnswer function

function nextSequence() {
  userClickedPattern = []; // Resets user sequence back to nothing
  level++;

  $("#level-title").text("Level " + level); //Update title to display current level

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour); // create array of random chosen colourSound
  buttonAnimation(randomChosenColour); // eg. yellow
  playSound(randomChosenColour);
  // console.log("Game pattern: " + gamePattern); // Array of random colours

} //end of nextSequence function

function playSound(name) {
  var colourSound = new Audio("sounds/" + name + ".mp3");
  colourSound.play();
}

// Animation for random sequence
function buttonAnimation(name) { // eg. name is yellow
  $("#" + name).fadeOut(100).fadeIn(100);
}

// Animation for user pressed button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  gameStarted = false;
  level = 0;
  // nextSequence();
  // console.log("gameStarted is " + gameStarted);
  // console.log("level is " + level);
}
