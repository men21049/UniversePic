import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "./localstorage.mjs";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export async function pictureOfTheDay() {
  try {
    // Call the proxy endpoint
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY
    );

    if (!response) {
      const errorData = await response.json();
      throw new Error(
        errorData.msg || "Failed to fetch from NASA API via proxy"
      );
    }

    const data = await response.json();
    const picdate = new Date(data.date);
    const currentDate = new Date();

    if (picdate < currentDate) {
      clearLocalStorage("pictureOfTheDay");
    }

    setLocalStorage("pictureOfTheDay", data);
  } catch (err) {
    throw new Error(err || "Error fetching picture:" + err.message);
  }

  return getLocalStorage("pictureOfTheDay");
}

export async function getRoverPhotos(sol = 0, camera = "FHAZ") {
  try {
    const response = await fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" +
        sol +
        "&camera=" +
        camera +
        "&api_key=" +
        API_KEY
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Failed to fetch Mars Rover photos");
    }

    const data = await response.json();

    return data.photos;
  } catch (err) {
    throw new Error(err.message || "Error fetching rover photos:" + err);
  }
}

export async function getImagesNasa(query) {
  try {
    const response = await fetch(
      "https://images-api.nasa.gov/search?q=" +
        query +
        "&media_type=image&page_size=15"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images from NASA API");
    }

    const data = await response.json();
    return data.collection.items;
  } catch (err) {
    throw new Error(err.message || "Error fetching rover photos:" + err);
  }
}

export async function getEpicImages() {
  try {
    const response = await fetch(
      "https://api.nasa.gov/EPIC/api/natural?api_key=" + API_KEY
    );

    if (!response.ok) {
      throw new Error("Failed to fetch EPIC images from NASA API");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Error fetching EPIC images:" + err);
  }
}
