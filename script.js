'use strict';

// Variables globales
var state = 'pressKey';
var patron = [];
var level = 0;
var userIndex = 0;
var playerName = '';
var userTurn = false;

// Elementos del DOM
var title = document.getElementById('title');
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');
var commentForm = document.getElementById('comment');
var messageComment = document.getElementById('messagecomment');
var nameComment = document.getElementById('nameComment');
var mailComment = document.getElementById('mailComment');
var submitComment = document.getElementById('submitComment');
var commentError = document.getElementById('commentError');
var button = [red, green, blue, yellow];

// Modals
var lostModal = document.getElementById('lostModal');
var nameModal = document.getElementById('nameModal');

// Botones modals
var nameInput = document.getElementById('nameInput');
var nameError = document.getElementById('nameError');
var startBtn = document.getElementById('startBtn');
var retryBtn = document.getElementById('retryBtn');

// Eventos
nameInput.addEventListener('input', handleNameInput);
startBtn.addEventListener('click', handleStartClick);
retryBtn.addEventListener('click', handleRetryClick);
commentForm.addEventListener('submit', handleCommentSubmit);
red.addEventListener('click', handleClick);
green.addEventListener('click', handleClick);
blue.addEventListener('click', handleClick);
yellow.addEventListener('click', handleClick);

// ============================
// Funciones MODALS
// ============================
function handleNameInput() {
    var value = nameInput.value.trim();
    if (value.length === 0) {
        nameError.innerText = 'EL NOMBRE NO DEBE ESTAR VACIO';
        nameError.style.display = 'block';
        startBtn.disabled = true;
        return;
    }
    if (value.length < 3) {
        nameError.innerText = 'EL NOMBRE DEBE TENER AL MENOS 3 LETRAS';
        nameError.style.display = 'block';
        startBtn.disabled = true;
        return;
    }
    startBtn.disabled = false;
    nameError.style.display = 'none';
}

function handleStartClick() {
    var value = nameInput.value.trim();
    if (value.length < 3) {
        return;
    }
    playerName = value;
    nameModal.style.display = 'none';
    startGame();
}

function handleRetryClick() {
    lostModal.style.display = 'none';
    resetGame();
}

function handleCommentSubmit(e) {
    e.preventDefault();
    commentError.innerText = '';
    var message = messageComment.value.trim();
    var name = nameComment.value.trim();
    var mail = mailComment.value.trim();
    if (message.length < 5) {
        commentError.innerText = 'El comentario debe tener al menos 5 caracteres.';
        commentError.style.display = 'block';
        return;
    }
    if (name.length < 3) {
        commentError.innerText = 'El nombre debe tener al menos 3 caracteres.';
        commentError.style.display = 'block';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        commentError.innerText = 'Por favor, ingresa un correo electrónico válido.';
        commentError.style.display = 'block';
        return;
    }
    window.location.href =
        'mailto:ileanairiart@gmail.com?subject=Comentario de ' + name +
        '&body=' + encodeURIComponent('Mensaje: ' + message + '\nNombre: ' + name + '\nEmail: ' + mail);
}

// ============================
// Funciones del JUEGO
// ============================
function resetGame() {
    patron = [];
    level = 0;
    userIndex = 0;
    title.innerText = 'Presiona cualquier color para iniciar, ' + playerName;
    state = 'pressKey';
}

function startGame() {
    if (!playerName || playerName.trim().length < 3) {
        nameModal.style.display = 'flex';
        return;
    }
    setTimeout(function () {
        if (state === 'pressKey' || state === 'gameOver') {
            level = 0;
            patron = [];
            userIndex = 0;
            newLevel();
        }
    }, 300);
}

function handleClick(event) {
    if (state === 'pressKey' || state === 'gameOver') {
        startGame();
        return;
    }
    buttonPress(event);
}

function showSequence() {
    state = 'showingPatron';
    userTurn = false;
    for (var i = 0; i < button.length; i++) {
        button[i].classList.add('disableClick');
    }
    title.innerText = 'Mostrando secuencia';
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
                    for (var j = 0; j < button.length; j++) {
                        button[j].classList.remove('disableClick');
                    }
                    title.innerText = 'Tu turno, ' + playerName + ' (Nivel ' + level + ')';
                    userTurn = true;
                    state = 'waitingUser';
                }
            }, 400);
        }, 400);
    }
    iluminate();
}

function newLevel() {
    state = 'waitingPatron';
    setTimeout(function () {
        level = level + 1;
        var nextColor = Math.floor(Math.random() * 4);
        var nextButton = button[nextColor];
        patron.push(nextButton);
        userIndex = 0;
        state = 'waitingUser';
        showSequence();
    }, 500);
}

function lightButton(button) {
    button.classList.add('active');
    setTimeout(function () {
        button.classList.remove('active');
    }, 300);
}

function buttonPress(event) {
    if (!playerName || playerName.trim().length < 3) {
        nameModal.style.display = 'flex';
        return;
    }
    if (state === 'waitingUser') {
        var clickedButton = event.target;
        if (clickedButton === patron[userIndex]) {
            userIndex = userIndex + 1;
            lightButton(clickedButton);
            if (userIndex === patron.length) {
                newLevel();
            }
        } else {
            lostModal.style.display = 'flex';
            document.getElementById('lostMessage').innerHTML =
                '<span class="playerName">' + playerName + '</span>, perdiste en el nivel <b>' + level + '</b>!';
            state = 'gameOver';
        }
    }
}
