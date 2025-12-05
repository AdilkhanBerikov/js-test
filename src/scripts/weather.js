const input = document.querySelector('.weather__input');
const info = document.querySelector('.weather__info');

const key = '7bc987175809430fa15165132252111';

function debounce(call, timeOut) {
    let lastCall;

    return (...args) => {
        clearTimeout(lastCall);

        lastCall = setTimeout(() => call(...args), timeOut);
    }
}

async function getWeather() {
    try {
        const cityName = input.value;

        if (!cityName) return;

        info.innerHTML = `<p>Загрузка...</p>`;

        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cityName}`;

        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            input.value = '';
            info.innerHTML = 'Город не найден!';
            return;
        }

        const result = await response.json();

        info.innerHTML = `
            <p>Город: ${result.location.name}</p>
            <p>Дата: ${result.location.localtime}</p>
            <p>Температура в Цельсиях: ${result.current.dewpoint_c}°C</p>
            <p>Температура в Фаренгейтах: ${result.current.dewpoint_f}°F</p>
        `;

    } catch (error) {
        console.error(error.message);
        info.innerHTML = `<p>Ошибка запроса данных</p>`;
    }
}

const deBounceWeather = debounce(getWeather, 500);

input.addEventListener('input', deBounceWeather);