//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from "../utils/database.js";
// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query("SELECT * FROM article");
    return rows;


}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query("SELECT * FROM article WHERE id = ?", [id]);
    return rows[0]; 

}

// Create a new article
export async function createArticle(article) {
  const { title, content, journalist_id, category } = article;
  const [result] = await pool.query(
    "INSERT INTO article (title, content, journalist_id, category) VALUES (?, ?, ?, ?)",
    [title, content, journalist_id, category]
  );
  return { id: result.insertId };
}
// Update an article by ID
export async function updateArticle(id, updatedData) {
  const { title, content, journalist_id, category } = updatedData;

  const [result] = await pool.query(
    "UPDATE article SET title = ?, content = ?, journalist_id = ?, category = ? WHERE id = ?",
    [title, content, journalist_id || null, category, id]  // explicitly convert falsy to null
  );

  if (result.affectedRows === 0) {
    throw new Error("No article found with that ID.");
  }

  return result;
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    await pool.query("DELETE FROM article WHERE id = ?", [id]);
}


// Exercise 3 work with journalist 

export async function getArticleWithJournalist(id) {
  const [rows] = await pool.query(
    `SELECT 
       a.*, 
       j.id AS journalist_id,
       j.name AS journalist_name,
       c.name AS category_name
     FROM article a 
     LEFT JOIN journalist j ON a.journalist_id = j.id 
     LEFT JOIN category c ON a.category = c.id 
     WHERE a.id = ?`,
    [id]
  );

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category_name,
    journalist: {
      id: row.journalist_id,
      name: row.journalist_name,
    },
  };
}

export async function getArticlesByJournalist(journalistId) {
  const [rows] = await pool.query(
    `SELECT 
       a.id, 
       a.title, 
       a.content, 
       a.category,
       j.id AS journalist_id,
       j.name AS journalist_name,
       j.email AS journalist_email
     FROM article a
     JOIN journalist j ON a.journalist_id = j.id
     WHERE j.id = ?`,
    [journalistId]
  );
  return rows;
}

