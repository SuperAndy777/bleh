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
  /* FADE SWITCH */
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
    btnNo.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
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
  /* BLOOD FLASH */
  /* ============================= */

  function bloodFlash() {

    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.background =
      "radial-gradient(circle at center, rgba(214,40,40,0.7) 0%, rgba(255,255,255,0) 60%)";
    flash.style.zIndex = "9999";
    flash.style.pointerEvents = "none";
    flash.style.animation = "fadeBlood 0.6s ease-out forwards";

    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 600);
  }

  function bloodExplosion() {

  const count = 18;

  for (let i = 0; i < count; i++) {

    const stain = document.createElement("div");
    stain.classList.add("blood-stain");

    stain.style.left = Math.random() * 100 + "vw";
    stain.style.top = Math.random() * 100 + "vh";

    stain.style.transform = `
      scale(${0.6 + Math.random() * 1.4})
      rotate(${Math.random() * 360}deg)
    `;

    document.body.appendChild(stain);

    setTimeout(() => {
      stain.classList.add("fade-out");
    }, 800);

    setTimeout(() => {
      stain.remove();
    }, 1600);
  }
}


  /* ============================= */
  /* YES BUTTON */
  /* ============================= */

  btnYes.addEventListener("click", () => {

    btnNo.style.display = "none";

    shakePage();
    bloodExplosion();

    setTimeout(() => {
      switchStage(stageMain, stageYes);
    }, 600);

  });

  /* ============================= */
  /* RED BUTTON */
  /* ============================= */

  btnRed.addEventListener("click", () => {
    switchStage(stageYes, stageFinal);
  });

});
