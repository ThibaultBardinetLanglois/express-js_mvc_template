const articlesServices = require('../services/articlesService');


exports.getAllArticles =  async (req, res) => {
  try {
    const articles = await articlesServices.getAll();
    res.status(200).send(articles);
  } catch (e) {
    res.status(e.status).send(e);
  }
}

exports.getArticleById =  async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const article = await articlesServices.getById(id);
    res.status(200).send(article);
  } catch (e) {
    res.status(e.status).send(e);
  }
}

exports.createArticle =  async (req, res) => {
  const { article } = req.body;
  try {
    const createdArticle = await articlesServices.create(article);
    res.status(201).send(createdArticle);
  } catch (e) {
    res.status(e.status).send(e);
  }
}

exports.updateArticle =  async (req, res) => {
  const { article } = req.body;
  try {
    const updatedArticle = await articlesServices.update(article);
    res.status(200).send(updatedArticle);
  } catch (e) {
    res.status(e.status).send(e);
  }
}

exports.deleteArticle =  async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await articlesServices.delete(id);
    if (deleted) {
      res.status(204).send();
    }
    
  } catch (e) {
    res.status(e.status).send(e);
  }
}