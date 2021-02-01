const settingsBtn = document.querySelector(".js-settings");
const panel = document.querySelector(".settingsPanel");
const exitBtn = panel.querySelector(".js-exitBtn");
const changeNameForm = document.querySelector(".js-changeNameForm");
const nameInput = changeNameForm.querySelector("input");

const onChangeNameSubmit = (event) => {
  event.preventDefault();
  const currentValue = nameInput.value;
  localStorage.setItem("currentUser", currentValue);
};

const changeSettingMode = () => {
  panel.classList.toggle("hidePanel");
};

const initSettings = () => {
  settingsBtn.addEventListener("click", changeSettingMode);
  exitBtn.addEventListener("click", changeSettingMode);
  changeNameForm.addEventListener("submit", onChangeNameSubmit);
};

initSettings();
