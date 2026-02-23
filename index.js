// ======================================
// TARGET DATE (1 March, 7:00 PM)
// ======================================

const targetDate = new Date("March 1, 2026 19:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const dailyImg = document.getElementById("daily-img");
const dailyText = document.getElementById("daily-text");
const dateEl = document.querySelector(".date");

let ended = false;


// ======================================
// COUNTDOWN LOGIC
// ======================================

const countdownInterval = setInterval(() => {

  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0 && !ended) {

    ended = true;
    clearInterval(countdownInterval);

    daysEl.textContent = "?";
    hoursEl.textContent = "?";
    minutesEl.textContent = "?";
    secondsEl.textContent = "?";

    dailyText.textContent =
      "Virli ka standup night lessgoooo 🎤🔥";

    return;
  }

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


// ======================================
// CINEMATIC TRANSITION (ON LOAD)
// ======================================

window.addEventListener("load", () => {

  const strikeWrap = document.querySelector(".strike-wrap");

  if (!strikeWrap) return;

  // Dramatic pause before strike
  setTimeout(() => {

    // Animate strike line
    strikeWrap.classList.add("strike-active");

    // Update date text
    if (dateEl) {
      dateEl.textContent = "1 March, 7:00 PM 🎤";
    }

    // After strike finishes
    setTimeout(() => {

      // Fade image out
      dailyImg.style.transition = "opacity 0.4s ease";
      dailyImg.style.opacity = "0";

      setTimeout(() => {

        // Change image
        dailyImg.src = "https://i.redd.it/0kg003dnaxuf1.jpeg";

        // Fade image back in
        dailyImg.style.opacity = "1";

      }, 400);

      // Shift vibe to red
      document.body.classList.add("red-theme");

    }, 800);

  }, 900);

});
