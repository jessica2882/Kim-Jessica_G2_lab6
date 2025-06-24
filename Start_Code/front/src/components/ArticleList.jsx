import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, removeArticle } from "../services/api";

//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);2
    setError("");
    try {
      await removeArticle(id);
      //await fetchArticles(); // refresh the list
      setArticles((prev) => prev.filter((a) => a.id !== id)); 
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id) => navigate(`/articles/${id}`);

  const handleEdit = (id) => navigate(`/articles/${id}/edit`);
  // added for exercise 3 
  const handleViewJournalistArticles = (journalistId) =>
    navigate(`/journalists/${journalistId}/articles`);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
            onViewJournalistArticles={handleViewJournalistArticles}//  added fot exercise 3 
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete, onViewJournalistArticles  }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      {/* <div className="article-author">By {article.journalist_id}</div> */}
      {/* // add for exercise 3 */}
      <div className="article-author">
        By{" "}
        {article.journalist?.name ? (
          <button
            className="button-link"
            onClick={() => onViewJournalistArticles(article.journalist.id)}
          >
            {article.journalist.name}
          </button>
        ) : (
          `Journalist #${article.journalist_id}`
        )}
      </div>

      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
