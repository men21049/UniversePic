import {
  imagesCarrusel,
  addAlert,
  displayRoverPhotos,
  loadHeaderFooter,
} from "./utils.mjs";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons.min.js";
UIkit.use(Icons);

loadHeaderFooter();

function validateSol() {
  let input = document.getElementById("sol").value;
  const container = document.getElementById("rover-photos-grid");
  let regex = /^\d+$/; // Matches one or more digits
  if (!regex.test(input)) {
    addAlert(container, "Please enter a valid sol number (digits only).");
  } else {
    displayRoverPhotos(input);
    imagesCarrusel();
  }
}

document.getElementById("searchGlass").addEventListener("click", (event) => {
  event.preventDefault();
  const solInput = document.getElementById("sol");
  if (solInput) {
    const sol = solInput.value.trim();
    if (sol) {
      validateSol();
    } else {
      addAlert(sol, "Please enter a sol number.");
    }
  }
});
