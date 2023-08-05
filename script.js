// console.log('linked');

const input = document.getElementById('search');
const add_btn = document.getElementById('btn');
const myCitySet = new Set();
let cityWeatherData = [];


function compareById(a, b) {
    return a.id - b.id;
  }


function displayCityCards() {
    const cardBox = document.getElementById('cardBox');
    cardBox.innerHTML = '';

    // sort before making
    
      
      // Sort the array of objects based on their 'id' property
    cityWeatherData.sort(compareById);
      
    console.log(cityWeatherData);
    cityWeatherData.forEach(city => {
        // code
        const card = document.createElement('div');
        card.id = 'card';
        card.className = 'dfr aic jcsb';
        let weather = city.weather[0].main;
        let picUrl = "images/Tornado.png";
        if (weather === "Mist"){
            picUrl = 'images/rain.png';
        } else if (weather === 'Clouds') {
            picUrl = 'images/midrain.png';
        } else if (weather === 'Rain') {
            picUrl = 'images/mist.png';
        }

        card.innerHTML = `
                <div id="tempBox"class="dfc jcsb">
                    <div ><p id="tem">${Math.floor(city.main.temp)}°</p></div>
                    <div id="WeatherInfo">
                        <div id="humid">H:${Math.floor(city.main.temp_max)}° L:${Math.floor(city.main.temp_min)}° </div>
                        <div id="Location">${city.name}, ${city.sys.country}</div>
                    </div>
                </div>
                <div class="dfc aic ">
                    <div >
                        <img id="WeatherImage" src=${picUrl} alt="">
                    </div>
                    <div id="season">${weather}</div>
                </div>
        `; // mist, rain, clouds
        cardBox.appendChild(card);
    });
}

add_btn.addEventListener('click', () => {
    // console.log('add city btn clicked');
    // extract input of the user
    let city = input.value; //                   
    // console.log(city.trim());
    if (city.trim().length === 0 || myCitySet.has(city.trim().toLowerCase())) {
        return;
    }

    myCitySet.add(`${city.trim().toLowerCase()}`);
// console.log(myCitySet);

    // add a city card
   getDataFromWeatherApi(city.trim().toLowerCase());
});

async function getDataFromWeatherApi(city) {
    // call api for city
    // Replace with your actual API key and city name
const API_KEY = 'f3981d2b932274fbbdd484876fd776fb';
const CITY_NAME = city; // Replace with the name of the city you want to fetch data for

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`);
    
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json(); // Convert the response to JSON
    
    // Do something with the data
    console.log('Weather data:', data);
    
    // Return the data if you want to use it elsewhere in your code
    let cityData = {
        id: data.main.temp,
        name: capitalizeWords(city),
        weather: data.weather,
        main: data.main,
        wind: data.wind,
        clouds: data.clouds,
        sys: data.sys
    };
    // console.log("creates obj", cityData);
    console.log("creates obj", cityData);
    cityWeatherData.push(cityData);
    displayCityCards();
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching weather data:', error.message);
  }
}

function capitalizeWords(str) {
    return str
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the array back into a string with space-separated words
  }

  