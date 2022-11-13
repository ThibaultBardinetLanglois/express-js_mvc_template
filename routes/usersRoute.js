const usersRouter = require('express').Router(),
  userControllers = require('../controllers/usersController');


usersRouter.post('/register', userControllers.register);
usersRouter.get('/login', userControllers.login);


module.exports = usersRouter;