import { getLocalStorage, setLocalStorage } from "./localstorage.mjs";

export async function pictureOfTheDay() {
  if (!getLocalStorage("pictureOfTheDay")) {
    try {
      // Call the proxy endpoint
      const response = await fetch("/api/planetary/apod");

      if (!response) {
        const errorData = await response.json();
        throw new Error(
          errorData.msg || "Failed to fetch from NASA API via proxy"
        );
      }

      const data = await response.json();
      if (getLocalStorage()) {
        setLocalStorage("pictureOfTheDay", data);
      }
      return data; // This returns the full data object from NASA
    } catch (err) {
      console.error("Error fetching picture:", err);
    }
  }

  return getLocalStorage("pictureOfTheDay");
}
