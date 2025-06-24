import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticlesByJournalist } from "../services/api";

export default function JournalistArticlesList() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [journalistName, setJournalistName] = useState("");

  useEffect(() => {
    fetchArticles();
  }, [id]);

  // const fetchArticles = async () => {
  //   try {
  //     const data = await getArticlesByJournalist(id);
  //     setArticles(data);
  //   } catch (err) {
  //     setError("Failed to load journalist's articles.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
   const fetchArticles = async () => {
    try {
      const data = await getArticlesByJournalist(id);
      setArticles(data);
      if (data.length > 0) {
        setJournalistName(data[0].journalist_name || "Unknown");
      } else {
        setJournalistName("Unknown");
      }
    } catch (err) {
      setError("Failed to load journalist's articles.");
      setJournalistName("Unknown");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (articleId) => navigate(`/articles/${articleId}`);

  return (
    <div className="journalist-articles-list">
      <h2>{journalistName}</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {articles.map((article) => (
        <div key={article.id} className="article-card">
          <h3>{article.title}</h3>
          <p>{article.content.slice(0, 100)}...</p>
          <button className="button-secondary" onClick={() => handleView(article.id)}>
            View Full Article
          </button>
        </div>
      ))}
    </div>
  );
}