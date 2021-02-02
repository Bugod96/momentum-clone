const settingsBtn = document.querySelector(".js-settings");
const panel = document.querySelector(".settingsPanel");
const exitBtn = panel.querySelector(".js-exitBtn");
const changeNameForm = document.querySelector(".js-changeNameForm");
const changeNameinput = changeNameForm.querySelector("input");

const onChangeNameSubmit = (event) => {
  event.preventDefault();
  const username = changeNameinput.value; // input태그에 입력하고 제출(Submit)한 내용 = input의 value값이 됨.
  paintGreeting(username); // 제출된 value를 인자로 실행.
  localStorage.setItem(USER_LS, username);
  window.location.reload();
};

const changeSettingsMode = () => {
  panel.classList.toggle("hidePanel");
};

const initSettings = () => {
  settingsBtn.addEventListener("click", changeSettingsMode);
  exitBtn.addEventListener("click", changeSettingsMode);
  changeNameForm.addEventListener("submit", onChangeNameSubmit);
};

initSettings();
