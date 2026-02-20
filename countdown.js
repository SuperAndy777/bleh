// ==============================
// MEMORY DATA
// ==============================

const memories = [
  {
    image: "https://i.pinimg.com/736x/31/98/c4/3198c4160125e36f9a2d5a334d751d2a.jpg",
    text: "Valentines pe akela 😭"
  },
  {
    image: "https://i.pinimg.com/736x/59/4b/a2/594ba2ac05671ca5726a42391b89e4ab.jpg",
    text: "1 WEEK MOREEEEE????!!! AHHHH (p.s. this is so accurate me :))"
  },
  {
    image: "https://i.pinimg.com/736x/a5/8d/95/a58d95a04bcdd947923aecdf6c4981e4.jpg",
    text: "6 days? this is so slowww"
  },
  {
    image: "https://i.pinimg.com/736x/ca/30/dc/ca30dc0afb0a51c688715b7abd632425.jpg",
    text: "5 days..."
  },
  {
    image: "https://i.pinimg.com/originals/d5/fb/83/d5fb83e26bfd4ec440abaec15bdc0f21.gif",
    text: "Only 4 more to go :)"
  },
  {
    image: "https://i.pinimg.com/736x/c0/80/50/c080506c954483e4dffecdccbc5a4c63.jpg",
    text: "Only THREEEEEE, YAY"
  },
  {
    image: "https://i.pinimg.com/originals/a1/c4/a4/a1c4a498d28d9f1af3e1145f266350ea.gif",
    text: "2 days more ah, I can't"
  },
  {
    image: "https://i.pinimg.com/originals/eb/37/2c/eb372cdc7cbc316fa0f62cdac7c2f91a.gif",
    text: "TOMORRRROWWW!"
  },
  {
    image: "https://i.pinimg.com/originals/7e/ca/2e/7eca2e7d1f128311f53be28fe3979806.gif",
    text: "Yayyyyyyy, can't wait!"
  }
];

// ==============================
// ELEMENTS
// ==============================

const dayNumber = document.getElementById("day-number");
const memoryImage = document.getElementById("memory-image");
const memoryText = document.getElementById("memory-text");
const nextBtn = document.getElementById("next-btn");

let currentDay = 0;

// ==============================
// UPDATE MEMORY FUNCTION
// ==============================

function updateMemory() {
  const memory = memories[currentDay];

  // subtle flip animation
  memoryImage.style.transform = "rotateY(90deg)";
  memoryText.style.opacity = "0";

  setTimeout(() => {
    memoryImage.src = memory.image;
    memoryText.textContent = memory.text;

    memoryImage.style.transform = "rotateY(0deg)";
    memoryText.style.opacity = "1";
  }, 200);

  dayNumber.textContent = currentDay + 1;
}

// ==============================
// NEXT BUTTON
// ==============================

nextBtn.addEventListener("click", () => {
  if (currentDay < memories.length - 1) {
    currentDay++;
    updateMemory();
  }
});

// ==============================
// INITIAL LOAD
// ==============================

updateMemory();
