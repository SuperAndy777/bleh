// =====================================
// TARGET DATE
// =====================================

const targetDate = new Date("February 22, 2026 00:00:00").getTime();


// =====================================
// TIMER ELEMENTS
// =====================================

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");


// =====================================
// DAILY IMAGE + MESSAGE ELEMENTS
// =====================================

const dailyImg = document.getElementById("daily-img");
const dailyText = document.getElementById("daily-text");


// =====================================
// DAILY CONTENT MAP
// =====================================

const dailyContent = {

  "2026-02-14": {
    img: "https://i.pinimg.com/736x/31/98/c4/3198c4160125e36f9a2d5a334d751d2a.jpg",
    text: "Valentines pe akela 😭"
  },

  "2026-02-15": {
    img: "https://i.pinimg.com/736x/59/4b/a2/594ba2ac05671ca5726a42391b89e4ab.jpg",
    text: "1 WEEK MOREEEEE????!!! AHHHH (p.s. tis image is so accurate me :))"
  },

  "2026-02-16": {
    img: "https://i.pinimg.com/736x/a5/8d/95/a58d95a04bcdd947923aecdf6c4981e4.jpg",
    text: "6 days? this is so slowww"
  },

  "2026-02-17": {
    img: "https://i.pinimg.com/736x/ca/30/dc/ca30dc0afb0a51c688715b7abd632425.jpg",
    text: ":)"
  },

  "2026-02-18": {
    img: "https://i.pinimg.com/originals/d5/fb/83/d5fb83e26bfd4ec440abaec15bdc0f21.gif",
    text: "Only 4 more to go :)"
  },

  "2026-02-19": {
    img: "https://i.pinimg.com/736x/c0/80/50/c080506c954483e4dffecdccbc5a4c63.jpg",
    text: "Only THREEEEEE, YAY"
  },

  "2026-02-20": {
    img: "https://i.pinimg.com/originals/a1/c4/a4/a1c4a498d28d9f1af3e1145f266350ea.gif",
    text: "2 days more ah, i can't"
  },

  "2026-02-21": {
    img: "https://i.pinimg.com/originals/eb/37/2c/eb372cdc7cbc316fa0f62cdac7c2f91a.gif",
    text: "TOMORRRROWWW!"
  },

  "2026-02-22": {
    img: "https://i.pinimg.com/originals/7e/ca/2e/7eca2e7d1f128311f53be28fe3979806.gif",
    text: "Yayyyyyyy, can't wait!"
  }

};


// =====================================
// GET TODAY KEY
// =====================================

function getTodayKey() {

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;

}


// =====================================
// UPDATE DAILY CONTENT
// =====================================

function updateDailyContent() {

  const key = getTodayKey();

  if (dailyContent[key]) {

    dailyImg.style.opacity = 0;

    setTimeout(() => {

      dailyImg.src = dailyContent[key].img;
      dailyText.textContent = dailyContent[key].text;

      dailyImg.style.opacity = 1;

    }, 200);

  }

}


// =====================================
// COUNTDOWN UPDATE
// =====================================

function updateCountdown() {

  const now = new Date().getTime();

  const distance = targetDate - now;

  if (distance <= 0) {
  
    clearInterval(countdownInterval); // stop timer
  
    // Hide Hours / Minutes / Seconds
    document.getElementById("hours").parentElement.style.display = "none";
    document.getElementById("minutes").parentElement.style.display = "none";
    document.getElementById("seconds").parentElement.style.display = "none";
  
    // Replace Days with ????
    document.getElementById("days").textContent = "????";
  
    // Flip animation (if you had it)
    const memoryCard = document.querySelector(".memory-card");
    memoryCard.classList.add("flip");
  
    setTimeout(() => {
      document.getElementById("memoryImage").src =
        "https://i.pinimg.com/736x/a4/c6/d4/a4c6d44891723f0605eef5bd12db33f6.jpg";
  
      document.getElementById("memoryText").textContent =
        "waiting for the day when our plan doesn't cancel :')";
  
      memoryCard.classList.remove("flip");
    }, 300);
  
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) /
    1000
  );

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;

}


// =====================================
// START SYSTEM
// =====================================

updateDailyContent();

updateCountdown();

setInterval(updateCountdown, 1000);
