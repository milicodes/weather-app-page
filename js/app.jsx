// Global

const API_KEY = `62a816282d3b51b7451838a6b7b63934`; // Security Warning!
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const API_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const DAYS = [
  `SUNDAY`,
  `MONDAY`,
  `TUESDAY`,
  `WEDNESDAY`,
  `THURSDAY`,
  `FRIDAY`,
  `SATURDAY`,
];

// Date

function formatDate(date) {
  const day = DAYS[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  const currentDate = document.querySelector(`#date`);
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}

/**
 * Sets temperature and city from API response
 * @param {Object} response 
 */
function updateInfo(response) {
  // Temperature
  const roundedTemp = Math.round(response.data.main.temp);
  const tempHtmlEl = document.querySelector(`#temperature-grade`);
  tempHtmlEl.innerHTML = `${roundedTemp}&degC`;
  // City
  const cityHtmlEl = document.querySelector(`#show-city`);
  cityHtmlEl.innerHTML = response.data.name;
  // Description
  const description = document.querySelector(`#description-weather`);
  description.innerHTML = response.data.weather[0].main;
  // Humidity
  const humidityHtmlEl = document.querySelector(`#humidity`);
  humidityHtmlEl.innerHTML = `${response.data.main.humidity}%`;
  // Wind
  const windHtmlEl = document.querySelector(`#wind`);
  const windSpeed = response.data.wind.speed;
  const windKilometer = Math.round((windSpeed * 18) / 5);
  windHtmlEl.innerHTML = `${windKilometer} km/h`;
}

// API response + Main temperature + details + City name

function showSearchedCity(response) {

  updateInfo(response)

  // Calling Coordinates for forecast {lat, lon}
  getCoordinates(response.data.coord); 

  let description = document.querySelector(`#description-weather`);
  //Changing color background
  function changingBackground() {
    let iconWeather = document.querySelector(`#icon-weather`); // Not using
    let colorDescription = description.textContent;
    let temperatureNumber = document.querySelector(`#temperature-grade`);
    let cityColor = document.querySelector(`#show-city`);
    let descriptionText = document.querySelector(`#description-text`);
    let descriptionWeather = document.querySelector(`#description-weather`);
    // Clouds
    if (colorDescription === `Clouds`) {
      document.body.style.background = `linear-gradient(#2F80ED, #56CCF2)`;
      document.body.style.backgroundAttachment = `fixed`;
      temperatureNumber.style.backgroundColor = `#4EBCF1`;
      cityColor.style.color = `#8BD8F9`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #8BD8F9`;
      descriptionText.style.backgroundColor = `#CEF2FF`;
      descriptionWeather.style.color = `#42A5EF`;
      // Rain, Thunderstorm and Snow
    } else if (colorDescription === `Rain`) {
      descriptionWeather.innerHTML;
      document.body.style.background = `linear-gradient(#4A00E0, #8E2DE2)`;
      document.body.style.backgroundAttachment = `fixed`;
      temperatureNumber.style.backgroundColor = `#8549D8`;
      cityColor.style.color = `#AD84E8`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #AD84E8`;
      descriptionText.style.backgroundColor = `#DCC9FF`;
      descriptionWeather.style.color = `#7119E1`;
    } else if (colorDescription === `Thunderstorm`) {
      descriptionWeather.innerHTML;
      document.body.style.background = `linear-gradient(#4A00E0, #8E2DE2)`;
      document.body.style.backgroundAttachment = `fixed`;
      temperatureNumber.style.backgroundColor = `#8549D8`;
      cityColor.style.color = `#AD84E8`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #AD84E8`;
      descriptionText.style.backgroundColor = `#DCC9FF`;
      descriptionWeather.style.color = `#7119E1`;
      // Snow
    } else if (colorDescription === `Snow`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#a8c0ff, #3f2b96)`;
      temperatureNumber.style.backgroundColor = `#6D6CC4`;
      cityColor.style.color = `#6D6CC4`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #6D6CC4`;
      descriptionText.style.backgroundColor = `#43309A`;
      descriptionWeather.style.color = `#A4BBFB`;
      document.body.style.transition = `all 0.5s ease`;
      // Drizzle
    } else if (colorDescription === `Drizzle`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#a8c0ff, #3f2b96)`;
      temperatureNumber.style.backgroundColor = `#6D6CC4`;
      cityColor.style.color = `#6D6CC4`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #6D6CC4`;
      descriptionText.style.backgroundColor = `#43309A`;
      descriptionWeather.style.color = `#A4BBFB`;
      document.body.style.transition = `all 0.5s ease`;
      // Clear sky
    } else if (colorDescription === `Clear`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#00c3ff,#A2E96F)`;
      temperatureNumber.style.backgroundColor = `#8AD675`;
      cityColor.style.color = `#8FD66F`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #8FD66F`;
      descriptionText.style.backgroundColor = `#E3FFBA`;
      descriptionWeather.style.color = `#4CCE84`;
      document.body.style.transition = `all 0.5s ease`;
      // Haze and Smoke / Mist
    } else if (colorDescription === `Haze`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#7F7FD5, #86A8E7, #91EAE4)`;
      temperatureNumber.style.backgroundColor = `#65608B`;
      cityColor.style.color = `#29346A`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #29346A`;
      descriptionText.style.backgroundColor = `#353D71`;
      descriptionWeather.style.color = `#FFFFFF`;
    } else if (colorDescription === `Smoke`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#7F7FD5, #86A8E7, #91EAE4)`;
      temperatureNumber.style.backgroundColor = `#65608B`;
      cityColor.style.color = `#29346A`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #29346A`;
      descriptionText.style.backgroundColor = `#353D71`;
      descriptionWeather.style.color = `#FFFFFF`;
    } else if (colorDescription === `Mist`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#7F7FD5, #86A8E7, #91EAE4)`;
      temperatureNumber.style.backgroundColor = `#65608B`;
      cityColor.style.color = `#29346A`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #29346A`;
      descriptionText.style.backgroundColor = `#353D71`;
      descriptionWeather.style.color = `#FFFFFF`;
    } else if (colorDescription === `Fog`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#7F7FD5, #86A8E7, #91EAE4)`;
      temperatureNumber.style.backgroundColor = `#65608B`;
      cityColor.style.color = `#29346A`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #29346A`;
      descriptionText.style.backgroundColor = `#353D71`;
      descriptionWeather.style.color = `#FFFFFF`;
    }
  }

  //Calling function
  changingBackground();

  // Icon and condition (changing icon)

  let iconElement = document.querySelector(`#icon-weather`);

  // Clear
  if (description.textContent === `Clear`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-sun icon-weather`);
    // Rain
  } else if (description.textContent === `Rain`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(
      `class`,
      `fas fa-cloud-showers-heavy icon-weather`
    );
    // Clouds
  } else if (description.textContent === `Clouds`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-cloud icon-weather`);
  } else if (description.textContent === `Thunderstorm`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-bolt icon-weather`);
  } else if (description.textContent === `Haze`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-smog icon-weather`);
  } else if (description.textContent === `Mist`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-smog icon-weather`);
  } else if (description.textContent === `Drizzle`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-cloud-rain icon-weather`);
  } else if (description.textContent === `Smoke`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-smog icon-weather`);
  } else if (description.textContent === `Snow`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-snowflake icon-weather`);
  } else if (description.textContent === `Fog`) {
    iconElement.removeAttribute(`class`);
    iconElement.setAttribute(`class`, `fas fa-smog icon-weather`);
  }
  // let iconElement = response.data.weather[0].icon;
  // let iconURL = document.querySelector(`#icon-weather`);
  // iconURL.setAttribute(
  //`src`,
  //`http://openweathermap.org/img/wn/${iconElement}@2x.png`
  //);
}

// Calling axios API + applying city searched into heading

function searchCity(event) {
  event.preventDefault();
  const userInputCity = document.querySelector(`#enter-city`);
  const showingCity = document.querySelector(`#show-city`);
  showingCity.innerHTML = userInputCity.value;

  const hey = document.querySelector(`#enter-city`);
  const heyYou = hey.value;
  if (heyYou === "") {
    alert(`Hey! 😺 Type a city! 🏙`);
    showingCity.innerHTML = `Waiting...`;
  }

  // axios API
  const units = `metric`;
  const cityName = userInputCity.value;
  if (cityName === "") {
    return false;
  }

  const apiUrl = `${API_WEATHER_URL}q=${cityName}&units=${units}&appid=${API_KEY}`;

  axios.get(`${apiUrl}`).then(showSearchedCity);
}

// Day forecast
function showDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDay = [`MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN`];
  return weekDay[day];
}

// Daily forecast
function dailyForecast(response) {
  let forecast = response.data.daily;

  // Forecast HTML days

  let forecastHTML = document.querySelector(`#nextDayTemplate`);
  // Adding row through JS
  let forecastRow = `<div class="row text-center g-2">`;
  // Adding loop of day
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      // Icon selection and condition
      let addingElement = `fa-cloud-sun icon`;
      // Background Forecast condition
      let colorSelection = `color-rain`;
      // Selecting description as condition
      let iconForecast = forecastDay.weather[0].main;
      if (iconForecast === `Rain`) {
        addingElement = `fa-cloud-showers-heavy`;
        colorSelection = `color-rain`;
      } else if (iconForecast === `Clouds`) {
        addingElement = `fa-cloud`;
        colorSelection = `color-cloud`;
      } else if (iconForecast === `Drizzle`) {
        colorSelection = `color-other`;
        addingElement = `fa-cloud-rain`;
      } else if (iconForecast === `Clear`) {
        addingElement = `fa-sun`;
        colorSelection = `color-clear`;
      } else if (iconForecast === `Fog`) {
        addingElement = `fa-smog`;
        colorSelection = `color-other`;
      } else if (iconForecast === `Smoke`) {
        addingElement = `fa-smog`;
        colorSelection = `color-other`;
      } else if (iconForecast === `Mist`) {
        addingElement = `fa-smog`;
        colorSelection = `color-other`;
      } else if (iconForecast === `Snow`) {
        addingElement = `fa-snoflake`;
        colorSelection = `color-other`;
      } else if (iconForecast === `Haze`) {
        addingElement = `fa-smog`;
        colorSelection = `color-other`;
      } else if (iconForecast === `Thunderstorm`) {
        addingElement = `fa-bolt`;
        colorSelection = `color-rain`;
      }

      // Container of forecast days in loop
      forecastRow =
        forecastRow +
        `<div class="col-4">
                  <div class="p-3 text-center next-days-edit ${colorSelection}">
                    <h5 class="card-title"
                    id="one">${showDayForecast(forecastDay.dt)}</h5>
                    <i class="fas ${addingElement} icon icon-days" id="iconNext"></i>
                    <p class="card-text" id="max"><strong>${Math.round(
                      forecastDay.temp.max
                    )}</strong>&deg ${Math.round(forecastDay.temp.min)}&deg</p>
                  </div>
                </div>`;
    }
  });
  // Closing row
  forecastRow = forecastRow + `</div>`;
  // Adding into HTML 6 times
  forecastHTML.innerHTML = forecastRow;
}

// Coordinates for forecast
function getCoordinates(coordinates) {
  const latitude = coordinates.lat;
  const longitude = coordinates.lon;
  const apiCall = `${API_BASE_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  axios.get(apiCall).then(dailyForecast);
}

// Current Position Button + geolocation

function showPosition(position) {
  const long = position.coords.longitude;
  const lat = position.coords.latitude;

  const units = `metric`;
  const apiURL = `${API_WEATHER_URL}lat=${lat}&lon=${long}&appid=${API_KEY}&units=${units}`;

  axios.get(`${apiURL}`).then(showSearchedCity);
}

// Navigator Geolocation

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Fahrenheit
function showSearchedFahrenheit(response) {
  const temperatureSearched = Math.round(response.data.main.temp);
  const tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degF`;
}

// Celcius
function showSearchedCelcius(response) {
  const temperatureSearched = Math.round(response.data.main.temp);
  const tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degC`;
}

// Axios information + Calling temperature for fahrenheit
function searchFahrenheit(event) {
  event.preventDefault();
  const citySearched = document.querySelector(`#show-city`).textContent;

  // axios API (for fahrenheit)
  const units = `imperial`;

  const apiUrl = `${API_WEATHER_URL}q=${citySearched}&units=${units}&appid=${API_KEY}`;

  axios.get(apiUrl).then(showSearchedFahrenheit);
}

// Axios information + Calling temperature for Celcius
function searchCelcius(event) {
  event.preventDefault();
  const citySearched = document.querySelector(`#show-city`).textContent;

  // axios API (for fahrenheit)
  const units = `metric`;

  const apiUrl = `${API_WEATHER_URL}q=${citySearched}&units=${units}&appid=${API_KEY}`;

  axios.get(`${apiUrl}`).then(showSearchedCelcius);
}

// Initial setup
// Calling function (Fahrenheit)
let selectingFahrenheit = document.querySelector(`#fahrenheit`);
selectingFahrenheit.addEventListener(`click`, searchFahrenheit);

//Calling function (Celcius)
let selectingCelcius = document.querySelector(`#celcius`);
selectingCelcius.addEventListener(`click`, searchCelcius);

// Button for current location
let button = document.querySelector(`#actual-location`);
button.addEventListener(`click`, getCurrentLocation);

// Calling function (search)
let form = document.querySelector(`#user-input`);
form.addEventListener(`submit`, searchCity);
let searchButton = document.querySelector(`#search-input`);
searchButton.addEventListener(`click`, searchCity);

// Current temperature (by location) in the main screen
getCurrentLocation();

let currentTime = new Date();
formatDate(currentTime);