function updateCurrentWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#time-stamp");
  let date = new Date(response.data.time * 1000);
  let shortDescriptionElement = document.querySelector(
    "#weather-short-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
  shortDescriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
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
