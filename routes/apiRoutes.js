const apiRouter = require('express').Router(),
  articleRouter = require('./ArticlesRoute'),
  userRouter = require('./usersRoute');


apiRouter.use('/articles', articleRouter)
  .use('/users', userRouter);

module.exports = apiRouter;