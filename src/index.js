function updateCurrentWeather(response) {
  let cityElement = document.querySelector("#current-city");
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

let SearchFormElement = document.querySelector("#city-search-form");
SearchFormElement.addEventListener("submit", handleCitySearch);

searchCity("Odense");
