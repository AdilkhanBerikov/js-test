import '../styles/timer.css'

const timer = document.querySelector('.timer__display');
const input = document.querySelector('.timer__input');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
// const button = document.querySelectorAll('.button');

let timerId = null;
let isRunning = false;

start.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
    }
})

stop.addEventListener('click',() => {
    if (isRunning) {
        stopTimer();
    }
})

function startTimer() {
    let seconds = Number(input.value);

    if (isNaN(seconds) || seconds < 0) {
        input.textContent = 'Введите число';
        return false;
    }

    isRunning = true;

    input.disabled = true;
    start.disabled = true;
    stop.disabled = true;

    timerId = setInterval(() => {
        seconds--;
        timer.textContent = seconds;

        if (seconds <= 0) {
            clearInterval(timerId);
            timerId = null;
            isRunning = false;
            timer.textContent = '0000';

            input.disabled = false;
            start.disabled = false;
            stop.disabled = false;

            timer.classList.add('timer__finished');
            document.querySelector('#message').innerHTML = `
                <p class="timer__finished">Время вышло!<p>
            `;

            setTimeout(() => {
                timer.classList.remove('timer__finished');
                document.querySelector('#message').innerHTML = '';
            }, 3000)
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    timer.textContent = '0000';
}