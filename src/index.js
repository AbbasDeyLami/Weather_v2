function formateDate(timetemp) {
  let date = new Date(timetemp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
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

let celcuisTemp = null;
//Temp
function displayShowTemp(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let HumidityElemnt = document.querySelector("#HumidityDigit");
  let iconElement = document.querySelector("img#icon");
  let windElemnt = document.querySelector("#windDigit");
  celcuisTemp = response.data.main.temp; // for change tro fahranite
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  tempElement.innerHTML = Math.round(celcuisTemp);
  HumidityElemnt.innerHTML = Math.round(response.data.main.humidity);
  windElemnt.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "129290ad7e27c69a866e5e7528893c1a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayShowTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city");
  search(inputCity.value);
}
function DisplFarhnihite(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let faranhiteTemp = (celcuisTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(faranhiteTemp);
}
function Displcelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celcuisTemp);
}

let farn = document.querySelector("#far-link");
farn.addEventListener("click", DisplFarhnihite);

let cel = document.querySelector("#cel-link");
cel.addEventListener("click", Displcelcius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("Tehran");
