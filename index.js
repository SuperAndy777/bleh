// ===============================
// STAGE REFERENCES
// ===============================

const stageMain = document.getElementById("stageMain");
const stageMemory = document.getElementById("stageMemory");


// ===============================
// MEMORY PORTAL NAVIGATION
// ===============================

const memoryPortal = document.getElementById("memoryPortal");
const backToMain = document.getElementById("backToMain");

memoryPortal.addEventListener("click", () => {

  stageMain.classList.add("hidden");
  stageMemory.classList.remove("hidden");

});


backToMain.addEventListener("click", () => {

  stageMemory.classList.add("hidden");
  stageMain.classList.remove("hidden");

});


// ===============================
// DATE SELECTION CLICK LOGIC
// ===============================

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


// ===============================
// ===============================
// ORIGINAL CHAOS LOGIC PRESERVED
// ===============================
// ===============================


// ORIGINAL STAGE REFERENCES

const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");


// ORIGINAL BUTTONS

const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const daaruBtn = document.getElementById("daaru");
const yesBtn2 = document.getElementById("yes2");


// ORIGINAL IMAGE

const stage1Img = document.getElementById("stage1-img");


// DEVICE DETECTION

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;


// DESKTOP STATE

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


// MOBILE STATE

let noTouchAttempts = 0;
const MAX_MOBILE_ESCAPES = 5;


// DESKTOP CLICK STATE

let desktopNoClicks = 0;


// IMAGE STATE

let cryImageShown = false;


// MOBILE TAUNTS

const noTeaseTexts = [
  "ayyo 🙁",
  "itna kya 🥸",
  "matlab aisa",
  "rulayegi kya 😭",
  "ouch 🫠"
];


// UTILITIES

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
  btn.style.zIndex = 1000;

  btn.dataset.escaped = "true";

}


// DESKTOP TEASE ESCAPE

function teaseEscape(btn, x, y) {

  if (!btn || !userHasMoved) return;

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


// MOBILE RANDOM ESCAPE

function randomEscape(btn, attempts) {

  if (!btn) return;

  freezePosition(btn);

  vibrateOnEscape();

  const padding = 20;

  let x = Math.random() * (window.innerWidth - btn.offsetWidth - padding);
  let y = Math.random() * (window.innerHeight - btn.offsetHeight - padding);

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

}


// NO BUTTON LOGIC

if (noBtn) {

  if (!isTouchDevice) {

    noBtn.addEventListener("mousemove", (e) =>
      teaseEscape(noBtn, e.clientX, e.clientY)
    );

    noBtn.addEventListener("mouseenter", (e) =>
      teaseEscape(noBtn, e.clientX, e.clientY)
    );

  }

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


  noBtn.addEventListener("click", () => {

    if (!isTouchDevice) {

      desktopNoClicks++;

      if (desktopNoClicks === 1) {

        noBtn.textContent = "aisa? 🥺";

        stage1Img.style.opacity = 0;

        setTimeout(() => {

          stage1Img.src =
            "https://i.pinimg.com/originals/76/58/05/76580511f5c794b64bdba89e86a019ca.gif";

          stage1Img.style.opacity = 1;

        }, 150);

        return;

      }

    }

    stage1.classList.add("hidden");
    stage2.classList.remove("hidden");

  });

}


// YES BUTTON

if (yesBtn) {

  yesBtn.addEventListener("click", () => {

    stage1.classList.add("hidden");
    stage2.classList.remove("hidden");

  });

}


// DAARU BUTTON

if (daaruBtn) {

  daaruBtn.addEventListener("click", () => {

    stage2.classList.add("hidden");
    stage3.classList.remove("hidden");

  });

}


// YES2 BUTTON

if (yesBtn2) {

  yesBtn2.addEventListener("click", () => {

    stage2.classList.add("hidden");
    stage3.classList.remove("hidden");

  });

}
