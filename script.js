// Variables del juego
var state = 'pressKey';
var patron = [];
var level = 0;
var userIndex = 0;
var playerName = '';
var userTunr = false;
// Elementos del DOM
var title = document.getElementById('title');
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');
var button = [red, green, blue, yellow];
// Modals partida perdida y nombre jugador
var lostModal = document.getElementById('lostModal');
var nameModal = document.getElementById('nameModal');
// Botones modals
var nameInput = document.getElementById('nameInput');
var nameError = document.getElementById('nameError');
var startBtn = document.getElementById('startBtn');
var retryBtn = document.getElementById('retryBtn');
//eventos modals
nameInput.addEventListener('input', function () {
    if (nameInput.value.trim().length >= 3) {
        startBtn.disabled = false;
        nameError.style.display = 'none';
    } else {
        startBtn.disabled = true;
        nameError.style.display = 'block';
    }
});
startBtn.addEventListener('click', function () {
    playerName = nameInput.value.trim();
    nameModal.style.display = 'none';
}
);
retryBtn.addEventListener('click', function () {
    lostModal.style.display = 'none';
    resetGame();
});
// Reinicia el juego
function resetGame() {
    patron = [];
    level = 0;
    userIndex = 0;
    title.innerText = 'Presiona cualquier color para iniciar, ' + playerName;
    state = 'pressKey';
}
// Añade los event listeners a los botones
red.addEventListener('click', handleClick);
green.addEventListener('click', handleClick);
blue.addEventListener('click', handleClick);
yellow.addEventListener('click', handleClick);

// Inicia el juego pidiendo el nombre del jugador
function startGame() {
    setTimeout(() => {
        if (state === 'pressKey' || state === 'gameOver') {
            level = 0;
            patron = [];
            userIndex = 0;
            newLevel();
        }
    }, 300);
}

// Maneja los clics en los botones
function handleClick(event) {

    if(nameModal.style.display === 'flex'){
        return;
    }
    if (state === 'pressKey' || state === 'gameOver') {
        startGame();
        buttonPress(event);
        return;
    }
    buttonPress(event);
}

function showSecuence() {
    state = 'showingPatron';
    userTunr = false;

    var i = 0;

    function iluminate() {
        var btn = patron[i];
        setTimeout(function () {
            lightButton(btn);
            setTimeout(function () {
                i++;
                if (i < patron.length) {
                    iluminate();
                } else {
                    userTunr = true;
                    state = 'waitingUser';

                }
            }, 400);
        }, 600);
    }
    iluminate();
}

// Inicia un nuevo nivel
function newLevel() {
    state = 'waitingPatron';
    setTimeout(function () {
        level = level + 1;
        title.innerText = 'Nivel ' + level;
        var nextColor = Math.floor(Math.random() * 4);
        var nextButton = button[nextColor];
        patron.push(nextButton);
        userIndex = 0;
        state = 'waitingUser';
        showSecuence();
    }, 500);
}

// Ilumina un botón específico
function lightButton(button) {
    button.classList.add('active');
    setTimeout(function () {
        button.classList.remove('active');
    }, 300);
}

// Maneja la pulsación de botones por parte del usuario
function buttonPress(event) {
    if (state === 'waitingUser') {
        var button = event.target;
        if (button === patron[userIndex]) {
            userIndex = userIndex + 1;
            lightButton(button);
            if (userIndex === patron.length) {
                newLevel();
            }
        } else {
            lostModal.style.display = 'flex';
            document.getElementById("lostMessage").innerHTML =
                `<span class="playerName">${playerName}</span>, 
                perdiste en el nivel <b>${level}</b>!`;
            lostModal.style.display = 'flex';
            state = 'gameOver';
            title.innerText = 'Perdiste!! Presiona cualquier color para reiniciar';
        }
    }
}

