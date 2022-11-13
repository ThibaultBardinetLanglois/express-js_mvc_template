const articleRouter = require('express').Router(),
    articleControllers = require('../controllers/articlesController'),
    authMdw = require('../middlewares/auth.mdw');

articleRouter.get("/", articleControllers.getAllArticles);
articleRouter.get("/:id", articleControllers.getArticleById);

articleRouter.post(
    "/create", 
    authMdw.verifyToken,
    articleControllers.createArticle
);

articleRouter.put(
    "/update", 
    authMdw.verifyToken,
    articleControllers.updateArticle
);

articleRouter.delete(
    "/delete/:id", 
    authMdw.verifyToken,
    articleControllers.deleteArticle
);
    
 
module.exports = articleRouter;