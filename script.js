const totalPics = 25;
const mainPage = document.getElementById("mainPage");
//Players pictures are name 0-24
//Players name are assigned accordingly in an aray
//Example Davis is 0, 1, and 2 and Messi is 9, 10, and 11
const players = [
  "davis", "davis", "davis",
  "kaka", "kaka", "kaka",
  "maradona", "maradona", "maradona",
  "messi", "messi", "messi",
  "pele", "pele", "pele",
  "ronaldo", "ronaldo", "ronaldo",
  "son", "son", "son",
  "suarez", "suarez", "suarez"
];

var randomAr = new Array(25).fill(0); //Fill array elements 0 
var count = 0;
var threeCells = []; //Storing three selections
var clickStatus = true;
var minutes = 0;
var seconds = 0;
var accomplishment = 0;

updateTimer(); //Display time for make it challenging
setInterval(updateTimer, 1000);

for (var grid = 0; grid < totalPics; grid++) {

  assignRandomNoToGrid(grid); //randomly arranges grid 0-24

  const dummy = document.createElement("img");
  if (randomAr[grid] === 24) {//24 which is not player, but a ball
    dummy.src = "images/24.png";
  } else {
    dummy.src = "images/ball.jpg";
  }
  dummy.id = randomAr[grid];
  mainPage.appendChild(dummy);

  if ( randomAr[grid] == 24) {//reset button clickable which will reset the game
    dummy.addEventListener("click", resetGame);
  } else { //rest of cell have clickable to reveal player in the cell
    dummy.addEventListener("click", showPlayer);
  }
}
function showPlayer(e) {

  //if click is disabled then do not continue the next 
  if ( clickStatus == false) return;

  var targetCell = e.target;

  targetCell.src = "images/" + targetCell.id + ".jpg";
  targetCell.alt = players[targetCell.id];
  targetCell.style.cssText = "width: 5rem; height: 5rem; border-radius: 50%; ";

  threeCells[count] = targetCell;

  if (count === 2) { //when three cell is clicked
    clickStatus = false;
    matchNames();
    count = 0;
  } else {
    count++;
  }
}
function matchNames() {

  //Names of three players compared
  if ( players[threeCells[0].id] === players[threeCells[1].id] && players[threeCells[1].id] === players[threeCells[2].id]) {
    for(const cell of threeCells) {
      cell.removeEventListener("click", showPlayer); //Removing add event clickable for successfully opened players
    }
    clickStatus = true;
    accomplishment++;
  } else {
    setTimeout(resetCells, 2000);
  }
}
function resetCells() {

  for(const cell of threeCells) {
    cell.src = "images/ball.jpg";
  }
  clickStatus = true;
}
function assignRandomNoToGrid(grid) {

  var randomNo = Math.floor(Math.random() * 25);
  let counter = 0;

  //Checking if the array already occupied by random no in assigned grid cells
  for (let a = 0; a < grid; a++) {
    if (randomAr[a] === randomNo) {
      counter++;
    }
  }
  if (counter == 0) {
    randomAr[grid] = randomNo;
  } else {
    assignRandomNoToGrid(grid);
  }
}
function resetGame() {
  location.reload();
}
function updateTimer () {

  if ( seconds > 59) {
    minutes++;
    seconds = 0;
  }
  timer.textContent = `${minutes}:${seconds++}`;

  if ( accomplishment == 8) {
    alert("Congratulations for finishing the game!. Your time is "+minutes+" minutes and "+seconds+" seconds");
    resetGame();
  }
}