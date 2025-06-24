// import * as articleRepository from "../repositories/mockArticleRepository.js";

// TODO : Change articleRepository to use the sqlArticleRepository
import * as articleRepository from "../repositories/sqlArticleRepository.js"; // Import the SQL repository
// GET /api/articles
export async function getAllArticles(req, res) {
  try {
    const articles = await articleRepository.getArticles();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/articles/:id
export async function getArticleById(req, res) {
  try {
    //const article = await articleRepository.getArticleById(req.params.id);
    const article = await articleRepository.getArticleWithJournalist(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/articles
export async function createArticle(req, res) {
  try {
    const newArticle = await articleRepository.createArticle(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// PUT /api/articles/:id
export async function updateArticle(req, res) {
  try {
    const updatedArticle = await articleRepository.updateArticle(
      req.params.id,
      req.body
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /api/articles/:id
export async function deleteArticle(req, res) {
  try {
    await articleRepository.deleteArticle(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Exercise 3
// GET /api/articles/:id => article + journalist info
export async function getArticleWithJournalist(req, res) {
  try {
    const article = await articleRepository.getArticleWithJournalistById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article with journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/journalists/:id/articles => all articles by one journalist

export async function getArticlesByJournalist(req, res) {
  try {
    const journalistId = req.params.id;
    const articles = await articleRepository.getArticlesByJournalist(journalistId);

    if (articles.length === 0) {
      return res.status(404).json({ message: "No articles found for this journalist" });
    }

    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles by journalist:", error);
    res.status(500).json({ message: "Server error" });
  }
}


// BONUS Exercise 4 
export async function getCategories(req, res) {
  try {
    const categories = await articleRepository.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /api/articles/filter?categories=1,2
export async function getArticlesByCategoryFilter(req, res) {
  try {
    const categoriesParam = req.query.categories; // e.g., "1,2"
    const categoryIds = categoriesParam ? categoriesParam.split(',').map(Number) : [];

    const articles = await articleRepository.getArticlesByCategories(categoryIds);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}