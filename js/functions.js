import { mainContainer, boxResult, cityField, countryField, submitButton } from "./selectors.js";

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

    // Show preload Spinner
    spinner();

    fetch(url)
        .then( resolve => {

            return resolve.json();
        })
        .then( resolve => {

            // validating city

            if(resolve.cod === '404'){
                alertMessage('No se encontraron resultados para tu búsqueda');

                // delete spinner
                clearHTML();

                // Returning welcome message 
                const welcomeMessage = document.createElement('p');
                welcomeMessage.classList.add('text-center', 'text-white', 'mt-6');
                welcomeMessage.textContent = "Agrega tu ciudad y país, el resultado se mostrará aquí";

                boxResult.appendChild(welcomeMessage);

                return;
            }

            // check existing HTML
            clearHTML();            

            // Create HTML and show the Weather
            showWeather(resolve);
        })
};

// Create Weather HTML

function showWeather(data){

    const {main:{temp, temp_max, temp_min}, name} = data;

    // Temps Celsius
    const tempCelsius = kelvinToCelsius(temp);
    const tempMaxCelsius = kelvinToCelsius(temp_max);
    const tempMinCelsius = kelvinToCelsius(temp_min);
    
    // create HTML
    const countryName = document.createElement('p');
    countryName.classList.add('font-bold', 'text-2xl');
    countryName.textContent = name;

    const actualTemp = document.createElement('p');
    actualTemp.innerHTML = `${tempCelsius} &#8451;`;
    actualTemp.classList.add('font-bold', 'text-6xl');

    const actualMaxTemp = document.createElement('p');
    actualMaxTemp.innerHTML = `Máxima: ${tempMaxCelsius} &#8451;`;
    actualMaxTemp.classList.add('text-xl');

    const actualMinTemp = document.createElement('p');
    actualMinTemp.innerHTML = `Mínima: ${tempMinCelsius} &#8451;`;
    actualMinTemp.classList.add('text-xl');

    const innerBoxResult = document.createElement('div');
    innerBoxResult.classList.add('text-center', 'text-white');

    // insert HTML
    innerBoxResult.appendChild(countryName);
    innerBoxResult.appendChild(actualTemp);
    innerBoxResult.appendChild(actualMaxTemp);
    innerBoxResult.appendChild(actualMinTemp);
    boxResult.appendChild(innerBoxResult);
};

// Convert Kelvin degrees to Celsius 
const kelvinToCelsius = degrees => parseInt(degrees - 273.15);

// Clear HTML
function clearHTML(){

    while(boxResult.firstChild){

        boxResult.removeChild(boxResult.firstChild);
    };
};

// Creating and showing spinner
function spinner(){

    // clear Box result
    clearHTML();

    // create HTML spinner
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    // Insert HTML spinner
    boxResult.appendChild(divSpinner);
};
