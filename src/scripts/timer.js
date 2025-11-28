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
        alert('Введите положительное число');
        return false;
    }

    isRunning = true;

    input.disabled = true;
    start.disabled = true;

    function go() {
        seconds--;
        timer.textContent = seconds + 1;

        if (seconds < 0) {
            clearInterval(timerId);
            timerId = null;
            isRunning = false;
            timer.textContent = '0000';
            input.value = '';

            input.disabled = false;
            start.disabled = false;

            timer.classList.add('timer__finished');
            document.querySelector('#message').innerHTML = `
                <p class="timer__finished">Время вышло!<p>
            `;

            setTimeout(() => {
                timer.classList.remove('timer__finished');
                document.querySelector('#message').innerHTML = '';
            }, 3000)
        }
    }

    go();
    timerId = setInterval(go, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    input.value = '';
    timerId = null;
    isRunning = false;
    timer.textContent = '0000';
    input.disabled = false;
    start.disabled = false;
}