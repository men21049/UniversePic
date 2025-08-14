import {
  pictureOfTheDay,
  getRoverPhotos,
  getImagesNasa,
  getEpicImages,
} from "../data/nasaapi.mjs";
import { newsArticles, searchArticles } from "../data/newArticles.mjs";
import UIkit from "uikit";

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement?.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.innerHTML = templateFn;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export async function getMainPic() {
  try {
    const data = await pictureOfTheDay();
    if (!data) {
      throw new Error("Failed to fetch the picture of the day");
    }
    return data.url;
  } catch (err) {
    console.error("Error fetching the main picture:", err);
  }
}

export async function getPicTitle() {
  try {
    const data = await pictureOfTheDay();
    if (!data) {
      throw new Error("Failed to fetch the picture title");
    }
    return data.title;
  } catch (err) {
    console.error("Error fetching the picture title:", err);
  }
}

export async function displayMainPic(targetElement) {
  const mainPicUrl = await getMainPic();

  const mainPicElement = document.getElementById(targetElement);
  const mainPicTitle = document.querySelector(".hero-caption");

  if (!mainPicElement) {
    console.error(`Element with ID "${targetElement}" not found in DOM.`);
    return;
  }

  if (mainPicUrl) {
    mainPicElement.src = mainPicUrl;
    mainPicElement.alt = "NASA's Picture of the Day:" + (await getPicTitle());
    mainPicTitle.textContent =
      (await getPicTitle()) + " - Click to view in full size";
  } else if (mainPicElement.src) {
    mainPicElement.style.display = "none"; // Hide the image if no URL is available
    mainPicTitle.innerText = "No picture available for today.";
    mainPicTitle.style.display = "block"; // Ensure the title is displayed
  } else {
    console.error("No picture available to display.");
  }
}

export async function renderArticles(data = null) {
  const grid = document.getElementById("articles-grid");
  const articlesData = data || (await newsArticles());
  const articles = articlesData.results || [];

  grid.innerHTML = ""; // Limpia el grid

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="section-card uk-card uk-card-default uk-card-hover uk-animation-toggle" tabindex="0">
        <div class="uk-card-media-top">
          <img src="${article.image_url ||
            "https://via.placeholder.com/150"}" alt="${
      article.title
    }" style="height:120px;object-fit:cover;">
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title uk-margin-remove-bottom">${
            article.title
          }</h3>
          <h2 class="uk-text-meta uk-margin-remove-top">By ${
            article.news_site
          }</h2>
          <p class="uk-text-meta uk-margin-remove-top">
            ${article.summary}
          <a href="${
            article.url
          }" target="_blank" class="uk-button uk-button-text"> More info ...</a>
          </p>
        </div>
      </div>
    `;
    // Animación al hacer click
    card.querySelector(".section-card").addEventListener("click", function() {
      this.classList.add("uk-animation-shake");
      setTimeout(() => this.classList.remove("uk-animation-shake"), 600);
    });
    grid.appendChild(card);
  });
}

export async function filteredArticles(query) {
  const articlesData = await searchArticles(query);
  return articlesData;
}

export async function displayRoverPhotos(sol) {
  const roverGrid = document.getElementById("rover-photos-grid");
  getRoverPhotos(sol).then((photos) => {
    if (!photos || photos.length === 0) {
      roverGrid.innerHTML = "<p>No photos available.</p>";
      return;
    }
    photos.forEach((photo) => {
      roverGrid.innerHTML = "";
      const photoCard = document.createElement("div");

      photoCard.innerHTML = `
        <div class="section-card uk-card uk-card-default uk-card-hover uk-animation-toggle" uk-lightbox>
          <img src="${
            photo.img_src
          }" alt="Mars Rover Photo" style="height:120px;object-fit:cover;">
          <a class="uk-button uk-button-default" href="${
            photo.img_src
          }"><h3 class="uk-card-title">${photo.rover.name} - Sol ${
        photo.sol
      } click here for the full image</h3></a>
          <p>Taken on ${new Date(photo.earth_date).toLocaleDateString()}</p>
        </div>
      `;
      roverGrid.appendChild(photoCard);
    });
  });
}

export async function fetchNasaImages(query) {
  const nasaImages = await getImagesNasa(query);
  const items = nasaImages.map((item) => ({
    title: item.data[0]?.title || "No title",
    description: item.data[0]?.description || "No description",
    thumbnail: item.links?.[0]?.href || null,
  }));
  return items;
}
export async function displayNasaImages(items) {
  const images = document.getElementById("slideshow");
  images.innerHTML = "";

  items.forEach((item) => {
    const slide = document.createElement("li");
    slide.innerHTML = `<img src="${item.thumbnail}" alt="${item.title}" uk-cover>`;
    const caption = document.createElement("div");
    caption.className =
      "uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom";
    caption.innerHTML = `<p class="uk-margin-remove">${item.title}</p>`;
    slide.appendChild(caption);
    images.appendChild(slide);
  });
}

export async function addAlert(element, text) {
  if (!element || typeof element.appendChild !== "function") {
    throw new Error("El elemento proporcionado no es un nodo DOM válido.");
  }
  const alert = document.createElement("div");
  alert.className = "uk-alert uk-alert-warning";
  alert.setAttribute("uk-alert", "");
  alert.innerHTML = `
    <a class="uk-alert-close" uk-close></a>
    <p>${text}</p>
  `;
  element.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

export async function imagesCarrusel() {
  const images = document.getElementById("slideshow");
  if (!images) {
    console.error("Element with ID 'slideshow' not found in DOM.");
    return;
  }
  const items = await getEpicImages();
  if (!items || items.length === 0) {
    addAlert(images, "No images available for the carousel.");
    return;
  }

  items.forEach((item) => {
    const slide = document.createElement("li");
    const year = item.identifier.slice(0, 4);
    const month = item.identifier.slice(4, 6);
    const day = item.identifier.slice(6, 8);
    slide.innerHTML = `<img src="https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png" alt="${item.caption}" uk-cover>`;
    const caption = document.createElement("div");
    caption.className =
      "uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom";
    caption.innerHTML = `<p class="uk-margin-remove">${item.caption}</p>`;
    slide.appendChild(caption);
    images.appendChild(slide);
  });

  UIkit.slideshow(images, {
    autoplay: true,
    ratio: "16:9",
    minHeight: "300px",
  });
}
