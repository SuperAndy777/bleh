document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     ELEMENTS
  =============================== */

  const stageMain = document.getElementById("stage-main");
  const stageNo = document.getElementById("stage-no-result");
  const stageYes = document.getElementById("stage-yes-burst");
  const stageFinal = document.getElementById("stage-final");

  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const btnRed = document.getElementById("btn-red");

  let noClickCount = 0;

  /* ===============================
     YES CLICK
  =============================== */

  btnYes.addEventListener("click", function () {

    createBloodExplosion();

    stageMain.classList.add("hidden");
    stageYes.classList.remove("hidden");

  });

  /* ===============================
     NO CLICK (Shrinks + Moves)
  =============================== */

  btnNo.addEventListener("click", function () {

    noClickCount++;

    if (noClickCount === 1) {
      btnNo.textContent = "Haww";
      shrinkButton(btnNo);
      moveRandom(btnNo);
    }

    else if (noClickCount === 2) {
      btnNo.textContent = "Evil :(";
      shrinkButton(btnNo);
      moveRandom(btnNo);
    }

    else {
      stageMain.classList.add("hidden");
      stageNo.classList.remove("hidden");
    }

  });

  /* ===============================
     RED BUTTON → FINAL
  =============================== */

  btnRed.addEventListener("click", function () {

    stageYes.classList.add("hidden");
    stageFinal.classList.remove("hidden");

  });

  /* ===============================
     SHRINK FUNCTION
  =============================== */

  function shrinkButton(button) {
    const currentSize = parseFloat(window.getComputedStyle(button).fontSize);
    button.style.fontSize = (currentSize - 4) + "px";
    button.style.padding = "6px 20px";
  }

  /* ===============================
     RANDOM MOVE FUNCTION
  =============================== */

  function moveRandom(button) {

    button.style.position = "absolute";

    const maxX = window.innerWidth - button.offsetWidth - 50;
    const maxY = window.innerHeight - button.offsetHeight - 50;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    button.style.left = randomX + "px";
    button.style.top = randomY + "px";
  }

  /* ===============================
     CINEMATIC BLOOD EXPLOSION
  =============================== */

  function createBloodExplosion() {

    for (let i = 0; i < 15; i++) {

      const blood = document.createElement("div");
      blood.classList.add("blood-splash");

      const size = Math.random() * 80 + 40;

      blood.style.width = size + "px";
      blood.style.height = size + "px";
      blood.style.background = "radial-gradient(circle at center, #7a0000 30%, #3b0000 70%)";
      blood.style.borderRadius = "50%";

      blood.style.left = Math.random() * window.innerWidth + "px";
      blood.style.top = Math.random() * window.innerHeight + "px";

      blood.style.opacity = "0";
      blood.style.transition = "all 1s ease";

      document.body.appendChild(blood);

      setTimeout(() => {
        blood.style.opacity = "0.85";
        blood.style.transform = "scale(1.2)";
      }, 50);

      setTimeout(() => {
        blood.style.opacity = "0";
      }, 1200);

      setTimeout(() => {
        blood.remove();
      }, 2000);
    }
  }

});
