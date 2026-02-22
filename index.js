// ===============================
// COUNTDOWN ENDED STATE
// ===============================

// Grab elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const memoryImage = document.getElementById("memoryImage");
const memoryText = document.getElementById("memoryText");

// Make sure elements exist before modifying
if (daysEl && hoursEl && minutesEl && secondsEl) {

  // Replace days with ????
  daysEl.textContent = "????";

  // Hide the other three boxes cleanly
  const hoursBox = hoursEl.parentElement;
  const minutesBox = minutesEl.parentElement;
  const secondsBox = secondsEl.parentElement;

  if (hoursBox) hoursBox.style.display = "none";
  if (minutesBox) minutesBox.style.display = "none";
  if (secondsBox) secondsBox.style.display = "none";
}

// Update image + message
if (memoryImage) {
  memoryImage.src =
    "https://i.pinimg.com/736x/a4/c6/d4/a4c6d44891723f0605eef5bd12db33f6.jpg";
}

if (memoryText) {
  memoryText.textContent =
    "waiting for the day when our plan doesn't cancel :')";
}
