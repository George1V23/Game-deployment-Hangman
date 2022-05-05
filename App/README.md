# Web-page game

Web browser game made with HTML, CSS, JavaScript to learn basics of making a webpage without using any runtime-enviromnent or library.

I made a keystroke version of Hangman. I drew a gallow and stickman to graphically show when the game is lost.

Hangman is a paper and pencil guessing game for two or more players. One player thinks of a word, phrase or sentence and the other(s) tries to guess it by suggesting letters, within a certain number of guesses. [Wikipedia](https://en.wikipedia.org/wiki/Hangman_(game)) 


## Implementation

&emsp;&emsp; **HTML** for making the structure of the web page:
* including in *head* metadata description, title and icon of webpage, css and javascript sources
* adding to *body* elements for webpage content and setting id's and classes on some

&emsp;&emsp; **CSS** for stylizing and arranging elements identified by their tag, class or id

&emsp;&emsp; **JavaScript** for scripting the elements and programming the game:
* retains webpage elements into *const* variables in order to use them in coding
* global variables to retain the game state
* async function *getRandomWord()* is called when user to presses "Play"/"Play again" button, then it loads the text file "dictionary.txt" to create a dictionary and choose randomly a word  
* function *readTextFile* creates an array of words from a file
* an event listener function was created to detect a keyword for completing the letters
* functions *updateCorrectLetter()* is called when the key listener detects a letter contained by the word to guess, which needs to be uncovered
* functions *updateWrongLetter()* is called when is detected a letter is NOT contained by the word to guess, then the stickman figure parts are unveiled on gallow until
