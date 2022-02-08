import { favoriteCities, updateLocal, saveCurrentCity } from './storage.js'
let { URL, PAGE, NOW, DETAILS, FORECAST } = await import('./view.js');
let { tabs } = await import('./tabs.js');
tabs();

if (localStorage.getItem('currentCity')) {
  detectedCity(localStorage.getItem('currentCity'));
} else {
  detectedCity('Syktyvkar')
}

if (favoriteCities.size > 0) {
  for (let city of favoriteCities) PAGE.LIST_OF_CITIES.innerHTML += createTemplate(city);
}

function getTime(timestamp) {
  let time = new Date(timestamp * 1000);
  return formatTime(time);
}

function formatTime(time, utc) {
  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (utc) {
    hours = time.getHours() + utc;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`
}

function createTemplate (city) {
  return `
  <span class="favourite-city">
    <p class="city--name">${city}</p>
    <button class="btnDelete">×</button>
  </span>
  `
}

function createTemplateForecast ({date, degrees, feelsDegrees, time, weather, weatherImg}) {
  return `
  <div class="forecast-wrapper-block">
    <p class="date">${date}</p>
    <p class="degrees">
      Temperature: <b class="temperature-info">${degrees}</b>
      <span class="circle-small">
        <img src="icons/circleSmall.png">
      </span>
    </p>
    <p class="feels-degrees">
      Feels like: <b class="feels-info">${feelsDegrees}</b>
      <span class="circle-small">
        <img src="icons/circleSmall.png">
      </span>
    </p>
    <p class="time">${time}</p>
    <p class="weather">${weather}</p>
    <span class="weather-img">
      <img src="https://openweathermap.org/img/wn/${weatherImg}.png">
    </span>
  </div>
  `
}

function render(data) {
  NOW.TEMPERATURE.innerHTML = Math.round(data.main.temp);
  NOW.CURRENT_CITY_BOTTOM.innerHTML = data.name;
  NOW.ICON_WEATHER.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  DETAILS.CURRENT_CITY_TOP.innerHTML = data.name;
  DETAILS.TEMPERATURE_INFO.innerHTML = Math.round(data.main.temp);
  DETAILS.FEELS_INFO.innerHTML = Math.round(data.main.feels_like);
  DETAILS.WEATHER_INFO.innerHTML = data.weather[0].main;
  DETAILS.SUNRISE_INFO.innerHTML = `${getTime(data.sys.sunrise)}`;
  DETAILS.SUNSET_INFO.innerHTML = `${getTime(data.sys.sunset)}`;

  FORECAST.CURRENT_CITY_TOP.innerHTML = data.name;
  saveCurrentCity(data.name);
  PAGE.FORM.reset();
}

function renderForecast(dataForecast) {
  const collectionMounths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  FORECAST.LIST_OF_FORECASTS.innerHTML = '';

  dataForecast.list.forEach(item => {
    const date = new Date(item.dt_txt);
    const options = {
      date: `${date.getDate()} ${collectionMounths[date.getMonth()]}`,
      degrees: Math.round(item.main.temp),
      feelsDegrees: Math.round(item.main.feels_like),
      time: formatTime(date, 3),
      weather: item.weather[0].main,
      weatherImg: item.weather[0].icon,
    }

    FORECAST.LIST_OF_FORECASTS.innerHTML += createTemplateForecast(options)
  })
}

PAGE.BTN.addEventListener('click', () => {
  event.preventDefault();
  detectedCity(PAGE.FIELD.value);
})

class cityNotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = "cityNotFoundError";
  }
}

async function detectedCity(cityName) {
  try {
    const url = server_url => `${server_url}?q=${cityName}&appid=${URL.API_KEY}`;
    const response = await fetch(url(URL.SERVER_URL));
    const data = await response.json();

    if (data.cod == 404) {
      throw new cityNotFoundError("There was no such city!");
    }
    render(data);

    const responseForecast = await fetch(url(URL.SERVER_URL_FORECAST));
    const dataForecast = await responseForecast.json();
    renderForecast(dataForecast);
  } catch(error) {
    if (error instanceof cityNotFoundError) {
      alert(error.message)
    } else {
      alert(error)
    }
  }
}

function favoriteCitiesHandler() {
  const favouriteCity = document.querySelectorAll(".favourite-city");
  const btnDelete = document.querySelectorAll(".btnDelete");
  const cityName = document.querySelectorAll(".city--name");

  // перебираю массив рекурсией, для тренироовки
  function addEvent(arr, i) {
    if (arr.length != 0) {
      arr[i++].addEventListener('click', () => deleteCity(i - 1));

      if (i < arr.length) {
        addEvent(arr, i);
      }
    }
  }
  addEvent(btnDelete, 0);

  function deleteCity(index) {
    favoriteCities.delete(cityName[index].textContent);
    favouriteCity[index].remove();
    updateLocal();
  }

  cityName.forEach(function (item, index) {
    item.addEventListener('click', () => pushCity(index));
  })

  function pushCity(index) {
    detectedCity(cityName[index].textContent);
  }
}

favoriteCitiesHandler();

NOW.BTN_HEARTH.addEventListener('click', addCity);
function addCity() {
  if (!favoriteCities.has(NOW.CURRENT_CITY_BOTTOM.textContent)) {
    favoriteCities.add(NOW.CURRENT_CITY_BOTTOM.textContent);
    PAGE.LIST_OF_CITIES.innerHTML += createTemplate(NOW.CURRENT_CITY_BOTTOM.textContent);
    favoriteCitiesHandler();
    updateLocal();
  } else {
    alert('The city is already in favorites!');
  }
};
