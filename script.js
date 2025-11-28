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


red.addEventListener('click', handleClick);
green.addEventListener('click', handleClick);
blue.addEventListener('click', handleClick);
yellow.addEventListener('click', handleClick);



function startGame() {
setTimeout(() => {    if (state === 'pressKey' || state === 'gameOver') {

        level = 0;
        patron = [];
        userIndex = 0;

        newLevel();
    }}, 300);
}

function handleClick(event) {


    if (state === 'pressKey' || state === 'gameOver') {
        startGame();
        buttonPress(event);
        return;
    }

    buttonPress(event);
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
            if (userIndex === patron.length) {
                newLevel();
            }
        } else {
            modal.style.display = 'flex';
            title.innerText = 'Perdiste!!';
            state = 'gameOver';
        }
    }
}




function createModal() {
    const modal = document.createElement("div");
    modal.id = "modal";

    modal.innerHTML = `
      <div class="box">
        <p id="modalMessage" style="font-size:18px; margin-bottom:10px;">¡Perdiste!</p>
        <button id="retryBtn">Reiniciar</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("retryBtn").addEventListener("click", () => {
        modal.style.display = "none";
        startGame();
    });
}


createModal();


