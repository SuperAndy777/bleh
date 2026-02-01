// ===== STAGES =====
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

// ===== BUTTONS =====
const noBtn = document.getElementById("no");
const daaruBtn = document.getElementById("daaru");
const yesBtn = document.getElementById("yes");
const yesBtn2 = document.getElementById("yes2");

let daaruLocked = false;

// ===== MOVE LOGIC =====
function moveButton(btn) {
  const padding = 20;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x, y;
  let safe = false;

 const yesBtn = document.getElementById("yes");
const yesRect = yesBtn ? yesBtn.getBoundingClientRect() : null;

  while (!safe) {
    x = Math.random() * (viewportWidth - btn.offsetWidth - padding);
    y = Math.random() * (viewportHeight - btn.offsetHeight - padding);

    // Prevent covering YES button (only for daaru)
    if (btn.id === "daaru" && yesRect) {
      const overlap =
        x < yesRect.right &&
        x + btn.offsetWidth > yesRect.left &&
        y < yesRect.bottom &&
        y + btn.offsetHeight > yesRect.top;

      if (overlap) continue;
    }

    safe = true;
  }

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

// ===== NO BUTTON (STAGE 1) =====
noBtn.addEventListener("mousemove", () => moveButton(noBtn));
noBtn.addEventListener("mouseenter", () => moveButton(noBtn));

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveButton(noBtn);
});

// Switch to stage 2 (almost impossible 😈)
noBtn.addEventListener("click", () => {
  stage1.classList.add("hidden");
  stage2.classList.remove("hidden");
});

// ===== DAARU BUTTON (STAGE 2) =====
daaruBtn.addEventListener("mousemove", () => {
  if (!daaruLocked) moveButton(daaruBtn);
});

daaruBtn.addEventListener("mouseenter", () => {
  if (!daaruLocked) moveButton(daaruBtn);
});

daaruBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (!daaruLocked) moveButton(daaruBtn);
});

// Catching daaru = surrender 🍻
daaruBtn.addEventListener("click", () => {
  daaruLocked = true;
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
      font-family:'Poppins','Segoe UI',Arial;
    ">
      <h1 style="font-size:30px;color:#2b6cb0;">YAYYYY 💙</h1>
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
