export async function getNewsArticles() {
  try {
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?offset=15"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return [];
  }
}
