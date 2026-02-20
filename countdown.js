const dayNumber = document.getElementById("day-number");
const memoryImg = document.getElementById("memory-img");
const memoryText = document.getElementById("memory-text");
const nextBtn = document.getElementById("next-btn");
const memoryBox = document.getElementById("memory-box");

/* ===============================
   MEMORY DATA
================================= */

const memories = [
  {
    img: "https://i.pinimg.com/736x/31/98/c4/3198c4160125e36f9a2d5a334d751d2a.jpg",
    text: "Valentines pe akela 😭"
  },
  {
    img: "https://i.pinimg.com/736x/59/4b/a2/594ba2ac05671ca5726a42391b89e4ab.jpg",
    text: "1 WEEK MOREEEEE????!!! AHHHH (p.s. this image is so accurate me :))"
  },
  {
    img: "https://i.pinimg.com/736x/a5/8d/95/a58d95a04bcdd947923aecdf6c4981e4.jpg",
    text: "6 days? this is so slowww"
  },
  {
    img: "https://i.pinimg.com/736x/ca/30/dc/ca30dc0afb0a51c688715b7abd632425.jpg",
    text: "still counting..."
  },
  {
    img: "https://i.pinimg.com/originals/d5/fb/83/d5fb83e26bfd4ec440abaec15bdc0f21.gif",
    text: "Only 4 more to go :)"
  },
  {
    img: "https://i.pinimg.com/736x/c0/80/50/c080506c954483e4dffecdccbc5a4c63.jpg",
    text: "Only THREEEEEE, YAY"
  },
  {
    img: "https://i.pinimg.com/originals/a1/c4/a4/a1c4a498d28d9f1af3e1145f266350ea.gif",
    text: "2 days more ah, I can't"
  },
  {
    img: "https://i.pinimg.com/originals/eb/37/2c/eb372cdc7cbc316fa0f62cdac7c2f91a.gif",
    text: "TOMORRRROWWW!"
  },
  {
    img: "https://i.pinimg.com/originals/7e/ca/2e/7eca2e7d1f128311f53be28fe3979806.gif",
    text: "Yayyyyyyy, can't wait!"
  }
];

let currentDay = 0;

/* ===============================
   PAPER SOUND (Optional)
================================= */

const pageSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
pageSound.volume = 0.15;

/* ===============================
   NEXT BUTTON LOGIC
================================= */

nextBtn.addEventListener("click", () => {

  if (currentDay < memories.length - 1) {
    currentDay++;

    // Flip animation
    memoryBox.classList.add("flip");

    setTimeout(() => {
      dayNumber.textContent = currentDay + 1;
      memoryImg.src = memories[currentDay].img;
      memoryText.textContent = memories[currentDay].text;
      memoryBox.classList.remove("flip");
    }, 300);

    // Soft sound
    pageSound.currentTime = 0;
    pageSound.play().catch(() => {});

  } else {
    nextBtn.style.opacity = "0.4";
    nextBtn.style.cursor = "default";
  }

});


/* ===============================
   MOBILE SWIPE SUPPORT
================================= */

let startX = 0;

memoryBox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

memoryBox.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextBtn.click();
  }
});
