# Boggle

This game of Boggle loads a board of 16 x 16 randomly generated letters. On load,
it initializes a three minute timer and when the time runs out, the user is prompted
a message declaring that the time ran out and the amount of words they formed.
This game uses HTML, CSS, and JS.

## How To Run The Code

Literally, just open it in the browser.

### Randomized Letters

This code creates a function called "rando" and takes the length as an argument.
Initially, I added the original alphabet but upon user testing it and realizing
that it is very difficult to form words with no vowels, I decided to just put more
vowels into the characters array. Then it was like *oops* I also have to account for
"Qu". So I made the characters into another variable called charactersArray and
concatted it in there.
```
function rando(length){
    let tiles = [];
    let characters = 'AABCDEEFGHIIJKLMNOOPRSTUVWXYZ';
    let charactersArray = characters.split('').concat(['Qu'])
    for (let i = 0 ; i < length; i++){
        tiles.push(charactersArray[Math.floor(Math.random() * charactersArray.length)]);
    }
    return tiles;
}
```

Randomized Letter but like On The Board. OK so there are 16 lil boxes and I named
those tiles. Because there are 16 tiles, you use 16. Then a for loop is used to
put one letter in each square. Followed by looping through the array of random letters that
are generator and putting one in each div. Let's start backwards. Square uses
the row and column to get the right DOM element to put the letter in. To get the
row, i is divided by 4 and then rounded down. And to get the column, I mod by 4.
Nth child starts at 1 instead of starting at zero, I have to add one to both the
row and the column. Once that's done, I set the innerHTML to tiles[i].

```
let tiles = rando(16)
for (let i = 0; i < tiles.length; i++){
    let row = Math.floor(i / 4) + 1;
    let column = i % 4 + 1;
    let square = document.querySelector(".board section:nth-child(" + row + ") .letter:nth-child(" + column + ")");
    square.innerHTML = tiles[i];
}
```

### Timer

So, the timer is created with JS. I made the time set to 3 minutes and it starts
counting down as soon as the page loads. The minutes and seconds are split by a ":".
If the seconds are about to be less than 0, they restart to 59 seconds and a minute
has passed by so the minute is subtracted by 1. The formattedSeconds is basically
in response to seeing only one 0 appear after the seconds return single digits
(aka, under 10). Afterwards I wanted something to let the user know that the time
is up so I did an alert and connected the amount of words a user was able to
get. The amount of words is found by using querySelectorAll on ".sidebar .word",
which is in the next section.

```
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
```


### Click, Clack, Moo

This section handles when a user clicks down onto a letter. The event listener changes the background color and then adds a "mousemove" listener for figuring out what other letters are dragged over next.

```
let currentlySelectedLetters = []

document.addEventListener("mousedown", function(event) {
    if (event.target.matches(".letter")) {
        currentlySelectedLetters.push(event.target);
        event.target.style.backgroundColor = '#9D858D';
        document.addEventListener("mousemove", handleMouseDrag);
    }
})
```
This section takes care of when the user lets go of the click.

```
document.addEventListener("mouseup", function(event) {
    document.removeEventListener("mousemove", handleMouseDrag);

    let newWord = ''
    for (let i = 0; i < currentlySelectedLetters.length; i++) {
        currentlySelectedLetters[i].style.backgroundColor = null;
        newWord += currentlySelectedLetters[i].innerHTML;
    }
    currentlySelectedLetters = [];
```
This section makes sure that there's no duplicated words

```
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
```
Last but not least the dragging.

```
function handleMouseDrag(event) {
    if (event.target.matches('.letter')) {
        if (!currentlySelectedLetters.includes(event.target)) {
            currentlySelectedLetters.push(event.target);
            event.target.style.backgroundColor = '#9D858D';
        }
    }
}


```

### The Domino Problem

Okay so the domino sequence on the letters ended up being insanely problematic and would not let me add any functionality or style changes to the letters. After like 12 hours, I found this resource (https://stackoverflow.com/questions/26778434/should-hover-pseudo-state-style-change-work-after-css-animation-completes) that taught me that
I can use my cool domino effect but I would have to play them in reverse. Yeah
idk either, but it did work.
```

/* domino effect */

section:nth-child(1) .letter {
    animation: fade 1.2s linear 0s reverse; }
section:nth-child(2) .letter {
    animation: fade 1.2s linear 0.2s reverse; }
section:nth-child(3) .letter {
    animation: fade 1.2s linear 0.4s reverse; }
section:nth-child(4) .letter {
    animation: fade 1.2s linear 0.6s reverse; }


@keyframes fade {
  0% {background: rgba(0, 0, 0, 0.1); }
  100% {background: rgba(0, 0, 0, 1); }
}

```

## Built With

* JavaScript
* HTML
* CSS

## Acknowledgments

* This was hard
* I need to strengthen my JS skills
* hello darkness my old friend
