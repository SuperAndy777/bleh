// ===== STAGES =====
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

// ===== BUTTONS =====
const noBtn = document.getElementById("no");
const daaruBtn = document.getElementById("daaru");
const yesBtn = document.getElementById("yes");
const yesBtn2 = document.getElementById("yes2");

// ===== IMAGE =====
const stage1Img = document.getElementById("stage1-img");
let cryImageShown = false;

// ===== DEVICE DETECTION =====
const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

// ===== DESKTOP MOVE GUARD =====
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

// ===== MOBILE DIFFICULTY =====
let noTouchAttempts = 0;
let daaruTouchAttempts = 0;
const MAX_MOBILE_ESCAPES = 5;

// ===== MOBILE TAUNTS =====
const noTeaseTexts = [
  "ayyo 🙁",
  "itna kya 🥸",
  "matlab aisa",
  "rulayegi kya 😭",
  "ouch 🫠"
];

const daaruTeaseTexts = [
  "bas ek sip 🍺",
  "soch le 👀",
  "last chance 😏",
  "pakka na? 🥺",
  "dil tod diya 💔"
];

// ===== UTILITIES =====
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

// ===== DESKTOP: TEASING ESCAPE =====
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

// ===== MOBILE: RANDOM ESCAPE =====
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

  x = Math.max(padding, Math.min(window.innerWidth - btn.offsetWidth - padding, x));
  y = Math.max(padding, Math.min(window.innerHeight - btn.offsetHeight - padding, y));

  btn.style.pointerEvents = "none";
  setTimeout(() => {
    btn.style.pointerEvents = "auto";
  }, 350);

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

// ===== NO BUTTON =====
if (!isTouchDevice) {
  noBtn.addEventListener("mousemove", (e) =>
    teaseEscape(noBtn, e.clientX, e.clientY)
  );
  noBtn.addEventListener("mouseenter", (e) =>
    teaseEscape(noBtn, e.clientX, e.clientY)
  );
} else {
  noBtn.addEventListener("touchstart", (e) => {
    if (noTouchAttempts < MAX_MOBILE_ESCAPES) {
      e.preventDefault();
      noTouchAttempts++;

      const tease =
        noTeaseTexts[Math.min(noTouchAttempts - 1, noTeaseTexts.length - 1)];
      noBtn.textContent = tease;


    // 💔 IMAGE CHANGE TRIGGER (with fade)
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
  stage1.classList.add("hidden");
  stage2.classList.remove("hidden");
});

// ===== DAARU BUTTON =====
if (!isTouchDevice) {
  daaruBtn.addEventListener("mousemove", (e) =>
    teaseEscape(daaruBtn, e.clientX, e.clientY)
  );
  daaruBtn.addEventListener("mouseenter", (e) =>
    teaseEscape(daaruBtn, e.clientX, e.clientY)
  );
} else {
  daaruBtn.addEventListener("touchstart", (e) => {
    if (daaruTouchAttempts < MAX_MOBILE_ESCAPES) {
      e.preventDefault();
      daaruTouchAttempts++;
      daaruBtn.textContent =
        daaruTeaseTexts[Math.min(daaruTouchAttempts - 1, daaruTeaseTexts.length - 1)];
      randomEscape(daaruBtn, daaruTouchAttempts);
    }
  });
}

daaruBtn.addEventListener("click", () => {
  stage2.classList.add("hidden");
  stage3.classList.remove("hidden");
});

// ===== YES BUTTONS =====
function finalYes() {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      background:linear-gradient(180deg,#eaf6ff,#cfe9ff);
      text-align:center;
      padding:20px;
      font-family:'Inter','Segoe UI',Arial;
    ">
      <h1 style="font-family:'Playfair Display',serif;font-size:30px;color:#2b6cb0;">
        YAYYYY 💙
      </h1>
      <img
        src="https://i.pinimg.com/736x/2a/69/bd/2a69bd3a0c657272a5ddac106dada255.jpg"
        style="width:200px;border-radius:20px;margin:20px 0;"
      >
      <p style="font-size:16px;color:#4a6fa5;">
        Ohana means we’re stuck now 🥹💙
      </p>
    </div>
  `;
}

yesBtn.addEventListener("click", finalYes);
yesBtn2.addEventListener("click", finalYes);
