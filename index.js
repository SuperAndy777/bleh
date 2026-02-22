const targetDate = new Date("February 22, 2026 00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const memoryImage = document.getElementById("memoryImage");
const memoryText = document.getElementById("memoryText");

let ended = false;

const countdownInterval = setInterval(() => {

  const now = new Date().getTime();
  const distance = targetDate - now;

  // WHEN TIME IS OVER
  if (distance <= 0 && !ended) {
  
    ended = true;
    clearInterval(countdownInterval);
  
    daysEl.textContent = "?";
    hoursEl.textContent = "?";
    minutesEl.textContent = "?";
    secondsEl.textContent = "?";
  
    memoryImage.src =
      "https://i.pinimg.com/736x/a4/c6/d4/a4c6d44891723f0605eef5bd12db33f6.jpg";
  
    memoryText.textContent =
      "waiting for the day when our plan doesn't cancel :')";
  
    return;
  }

  // Normal countdown
  if (!ended) {

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

}, 1000);
