export const URL = {
  SERVER_URL: 'https://api.openweathermap.org/data/2.5/weather',
  SERVER_URL_FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
  API_KEY: '802cf9d5becc97345a7802bf678bddeb&units=metric',
}
export const PAGE = {
  FORM: document.querySelector(".input"),
  BTN: document.querySelector(".btn"),
  FIELD: document.querySelector(".field"),
  LIST_OF_CITIES: document.querySelector(".cities"),
}
export const NOW = {
  TEMPERATURE: document.querySelector(".temperature--number"),
  ICON_WEATHER: document.querySelector(".icon--weather"),
  CURRENT_CITY_BOTTOM: document.querySelector(".current-city--bottom"),
  BTN_HEARTH: document.querySelector(".hearth"),
}
export const DETAILS = {
  CURRENT_CITY_TOP: document.querySelectorAll(".current-city--top")[0],
  TEMPERATURE_INFO: document.querySelector(".temperature-info"),
  FEELS_INFO: document.querySelector(".feels-info"),
  WEATHER_INFO: document.querySelector(".weather-info"),
  SUNRISE_INFO: document.querySelector(".sunrise-info"),
  SUNSET_INFO: document.querySelector(".sunset-info"),
}
export const FORECAST = {
  CURRENT_CITY_TOP: document.querySelectorAll(".current-city--top")[1],
  LIST_OF_FORECASTS: document.querySelector(".forecast-wrapper"),
}
