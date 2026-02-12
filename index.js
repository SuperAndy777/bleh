// ===============================
// STAGES
// ===============================

const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stageMemory = document.getElementById("stageMemory");


// ===============================
// BUTTONS
// ===============================

const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const memoryBtn = document.getElementById("memoryBtn");


// ===============================
// IMAGES
// ===============================

const stage1Img = document.getElementById("stage1-img");

const dateImg = document.getElementById("date-img");
const dateText = document.getElementById("date-text");


// ===============================
// DEVICE DETECTION
// ===============================

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;


// ===============================
// DESKTOP STATE
// ===============================

let userHasMoved = false;

if (!isTouchDevice) {
  document.addEventListener(
    "mousemove",
    () => {
      userHasMoved = true;
    },
    { once: true }
  );
}


// ===============================
// MOBILE STATE
// ===============================

let noTouchAttempts = 0;
const MAX_MOBILE_ESCAPES = 5;


// ===============================
// DESKTOP CLICK STATE
// ===============================

let desktopNoClicks = 0;


// ===============================
// IMAGE STATE
// ===============================

let cryImageShown = false;


// ===============================
// MOBILE TAUNTS
// ===============================

const noTeaseTexts = [
  "ayyo 🙁",
  "itna kya 🥸",
  "matlab aisa",
  "rulayegi kya 😭",
  "ouch 🫠"
];


// ===============================
// UTILITIES
// ===============================

function vibrateOnEscape() {

  if ("vibrate" in navigator) {
    navigator.vibrate(20);
  }

}


function freezePosition(btn) {

  if (!btn.dataset.escaped) {

    const rect = btn.getBoundingClientRect();

    btn.style.position = "fixed";
    btn.style.left = rect.left + "px";
    btn.style.top = rect.top + "px";
    btn.style.zIndex = 1000;

    btn.dataset.escaped = "true";
  }

}


// ===============================
// DESKTOP TEASE ESCAPE
// ===============================

function teaseEscape(btn, x, y) {

  if (!userHasMoved) return;

  freezePosition(btn);

  const rect = btn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let dx = x - centerX;
  let dy = y - centerY;

  const dist = Math.sqrt(dx * dx + dy * dy) || 1;

  dx /= dist;
  dy /= dist;

  const moveDistance = 80;

  let newX = rect.left - dx * moveDistance;
  let newY = rect.top - dy * moveDistance;

  const padding = 10;

  newX = Math.max(
    padding,
    Math.min(window.innerWidth - rect.width - padding, newX)
  );

  newY = Math.max(
    padding,
    Math.min(window.innerHeight - rect.height - padding, newY)
  );

  btn.style.left = `${newX}px`;
  btn.style.top = `${newY}px`;

}


// ===============================
// MOBILE RANDOM ESCAPE
// ===============================

function randomEscape(btn, attempts) {

  freezePosition(btn);

  vibrateOnEscape();

  const padding = 20;

  const jumpFactor = Math.min(1 + attempts * 0.25, 2);

  let maxX =
    (window.innerWidth - btn.offsetWidth - padding) * jumpFactor;

  let maxY =
    (window.innerHeight - btn.offsetHeight - padding) * jumpFactor;

  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  x = Math.max(
    padding,
    Math.min(window.innerWidth - btn.offsetWidth - padding, x)
  );

  y = Math.max(
    padding,
    Math.min(window.innerHeight - btn.offsetHeight - padding, y)
  );

  btn.style.pointerEvents = "none";

  setTimeout(() => {
    btn.style.pointerEvents = "auto";
  }, 350);

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

}


// ===============================
// NO BUTTON LOGIC
// ===============================


// Desktop tease movement

if (!isTouchDevice) {

  noBtn.addEventListener("mousemove", (e) =>
    teaseEscape(noBtn, e.clientX, e.clientY)
  );

  noBtn.addEventListener("mouseenter", (e) =>
    teaseEscape(noBtn, e.clientX, e.clientY)
  );

}


// Mobile tease movement

else {

  noBtn.addEventListener("touchstart", (e) => {

    if (noTouchAttempts < MAX_MOBILE_ESCAPES) {

      e.preventDefault();

      noTouchAttempts++;

      const tease =
        noTeaseTexts[
          Math.min(noTouchAttempts - 1, noTeaseTexts.length - 1)
        ];

      noBtn.textContent = tease;

      if (tease === "rulayegi kya 😭" && !cryImageShown) {

        cryImageShown = true;

        stage1Img.style.opacity = 0;

        setTimeout(() => {

          stage1Img.src =
            "https://i.pinimg.com/originals/76/58/05/76580511f5c794b64bdba89e86a019ca.gif";

          stage1Img.style.opacity = 1;

        }, 150);

      }

      randomEscape(noBtn, noTouchAttempts);

    }

  });

}


// Desktop click logic

noBtn.addEventListener("click", () => {

  if (!isTouchDevice) {

    desktopNoClicks++;

    if (desktopNoClicks === 1) {

      noBtn.textContent = "aisa? 🥺";

      if (!cryImageShown) {

        cryImageShown = true;

        stage1Img.style.opacity = 0;

        setTimeout(() => {

          stage1Img.src =
            "https://i.pinimg.com/originals/76/58/05/76580511f5c794b64bdba89e86a019ca.gif";

          stage1Img.style.opacity = 1;

        }, 150);

      }

      return;

    }

  }

  goToStage("stageMemory");

});


// ===============================
// YES BUTTON
// ===============================

yesBtn.addEventListener("click", () => {

  goToStage("stage2");

});


// ===============================
// MEMORY BUTTON
// ===============================

memoryBtn.addEventListener("click", () => {

  goToStage("stageMemory");

});


// ===============================
// DATE SELECTION HOVER LOGIC
// ===============================

const dateButtons =
  document.querySelectorAll(".date-btn");

dateButtons.forEach(btn => {

  btn.addEventListener("mouseenter", () => {

    const newImg = btn.dataset.img;
    const newText = btn.dataset.text;

    dateImg.style.opacity = 0;

    setTimeout(() => {

      dateImg.src = newImg;
      dateText.textContent = newText;

      dateImg.style.opacity = 1;

    }, 150);

  });

});


// ===============================
// STAGE NAVIGATION
// ===============================

function goToStage(stageId) {

  document
    .querySelectorAll("#stage1, #stage2, #stageMemory, #memory-stage2, #memory-stage3")
    .forEach(stage => stage.classList.add("hidden"));

  document
    .getElementById(stageId)
    .classList.remove("hidden");

}
