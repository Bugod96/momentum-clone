const getTime = () => {
  const date = new Date(),
    minutes = date.getMinutes(),
    fullhour = date.getHours(),
    seconds = date.getSeconds();
  const hours = fullhour % 12;

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds} ${fullhour >= 12 ? "PM" : "AM"}`;
};
