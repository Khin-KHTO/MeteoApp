function refreshWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#MeteoApp-city");
  let temperatureElement = document.querySelector("#MeteoApp-temp");
  let temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#MeteoApp-time");
  let descriptionElement = document.querySelector("#MeteoApp-description");
  let humidityElement = document.querySelector("#MeteoApp-humidity");
  let windElement = document.querySelector("#MeteoApp-wind");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "d5180efbbf1tod072214b12633a0a1f4";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Paris");
