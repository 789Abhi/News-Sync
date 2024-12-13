import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/newsSlice"; // Adjust the import path as needed

function Home() {
  const dispatch = useDispatch();
  const {
    news = [],
    status,
    error,
    currentCountry,
    preferences,
  } = useSelector((state) => state.news);

  useEffect(() => {
    if (currentCountry && preferences) {
      dispatch(fetchNews({ country: currentCountry, preferences }));
    }
  }, [dispatch, currentCountry, preferences]);

  const getArticlesByCategory = (category) => {
    return Array.isArray(news)
      ? news
          .filter(
            (article) => article.category === category && article.urlToImage
          )
          .slice(0, 2)
      : [];
  };

  const truncateText = (text, maxLength = 100) => {
    return typeof text === "string" && text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="text-2xl text-blue-600">Loading news...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="text-2xl text-red-600">Error loading news: {error}</div>
        <div>Current Country: {currentCountry}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
        {/* Latest News Block */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">
            Latest News{" "}
            {currentCountry !== "all"
              ? `(${currentCountry.toUpperCase()})`
              : ""}
          </h3>
          <div className="space-y-4">
            {getArticlesByCategory("General").map((article, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/100"}
                  alt={article.title}
                  className="w-24 h-24 rounded-lg mr-4 object-cover"
                />
                <div>
                  <p className="font-bold">{truncateText(article.title, 50)}</p>
                  <p className="text-sm">
                    {truncateText(article.description, 100)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Block */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Trending</h3>
          <div className="space-y-4">
            {getArticlesByCategory("Technology").map((article, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/100"}
                  alt={article.title}
                  className="w-24 h-24 rounded-lg mr-4 object-cover"
                />
                <p>{truncateText(article.title, 70)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Block */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <div className="space-y-4">
            {["Technology", "Health", "Business"].map((category) => {
              const categoryArticle = getArticlesByCategory(category)[0];
              return categoryArticle ? (
                <div key={category}>
                  <h4 className="font-semibold">{category}</h4>
                  <p>{truncateText(categoryArticle.title, 100)}</p>
                </div>
              ) : (
                <p>No articles for {category}</p>
              );
            })}
          </div>
        </div>

        {/* Top Stories Block */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Top Stories</h3>
          <div className="space-y-4">
            {getArticlesByCategory("Sports").map((article, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/100"}
                  alt={article.title}
                  className="w-24 h-24 rounded-lg mr-4 object-cover"
                />
                <p>{truncateText(article.title, 100)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
