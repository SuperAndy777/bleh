// =====================
// STAGE CONTROL
// =====================

const stages = document.querySelectorAll(".stage");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mePagalBtn = document.getElementById("mePagalBtn");
const bloodOverlay = document.getElementById("bloodOverlay");

function showStage(id) {
  stages.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// =====================
// DEVICE
// =====================

const isMobile = window.innerWidth <= 900;

// =====================
// NO BUTTON STATE
// =====================

let noClicks = 0;
let isCopter = false;
let animationFrame = null;

// =====================
// SMOOTH DESKTOP DODGE
// =====================

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

      const targetX = rect.left - dx * moveAmount;
      const targetY = rect.top - dy * moveAmount;

      moveSmoothly(targetX, targetY);
    }
  });
}

// =====================
// SMOOTH MOVE FUNCTION
// =====================

function moveSmoothly(targetX, targetY) {

  noBtn.style.position = "fixed";
  noBtn.style.zIndex = 1000;

  let currentX = noBtn.offsetLeft;
  let currentY = noBtn.offsetTop;

  function animate() {

    const dx = targetX - currentX;
    const dy = targetY - currentY;

    currentX += dx * 0.15;
    currentY += dy * 0.15;

    noBtn.style.left = currentX + "px";
    noBtn.style.top = currentY + "px";

    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      animationFrame = requestAnimationFrame(animate);
    }
  }

  cancelAnimationFrame(animationFrame);
  animate();
}

// =====================
// MOBILE TAP ESCAPE
// =====================

if (isMobile) {

  noBtn.addEventListener("click", (e) => {
    if (isCopter) return;
    e.preventDefault();
    handleNoProgress();
  });

}

// =====================
// NO CLICK PROGRESSION
// =====================

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

  noBtn.style.transform = "scale(" + (1 - noClicks * 0.1) + ")";

  if (noClicks === 1) noBtn.textContent = "Haww";
  if (noClicks === 2) noBtn.textContent = "Evil :(";

  if (noClicks === 3) {
    startCopterMode();
  }
}

// =====================
// COPTER MODE
// =====================

function startCopterMode() {

  isCopter = true;

  noBtn.style.position = "fixed";
  noBtn.style.zIndex = 1000;

  let angle = 0;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  function orbit() {

    angle += 0.05;

    const radiusX = window.innerWidth / 3;
    const radiusY = window.innerHeight / 3;

    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.transform = `rotate(${angle * 300}deg) scale(0.7)`;

    requestAnimationFrame(orbit);
  }

  orbit();
}

// =====================
// YES PATH
// =====================

yesBtn.addEventListener("click", () => {

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
