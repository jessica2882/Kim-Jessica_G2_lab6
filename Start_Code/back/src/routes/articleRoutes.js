import { Router } from "express";
import { getAllArticles, getArticleById, getArticleWithJournalist, createArticle, updateArticle, deleteArticle } from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.get("/:id", getArticleWithJournalist);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
