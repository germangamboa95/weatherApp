let info = 0;

function getData(location, callback){
    let lon =  location[0];
    let lat = location[1];
    let url = `http://api.wunderground.com/api/abd241a01af7a2a0/forecast/q/${lat},${lon}.json`;
    const xhr = new XMLHttpRequest();
    xhr.open('Get',url,true);
    xhr.onload = function(){
        console.log(xhr.status);
        callback(JSON.parse(xhr.response));
      }

    xhr.send();
  }


function getLoc() {
    let coords = 0;
    navigator.geolocation.getCurrentPosition(function(pos){
      let crd = pos.coords;
      let lat = crd.latitude;
      let lon = crd.longitude;
      coords = [lon,lat];
      getData(coords,results);
    });
    function results(res){
      info = res;
    }
}


  function createCard(forecasts){
    for(let i = 0; i < forecasts.length; i = i + 2){
      let card = document.createElement('div');
      let markUp = `
        <div class="card zoomIn animated">
          <h1 id='day'>${forecasts[i].title}</h1>
          <img src="${forecasts[i].icon_url}">
          <p id="forecast">
            ${forecasts[i].fcttext}
          </p>
          <h1 id='day'>${forecasts[i+1].title}</h1>
          <img src="${forecasts[i+1].icon_url}">
          <p id="forecast">
            ${forecasts[i+1].fcttext}
          </p>
        </div>
      `;
      card.innerHTML = markUp;
      let location = document.querySelector('.card-container');
      location.appendChild(card);
    }
  }


getLoc();

let idk = setInterval(function(){
  if(info===0){
    console.log("waiting for info");}
    else{
      let forecasts = info.forecast.txt_forecast.forecastday;
      console.log(forecasts);
      clearInterval(idk);
      createCard(forecasts);
    }
},100)
