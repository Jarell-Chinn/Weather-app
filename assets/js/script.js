// Global variables
var today = dayjs();
var getApi = "http://api.openweathermap.org/";
var apiKey = "6afc16608686f24fca870dc6b62ecd42";

// HTML selectors
var searchForm = document.querySelector("#user-form");
var searchInput = document.querySelector("#search-input");
var pastCitiesContainer = document.querySelector("#past-container");
var weatherContainer = document.querySelector("#weather-container");

// Functions

function getForecast(lat, lon) {
  var forecastApi =
    getApi +
    "data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

  fetch(forecastApi)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      // Process and display the forecast data
      var forecastContent = "";
      data.list.forEach(function (forecast) {
        var forecastDate = dayjs.unix(forecast.dt).format("MMM D, YYYY");
        var forecastTemp = forecast.main.temp;
        var forecastDescription = forecast.weather[0].description;
        forecastContent += `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${forecastDate}</h5>
              <p class="card-text">Temperature: ${forecastTemp} K</p>
              <p class="card-text">Description: ${forecastDescription}</p>
            </div>
          </div>
        `;
      });
      weatherContainer.innerHTML += forecastContent;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getCurrentWeather(lat, lon) {
  var weatherApi =
    getApi + "data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

  fetch(weatherApi)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      // Process and display the current weather data
      var currentWeatherContent = `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Current Weather</h5>
            <p class="card-text">Temperature: ${data.main.temp} K</p>
            <p class="card-text">Description: ${data.weather[0].description}</p>
          </div>
        </div>
      `;
      weatherContainer.innerHTML = currentWeatherContent;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function displayWeather() {
  // Display the 5-day forecast and current weather on the page
}

function getCordinates(city) {
  var locateApi =
    getApi + "geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;

  fetch(locateApi)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      // Get the coordinates from the API response
      var lat = data[0].lat;
      var lon = data[0].lon;

      // Call the functions to get forecast and current weather using the coordinates
      getForecast(lat, lon);
      getCurrentWeather(lat, lon);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function loadSearchedCities() {
  // Load and display the searched cities from local storage
}

// Event listeners
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var city = searchInput.value.trim();

  if (city) {
    // Call the function to get the coordinates based on the city
    getCordinates(city);

    // Clear the search input
    searchInput.value = "";
  }
});

// Load searched cities on page load
loadSearchedCities();
