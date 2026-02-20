document.addEventListener("DOMContentLoaded", () => {

  const stageMain = document.getElementById("stage-main");
  const stageNo = document.getElementById("stage-no-result");
  const stageYes = document.getElementById("stage-yes-burst");
  const stageFinal = document.getElementById("stage-final");

  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const btnRed = document.getElementById("btn-red");

  const heartContainer = document.getElementById("heart-container");

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

  /* ============================= */
  /* HEART RAIN */
  /* ============================= */

  function createHeart() {

    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (2 + Math.random() * 2) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }

  function startHearts() {
    for (let i = 0; i < 25; i++) {
      setTimeout(createHeart, i * 100);
    }
  }

  /* ============================= */
  /* YES BUTTON */
  /* ============================= */

  btnYes.addEventListener("click", () => {

    btnNo.style.display = "none";

    shakePage();
    bloodFlash();
    startHearts();

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
