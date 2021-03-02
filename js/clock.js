const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const modeButton = document.querySelector(".js-timeModeButton");

const CLOCK_MODE = "clock-mode";

const hourFormat = (fullhour) => {
  let hours;
  let day_night;
  const currentMode = localStorage.getItem(CLOCK_MODE);
  if (currentMode === "12hr") {
    hours = fullhour;
    day_night = "";
  } else {
    if (fullhour >= 13) {
      hours = fullhour - 12;
      day_night = "PM";
    } else if (fullhour == 0) {
      hours = 12;
      day_night = "AM";
    } else {
      hours = fullhour;
      day_night = "AM";
    }
  }
  return { hours, day_night };
};

const getTime = () => {
  const date = new Date(),
    minutes = date.getMinutes(),
    fullhour = date.getHours(),
    seconds = date.getSeconds();
  const { hours, day_night } = hourFormat(fullhour);
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds} ${day_night}`;
};

const onModeClick = () => {
  const currentMode = localStorage.getItem(CLOCK_MODE);
  if (currentMode === "12hr") {
    localStorage.setItem(CLOCK_MODE, "24hr");
    modeButton.textContent = "12hr";
  } else {
    localStorage.setItem(CLOCK_MODE, "12hr"); // currentMode === null 혹은 "24hr"일 때 클릭시 "12hr"로 변경
    modeButton.textContent = "24hr";
  }
};

const changeTimeMode = () => {
  modeButton.addEventListener("click", onModeClick);
};

const initClock = () => {
  changeTimeMode();
  getTime();
  setInterval(getTime, 1000);
};

initClock();
