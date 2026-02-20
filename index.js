document.addEventListener("DOMContentLoaded", () => {

  const stageMain = document.getElementById("stage-main");
  const stageNo = document.getElementById("stage-no-result");
  const stageYes = document.getElementById("stage-yes-burst");
  const stageFinal = document.getElementById("stage-final");

  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const btnRed = document.getElementById("btn-red");

  let noClicks = 0;
  let scale = 1;

  /* ============================= */
  /* STAGE SWITCH */
  /* ============================= */

  function switchStage(hide, show) {
    hide.classList.add("hidden");
    show.classList.remove("hidden");
  }

  /* ============================= */
  /* SMART NO MOVEMENT */
  /* ============================= */

  function moveNoSmart() {

    const padding = 40;

    const maxX = window.innerWidth - btnNo.offsetWidth - padding;
    const maxY = window.innerHeight - btnNo.offsetHeight - padding;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    btnNo.style.position = "fixed";
    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";
    btnNo.style.transition = "all 0.25s ease";

    const rotation = (Math.random() * 20) - 10;

    btnNo.style.transform = `
      scale(${scale})
      rotate(${rotation}deg)
    `;
  }

  /* ============================= */
  /* NO BUTTON LOGIC */
  /* ============================= */

  btnNo.addEventListener("click", () => {

    noClicks++;
    scale -= 0.25;
    if (scale < 0.3) scale = 0.3;

    if (noClicks === 1) btnNo.textContent = "Haww";
    if (noClicks === 2) btnNo.textContent = "Evil :(";

    if (noClicks >= 3) {
      switchStage(stageMain, stageNo);
      return;
    }

    moveNoSmart();
  });

  /* ============================= */
  /* PAGE SHAKE */
  /* ============================= */

  function shakePage() {
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 400);
  }

  /* ============================= */
  /* CINEMATIC BLOOD IMPACT */
  /* ============================= */

  function cinematicBloodImpact(originEl) {

    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // micro freeze
    document.body.classList.add("impact-freeze");
    setTimeout(() => {
      document.body.classList.remove("impact-freeze");
    }, 150);

    const splashCount = 18;

    for (let i = 0; i < splashCount; i++) {

      const splash = document.createElement("div");
      splash.classList.add("blood-splash");

      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 260;

      const targetX = originX + Math.cos(angle) * distance;
      const targetY = originY + Math.sin(angle) * distance;

      splash.style.left = originX + "px";
      splash.style.top = originY + "px";

      splash.style.setProperty("--targetX", targetX + "px");
      splash.style.setProperty("--targetY", targetY + "px");
      splash.style.setProperty("--rotation", Math.random() * 360 + "deg");
      splash.style.setProperty("--stretch", 1 + Math.random() * 2);

      document.body.appendChild(splash);

      setTimeout(() => splash.classList.add("blood-fade"), 1200);
      setTimeout(() => splash.remove(), 2200);
    }

    createCinematicVignette();
  }

  /* ============================= */
  /* VIGNETTE */
  /* ============================= */

  function createCinematicVignette() {

    const overlay = document.createElement("div");
    overlay.classList.add("blood-vignette");

    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 1800);
  }

  /* ============================= */
  /* YES BUTTON */
  /* ============================= */

  btnYes.addEventListener("click", () => {

    btnNo.style.display = "none";

    shakePage();
    cinematicBloodImpact(btnYes);

    // cinematic delay before stage switch
    setTimeout(() => {
      switchStage(stageMain, stageYes);
    }, 900);
  });

  /* ============================= */
  /* RED BUTTON */
  /* ============================= */

  btnRed.addEventListener("click", () => {
    switchStage(stageYes, stageFinal);
  });

});
