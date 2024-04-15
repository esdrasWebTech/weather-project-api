import { formWeather } from "./selectors.js";
import { searchingWeather } from "./functions.js";

// Initializing the app
window.addEventListener( 'load', () =>{
    formWeather.addEventListener( 'submit', searchingWeather );
});

