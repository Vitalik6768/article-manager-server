
const Article = require("../models/Article");
const Contractors = require("../models/Contractors");
const { replaceMonth } = require('../helperFunc/helperFunc.js');
const Users = require("../models/Users");
const Permission = require("../models/Permission");


exports.testing = async (req, res, next) => {
  res.send('hello world');
}



exports.getAllArticles = async (req, res, next) => {
  let user = req.params.userId;
  let [userExist] = await Users.ifUserExistInDb(user);

  if (userExist.length > 0) {


  } else {
    return res.status(400).json({ message: 'no user' });
  }

  let [userCredantions] = await Users.getUserCradantions(user);
  let status = userCredantions[0].status;
  let role = userCredantions[0].role;
  let image = userCredantions[0].image;
  let [perm] = await Permission.permissionCheak(role, 'READ')

  if (perm.length > 0) {

  } else {
    return res.status(400).json({ message: 'You Don\'t Have Permission' });
  }


  try {
    const [articles] = await Article.findAll(user);
    const [getAlerts] = await Article.getAlerts(user);
    const alerts = getAlerts[0].alerts;
    let priceRemining = 1440;

    if (articles.length == 0) {
      return res.status(200).json({
        count: 0, spend: 0, alerts,
        month: 'אין מאמרים לחודש זה', image: image, articles
      });
    }

    for (i of articles) {
      priceRemining -= i.price;
    }
    const monthName = replaceMonth(articles[0].created_at);

    res.status(200).json({ count: articles.length, spend: priceRemining, alerts, month: monthName, image: image, articles });
  } catch (error) {
    next(error);
  }
};


exports.getArticlesByMonth = async (req, res, next) => {
  let user = req.params.userId;
  let [userCredantions] = await Users.getUserCradantions(user);
  let status = userCredantions[0].status;
  let role = userCredantions[0].role;
  let image = userCredantions[0].image;
  let [perm] = await Permission.permissionCheak(role, 'READ')



  if (perm.length > 0 && status == 'APPROVED') {

  } else {
    return res.status(400).json({ message: 'You Don\'t Have Permission' });
  }


  try {
    let month = req.params.month;
    let userId = req.params.userId;
    let [articles, _] = await Article.findByArticleByMonth(month, userId);
    const [getAlerts] = await Article.getAlerts(userId);
    const alerts = getAlerts[0].alerts;

    const totalPrice = articles.reduce((acc, article) => acc + article.price, 0);
    const priceRemaining = 1440 - totalPrice;


    let monthName = '';

    if (articles.length == 0) {
      monthName = 'אין מאמרים לחודש זה';
    } else {
      monthName = replaceMonth(articles[0].created_at);
    }



    res.status(200).json({ count: articles.length, spend: priceRemaining, alerts, month: monthName, image: image, articles });
  } catch (error) {
    next(error);
  }
};




exports.updateArticleById = async (req, res, next) => {
  let { contractor, article_type } = req.body;
  const postId = req.params.id;
  const userId = req.params.userId;


  let [userCredantions] = await Users.getUserCradantions(userId);
  let status = userCredantions[0].status;
  let role = userCredantions[0].role;
  let image = userCredantions[0].image;
  let [perm] = await Permission.permissionCheak(role, 'UPDATE')

  if (perm.length > 0 && status == 'APPROVED') {

  } else {
    return res.status(400).json({ message: 'You Don\'t Have Permission' });
  }


  const [contractorPrice] = await Contractors.findArticlePriceByContractorName(contractor, article_type);
  const price = contractorPrice[0].price;

  try {


    let article = new Article();
    let post = await article.update(postId, req.body, price);

    const [articles, _] = await Article.findAll(userId);
    const [getAlerts] = await Article.getAlerts(userId);
    const alerts = getAlerts[0].alerts;

    const totalPrice = articles.reduce((acc, article) => acc + article.price, 0);
    const priceRemaining = 1440 - totalPrice;

    const monthName = replaceMonth(articles[0].created_at);

    res.status(200).json({ count: articles.length, spend: priceRemaining, alerts, month: monthName, image: image, articles });
  } catch (error) {
    next(error);
  }




};




exports.updateArticleStatus = async (req, res, next) => {


  try {
    let { status } = req.body;
    const postId = req.params.id;
    const userId = req.params.userId;

    let [userCredantions] = await Users.getUserCradantions(userId);
    let userStatus = userCredantions[0].status;
    let role = userCredantions[0].role;
    let image = userCredantions[0].image;
    let [perm] = await Permission.permissionCheak(role, 'UPDATE');


    if (perm.length > 0 && userStatus == 'APPROVED') {
    } else {
      return res.status(400).json({ message: 'הפעולה חסומה נא לפנות למנהל המערכת' });
    }


    let article = new Article();
    let post = await article.updateStatus(status, postId);


    const [articles, _] = await Article.findAll(userId);
    const [getAlerts] = await Article.getAlerts(userId);
    const alerts = getAlerts[0].alerts;

    const totalPrice = articles.reduce((acc, article) => acc + article.price, 0);
    const priceRemaining = 1440 - totalPrice;


    const monthName = replaceMonth(articles[0].created_at);



    res.status(200).json({ count: articles.length, spend: priceRemaining, alerts, month: monthName, image: image, articles });
  } catch (error) {
    next(error);
  }


};



exports.createNewArticle = async (req, res, next) => {

  try {
    let { client_name, article_name, contractor, article_type, status, user_id } = req.body;

    let [userCredantions] = await Users.getUserCradantions(user_id);
    let userStatus = userCredantions[0].status;
    let role = userCredantions[0].role;
    let image = userCredantions[0].image;
    let [perm] = await Permission.permissionCheak(role, 'CREATE');


    if (perm.length > 0 && userStatus == 'APPROVED') {

    } else {
      return res.status(400).json({ message: 'הפעולה חסומה נא לפנות למנהל המערכת' });
    }




    const [contractorPrice] = await Contractors.findArticlePriceByContractorName(contractor, article_type);
    const price = contractorPrice[0].price;


    let article = new Article(client_name, article_name, contractor, article_type, price, status, user_id);

    post = await article.save();
    const [articles, _] = await Article.findAll(user_id);
    const [getAlerts] = await Article.getAlerts(user_id);
    const alerts = getAlerts[0].alerts;
    const totalPrice = articles.reduce((acc, article) => acc + article.price, 0);
    const priceRemaining = 1440 - totalPrice;

    const monthName = replaceMonth(articles[0].created_at);

    res.status(200).json({ count: articles.length, spend: priceRemaining, alerts, month: monthName, image: image, articles });
  } catch (error) {
    next(error);
  }
};



