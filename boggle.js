//The Random Letter Generator

function rando(length){
    let tiles = [];
    let characters = 'AABCDEEFGHIIJKLMNOOPRSTUVWXYZ';
    let charactersArray = characters.split('').concat(['Qu'])
    for (let i = 0 ; i < length; i++){
        tiles.push(charactersArray[Math.floor(Math.random() * charactersArray.length)]);
    }
    return tiles;
}

let tiles = rando(16)
for (let i = 0; i < tiles.length; i++){
    let row = Math.floor(i / 4) + 1;
    let column = i % 4 + 1;
    let square = document.querySelector(".board section:nth-child(" + row + ") .letter:nth-child(" + column + ")");
    square.innerHTML = tiles[i];
}
// console.log(rando(1));

//on click the tile changes color

document.getElementById('timer').innerHTML = "3:00"
startTimer();

function startTimer() {
    let currentTime = document.getElementById('timer').innerHTML;
    let timeArray = currentTime.split(":")
    let minutes = timeArray[0];
    let seconds = timeArray[1] - 1;

    if (seconds < 0) {
        seconds = 59;
        minutes = minutes - 1;
    }

    let formattedSeconds = seconds;
    if (seconds < 10 && seconds >= 0) {
        formattedSeconds = "0" + seconds;
    }
    document.getElementById('timer').innerHTML = minutes + ":" + formattedSeconds;

   if (minutes == 0 && seconds == 0) {
       let wordsFound = document.querySelectorAll('.sidebar .word');
       alert('Times up! You found ' + wordsFound.length + " words!")
   }
   else {
       setTimeout(startTimer, 1000);
   }
}


// When the user clicks on a letter
let currentlySelectedLetters = []

document.addEventListener("mousedown", function(event) {
    if (event.target.matches(".letter")) {
        currentlySelectedLetters.push(event.target);
        event.target.style.backgroundColor = '#9D858D';
        document.addEventListener("mousemove", handleMouseDrag);
    }
})

//when we release the mouse so like, stop clicking, this code runs
document.addEventListener("mouseup", function(event) {
    document.removeEventListener("mousemove", handleMouseDrag);

    let newWord = ''
    for (let i = 0; i < currentlySelectedLetters.length; i++) {
        currentlySelectedLetters[i].style.backgroundColor = null;
        newWord += currentlySelectedLetters[i].innerHTML;
    }
    currentlySelectedLetters = [];

//this bit gets all the existing words and makes sure it don't count duplicates
    let existingWordElements = document.querySelectorAll(".sidebar .word");
    let existingWords = [];
    for (let i = 0; i < existingWordElements.length; i++) {
        existingWords.push(existingWordElements[i].innerHTML)
    }

    if (!existingWords.includes(newWord)) {
        let newWordElement = document.createElement('div');
        newWordElement.className = 'word';
        newWordElement.innerHTML = newWord;
        document.querySelector(".sidebar").appendChild(newWordElement);
    }
})

//the dragging bitsss
function handleMouseDrag(event) {
    if (event.target.matches('.letter')) {
        if (!currentlySelectedLetters.includes(event.target)) {
            currentlySelectedLetters.push(event.target);
            event.target.style.backgroundColor = '#9D858D';
        }
    }
}
