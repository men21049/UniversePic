document.addEventListener("DOMContentLoaded", () => {
  const mainPic = document.getElementById("dayImage");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const setBgBtn = document.getElementById("setBackground");

  // Ensure modal is hidden on load
  modal.style.display = "none";
  // Open modal on image click
  mainPic.addEventListener("click", () => {
    modal.style = "display:flex; flex-direction: column;";
    modalImg.src = mainPic.src;
    captionText.innerHTML = mainPic.alt;
  });

  // Close modal with X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Open in new tab for "Set as Background"
  setBgBtn.addEventListener("click", () => {
    window.open(modalImg.src, "_blank");
  });
});
