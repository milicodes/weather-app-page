// Date

function formatDate(date) {
  let days = [
    `SUNDAY`,
    `MONDAY`,
    `TUESDAY`,
    `WEDNESDAY`,
    `THURSDAY`,
    `FRIDAY`,
    `SATURDAY`,
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = document.querySelector(`#date`);
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}

let currentTime = new Date();
formatDate(currentTime);
console.log(new Date());

// City

// Celcius and farenheit

function celciusTemperature(event) {
  event.preventDefault();
  let showTemperature = document.querySelector(`#temperature-grade`);
  showTemperature.innerHTML = `10&degC`;
}

function fahrenhheitTemperature(event) {
  event.preventDefault();
  let showTemperature = document.querySelector(`#temperature-grade`);
  showTemperature.innerHTML = `30&degF`;
}

let celcius = document.querySelector(`#celcius`);
celcius.addEventListener(`click`, celciusTemperature);
let fahrenheit = document.querySelector(`#fahrenheit`);
fahrenheit.addEventListener(`click`, fahrenhheitTemperature);

// API response + Main temperature + details + City name

function showSearchedCity(response) {
  let temperatureSearched = Math.round(response.data.main.temp);
  console.log(temperatureSearched);
  let tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degC`;

  let citySearch = document.querySelector(`#show-city`);
  citySearch.innerHTML = response.data.name;

  // Description
  let description = document.querySelector(`#description-weather`);
  description.innerHTML = response.data.weather[0].main;

  //Humidity
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector(`#wind`);
  let windConvertion = response.data.wind.speed;
  console.log(windConvertion);
  let windKilometer = Math.round((windConvertion * 18) / 5);
  wind.innerHTML = `${windKilometer} km/h`;
}

// Calling axios API + applying city searched into heading

function searchCity(event) {
  event.preventDefault();
  let userInputCity = document.querySelector(`#enter-city`);
  let showingCity = document.querySelector(`#show-city`);
  showingCity.innerHTML = userInputCity.value;

  // axios API
  let apiKey = `62a816282d3b51b7451838a6b7b63934`;
  let mainLink = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let cityName = userInputCity.value;

  let apiUrl = `${mainLink}q=${cityName}&units=${units}&appid=${apiKey}`;
  console.log(`${apiUrl}`);

  axios.get(`${apiUrl}`).then(showSearchedCity);
}

let form = document.querySelector(`#user-input`);
form.addEventListener(`submit`, searchCity);

let searchButton = document.querySelector(`#search-input`);
searchButton.addEventListener(`click`, searchCity);
// axios

// Current Position Button + geolocation

function showPosition(position) {
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);

  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKeyLocation = `62a816282d3b51b7451838a6b7b63934`;
  let units = `metric`;
  let apiBody = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiURL = `${apiBody}lat=${lat}&lon=${long}&appid=${apiKeyLocation}&units=${units}`;

  axios.get(`${apiURL}`).then(showSearchedCity);
}

// Navigator Geolocation

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Button for current location

let button = document.querySelector(`#actual-location`);
button.addEventListener(`click`, getCurrentLocation);
