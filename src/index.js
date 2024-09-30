function updateCurrentWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = response.data.city;
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
