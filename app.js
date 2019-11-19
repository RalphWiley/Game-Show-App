const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const hearts = document.getElementById('scoreboard');

const ul = phrase.firstElementChild;
const ol = hearts.firstElementChild;

const letters = document.getElementsByClassName('letter');
const shows = document.getElementsByClassName("show");

const start = document.querySelector('.btn__reset');
const buttons = document.getElementsByTagName("button");

const phrases = ['The Virgin Spring', 'LA Confidential', 'Closely Watched Trains', 'The Lighthouse', 'Parasite'];

let missed = 0;


function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return randomPhrase.split('');
}

function addPhraseToDisplay(arr) {
    for(let i = 0; i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];

        if(li.textContent != ' '){
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        ul.appendChild(li);
    }
    phrase.appendChild(ul);
}

let phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);
addPhraseToDisplay(phraseArray);

function checkLetter(button){
    let letter = null;
    for(let i = 0; i < letters.length; i++){
        if(letters[i].textContent === button.textContent) {
            letters[i].classList.add('show');
            letter = letters[i].textContent;
        }
    }
    if (letter != null){
        console.log(letter + ' if');
        return letter;
    } else {
        console.log(letter + ' else');
        return letter;
    }
}

function checkWin(){
    function resetButton(status, buttonMessage, statusMessage) {
        overlay.className = status;
        startButton.textContent = buttonMessage;
        const p = document.createElement("p");
        p.className = "statusMessage";
        p.textContent = statusMessage;
        overlay.appendChild(p);
        overlay.style.display = "flex";
    }
    if(shows.length === letters.length){
        resetButton("win", "Play Again", "You Won!");
        return true;
    }
    if (missed === 5){
        resetButton("lose", "Try Again", "You Lost, try again?");
        return true;
    }
    return false;
}

function reset(){
    missed = 0;
    ul.innerHTML = '';
    addPhraseToDisplay(phraseArray);
    console.log(phraseArray);

    for (let i = 0; i < buttons.length; i++){
        buttons[i].className = '';
        buttons[i].disabled = false;
        buttons[i].style = '#e5e5e5';
    }

    const li = ol.children;
    for (let i = 0; i < li.length; i++){
        li[i].innerHTML = `<img src="images/liveHeart.png" height="35px" width="35px">`;
    }
}

start.addEventListener('click', () => {
    overlay.style.display = 'none';
});

keyboard.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        const button = e.target;
        console.log(button + ' keyboard event listener');
        button.disabled = true;
        button.className = 'chosen';
        const letterFound = checkLetter(button);
        
        if (letterFound === null) {
            missed = missed++;
            button.style.background = "#df8a2a";
            const oldLi = ol.firstElementChild;
            //remove heart
            ol.removeChild(oldLi);
            const li = document.createElement('li');
            li.innerHTML = `<img src="images/lostHeart.png" height="35px" width="35px">`;
            ol.appendChild(li);
        }
    }
    if(checkWin() === true){
        start.addEventListener('click', (e) => {
            e.reset();
        });
    } else {
        checkWin();
    }
    
    
});
