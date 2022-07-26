export const getWeather = (city) =>
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
  ).then((response) => response.json());
