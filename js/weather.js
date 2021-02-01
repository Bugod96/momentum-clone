const weather = document.querySelector(".js-weather");
const API_KEY = "8fef165e0aa57017faf4708137db044a";
const COORDS = "coords";

const getWeather = (lat, lng) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json(); // 날씨 정보가 fetch되면 그 정보를 json으로 변환.
    })
    .then((json) => {
      const temp = Math.round(json.main.temp); // json으로 변환 완료되면 실행.
      const place = json.name;
      weather.innerText = `${temp}℃ @${place}`;
    });
};

const saveCoords = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}; // coords = coordsObj객체가 local storage에 저장되도록 (문자열 형식으로만 저장 가능)

const handleGeoSuccess = (position) => {
  const {
    coords: { latitude, longitude }, // GeolocationPosition 객체를 매개변수 postion로 작업. 변수명은 자유.
  } = position;
  const coordsObj = { latitude, longitude };
  saveCoords(coordsObj); // 새로고침해도 여전히 local Storage에 정보 존재
  getWeather(latitude, longitude);
};

const handleGeoError = () => {
  console.log("can't find location");
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords(); // 아직 사용자의 coordinates 정보가 없다면 요청하기.
  } else {
    const parsedCoords = JSON.parse(loadedCoords); // local storage의 문자열=>객체로 변환하여 저장
    getWeather(parsedCoords.latitude, parsedCoords.longitude); // 입력한 현재 위치 값에 대한 날씨정보 fetch
  }
};

const initWeatherAPI = () => {
  loadCoords();
};

initWeatherAPI();
