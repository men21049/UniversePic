import { pictureOfTheDay } from "../data/nasaapi.mjs";

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
