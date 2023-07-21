const totalPics = 25;
const mainPage = document.getElementById("mainPage");
//Pics are name 0-24
//and players name are assigned accordingly in an aray
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

var randomAr = new Array(25).fill(0);
var count = 0;
var threeCells = [];
var clickStatus = true;

for (var grid = 0; grid < totalPics; grid++) {

  assignRandomNoToGrid(grid); //randomly arranges grid 0-24

  const dummy = document.createElement("img");
  if (randomAr[grid] === 24) {//24 which is not player, but a ball
    dummy.src = "images/24.jpg";
  } else {
    dummy.src = "images/folder.png";
  }
  dummy.id = randomAr[grid];
  mainPage.appendChild(dummy);

  if ( randomAr[grid] == 24) {//ball have event click which will reset the game
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

  //names of three players compared
  if ( players[threeCells[0].id] === players[threeCells[1].id] && players[threeCells[1].id] === players[threeCells[2].id]) {
    for(const cell of threeCells) {
      cell.removeEventListener("click", showPlayer); //removing add event clickable for successfully opened players
    }
    clickStatus = true;
  } else {
    setTimeout(resetCells, 2000);
  }
}
function resetCells() {

  for(const cell of threeCells) {
    cell.src = "images/folder.png";
  }
  clickStatus = true;
}
function assignRandomNoToGrid(grid) {

  var randomNo = Math.floor(Math.random() * 25);
  let counter = 0;

  //checking if the array already occupied by random no.
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