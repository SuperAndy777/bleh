// ===== STAGES =====
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

// ===== BUTTONS =====
const noBtn = document.getElementById("no");
const daaruBtn = document.getElementById("daaru");
const yesBtn = document.getElementById("yes");
const yesBtn2 = document.getElementById("yes2");

// ===== DEVICE DETECTION =====
const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

// ===== USER MOVE GUARD (DESKTOP) =====
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

// ===== MOBILE ATTEMPTS =====
let noTouchAttempts = 0;
let daaruTouchAttempts = 0;
const MAX_MOBILE_ESCAPES = 3;

// ===== ESCAPE CONTROL =====
let escapeDisabled = false;

// ===== TEASING ESCAPE LOGIC =====
function teaseEscape(btn, clientX, clientY) {
  if (escapeDisabled) return;

  // Desktop guard
  if (!isTouchDevice && !userHasMoved) return;

  // Freeze initial position
  if (!btn.dataset.escaped) {
    const rect = btn.getBoundingClientRect();
    btn.style.position = "fixed";
    btn.style.left = rect.left + "px";
    btn.style.top = rect.top + "px";
    btn.style.zIndex = 1000;
    btn.dataset.escaped = "true";
  }

  const btnRect = btn.getBoundingClientRect();

  // Button center
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  // Direction vector (cursor/touch → button)
  let dx = clientX - btnCenterX;
  let dy = clientY - btnCenterY;

  const distance = Math.sqrt(dx * dx + dy * dy) || 1;
  dx /= distance;
  dy /= distance;

  // Tease distance (smaller on mobile)
  const moveDistance = isTouchDevice ? 60 : 80;

  let newX = btnRect.left - dx * moveDistance;
  let newY = btnRect.top - dy * moveDistance;

  // Clamp to viewport
  const padding = 10;
  newX = Math.max(
    padding,
    Math.min(window.innerWidth - btnRect.width - padding, newX)
  );
  newY = Math.max(
    padding,
    Math.min(window.innerHeight - btnRect.height - padding, newY)
  );

  btn.style.left = `${newX}px`;
  btn.style.top = `${newY}px`;
}

// ===== NO BUTTON =====
if (!isTouchDevice) {
  // Desktop
  noBtn.addEventListener("mousemove", (e) =>
    teaseEscape(noBtn, e.clientX, e.clientY)
  );
  noBtn.addEventListener("mouseenter", (e) =>
    teaseEscape(noBtn, e.clientX, e.clientY)
  );
} else {
  // Mobile
  noBtn.addEventListener("touchstart", (e) => {
    if (noTouchAttempts < MAX_MOBILE_ESCAPES) {
      e.preventDefault();
      noTouchAttempts++;
      const touch = e.touches[0];
      teaseEscape(noBtn, touch.clientX, touch.clientY);
    }
  });
}

// Allow click after teasing
noBtn.addEventListener("click", () => {
  stage1.classList.add("hidden");
  stage2.classList.remove("hidden");
});

// ===== DAARU BUTTON =====
if (!isTouchDevice) {
  // Desktop
  daaruBtn.addEventListener("mousemove", (e) =>
    teaseEscape(daaruBtn, e.clientX, e.clientY)
  );
  daaruBtn.addEventListener("mouseenter", (e) =>
    teaseEscape(daaruBtn, e.clientX, e.clientY)
  );
} else {
  // Mobile
  daaruBtn.addEventListener("touchstart", (e) => {
    if (daaruTouchAttempts < MAX_MOBILE_ESCAPES) {
      e.preventDefault();
      daaruTouchAttempts++;
      const touch = e.touches[0];
      teaseEscape(daaruBtn, touch.clientX, touch.clientY);
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
