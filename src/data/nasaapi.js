async function pictureOfTheDay() {
  try {
    const pic = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KY}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NASA_API_KY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return pic;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  pictureOfTheDay,
};
