const articlesModels = require('../models/ArticlesModel'),
 articlesErrors = require('../utils/customError/articlesError');


exports.getAll =  async () => {
  try {
    const articles = await articlesModels.findAll();
    return articles;
  } catch (e) {
    articlesErrors.articlesNotFoundError();
  }
}

exports.getById =  async (id) => {
  try {
    const article = await articlesModels.findById(id);
    return article;
  } catch (e) {
    articlesErrors.articleNotFoundError();
  }
}

exports.create =  async (article) => {
  try {
    const insertedRow = await articlesModels.create(article);
    const createdArticle = await articlesModels.findById(insertedRow.insertId);
    return createdArticle;
  } catch (e) {
    articlesErrors.articleCreationError();
  }
}

exports.update =  async (article) => {
  try {
    const updatedArticle = await articlesModels.update(article);
    return updatedArticle;
  } catch (e) {
    articlesErrors.articleUpdateError();
  }
}

exports.delete =  async (id) => {
  try {
    const deletedRow = await articlesModels.delete(id);
    if (deletedRow.affectedRows === 1) {
      return deletedRow;
    } else {
      articlesErrors.articleDeletionError();
    }
  } catch (e) {
    articlesErrors.articleDeletionError();
  }
}