const input = document.querySelector('.weather__input');
const button = document.querySelector('.weather__button');
const info = document.querySelector('.widget__info');

const key = '7bc987175809430fa15165132252111';
const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=Almaty`;

async function getWeather() {
    try {
        const response = await fetch(url, {
            method: 'GET',
        })

        let result = await response.json();
        console.log(result);

        info.innerHTML = `
            <p>Город: ${result.location.name}</p>
            <p>Дата: ${result.location.localtime}</p>
            <p>Температура в Цельсиях: ${result.current.dewpoint_c}°C</p>
            <p>Температура в Фаренгейтах: ${result.current.dewpoint_f}°F</p>
        `;
    } catch (error) {
        console.error(error.message);
    }
}