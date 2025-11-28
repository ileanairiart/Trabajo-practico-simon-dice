// Variables del juego
var state = 'pressKey';
var patron = [];
var level = 0;
var userIndex = 0;
var playerName = '';

// Elementos del DOM
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


// Inicia el juego pidiendo el nombre del jugador
function startGame() {
    playerName = prompt('Ingresa tu nombre:');

    while (!playerName || playerName.trim().length < 3) {
        playerName = prompt('Por favor, ingresa un nombre válido (mínimo 3 letras):');
    }
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


    if (state === 'pressKey' || state === 'gameOver') {
        startGame();
        buttonPress(event);
        return;
    }

    buttonPress(event);
}

// Inicia un nuevo nivel
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

// Ilumina un botón específico
function lightButton(button) {
    button.classList.add('active');
    setTimeout(() => {
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
            modal.style.display = 'flex';
            document.getElementById("modalMessage").innerHTML =
                 `<span class="playerName">${playerName}</span>, perdiste en el nivel <b>${level}</b>!`;
            state = 'gameOver';
            title.innerText = 'Perdiste!! Presiona cualquier color para reiniciar';

        }
    }
}

// Crea el modal de fin de juego
function createModal() {
    const modal = document.createElement("div");
    modal.id = "modal";

    modal.innerHTML = `
      <div class="box">
        <p id="modalMessage" style="font-size:18px; margin-bottom:10px;">
        </p>
        <button id="retryBtn">Reiniciar</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("retryBtn").addEventListener("click", () => {
        modal.style.display = "none";

    });

}
createModal();


