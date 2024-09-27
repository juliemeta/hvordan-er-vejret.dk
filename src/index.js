function handleCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-form-input");
  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = searchInput.value;
}
let SearchFormElement = document.querySelector("#city-search-form");
SearchFormElement.addEventListener("submit", handleCitySearch);
