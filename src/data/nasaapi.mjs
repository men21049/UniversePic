import { getLocalStorage, setLocalStorage } from "./localstorage.mjs";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export async function pictureOfTheDay() {
  if (getLocalStorage("pictureOfTheDay").length === 0) {
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
      setLocalStorage("pictureOfTheDay", data);
      return data; // This returns the full data object from NASA
    } catch (err) {
      console.error("Error fetching picture:", err);
    }
  }

  return getLocalStorage("pictureOfTheDay");
}
