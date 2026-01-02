/**
 * UI Library - Home Page
 * -----------------------
 * Landing page for browsing component collections
 */

// Add hover effects to collection cards
const collectionCards = document.querySelectorAll(".collection-card");

collectionCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-4px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
