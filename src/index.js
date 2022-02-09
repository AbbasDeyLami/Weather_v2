// // write your code here
let form = document.querySelector("#searchbox");

function currentDate(event) {
  event.preventDefault();
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = daysOfWeek[date.getDay()];
  let finaldate = `${days} ${hours}:${minutes}`;
  let htmldate = document.querySelector("#date");
  return (htmldate.innerHTML = finaldate);
}
form.addEventListener("submit", currentDate); // show time

/* --------------------------------Search city by API-------------------------------------- */

/* --------------------------------get cirty by API-------------------------------------- */
function showCelsius(response) {
  // response.preventDefault();
  let city = document.querySelector("h2");
  let temperatureform = document.querySelector("#degree");
  let humidityform = document.querySelector("#Humanidity");
  let windform = document.querySelector("#wind");
  let descriptionform = document.querySelector(".decriptions");
  let pressureform = document.querySelector("#digitPressure");
  city.innerHTML = response.data.name;
  temperatureform.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidityform.innerHTML = `${response.data.main.humidity}`;
  windform.innerHTML = `${Math.round(response.data.wind.speed)}`;
  descriptionform.innerHTML = `${response.data.weather[0].main}`;
  pressureform.innerHTML = `${response.data.main.pressure}`;
}

function searchcity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search");
  let h2 = document.querySelector("h2");
  h2.innerHTML = searchInput.value;
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCelsius);
}

form.addEventListener("submit", searchcity);
//chalnge 3
function searchLocation(position) {
  position.preventDefault();
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCelsius);
}
function hereTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
// let currentButton = document.querySelector("#current-button");
// currentButton.addEventListener("click", hereTemp);
form.addEventListener("submit", hereTemp);


// let celsius = document.querySelector("#celsius");
// let fahrenheit = document.querySelector("#fahrenheit");
// let degree = document.querySelector("#degree");

// function chnageDegreeToCelcius(event) {
//   event.preventDefault();
//   let celsius = 20;
//   degree.innerHTML = celsius;
// }
// function chnageDegreeTofahrenheit(event) {
//   event.preventDefault();
//   let fahrenheit = 68;
//   degree.innerHTML = fahrenheit;
// }
// celsius.addEventListener("click", chnageDegreeToCelcius);

// fahrenheit.addEventListener("click", chnageDegreeTofahrenheit);
