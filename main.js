// Arrays that contain the strings related to the various types of items on the reel
var machines = ['Coffee Maker', 'Teapot', 'Espresso Machine'];
var tools = ['Coffee Filter', 'Tea Strainer', 'Espresso Tamper'];
var organics = ['Coffee Beans', 'Loose Tea', 'Ground Espresso Beans'];

// When the page loads, this function will create the first set of reels, 
// setting them up at random order
$(document).ready(
  function(){
    addTiles($("#reel1 .wrapper"), machines);
    addTiles($("#reel2 .wrapper"), tools);
    addTiles($("#reel3 .wrapper"), organics);
  }   
);

// A click function that will initiate when the button is pressed.  It initiates the animation
// which is really just adding to the margin-top of the list of divs.  It also adds more tiles
// to the reel so that if you need to press the button again, there are already new tiles available
function spin() {
  addTiles($("#reel1 .wrapper"), machines);
  moveTiles($("#reel1 .wrapper"));
  addTiles($("#reel2 .wrapper"), tools);
  moveTiles($("#reel2 .wrapper"));
  addTiles($("#reel3 .wrapper"), organics);
  moveTiles($("#reel3 .wrapper"));
};

// This creates a reel, and adds to it as you progress through the game.  It takes each array and
// generates the additional tiles at random within the scope of each wrapper.  15 seems like a good
// number to use since it will provide enough of a random list to keep the game interesting.  Taco is 
// referring to the HTML element that will have the tiles appended to it, Array is referring to the 
// particular array that you are passing in given that there are three unique reels
function addTiles(taco, array) {
  var newArray = [];
  for(var i = 0; i < 15; i++){
    var ctr = Math.floor(Math.random() * array.length);
    taco.append("<div class='reel-tile'><p class='reel-title'>" + array[ctr] + "</p></div>");
    newArray.push(array[ctr]);
  }
  console.log(newArray);
}; 

// This creates an animation effect.  
function moveTiles(taco) {
  var time = 6500;
  time += Math.round(Math.random() * 1000);
  taco.stop(true,true);

  var marginTop = parseInt(taco.css("margin-top"), 10);
    
  marginTop -= (15 * 200);
    
  taco.animate(
    {"margin-top": marginTop + "px"},
    {'duration' : time, 'easing' : "easeOutElastic"}
  );
};