// =====================
// STAGE CONTROL
// =====================

const stages = document.querySelectorAll(".stage");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mePagalBtn = document.getElementById("mePagalBtn");
const bloodOverlay = document.getElementById("bloodOverlay");

let noClickCount = 0;
let copterMode = false;
let orbitInterval = null;

// Switch stage safely
function showStage(id) {
  stages.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// =====================
// DEVICE DETECTION
// =====================

const isMobile = window.innerWidth <= 900;

// =====================
// DESKTOP HOVER ESCAPE
// =====================

function desktopDodge(e) {
  if (isMobile || copterMode) return;

  const rect = noBtn.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 120) {
    const moveX = (Math.random() - 0.5) * 200;
    const moveY = (Math.random() - 0.5) * 200;
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
}

document.addEventListener("mousemove", desktopDodge);

// =====================
// MOBILE ESCAPE
// =====================

if (isMobile) {
  noBtn.addEventListener("click", (e) => {
    if (copterMode) return;
    e.preventDefault();
    chaosProgression();
  });
}

// =====================
// CHAOS PROGRESSION
// =====================

function chaosProgression() {

  noClickCount++;

  // Shrink progressively
  noBtn.style.transform += " scale(0.9)";

  if (noClickCount === 1) {
    noBtn.textContent = "Haww";
  }

  if (noClickCount === 2) {
    noBtn.textContent = "Evil :(";
  }

  if (noClickCount === 3) {
    preCopterWarning();
  }
}

// =====================
// PRE-COPTER SPIN
// =====================

function preCopterWarning() {

  noBtn.style.transition = "transform 0.2s linear";
  let angle = 0;

  const spin = setInterval(() => {
    angle += 20;
    noBtn.style.transform = `rotate(${angle}deg)`;
  }, 30);

  setTimeout(() => {
    clearInterval(spin);
    activateCopter();
  }, 1200);
}

// =====================
// BAMBOOCOPTER MODE
// =====================

function activateCopter() {

  copterMode = true;
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "1000";

  let angle = 0;
  const radiusX = window.innerWidth / 3;
  const radiusY = window.innerHeight / 3;

  orbitInterval = setInterval(() => {

    angle += 0.05;

    const x = window.innerWidth / 2 + radiusX * Math.cos(angle);
    const y = window.innerHeight / 2 + radiusY * Math.sin(angle);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.transform = `rotate(${angle * 200}deg)`;

  }, 16);
}

// Catch the copter
noBtn.addEventListener("click", () => {
  if (!copterMode) return;

  clearInterval(orbitInterval);
  showStage("stage2");
});

// =====================
// YES PATH
// =====================

yesBtn.addEventListener("click", () => {

  // Blood flood
  bloodOverlay.style.opacity = 1;
  document.body.classList.add("screen-shake");

  setTimeout(() => {
    showStage("stage3");
    bloodOverlay.style.opacity = 0;
    document.body.classList.remove("screen-shake");
  }, 800);
});

// =====================
// ME PAGAL
// =====================

mePagalBtn?.addEventListener("click", () => {
  showStage("stage4");
});
