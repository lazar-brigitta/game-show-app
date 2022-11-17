const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ol = document.querySelector('ol');
const tries = document.getElementsByClassName('tries');
let missed = 0;
const startGameButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const resetButton = document.createElement('a');
resetButton.textContent = "Reset Game";
resetButton.className = 'btn__reset';
const phrases = [
    'once in a blue moon', 
    'the best of both worlds', 
    'a piece of cake', 
    'let the cat out of the bag', 
    'call it a day'
];

//return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const randomPhraseNumber = Math.floor(Math.random()*arr.length);
    const randomPhrase = arr[randomPhraseNumber];
    const randomPhraseSplit = randomPhrase.split('');
    return randomPhraseSplit;
}

//adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const ul = phrase.children[0];
        li.textContent = arr[i];
        ul.appendChild(li);
        if (arr[i] === " ") {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//check if a letter is in the phrase
const checkLetter = button => {
    const lettersOfRandomArray = document.getElementsByClassName('letter');
    let match = null;
    for (let i = 0; i < lettersOfRandomArray.length; i++) {
        if (lettersOfRandomArray[i].textContent === button.textContent) {
          lettersOfRandomArray[i].className += ' show';
          match = button.textContent;
        } 
    }
    return match;
}

//displays winner or loser overlay 
function displayWinnerOrLoserOverlay (winOrLose, messageForGamer) {
    const h2 = document.querySelector('h2');
    overlay.className = winOrLose;
    h2.textContent = messageForGamer;
    overlay.style.display = 'flex';
    startGameButton.remove();
    overlay.appendChild(resetButton);
}

//check if the game has been won or lost
const checkWin = () => {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    if (letter.length === show.length) {
        displayWinnerOrLoserOverlay('win', 'Congratulations! You won!');
    } else if (missed > 4) {
        displayWinnerOrLoserOverlay('lose', 'You lost! Try again!');
    }
}

//listen for the "Start Game" button to be pressed
startGameButton.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    const pressedButton = e.target;
    if (pressedButton.tagName === 'BUTTON' && pressedButton.className !== 'chosen') {
        pressedButton.className = 'chosen';
        pressedButton.style.disabled;
        const letterFound = checkLetter(pressedButton); //returns only letters that are found in the phrase, else null
        if(!letterFound) {
            const heartImages = document.getElementsByTagName('img');
            //set class ".died" to all lostHeart.png images
            for (let i = 0; i < heartImages.length; i++) {
                if ( heartImages[i].src === "images/lostHeart.png") {
                   heartImages[i].className = 'died';
                }
            }
            //change the images from "liveHeart" to "lostHeart"
            const lostHeart = document.querySelector('img:not(.died)');
            lostHeart.src = 'images/lostHeart.png';
            lostHeart.className = 'died';
            missed++;
        }
        checkWin();
    }
});

//listen for restart button 
resetButton.addEventListener ('click', (e) => {
    overlay.style.display = 'none';
    const ul = phrase.children[0];
    const ulNew = document.createElement('ul');
    ul.remove();
    phrase.appendChild(ulNew);
    const phraseArrayNew = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArrayNew);
    const keyboardButtons = document.getElementsByTagName('button');
    for ( let i = 0; i < keyboardButtons.length; i++) {
        keyboardButtons[i].classList.remove('chosen');
        keyboardButtons[i].removeAttribute('disabled');
    }
    const heart = document.getElementsByTagName('img');
    for ( let i = 0; i < heart.length; i++) {
        heart[i].src = "images/liveHeart.png";
        heart[i].className = "";
    }
    missed = 0;
});

