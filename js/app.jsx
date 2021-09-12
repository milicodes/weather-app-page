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

// Day forecast
function showDayForecast(day) {
  let date = day.dt;
  let dateInfo = new Date(date * 1000);
  console.log(dateInfo);
  let dayNext = dateInfo.getDay();
  console.log(dayNext);
}

// Daily forecast
function dailyForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
}

// Coordinates for forecast
function getCoordinates(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = `62a816282d3b51b7451838a6b7b63934`;
  let apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  console.log(apiCall);
  axios.get(apiCall).then(dailyForecast);
}

// API response + Main temperature + details + City name

function showSearchedCity(response) {
  let temperatureSearched = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degC`;

  let citySearch = document.querySelector(`#show-city`);
  citySearch.innerHTML = response.data.name;

  // Description
  let description = document.querySelector(`#description-weather`);
  description.innerHTML = response.data.weather[0].main;

  // Calling Coordinates for forecast
  getCoordinates(response.data.coord);

  //Changing color background
  function changingBackground() {
    let description = document.querySelector(`#description-weather`);
    let iconWeather = document.querySelector(`#icon-weather`);
    console.log(description.textContent);
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
      document.body.style.background = `linear-gradient(#f46b45, #eea849)`;
      temperatureNumber.style.backgroundColor = `#E89A40`;
      cityColor.style.color = `#F0AF5C`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #F0AF5C`;
      descriptionText.style.backgroundColor = `#FCDBB0`;
      descriptionWeather.style.color = `#F47146`;
      document.body.style.transition = `all 0.5s ease-in-out`;
    } else if (colorDescription === `Smoke`) {
      document.body.style.backgroundAttachment = `fixed`;
      document.body.style.background = `linear-gradient(#7F7FD5, #86A8E7, #91EAE4)`;
      temperatureNumber.style.backgroundColor = `#65608B`;
      cityColor.style.color = `#29346A`;
      cityColor.style[`boxShadow`] = `18px -12px 0px #29346A`;
      descriptionText.style.backgroundColor = `#353D71`;
      descriptionWeather.style.color = `#FFFFFF`;
      document.body.style.transition = `all 0.5s ease`;
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

  //Humidity
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector(`#wind`);
  let windConvertion = response.data.wind.speed;
  let windKilometer = Math.round((windConvertion * 18) / 5);
  wind.innerHTML = `${windKilometer} km/h`;

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
  let userInputCity = document.querySelector(`#enter-city`);
  let showingCity = document.querySelector(`#show-city`);
  showingCity.innerHTML = userInputCity.value;

  let hey = document.querySelector(`#enter-city`);
  let heyYou = hey.value;
  if (heyYou === "") {
    alert(`Hey! 😺 Type a city! 🏙`);
    showingCity.innerHTML = `Waiting...`;
  }

  // axios API
  let apiKey = `62a816282d3b51b7451838a6b7b63934`;
  let mainLink = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let cityName = userInputCity.value;
  if (cityName === "") {
    return false;
  }

  let apiUrl = `${mainLink}q=${cityName}&units=${units}&appid=${apiKey}`;
  console.log(`${apiUrl}`);

  axios.get(`${apiUrl}`).then(showSearchedCity);
}

// Forecast HTML days

let forecastHTML = document.querySelector(`#nextDayTemplate`);

let forecastRow = `<div class="row text-center g-2">`;
let daysTemplate = [`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
daysTemplate.forEach(function (day) {
  forecastRow =
    forecastRow +
    `<div class="col-4">
                  <div class="p-3 text-center next-days-edit color-monday">
                    <h5 class="card-title"
                    id="one">${day}</h5>
                    <i class="fas fa-cloud-sun icon icon-days"></i>
                    <p class="card-text">34&deg 25&deg</p>
                  </div>
                </div>`;
});
forecastRow = forecastRow + `</div>`;
forecastHTML.innerHTML = forecastRow;

// Calling function (search)
let form = document.querySelector(`#user-input`);
form.addEventListener(`submit`, searchCity);
let searchButton = document.querySelector(`#search-input`);
searchButton.addEventListener(`click`, searchCity);

// Current Position Button + geolocation

function showPosition(position) {
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

// Fahrenheit
function showSearchedFahrenheit(response) {
  let temperatureSearched = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degF`;
}

// Celcius
function showSearchedCelcius(response) {
  let temperatureSearched = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector(`#temperature-grade`);
  tempNumber.innerHTML = `${temperatureSearched}&degC`;
}

// Axios information + Calling temperature for fahrenheit
function searchFahrenheit(event) {
  event.preventDefault();
  let citySearched = document.querySelector(`#show-city`).textContent;

  // axios API (for fahrenheit)
  let apiKey = `62a816282d3b51b7451838a6b7b63934`;
  let mainLink = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `imperial`;

  let apiUrl = `${mainLink}q=${citySearched}&units=${units}&appid=${apiKey}`;
  console.log(`${apiUrl}`);

  axios.get(`${apiUrl}`).then(showSearchedFahrenheit);
}

// Axios information + Calling temperature for Celcius
function searchCelcius(event) {
  event.preventDefault();
  let citySearched = document.querySelector(`#show-city`).textContent;

  // axios API (for fahrenheit)
  let apiKey = `62a816282d3b51b7451838a6b7b63934`;
  let mainLink = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;

  let apiUrl = `${mainLink}q=${citySearched}&units=${units}&appid=${apiKey}`;
  console.log(`${apiUrl}`);

  axios.get(`${apiUrl}`).then(showSearchedCelcius);
}

// Calling function (Fahrenheit)
let selectingFahrenheit = document.querySelector(`#fahrenheit`);
selectingFahrenheit.addEventListener(`click`, searchFahrenheit);

//Calling function (Celcius)
let selectingCelcius = document.querySelector(`#celcius`);
selectingCelcius.addEventListener(`click`, searchCelcius);

// Current temperature (by location) in the main screen
getCurrentLocation();
