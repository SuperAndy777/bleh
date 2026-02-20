// ============================
// STAGE CONTROL
// ============================

const stages = document.querySelectorAll(".stage");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mePagalBtn = document.getElementById("mePagalBtn");
const bloodOverlay = document.getElementById("bloodOverlay");

function showStage(id) {
  stages.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ============================
// DEVICE DETECTION
// ============================

const isMobile = window.innerWidth <= 900;

// ============================
// NO BUTTON STATE
// ============================

let noClicks = 0;
let isCopter = false;
let animationFrame = null;

// ============================
// SMOOTH DESKTOP DODGE
// ============================

if (!isMobile) {

  document.addEventListener("mousemove", (e) => {

    if (isCopter) return;

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = e.clientX - centerX;
    let dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 130) {

      dx /= distance;
      dy /= distance;

      const moveAmount = 90;

      let targetX = rect.left - dx * moveAmount;
      let targetY = rect.top - dy * moveAmount;

      noBtn.style.position = "fixed";
      noBtn.style.zIndex = 1000;

      // allow slight edge escape
      const padding = -rect.width / 3;

      targetX = Math.max(padding,
        Math.min(window.innerWidth - rect.width - padding, targetX));

      targetY = Math.max(padding,
        Math.min(window.innerHeight - rect.height - padding, targetY));

      noBtn.style.left = targetX + "px";
      noBtn.style.top = targetY + "px";
    }
  });

}

// ============================
// MOBILE TAP ESCAPE
// ============================

if (isMobile) {
  noBtn.addEventListener("click", (e) => {
    if (isCopter) return;
    e.preventDefault();
    handleNoProgress();
  });
}

// ============================
// NO CLICK PROGRESSION
// ============================

noBtn.addEventListener("click", () => {

  if (isCopter) {
    showStage("stage2");
    return;
  }

  if (!isMobile) {
    handleNoProgress();
  }
});

function handleNoProgress() {

  noClicks++;

  const scaleValue = 1 - noClicks * 0.1;
  noBtn.style.transform = `scale(${scaleValue})`;

  if (noClicks === 1) noBtn.textContent = "Haww";
  if (noClicks === 2) noBtn.textContent = "Evil :(";

  if (noClicks === 3) {
    preSpinThenCopter();
  }
}

// ============================
// PRE-SPIN WARNING
// ============================

function preSpinThenCopter() {

  let angle = 0;

  const spinInterval = setInterval(() => {
    angle += 25;
    noBtn.style.transform = `rotate(${angle}deg) scale(0.7)`;
  }, 30);

  setTimeout(() => {
    clearInterval(spinInterval);
    startCopterMode();
  }, 900);
}

// ============================
// PHYSICS COPTER MODE
// ============================

function startCopterMode() {

  isCopter = true;

  noBtn.style.position = "fixed";
  noBtn.style.zIndex = 1000;
  noBtn.style.transformOrigin = "center";

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  let velocityX = (Math.random() - 0.5) * 6;
  let velocityY = (Math.random() - 0.5) * 6;

  let speedRamp = 1;
  const maxRamp = 3.2;

  let angle = 0;

  function animate() {

    if (speedRamp < maxRamp) {
      speedRamp += 0.02;   // ramps over ~3 seconds
    }

    x += velocityX * speedRamp;
    y += velocityY * speedRamp;

    const rect = noBtn.getBoundingClientRect();

    // bounce on edges (smooth)
    if (x <= 0 || x >= window.innerWidth - rect.width) {
      velocityX *= -1;
    }

    if (y <= 0 || y >= window.innerHeight - rect.height) {
      velocityY *= -1;
    }

    x = Math.max(0, Math.min(x, window.innerWidth - rect.width));
    y = Math.max(0, Math.min(y, window.innerHeight - rect.height));

    angle += 20 * speedRamp;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.transform = `rotate(${angle}deg) scale(0.7)`;

    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

// ============================
// YES PATH (Blood Transition)
// ============================

yesBtn.addEventListener("click", () => {

  bloodOverlay.style.opacity = 1;
  document.body.classList.add("screen-shake");

  setTimeout(() => {
    showStage("stage3");
    bloodOverlay.style.opacity = 0;
    document.body.classList.remove("screen-shake");
  }, 800);
});

// ============================
// ME PAGAL
// ============================

if (mePagalBtn) {
  mePagalBtn.addEventListener("click", () => {
    showStage("stage4");
  });
}
