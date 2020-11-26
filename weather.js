const weather = document.querySelector(".js-weather");
const API_KEY = "8fef165e0aa57017faf4708137db044a";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); // 날씨 정보가 fetch되면 그 정보를 json으로 변환 실행
    })
    .then(function (json) {
      console.log(json); // json으로 변환되면 실행.
      const temp = Math.round(json.main.temp);
      const place = json.name;
      weather.innerText = `${temp}℃ @${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
} // coords = coordsObj객체가 local storage에 저장되도록 (문자열 형식으로만 저장 가능)

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude; // GeolocationPosition 객체를 매개변수 postion로 다룸. 변수명은 자유.
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // latitude: latitude와 동일. 객체에서 key=value일 때 단축키.
    longitude, // longitude: longitude와 동일.
  };
  saveCoords(coordsObj); // 새로고침해도 여전히 local Storage에 정보 존재
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't find location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords(); // 아직 사용자의 coordinates 정보가 없다면 요청하기.
  } else {
    const parsedCoords = JSON.parse(loadedCoords); // local storage의 문자열=>객체로 변환하여 저장
    getWeather(parsedCoords.latitude, parsedCoords.longitude); // 입력한 현재 위치 값에 대한 날씨정보 fetch
  }
}

function init() {
  loadCoords();
}

init();
