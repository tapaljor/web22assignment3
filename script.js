/*const mainPage = document.getElementById("mainPage");
const total = 25;
//delcaring player array aligning according to element number and image number
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
let previousName = new Array(3);
var match = 0;
var attempt = 0;
//declaring randomAr with 25 elements initialized to 0
var randomAr = new Array(25).fill(0);
//assigning child with random grid
for(var grid = 0; grid < total; grid++) {

    assignRandomNoToGrid(grid);

    const dummy = document.createElement("span");
    if ( randomAr[grid] === 24) {
        dummy.classList.add("ball");
    } else {
        dummy.classList.add("folder");
    }
    dummy.id = randomAr[grid];
    mainPage.appendChild(dummy); 
    
    const showPlayer = (e) => {

        console.log("m called here");

        var targetCell = e.target;
        const childImg = document.createElement("img");
        childImg.src = "images/"+dummy.id+".jpg";
        childImg.alt = players[dummy.id];
        targetCell.appendChild(childImg);
        previousName[attempt++] = targetCell;
    };
    dummy.addEventListener("click", showPlayer);
      if ( attempt > 3) {
            console.log("you reached limit 3");
            if ( previousName[0] === previousName[1] === previousName[2]) {
                console.log("success three times");
                previousName[0].removeEventListener("mouseover", showPlayer);
            }
        }
}

    const showPlayer =  (e) => {

        console.log("m called here");

        var targetCell = e.target;
        const childImg = document.createElement("img");
        childImg.src = "images/"+dummy.id+".jpg";
        childImg.alt = players[dummy.id];
        targetCell.appendChild(childImg);
        previousName[attempt++] = players[dummy.id];
        
        if ( attempt > 3) {
            console.log("you reached limit 3");
            if ( previousName[0] === previousName[1] === previousName[2]) {
                console.log("success three times");
            }
        } else {
            delay();
        }
    };
// Reset the timeout to 2 seconds
function resetTimeout() {
  startTimeout(); // Call the same function to reset the timeout
}
function assignRandomNoToGrid(grid) {
    var randomNo = Math.floor(Math.random()*25);
    let counter = 0;

    //checking duplicate random number in grid
    for(let a = 0; a < grid; a++) {
        if ( randomAr[a] === randomNo) {
            counter++;
        }
    }
    if ( counter == 0) { //no number already assigned
        randomAr[grid] = randomNo;
    } else { //if number already occupied, call function again
        assignRandomNoToGrid(grid);
    }
}
function delay() {
    // Start the timeout
    let timeoutId;

    function startTimeout() {
        clearTimeout(timeoutId); // Clear any existing timeout
        timeoutId = setTimeout(() => {
            console.log('Timeout callback executed after 2 seconds.');
        }, 2000);
    }
    // Start the timeout
    startTimeout();
            
    // Reset the timeout to 2 seconds
    function resetTimeout() {
        startTimeout(); // Call the same function to reset the timeout
    }
    // Reset the timeout after 1 second
    setTimeout(resetTimeout, 1000);
}*/
const mainPage = document.getElementById("mainPage");
const total = 25;
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
var openedCells = [];

for (var grid = 0; grid < total; grid++) {
  assignRandomNoToGrid(grid);

  const dummy = document.createElement("span");
  if (randomAr[grid] === 24) {
    dummy.classList.add("ball");
  } else {
    dummy.classList.add("folder");
  }
  dummy.id = randomAr[grid];
  mainPage.appendChild(dummy);

  dummy.addEventListener("click", showPlayer);
}

function showPlayer(e) {
  var targetCell = e.target;

  // Check if the cell was already clicked
  if (openedCells.includes(targetCell)) {
    console.log("Cell already clicked");
    return;
  }

  const childImg = document.createElement("img");
  childImg.src = "images/" + targetCell.id + ".jpg";
  childImg.alt = players[targetCell.id];
  targetCell.appendChild(childImg);

  openedCells.push(targetCell);

  if (openedCells.length === 3) {
    console.log("You reached the limit of 3");
    if (isMatch()) {
      console.log("Success three times");
      setTimeout(nextSet, 1000);
    } else {
      console.log("Try again");
      setTimeout(resetCells, 1000);
    }
  }
}

function assignRandomNoToGrid(grid) {
  var randomNo = Math.floor(Math.random() * 25);
  let counter = 0;

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

function isMatch() {
  const uniqueNames = new Set();
  for (const cell of openedCells) {
    uniqueNames.add(cell.id);
  }
  return uniqueNames.size === 1;
}

function resetCells() {
  for (const cell of openedCells) {
    cell.innerHTML = ""; // Remove the image from the cell
    cell.addEventListener("click", showPlayer);
  }
  openedCells.length = 0; // Clear the array
}

function nextSet() {
  for (const cell of openedCells) {
    cell.removeEventListener("click", showPlayer);
  }
  openedCells.length = 0; // Clear the array

  // Proceed to the next set of three images
  if (randomAr.length >= 3) {
    randomAr.splice(0, 3);
    mainPage.innerHTML = ""; // Clear the game board

    for (let grid = 0; grid < 3; grid++) {
      assignRandomNoToGrid(grid);

      const dummy = document.createElement("span");
      if (randomAr[grid] === 24) {
        dummy.classList.add("ball");
      } else {
        dummy.classList.add("folder");
      }
      dummy.id = randomAr[grid];
      mainPage.appendChild(dummy);

      dummy.addEventListener("click", showPlayer);
    }
  } else {
    console.log("Game completed");
  }
}
