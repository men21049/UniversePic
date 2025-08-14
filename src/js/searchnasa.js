import {
  loadHeaderFooter,
  displayNasaImages,
  fetchNasaImages,
} from "./utils.mjs";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons.min.js";
UIkit.use(Icons);

loadHeaderFooter();

document
  .getElementById("searchGlass")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search");
    if (searchInput) {
      const query = searchInput.value.trim();
      const result = await fetchNasaImages(query);
      displayNasaImages(result);
    }
  });
