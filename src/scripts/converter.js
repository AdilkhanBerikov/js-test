const celsius = document.querySelector('.celsius__input');
const fahrenheit = document.querySelector('.fahrenheit__input');
const clear = document.querySelector('.converter__clear');

let isUpdating = false;

celsius.addEventListener('input', () => {
    if (isUpdating) return;

    isUpdating = true;

    const value = celsius.value;

    if (value === '') {
        fahrenheit.value = '';
        isUpdating = false;
        return;
    }

    const num = Number(value);

    if (isNaN(num)) {
        isUpdating = false;
        alert('Введите число');
        return;
    }

    const result = num * 9/5 + 32;

    fahrenheit.value = result.toFixed(2);

    isUpdating = false;
})

fahrenheit.addEventListener('input', () => {
    if (isUpdating) return;

    isUpdating = true;

    const value = fahrenheit.value;

    if (value === '') {
        celsius.value = '';
        isUpdating = false;
        return;
    }

    const num = Number(value);

    if (isNaN(num)) {
        isUpdating = false;
        alert('Введите число');
        return;
    }

    const result = (num - 32) * 5/9;

    celsius.value = result.toFixed(2);

    isUpdating = false;
})

clear.addEventListener('click', () => {
    fahrenheit.value = '';
    celsius.value = '';
    isUpdating = false;
})