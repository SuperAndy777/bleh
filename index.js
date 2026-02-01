// ===== STAGES =====
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");

// ===== BUTTONS =====
const noBtn = document.getElementById("no");
const daaruBtn = document.getElementById("daaru");
const yesBtn = document.getElementById("yes");
const yesBtn2 = document.getElementById("yes2");

// ===== ESCAPE LOGIC =====
function escape(btn) {
  // Freeze position on first escape
  if (!btn.dataset.escaped) {
    const rect = btn.getBoundingClientRect();
    btn.style.position = "fixed";
    btn.style.left = rect.left + "px";
    btn.style.top = rect.top + "px";
    btn.style.zIndex = 1000;
    btn.dataset.escaped = "true";
  }

  const padding = 20;
  const maxX = window.innerWidth - btn.offsetWidth - padding;
  const maxY = window.innerHeight - btn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

// ===== NO BUTTON =====
noBtn.addEventListener("mouseenter", () => escape(noBtn));
noBtn.addEventListener("mousemove", () => escape(noBtn));

// Touch support
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  escape(noBtn);
});

// ===== DAARU BUTTON =====
daaruBtn.addEventListener("mouseenter", () => escape(daaruBtn));
daaruBtn.addEventListener("mousemove", () => escape(daaruBtn));

// Touch support
daaruBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  escape(daaruBtn);
});

// ===== DAARU CLICK → GIVE UP =====
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
