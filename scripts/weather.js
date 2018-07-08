const UiCtrl = (function() {
  const location = document.querySelector(".card-container");

  const render = forecasts => {
    for (let i = 0; i < forecasts.length; i = i + 2) {
      let markUp = `
          <div class="card zoomIn animated">
            <h1 id='day'>${forecasts[i].title}</h1>
            <img src="${forecasts[i].icon_url}">
            <p id="forecast">
              ${forecasts[i].fcttext}
            </p>
            <h1 id='day'>${forecasts[i + 1].title}</h1>
            <img src="${forecasts[i + 1].icon_url}">
            <p id="forecast">
              ${forecasts[i + 1].fcttext}
            </p>
          </div>
        `;
      location.innerHTML += markUp;
    }
  };
  return {
    render: render
  };
})();

const mainCtrl = (async function(UiCtrl, getGeoData, getWeatherData) {
  const locationData = await getGeoData();
  const weatherData = await getWeatherData(locationData);
  UiCtrl.render(weatherData);
})(UiCtrl, getGeoData, getWeatherData);

function getGeoData() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function(pos) {
      let { latitude, longitude } = pos.coords;
      resolve({ latitude, longitude });
    });
  });
}

async function getWeatherData({ longitude, latitude }) {
  let url = `http://api.wunderground.com/api/abd241a01af7a2a0/forecast/q/${latitude},${longitude}.json`;
  const response = await fetch(url);
  const data = await response.json();
  const forecasts = data.forecast.txt_forecast.forecastday;
  return forecasts;
}
