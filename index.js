// =====================================
// STAGE REFERENCES
// =====================================

const stageMain = document.getElementById("stageMain");
const stageMemory = document.getElementById("stageMemory");

const memoryPortal = document.getElementById("memoryPortal");
const backPortal = document.getElementById("backPortal");


// =====================================
// CINEMATIC TRANSITION SYSTEM
// =====================================

function switchStage(fromStage, toStage) {

  fromStage.classList.remove("stage-visible");
  fromStage.classList.add("fade-out");

  setTimeout(() => {

    fromStage.classList.add("hidden");
    fromStage.classList.remove("fade-out");

    toStage.classList.remove("hidden");

    requestAnimationFrame(() => {
      toStage.classList.add("stage-visible");
    });

  }, 450);

}


// portal → chaos

memoryPortal.addEventListener("click", () => {

  switchStage(stageMain, stageMemory);

});


// chaos → portal

backPortal.addEventListener("click", () => {

  switchStage(stageMemory, stageMain);

});


// =====================================
// DATE SELECTION CLICK LOGIC
// =====================================

const dateImg = document.getElementById("date-img");
const dateText = document.getElementById("date-text");

const dateButtons = document.querySelectorAll(".date-btn");

dateButtons.forEach(btn => {

  btn.addEventListener("click", () => {

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


// =====================================
// MEMORY CHAOS SITE LOGIC
// =====================================

// stage refs

const memoryStage1 = document.getElementById("memory-stage1");
const memoryStage2 = document.getElementById("memory-stage2");
const memoryStage3 = document.getElementById("memory-stage3");

// buttons

const memoryYes = document.getElementById("memory-yes");
const memoryNo = document.getElementById("memory-no");

const memoryYes2 = document.getElementById("memory-yes2");
const memoryDaaru = document.getElementById("memory-daaru");

// image

const memoryStage1Img =
  document.getElementById("memory-stage1-img");


// =====================================
// DEVICE DETECTION
// =====================================

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;


// =====================================
// DESKTOP MOVE DETECTION
// =====================================

let userHasMoved = false;

document.addEventListener("mousemove", () => {

  userHasMoved = true;

}, { once: true });


// =====================================
// MOBILE STATE
// =====================================

let noTouchAttempts = 0;
const MAX_MOBILE_ESCAPES = 5;


// =====================================
// DESKTOP CLICK STATE
// =====================================

let desktopNoClicks = 0;


// =====================================
// IMAGE STATE
// =====================================

let cryImageShown = false;


// =====================================
// MOBILE TEASE TEXTS
// =====================================

const teaseTexts = [

  "ayyo 🙁",
  "itna kya 🥸",
  "matlab aisa",
  "rulayegi kya 😭",
  "ouch 🫠"

];


// =====================================
// UTILITIES
// =====================================

function vibrateOnEscape() {

  if ("vibrate" in navigator) {
    navigator.vibrate(20);
  }

}


function freezePosition(btn) {

  if (!btn || btn.dataset.escaped) return;

  const rect = btn.getBoundingClientRect();

  btn.style.position = "fixed";
  btn.style.left = rect.left + "px";
  btn.style.top = rect.top + "px";

  btn.dataset.escaped = "true";

}


// =====================================
// DESKTOP TEASE ESCAPE
// =====================================

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

  btn.style.left = `${newX}px`;
  btn.style.top = `${newY}px`;

}


// =====================================
// MOBILE RANDOM ESCAPE
// =====================================

function randomEscape(btn) {

  freezePosition(btn);

  vibrateOnEscape();

  const padding = 20;

  let x =
    Math.random() *
    (window.innerWidth - btn.offsetWidth - padding);

  let y =
    Math.random() *
    (window.innerHeight - btn.offsetHeight - padding);

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

}


// =====================================
// NO BUTTON LOGIC
// =====================================

if (!isTouchDevice) {

  memoryNo.addEventListener("mousemove", (e) =>
    teaseEscape(memoryNo, e.clientX, e.clientY)
  );

  memoryNo.addEventListener("mouseenter", (e) =>
    teaseEscape(memoryNo, e.clientX, e.clientY)
  );

}


memoryNo.addEventListener("touchstart", (e) => {

  if (noTouchAttempts < MAX_MOBILE_ESCAPES) {

    e.preventDefault();

    noTouchAttempts++;

    const tease =
      teaseTexts[
        Math.min(noTouchAttempts - 1, teaseTexts.length - 1)
      ];

    memoryNo.textContent = tease;

    if (tease === "rulayegi kya 😭" && !cryImageShown) {

      cryImageShown = true;

      memoryStage1Img.style.opacity = 0;

      setTimeout(() => {

        memoryStage1Img.src =
          "https://i.pinimg.com/originals/76/58/05/76580511f5c794b64bdba89e86a019ca.gif";

        memoryStage1Img.style.opacity = 1;

      }, 150);

    }

    randomEscape(memoryNo);

  }

});


// desktop click emotional beat

memoryNo.addEventListener("click", () => {

  desktopNoClicks++;

  if (desktopNoClicks === 1) {

    memoryNo.textContent = "aisa? 🥺";

    memoryStage1Img.style.opacity = 0;

    setTimeout(() => {

      memoryStage1Img.src =
        "https://i.pinimg.com/originals/76/58/05/76580511f5c794b64bdba89e86a019ca.gif";

      memoryStage1Img.style.opacity = 1;

    }, 150);

    return;

  }

  memoryStage1.classList.add("hidden");
  memoryStage2.classList.remove("hidden");

});


// =====================================
// YES BUTTONS
// =====================================

memoryYes.addEventListener("click", () => {

  memoryStage1.classList.add("hidden");
  memoryStage2.classList.remove("hidden");

});


memoryYes2.addEventListener("click", () => {

  memoryStage2.classList.add("hidden");
  memoryStage3.classList.remove("hidden");

});


memoryDaaru.addEventListener("click", () => {

  memoryStage2.classList.add("hidden");
  memoryStage3.classList.remove("hidden");

});
