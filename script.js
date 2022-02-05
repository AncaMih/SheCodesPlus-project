function formatDate(timezone) {
  let currentDate = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  let date = currentDate.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];

  let year = currentDate.getFullYear();

  let hours = currentDate.getUTCHours() + timezone / 3600;
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `
  The current local time is ${hours}:${minutes}
  ${day}, ${date} ${month} ${year} `;
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".top-body-city").innerHTML = response.data.name;
  document.querySelector(".temp-figure").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".temp-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".today-time").innerHTML = formatDate(
    response.data.timezone
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "f218767f4aa280864e9166be6bb4bf21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  search(cityInput.value);
}

function searchLocation(position) {
  let apiKey = "f218767f4aa280864e9166be6bb4bf21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
search("London");

function convertFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitFormula = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(".temp-figure");
  temperatureElement.innerHTML = Math.round(fahrenheitFormula);
}

function convertCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temp-figure");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector(".search-location");
searchForm.addEventListener("submit", handleSearch);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentCity);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsiusTemp);
