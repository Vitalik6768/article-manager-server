const Article = require("../models/Article");

exports.getAllArticles = async (req, res, next) => {
  const userId = req.params.userId;
  
  try {
    const [articles, _] = await Article.displayAlerts(userId);
    res.status(200).json({ count: articles.length, spend: 0, alerts:articles.length, month: 'התראות', articles });
  } catch (error) {
    next(error);
  }
};



exports.updateArticleById = async (req, res, next) => {

    res.status(200).json({ message:'update article'});


};

