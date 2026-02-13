// =====================================
// DATE SELECTION SYSTEM
// =====================================

const dateImg = document.getElementById("date-img");
const dateText = document.getElementById("date-text");

const dateButtons = document.querySelectorAll(".date-btn");


// change image + text on click

dateButtons.forEach(button => {

  button.addEventListener("click", () => {

    const newImg = button.dataset.img;
    const newText = button.dataset.text;

    // fade out
    dateImg.style.opacity = 0;

    setTimeout(() => {

      dateImg.src = newImg;
      dateText.textContent = newText;

      // fade back in
      dateImg.style.opacity = 1;

    }, 150);

  });

});


// =====================================
// IMAGE PRELOAD (PREVENT FLICKER)
// =====================================

const preloadImages = [

  "https://i.pinimg.com/originals/46/7d/b3/467db334bc0795ad62c25cf139a13989.gif",

  "https://i.pinimg.com/originals/16/96/f5/1696f596624f3e950da72b01490c7d27.gif",

  "https://i.pinimg.com/1200x/6b/c7/2c/6bc72cb41991ea6c0f51d18681557922.jpg",

  "https://i.pinimg.com/originals/bf/cc/b7/bfccb713592884a0f466f3495fcbce58.gif"

];


preloadImages.forEach(src => {

  const img = new Image();
  img.src = src;

});
