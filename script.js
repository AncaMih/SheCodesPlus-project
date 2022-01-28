let now = new Date();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let date = now.getDate();
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
let month = months[now.getMonth()];

let currentTime = document.querySelector(".today-time");
currentTime.innerHTML = `The current time is ${hour}:${minutes}`;

let currentDate = document.querySelector(".today-date");
currentDate.innerHTML = `${day}, ${date} ${month}`;

function displayTemperature(response) {
  document.querySelector(".top-body-city").innerHTML = response.data.name;
  document.querySelector(".temp-figure").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);

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
}

function search(city) {
  let apiKey = "f218767f4aa280864e9166be6bb4bf21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "f218767f4aa280864e9166be6bb4bf21";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertFarenheit(event) {
  let tempFarenheit = document.querySelector(".temp-figure");
  tempFarenheit.innerHTML = "50";
}

function convertCelsius(event) {
  let tempCelsius = document.querySelector(".temp-figure");
  tempCelsius.innerHTML = "10 ";
}

let searchForm = document.querySelector(".search-location");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentCity);

search("London");
