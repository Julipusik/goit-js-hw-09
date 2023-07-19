const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtn.addEventListener('click', startSwitchingColors);
stopBtn.addEventListener('click', stopSwitchingColors);

function changeBgColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
}
let intervalId;

function startSwitchingColors() {
    startBtn.disabled = true;
    intervalId = setInterval(changeBgColor, 1000);
}

function stopSwitchingColors() {
    startBtn.disabled = false;
    clearInterval(intervalId);
}