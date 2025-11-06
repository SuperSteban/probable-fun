const gameArea = document.getElementById('game-area');
const pointsDisplay = document.getElementById('points');
const restartBtn = document.getElementById('restart');

let points = 0;
let gameActive = false;

restartBtn.addEventListener('click', startGame);

function startGame() {
  points = 0;
  pointsDisplay.textContent = points;
  gameActive = true;
  gameArea.innerHTML = ''; // Limpiar estrellas
  restartBtn.textContent = 'Jugando...';
  restartBtn.disabled = true;

  // Generar estrellas cada segundo
  const interval = setInterval(() => {
    if (!gameActive) {
      clearInterval(interval);
      return;
    }
    createStar();
  }, 800);

  // Terminar juego después de 30 segundos
  setTimeout(() => {
    endGame();
  }, 30000);
}

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.textContent = '⭐';

  // Posición aleatoria
  const x = Math.random() * (gameArea.offsetWidth - 50);
  star.style.left = x + 'px';
  star.style.top = '-50px';

  // Duración aleatoria (2 a 5 segundos)
  const duration = Math.random() * 3 + 2;
  star.style.animation = `fall ${duration}s linear`;

  // Al hacer clic
  star.addEventListener('click', () => {
    if (!gameActive) return;
    points++;
    pointsDisplay.textContent = points;
    star.remove();
    createSparkle(x + 25, 50);
  });

  gameArea.appendChild(star);

  // Eliminar si no se atrapó
  setTimeout(() => {
    if (star.parentElement) star.remove();
  }, duration * 1000);
}

function createSparkle(x, y) {
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 0.6s ease-out forwards';
    gameArea.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
  }
}

// Animación de chispa
const style = document.createElement('style');
style.textContent = `
@keyframes sparkle {
  to { transform: translateY(-30px) scale(0); opacity: 0; }
}`;
document.head.appendChild(style);

function endGame() {
  gameActive = false;
  restartBtn.textContent = 'Jugar de Nuevo';
  restartBtn.disabled = false;
  alert(`¡Tiempo terminado! Puntuación final: ${points} ⭐`);
}

// Iniciar al cargar
startGame();