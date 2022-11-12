const articleRouter = require('express').Router(),
    articleControllers = require('../controllers/articlesController');

articleRouter.get("/", articleControllers.getAllArticles);
articleRouter.get("/:id", articleControllers.getArticleById);
articleRouter.post("/create", articleControllers.createArticle);
articleRouter.put("/update", articleControllers.updateArticle);
articleRouter.delete("/delete/:id", articleControllers.deleteArticle);
    
 
module.exports = articleRouter;