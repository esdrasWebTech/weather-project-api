# Weather project with API

In this project we will consume an API to obtain the weather in different parts of the world, I will use pure JavaScript to develop the application with Fetch API, one more project from the "Modern JavaScript" course. 

### Which API will I be using?
---
🌎 I will use the API provided by the following website:<br> 
- [https://openweathermap.org/](https://openweathermap.org/)

### How to create an new API Key?
---
- Steps to generate your API key:
  - Create an account on the website 
  - In the dashboard, select the menu option called **API keys**, and then create and activate a new key. 

### API documentation
---
📒 How to get it?

- In the main menu select the option API
- then scroll down to the title _"Current and forecast weather data collection"_ and select de option **API Doc** in the _"Current Weather Data"_ block.  

### How to make an API call
---

- In the API Doc. scroll down to the section **Other features** - _Geocoding API_
- then copy the API call:

```javascript
https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key} 
```
- the values of the Weather form fields they are required to be replaced in the API URL, in the place:<br>
  - {city name}
  - {country code}

- And the API key previously generated will take its place:
  - {API key}