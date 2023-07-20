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

//randomAr to shuffle the picture
var randomAr = new Array(25).fill(0);
var count = 0;
var threeCells = [];
var clickStatus = true;


for (var grid = 0; grid < totalPics; grid++) {

  assignRandomNoToGrid(grid);

  const dummy = document.createElement("span");
  if (randomAr[grid] === 24) {//last image is 24 which is not player, but a ball
    dummy.classList.add("ball");
  } else {
    dummy.classList.add("folder");
  }
  dummy.id = randomAr[grid];
  mainPage.appendChild(dummy);

  if ( randomAr[grid] != 24) {//except ball, rest will have clickable event
    dummy.addEventListener("click", showPlayer);
  }
}
function showPlayer(e) {

  //if click is disabled then do not run this function at all
  if ( clickStatus == false) return; 

  var targetCell = e.target;

  const childImg = document.createElement("img");
  childImg.src = "images/" + targetCell.id + ".jpg";
  childImg.alt = players[targetCell.id];
  targetCell.appendChild(childImg);//temporary cell holder

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
    cell.innerHTML = "";
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