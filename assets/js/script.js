// global variables
// current date
// var today = dayjs();
// request URL of the 1
var cityName = document.querySelector("#city-name");

var tempDataEl = document.querySelector("#temp-data");
var humidityDataEl = document.querySelector("#humidity-data");
var windDataEl = document.querySelector("#wind-data");
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#search-history");
var searchButtonEl = document.querySelector("#search-button");
var searchBarEl = document.querySelector("#search-bar");

// var getApi = "http://api.openweathermap.org/";

var formSubmitHandler = function (event) {
  event.preventDefault();

  var searchedCity = searchInputEl.value.trim();

  if (searchedCity) {
    console.log(searchedCity);
  } else {
    alert("searchedCity not found");
  }
};
searchBarEl.addEventListener("submit", formSubmitHandler);

// 6afc16608686f24fca870dc6b62ecd42

// request URL of api 2

// HTML selectors
// var for search button
// var for search input
// var searchInputEl = document.queryselector('#id-')

// functions

function getCordinates(city) {
  var locateapi =
    getApi +
    "geo/1.0/direct?q=Londan,&limit=1&appid=6afc16608686f24fca870dc6b62ecd42";
  fetch(locateapi).then(function (response) {
    if (response.ok) console.log(response);
    response.json().then(function (data) {
      location(data);
    });
  });
}

function getWeather(lat, long) {
  // add the cordinates to the url as a query parameter
  var weatherApi = "";
  fetch(weatherApi).then(function (response) {
    if (response.ok) response.json().then(function (data) {});
  });
}

function displayWeather() {
  // make weather appear
}

function loadSearchedCities() {
  // find the searched cities in local storage
  // one found display them on the page
  // create button to display
}

// addEventListeners submit allows for user to press enter

// searchbox
// past cities buttons

getCordinates();
