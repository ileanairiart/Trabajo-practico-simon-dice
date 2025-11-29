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
            lostModal.style.display = 'flex';
            document.getElementById("lostMessage").innerHTML =
                `<span class="playerName">${playerName}</span>, perdiste en el nivel <b>${level}</b>!`;
            state = 'gameOver';
            title.innerText = 'Perdiste!! Presiona cualquier color para reiniciar';
        }
    }
}

// Crea el modal de fin de juego
function createLostModal() {
    const lostModal = document.createElement("div");
    lostModal.id = "lostModal";
    lostModal.innerHTML = `
      <div class="box">
        <p id="lostMessage" style="font-size:18px; margin-bottom:10px;">
        </p>
        <button id="retryBtn">Reiniciar</button>
      </div>
    `;
    document.body.appendChild(lostModal);
    document.getElementById("retryBtn").addEventListener("click", () => {
        lostModal.style.display = "none";
    });
}

function createNameModal() {
    const nameModal = document.createElement("div");
    nameModal.id = "nameModal";
    nameModal.style.display = "flex";
    nameModal.innerHTML = `
        <div class="box">
            <p> Ingresa tu nombre para comenzar a jugar: </p>
            <input type="text" id="nameInput" placeholder="Tu nombre" />
            <p id="nameError" class="nameError" style="color:red; font-size:10px; display:none; margin-top:5px;">
                El nombre debe tener al menos 3 letras
            </p>
            <button id="startBtn" disabled>Comenzar</button>
        </div>
    `;
    document.body.appendChild(nameModal);
    const startBtn = document.getElementById("startBtn");
    const nameInput = document.getElementById("nameInput");
    const nameError = document.getElementById("nameError");
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim().length >= 3) {
            startBtn.disabled = false;
            nameError.style.display = "none";
        } else {
            startBtn.disabled = true;
            nameError.style.display = "block";
        }
    });
    startBtn.addEventListener("click", () => {
        playerName = nameInput.value.trim();
        nameModal.style.display = "none";
        startGame();
    });
}

createLostModal();
createNameModal();
