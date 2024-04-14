import { mainContainer, cityField, countryField, submitButton } from "./selectors.js";

// Searching Weather

export function searchingWeather(event) {
    event.preventDefault();

    //validating form

    if (cityField.value === '' || countryField.value === '') {

        alertMessage('Ambos campos son obligatorios');

        return;

    } else if (Number(cityField.value)) {

        alertMessage('Ingresa un nombre de Ciudad válido');

        return;
    }

    // API request call
    
    apiRequest(cityField.value, countryField.value);

};

// Show alert message

function alertMessage(message) {

    // check existing alert

    const alertMessage = document.querySelector('.alert-message');


    // create alert

    if (!alertMessage){

        const boxAlert = document.createElement('div');

        boxAlert.classList.add('bg-red-100', 'border-red-400', 'text-red-400', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alert-message');

        boxAlert.innerHTML = `
            <strong class="font-bold">Error!</strong><span class="block">${message}</span>
        `;

        submitButton.disabled = true;
        submitButton.classList.add('opacity-600');
        mainContainer.appendChild(boxAlert);

        // remove alert

        setTimeout(() => {

            boxAlert.remove();
            submitButton.classList.remove('opacity-600');
            submitButton.disabled = false;
        }, 3000);

    }

};

// API request

function apiRequest(city, country){

    const apiKey = '4914392b53c8e475d369236dafd29423';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

    fetch(url)
        .then( resolve => {

            return resolve.json();
        })
        .then( resolve => {

            // validating city

            if(resolve.cod === '404'){
                alertMessage('No se encontraron resultados para tu búsqueda');
            }
        })
        .catch( reject => {

            console.log(reject);
        })
};