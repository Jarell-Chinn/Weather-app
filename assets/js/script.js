// global variables
// current date
// var today = dayjs();
// request URL of the 1
var cityName = document.querySelector("#city-name");

var tempDataEl = document.querySelector("#temp-");
var humidityDataEl = document.querySelector("#humidity-");
var windDataEl = document.querySelector("#wind-");
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#search-history");
var searchButtonEl = document.querySelector("#search-button");
var searchBarEl = document.querySelector("#search-bar");

var getApi = "https://api.openweathermap.org/";

var formSubmitHandler = function (event) {
  var searchedCity = searchInputEl.value;
  getCordinates(searchedCity);
  saved.push(searchedCity);
  localStorage.setItem("searchHistory", json.stringify(saved));
  loadSearchedCities();
};
searchBarEl.addEventListener("submit", formSubmitHandler);

var key = "6afc16608686f24fca870dc6b62ecd42";

// request URL of api 2

// HTML selectors
// var for search button
// var for search input
// var searchInputEl = document.queryselector('#id-')

// functions

function getCordinates() {
  var locateapi =
    getApi +
    "geo/1.0/direct?q=Londan,&limit=1&appid=6afc16608686f24fca870dc6b62ecd42";
  fetch(locateapi).then(function (response) {
    if (response.ok) console.log(response);
    response.json().then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      window.lat = lat;
      window.lon = lon;
      getWeather(lat, lon);
    });
  });
}

function getWeather() {
  // add the cordinates to the url as a query parameter
  var weatherApi =
    getApi + "data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key;
  fetch(weatherApi).then(function (response) {
    if (response.ok)
      response.json().then(function (data) {
        console.log(data);
      });
  });
}

function displayWeather() {
  for (var i = 0; i < 5; i++) {}
}

function loadSearchedCities() {
  searchHistoryEl.innerHTML = "";

  for (var i = 0; i < saved.length; i++) {
    var pastCity = document.createElement("input");
    pastCity.textContent = saved[i];
    searchHistoryEl.append(pastCity);
    searchHistoryEl.addEventListener("click", function () {
      getWeather(searchHistoryEl.textContent);
      return;
    });
  }
  // find the searched cities in local storage
  // one found display them on the page
  // create button to display
}

// addEventListeners submit allows for user to press enter

// searchbox
// past cities buttons

getCordinates();
