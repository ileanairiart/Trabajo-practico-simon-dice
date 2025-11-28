var state = 'pressKey';
var patron = [];
var level = 0;
var userIndex = 0;

var title = document.getElementById('title');
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');

var button = [red, green, blue, yellow];

document.addEventListener('keypress', startGame);
red.addEventListener('click', buttonPress);
green.addEventListener('click', buttonPress);
blue.addEventListener('click', buttonPress);
yellow.addEventListener('click', buttonPress);

function startGame() {
    if (state === 'pressKey' || state === 'gameOver') {

        level = 0;
        patron = [];
        userIndex = 0;  

        newLevel();
    }
}

function newLevel() {
    state = 'waitingPatron';
    setTimeout(() => {
        level = level + 1;
        title.innerText = 'Nivel ' + level;
        var nextColor = Math.floor(Math.random() * 4);
        var nextButton = button[nextColor];

        lightButton(nextButton);
        patron.push(nextButton);
        userIndex = 0;
        
        state = 'waitingUser';

    }, 500);
}


function lightButton(button) {
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

function buttonPress(event) {
    if (state === 'waitingUser') {
        var button = event.target;
        if (button === patron[userIndex]) {
            userIndex = userIndex + 1;
            lightButton(button);
            if (userIndex === patron.length ) {
                newLevel();
            }
        } else {
        title.innerText = 'Perdiste!! Presiona cualquier tecla para reiniciar.';
            state = 'gameOver';
        }
    }
}

        