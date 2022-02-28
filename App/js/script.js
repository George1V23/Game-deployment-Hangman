/**
 * @author  George Vidinei <george.vidinei@gmail.com>
 */

// Retained webpage elements
const startButton = document.body.getElementsByTagName("button")[0];
const figure = Array.from(document.getElementsByClassName("head")).concat(Array.from(document.getElementsByClassName("body")));
const wordContainer = document.getElementById("wordContainer");
const wrongLettersContainer = document.getElementById("wrongLettersContainer");
const notification = document.getElementsByClassName("notification")[0];

// Variables to retain the state for game
var dictionary = [];
var word = '';
var lettersMinNr = 10; //word minimum length
var revealPercentage = 15; //picks random letters to reveal at start
var lettersCorrect = [];
var lettersWrong = [];
var usedWordsIdx = []; //records already used words indexes from dictionary


/* Read a file containing words and returns text */
function readTextFile(filepath) {
    return fetch(filepath)
    .then(response => {
        if (!response.ok) {
            // make the promise be rejected if we didn't get a 2xx response
            const err = new Error("Not 2xx response");
            err.response = response;
            throw err;
        }
        console.log(response);
        return response.text();
    })
    .then(text => {
        console.log(text);
        return text;
    })
    .catch(error => {
        console.log('Error:');
        console.error(error);
        return error.text();
    })
}

/* Starting the game */
startButton.onclick = async function getRandomWord() {
    // hides and resets elements for guessing new word
    startButton.style.display = 'none';
    if(startButton.innerText === 'Play again') {
        word = "";
        figure.forEach((part,index) => {
            part.style.display = 'none';
        });
        wordContainer.innerHTML = "";
        wrongLettersContainer.innerHTML = "";
        //notification.children[0].textContent = "";
        lettersCorrect = [];
        lettersWrong = [];
        lettersDiscoveredNr = 0;
    }
    
    // create dictionary by splitting a text in words
    if(dictionary.length === 0) {
        const text = await readTextFile("js/dictionary.txt");
        dictionary = text.split(/\r\n|\n| /);
    }
    
    // gets a random word from dictionary with minumum number of letters 
    var i;
    while(word.length != lettersMinNr) {
        i = Math.floor(Math.random() * (dictionary.length));
        if(usedWordsIdx.includes(i)) continue; //word has been used
        word = dictionary[i];
        console.log('word = '+word);
    }
    usedWordsIdx.push(i);

    // making spaces for letters of word container
    wordContainer.innerHTML = (Array.from(word)).map(
            letter => `<span class="letter" > </span>`
        ).join('');

    //revealing at start a percentage of letters chosen randomly of the word to be discovered
    // and the extra marks like '-', '\''
    let nr = Math.round(revealPercentage/100*word.length);
    do {
        i = Math.floor(Math.random()*word.length);
        const re = new RegExp(word[i], 'g');
        nr -= word.match(re).length;
        lettersCorrect.push(word[i]);
        updateCorrectLetter();
    } while(nr > 0);
    for(i=0; i<word.length; i++) if(! word[i].match(/^[a-z0-9]+$/i)){
        lettersCorrect.push(word[i]);
        updateCorrectLetter();
    }
    
}


/* Display correct letters of the word to be guessed */
function updateCorrectLetter() {
    let lettersDiscoveredNr = 0;
    // letters revealed
    lettersCorrect.forEach((letter,index) => {
        for(let i=0; i<word.length; i++) { 
            if(letter === word[i]) {
                wordContainer.children[i].textContent = word[i];
                wordContainer.children[i].style.display = 'inline-flex';
                lettersDiscoveredNr ++;
            }
        }
    });
    // check win of game, if word has been discovered
    if(lettersDiscoveredNr === word.length) {
        startButton.textContent = "Play again";
        startButton.style.display = 'block';        
    }
}

/* Add wrong letters to queue and with each show a body part of figure */
function updateWrongLetter() {
    // display wrong letters
    wrongLettersContainer.innerHTML = "<span>Wrong letters:</span>";
    wrongLettersContainer.innerHTML += `${lettersWrong.map(letter => `<span>${letter}</span>`).join(' ')}`; 
    // display parts
    figure.forEach((limb,index) => {
        if(index < lettersWrong.length) {
            limb.style.display = 'block';
        } else {
            limb.style.display = 'none';
        }
        
    });
    // check end of game
    if(lettersWrong.length === figure.length) {
        startButton.textContent = "Play again";
        startButton.style.display = 'block';        
    }
}

/* Keyword for letter listener */
window.addEventListener("keypress", e => {
    if(word === "")
        return;     

    console.log(e.key);
    if(e.key >= 'a' && e.key <= 'z') {
        if(word.includes(e.key)) {
            if(! lettersCorrect.includes(e.key)) {
                lettersCorrect.push(e.key);
                updateCorrectLetter();
            } else {
                //popupContainer.innerHTML = `<span class="popup">Letter already used!</span>`;
                //popupContainer.classList.toggle("show");
            }
        } else {
            if(! lettersWrong.includes(e.key)) {
                lettersWrong.push(e.key);
                updateWrongLetter();    
            } else {
                //popupContainer.innerHTML = `<span class="popup">Wrong letter already used!</span>`    
                //popupContainer.classList.toggle("show");
            }
        }
    }
});