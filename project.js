let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter your location.. ");
city = city.toLowerCase();
if (weather[city] !== undefined) {
  let celsiusTemperature = Math.round(weather[city].temp);
  let fahreinheitTemperature = Math.round((weather[city].temp * 9) / 5 + 32);
  let humidity = weather[city].humidity;
  alert(
    `It is currently ${celsiusTemperature}°C | ${fahreinheitTemperature}°F in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    "Sorry, we can't tell the temperature for this city, try going to https://www.google.com/?q=weather+sydney"
  );
}
