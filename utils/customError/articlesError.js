const ApplicationError = require('./Application.Error');

class ArticlesError extends ApplicationError {
  constructor(message, status) {
    super(message, status);
    
    this.name = this.constructor.name;
    this.message = this.message + message;
  }
}

exports.articlesNotFoundError = () => {
  throw new ArticlesError("Internal database connection error, articles can't be found", 500)
}

exports.articleNotFoundError = () => {
  throw new ArticlesError("Internal database connection error, no article cannot be found", 500)
}

exports.articleCreationError = () => {
  throw new ArticlesError("Internal database connection error, there is a problem to create article", 500)
}

exports.articleUpdateError = () => {
  throw new ArticlesError("Internal database connection error, there is a problem to update article", 500)
}

exports.articleDeletionError = () => {
  throw new ArticlesError("Internal database connection error, there is a problem to delete article", 500)
}
