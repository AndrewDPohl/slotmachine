// Arrays that contain the strings related to the various types of items on the reel
var machines = ['Coffee Maker', 'Teapot', 'Espresso Machine'];
var tools = ['Coffee Filter', 'Tea Strainer', 'Espresso Tamper'];
var organics = ['Coffee Beans', 'Loose Tea', 'Ground Espresso Beans'];

// Various sounds to be played during the game
var beepBoop = "./audio/beepBoopBop.mp3";
var bellChime = "./audio/bellChime.mp3";
var gameStart = "./audio/gameStart.ogg";
var loser = "./audio/loser.mp3";
var winner = "./audio/winner.mp3";

// Array that is used to check if a winner
checkWinArray = [];

// When the page loads, this function will create the first set of reels, 
// setting them up at random order
$(document).ready(
  function(){
    strobe("#status");
    $("#status").text("Press The Start Button To Play!");
    playSounds(gameStart);
    addTiles($("#reel1 .wrapper"), machines);
    addTiles($("#reel2 .wrapper"), tools);
    addTiles($("#reel3 .wrapper"), organics);
  }   
);

// This function takes in a sound, passing it in as the src, and plays the sound when called
function playSounds(sound) {
  var obj = document.createElement("audio");
  obj.src = sound;
  obj.volume = 0.20;
  obj.autoPlay = false;
  obj.preLoad = true;       
  obj.play();
};

// On click the START button will spin the reels, and a sound will play
// A setTimeout function will check if there is a winner
$('button').click(function() {
  playSounds(beepBoop);
  spin();
  setTimeout(function() {
    checkWin(checkWinArray);
  }, 9000)
});

// A click function that will initiate when the button is pressed.  It initiates the animation
// which is really just adding to the margin-top of the list of divs.  It also adds more tiles
// to the reel so that if you need to press the button again, there are already new tiles available
function spin() {
  checkWinArray = [];
  strobe("#status");
  $("#status").html("Spinning...");
  addTiles($("#reel1 .wrapper"), machines);
  moveTiles($("#reel1 .wrapper"), 8250);
  addTiles($("#reel2 .wrapper"), tools);
  moveTiles($("#reel2 .wrapper"), 7000);
  addTiles($("#reel3 .wrapper"), organics);
  moveTiles($("#reel3 .wrapper"), 9500);
};

// This creates a reel, and adds to it as you progress through the game.  It takes each array and
// generates the additional tiles at random within the scope of each wrapper.  15 seems like a good
// number to use since it will provide enough of a random list to keep the game interesting.  Taco is 
// referring to the HTML element that will have the tiles appended to it, Array is referring to the 
// particular array that you are passing in given that there are three unique reels
function addTiles(target, array) {
  var newArray = [];
  for(var i = 0; i < 15; i++){
    var ctr = Math.floor(Math.random() * array.length);
    target.append("<div class='reel-tile'><p class='reel-title'>" + array[ctr] + "</p></div>");
    newArray.push(array[ctr]);
  }
  checkWinArray.push(newArray[0]);
  console.log(checkWinArray);
}; 

// This creates an animation effect.  
function moveTiles(target, time) {
  time += Math.round(Math.random() * 1000);
  target.stop(true, true);

  var marginTop = parseInt(target.css("margin-top"), 10);
  marginTop -= (15 * 200);
    
  target.animate({"margin-top": marginTop + "px"},
    {'duration' : time, 'easing' : "easeOutElastic"})
};

// Check to see if there is a winner
function checkWin(arr) {
  if (arr[0] === 'Teapot' && arr[1] === 'Tea Strainer' && arr[2] === 'Loose Tea') {
    strobe(".wrapper");
    $("#status").html("Congrats! You win some tea!");
    playSounds(winner);
    $('#tea').css("display", "block");
    $("#tea").fadeOut(7000, "swing");
  } else if (arr[0] === 'Coffee Maker' && arr[1] === 'Coffee Filter' && arr[2] === 'Coffee Beans') {
    strobe(".wrapper");
    $("#status").html("Congrats!  You win some coffee!");
    playSounds(winner);
    $('#coffee').css("display", "block");
    $("#coffee").fadeOut(7000, "swing");
  } else if (arr[0] === 'Espresso Machine' && arr[1] === 'Espresso Tamper' && arr[2] === 'Ground Espresso Beans') {
    strobe(".wrapper");
    $("#status").html("Congrats!! You win some Espresso!!");
    playSounds(winner);
    $('#espresso').css("display", "block");
    $("#espresso").fadeOut(7000, "swing");
  } else {
    playSounds(loser);
    $("#status").html("Oops! Not a winner this time!  Try Again");
  }
}

// Create a strobe effect on the status bar
function strobe(target) {
  var time = 10
  for(i = 0; i < time; i++) {
    $(target).fadeOut("fast").delay(25).fadeIn("fast");
  }
}