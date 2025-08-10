const mainPic = document.getElementById("dayImage");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("fullImage");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
const setBgBtn = document.getElementById("setBackground");

// Open modal with zoom animation
mainPic.onclick = function() {
  modal.style.display = "flex";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};

// Close modal
closeBtn.onclick = function() {
  modal.style.display = "none";
};

// Click outside image closes modal
modal.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Open image in new tab for "Set as background"
setBgBtn.onclick = function() {
  window.open(modalImg.src, "_blank");
};
