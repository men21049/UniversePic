export async function newsArticles(offset) {
  try {
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=15"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    throw new error("Error fetching news articles:", error);
  }
}

export async function searchArticles(query) {
  try {
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?search=" + query
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }
    const filteredArticles = await response.json();
    return filteredArticles;
  } catch (error) {
    throw new error("Error fetching news articles:", error);
  }
}
