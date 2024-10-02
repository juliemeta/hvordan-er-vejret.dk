function updateCurrentWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let countryELement = document.querySelector("#current-country");
  let weekdayELement = document.querySelector("#current-weekday");
  let timeElement = document.querySelector("#time-stamp");
  let date = new Date(response.data.time * 1000);
  let shortDescriptionElement = document.querySelector(
    "#weather-short-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#current-weather-icon");
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  countryELement.innerHTML = response.data.country;
  weekdayELement.innerHTML = formatWeekday(date);
  timeElement.innerHTML = formatTime(date);
  shortDescriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconElement.innerHTML = `
    <img
      src="${response.data.condition.icon_url}"
      alt=""
      class="current-weather-icon"
    />
  `;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatWeekday(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = days[date.getDay()];

  return `${weekday}`;
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${hours}:${minutes}`;

  return `${time}`;
}

function searchCity(city) {
  let apiKey = "c2t7ea4432f52e0o6d402fd54c5bc269";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCurrentWeather);
}

function handleCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-form-input");
  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "c2t7ea4432f52e0o6d402fd54c5bc269";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="forecast-day">
            <div class="forecast-weekdays">Thu</div>
            <div>
            <img class="forecast-weather-icons" src="${
              day.condition.icon_url
            }" />
            </div>
            <div>
              <span class="forecast-temperature day">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="forecast-temperature night">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>
`;
  });

  let forecastElement = document.querySelector("#forecast-section");
  forecastElement.innerHTML = forecastHtml;
}

let SearchFormElement = document.querySelector("#city-search-form");
SearchFormElement.addEventListener("submit", handleCitySearch);

searchCity("Odense");
