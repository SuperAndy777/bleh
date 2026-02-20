// ===============================
// ELEMENTS
// ===============================

const stages = document.querySelectorAll(".stage");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mePagalBtn = document.getElementById("mePagalBtn");
const bloodOverlay = document.getElementById("bloodOverlay");

let noClickCount = 0;
let noHoverActive = true;

const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

// ===============================
// STAGE SWITCH
// ===============================

function showStage(id) {
  stages.forEach(stage => stage.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ===============================
// NO BUTTON ESCAPE LOGIC
// ===============================

const noTexts = [
  "No",
  "Haww",
  "Evil :(",
  "pls?",
  "arey",
  "stoppp",
  "ok fine"
];

function moveNoButton() {
  const padding = 50;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
}

function shrinkNoButton() {
  const scale = Math.max(0.4, 1 - noClickCount * 0.12);
  noBtn.style.transform = `scale(${scale})`;
}

// Desktop: run away on hover
if (!isTouch) {
  noBtn.addEventListener("mouseenter", () => {
    if (noHoverActive) moveNoButton();
  });
}

// Mobile: run away on touch
if (isTouch) {
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

// Click escalation
noBtn.addEventListener("click", () => {

  noClickCount++;

  if (noClickCount < noTexts.length) {
    noBtn.textContent = noTexts[noClickCount];
  }

  shrinkNoButton();
  moveNoButton();

  // After too much resistance → force surrender
  if (noClickCount > 6) {
    noHoverActive = false;
    noBtn.style.opacity = "0";
    setTimeout(() => {
      showStage("stage2");
    }, 400);
  }
});

// ===============================
// YES CINEMATIC MODE
// ===============================

yesBtn.addEventListener("click", () => {

  // Flash red overlay
  bloodOverlay.style.opacity = "1";

  // Screen shake
  document.body.classList.add("screen-shake");

  // Darkening effect
  document.body.style.transition = "background 0.6s ease";
  document.body.style.background = "#2b0000";

  setTimeout(() => {

    bloodOverlay.style.opacity = "0";
    document.body.classList.remove("screen-shake");
    document.body.style.background = "white";

    showStage("stage3");

  }, 900);
});

// ===============================
// ME PAGAL → FINAL
// ===============================

mePagalBtn.addEventListener("click", () => {

  // Soft dramatic fade
  document.body.style.transition = "opacity 0.4s ease";
  document.body.style.opacity = "0.7";

  setTimeout(() => {
    document.body.style.opacity = "1";
    showStage("stage4");
  }, 300);
});
