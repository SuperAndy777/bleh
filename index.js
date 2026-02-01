// ===== STAGES =====
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

// ===== BUTTONS =====
const noBtn = document.getElementById("no");
const daaruBtn = document.getElementById("daaru");
const yesBtn = document.getElementById("yes");
const yesBtn2 = document.getElementById("yes2");

// ===== USER MOVE GUARD =====
let userHasMoved = false;
document.addEventListener("mousemove", () => {
  userHasMoved = true;
}, { once: true });

// ===== ESCAPE CONTROL =====
let escapeDisabled = false;

// ===== TEASING ESCAPE LOGIC =====
function teaseEscape(btn, event) {
  if (!userHasMoved || escapeDisabled) return;

  // Freeze position on first escape
  if (!btn.dataset.escaped) {
    const rect = btn.getBoundingClientRect();
    btn.style.position = "fixed";
    btn.style.left = rect.left + "px";
    btn.style.top = rect.top + "px";
    btn.style.zIndex = 1000;
    btn.dataset.escaped = "true";
  }

  const btnRect = btn.getBoundingClientRect();

  // Cursor position
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // Button center
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  // Direction vector (button -> cursor)
  let dx = cursorX - btnCenterX;
  let dy = cursorY - btnCenterY;

  // Normalize vector
  const distance = Math.sqrt(dx * dx + dy * dy) || 1;
  dx /= distance;
  dy /= distance;

  // Tease distance (small & smooth)
  const moveDistance = 80;

  let newX = btnRect.left - dx * moveDistance;
  let newY = btnRect.top - dy * moveDistance;

  // Keep inside viewport
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
noBtn.addEventListener("mousemove", (e) => teaseEscape(noBtn, e));
noBtn.addEventListener("mouseenter", (e) => teaseEscape(noBtn, e));

noBtn.addEventListener("mousedown", () => {
  escapeDisabled = true;
});
noBtn.addEventListener("mouseup", () => {
  escapeDisabled = false;
});

noBtn.addEventListener("click", () => {
  stage1.classList.add("hidden");
  stage2.classList.remove("hidden");
});

// ===== DAARU BUTTON =====
daaruBtn.addEventListener("mousemove", (e) => teaseEscape(daaruBtn, e));
daaruBtn.addEventListener("mouseenter", (e) => teaseEscape(daaruBtn, e));

daaruBtn.addEventListener("mousedown", () => {
  escapeDisabled = true;
});
daaruBtn.addEventListener("mouseup", () => {
  escapeDisabled = false;
});

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
