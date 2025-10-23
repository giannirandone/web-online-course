// Profile Page JavaScript

const CONFIG = {
  HOVER_ANIMATION_TIME: 1100,
  CLICK_ANIMATION_TIME: 600,
  BIRTH_DATE: "1998-07-01",
};

// Dynamische Altersberechnung
function calculateAge() {
  const birthDate = new Date(CONFIG.BIRTH_DATE);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Wenn der Geburtstag dieses Jahr noch nicht war, Alter um 1 reduzieren
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// Profile card initialization
function initProfileCard() {
  const profileCard = document.querySelector(".profile-card");
  if (!profileCard) return;

  let isLockedAtAge = false;
  let clickCount = 0;

  // Hover-Effekt: d=1 (zum Alter + zurück)
  let isHovering = false;
  let hoverAnimationComplete = false;
  let hoverStartTime = 0;

  profileCard.addEventListener("mouseenter", function () {
    if (!isLockedAtAge) {
      isHovering = true;
      hoverAnimationComplete = false;
      hoverStartTime = Date.now();
      this.classList.add("hover-to-age");

      // Nach der Hover-Animation (0.5s delay + 0.6s animation = 1.1s)
      setTimeout(() => {
        hoverAnimationComplete = true;

        // Wenn nicht mehr gehovered wird, sofort zurückdrehen
        if (!isHovering) {
          this.classList.remove("hover-to-age");
        }
      }, CONFIG.HOVER_ANIMATION_TIME);
    }
  });

  profileCard.addEventListener("mouseleave", function () {
    if (!isLockedAtAge) {
      isHovering = false;

      // Wenn Animation noch läuft, warten bis sie fertig ist
      if (!hoverAnimationComplete) {
        const elapsed = Date.now() - hoverStartTime;
        const remaining = Math.max(0, CONFIG.HOVER_ANIMATION_TIME - elapsed);

        // Warten bis Animation fertig ist, dann sofort zurückdrehen
        setTimeout(() => {
          this.classList.remove("hover-to-age");
        }, remaining);
      } else {
        // Animation ist fertig, sofort zurückdrehen
        this.classList.remove("hover-to-age");
      }
    }
  });

  // Klick-Effekt: d=2 insgesamt
  profileCard.addEventListener("click", function () {
    clickCount++;

    if (clickCount === 1) {
      // 1. Klick: d=1.5 -> Alter
      isLockedAtAge = true;
      this.classList.add("click-1");
    } else if (clickCount === 2) {
      // 2. Klick: d=0.5 -> Alter (bleibt beim Alter)
      this.classList.remove("click-1");
      this.classList.add("click-2");
    } else if (clickCount === 3) {
      // 3. Klick: d=1 -> Bild (zurück zum Bild)
      isLockedAtAge = false;
      clickCount = 0;
      this.classList.remove("click-2");
      this.classList.add("click-3");

      // Nach der Animation alle Klick-Klassen entfernen
      setTimeout(() => {
        this.classList.remove("click-3");
      }, CONFIG.CLICK_ANIMATION_TIME);
    }
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  const ageElement = document.getElementById("age-number");
  if (ageElement) {
    ageElement.textContent = calculateAge();
  }

  initProfileCard();
});

// Optional: Alter täglich aktualisieren (falls jemand die Seite offen lässt)
setInterval(function () {
  const ageElement = document.getElementById("age-number");
  if (ageElement) {
    ageElement.textContent = calculateAge();
  }
}, 24 * 60 * 60 * 1000); // 24 Stunden
