const apiRouter = require('express').Router(),
  articleRouter = require('./ArticlesRoute');


apiRouter.use('/articles', articleRouter);

module.exports = apiRouter;