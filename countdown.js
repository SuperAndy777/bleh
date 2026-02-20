document.addEventListener("DOMContentLoaded", () => {

  const dayLabel = document.getElementById("day-label");
  const dayImage = document.getElementById("day-image");
  const dayText = document.getElementById("day-text");
  const nextBtn = document.getElementById("next-day");
  const finalMessage = document.getElementById("final-message");
  const pageInner = document.getElementById("page-inner");

  let currentDay = 0;

  const days = [
    {
      label: "Day 1",
      img: "https://i.pinimg.com/736x/31/98/c4/3198c4160125e36f9a2d5a334d751d2a.jpg",
      text: "Valentines pe akela 😭"
    },
    {
      label: "Day 2",
      img: "https://i.pinimg.com/736x/59/4b/a2/594ba2ac05671ca5726a42391b89e4ab.jpg",
      text: "1 WEEK MOREEEEE????!!! AHHHH (p.s. tis image is so accurate me :))"
    },
    {
      label: "Day 3",
      img: "https://i.pinimg.com/736x/a5/8d/95/a58d95a04bcdd947923aecdf6c4981e4.jpg",
      text: "6 days? this is so slowww"
    },
    {
      label: "Day 4",
      img: "https://i.pinimg.com/736x/ca/30/dc/ca30dc0afb0a51c688715b7abd632425.jpg",
      text: "5 days left..."
    },
    {
      label: "Day 5",
      img: "https://i.pinimg.com/originals/d5/fb/83/d5fb83e26bfd4ec440abaec15bdc0f21.gif",
      text: "Only 4 more to go :)"
    },
    {
      label: "Day 6",
      img: "https://i.pinimg.com/736x/c0/80/50/c080506c954483e4dffecdccbc5a4c63.jpg",
      text: "Only THREEEEEE, YAY"
    },
    {
      label: "Day 7",
      img: "https://i.pinimg.com/originals/a1/c4/a4/a1c4a498d28d9f1af3e1145f266350ea.gif",
      text: "2 days more ah, i can't"
    },
    {
      label: "Day 8",
      img: "https://i.pinimg.com/originals/eb/37/2c/eb372cdc7cbc316fa0f62cdac7c2f91a.gif",
      text: "TOMORRRROWWW!"
    },
    {
      label: "Day 9",
      img: "https://i.pinimg.com/originals/7e/ca/2e/7eca2e7d1f128311f53be28fe3979806.gif",
      text: "Yayyyyyyy, can't wait!"
    }
  ];

  function updateDay() {
    const day = days[currentDay];

    dayLabel.textContent = day.label;
    dayImage.src = day.img;
    dayText.textContent = day.text;

    if (currentDay === days.length - 1) {
      nextBtn.style.display = "none";
      finalMessage.classList.remove("hidden");
    }
  }

  function flipPage() {
    pageInner.classList.add("flip");

    setTimeout(() => {
      updateDay();
      pageInner.classList.remove("flip");
    }, 300);
  }

  nextBtn.addEventListener("click", () => {
    if (currentDay < days.length - 1) {
      currentDay++;
      flipPage();
    }
  });

  updateDay();

});
