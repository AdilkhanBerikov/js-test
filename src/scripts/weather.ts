const input = document.querySelector<HTMLInputElement>('.weather__input');
const info = document.querySelector<HTMLInputElement>('.weather__info');

if (!input || !info) {
    throw new Error('Element not found!');
}

const key: string = '7bc987175809430fa15165132252111';

function debounce(call: (...args: any[]) => void, timeOut: number) {
    let lastCall: number | undefined;

    return (...args) => {
        if (lastCall) {
            return clearTimeout(lastCall);
        }

        lastCall = setTimeout(() => call(...args), timeOut);
    }
}

async function getWeather() {
    try {
        const cityName: string = input.value;

        if (!cityName) return;

        info.innerHTML = `<p>Загрузка...</p>`;

        const url: string = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${cityName}`;

        const response: Response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            input.value = '';
            info.innerHTML = 'Город не найден!';
            return;
        }

        interface Location {
            name: string;
            localtime: number;
        }

        interface Current {
            dewpoint_c: number;
            dewpoint_f: number;
        }

        interface Data {
            location: Location;
            current: Current;
        }

        const result = await response.json() as Data;

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