const mainPage = document.getElementById("mainPage");
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
}