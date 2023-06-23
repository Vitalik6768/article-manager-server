const db = require("../config/db");

class Article {
  constructor(clientName, articleName, contractor, articleType, price, status, userId) {

    this.clientName = clientName;
    this.articleName = articleName;
    this.contractor = contractor;
    this.articleType = articleType;
    this.price = price;
    this.status = status;
    this.userId = userId;
  }



  update(id, data, price) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const priceUpdate = `price = '${price}'`;

    const updates = fields.map((field, index) => `${field} = '${values[index]}'`).join(', ');

    const sql = `UPDATE articles SET ${updates}, ${priceUpdate} WHERE id = ${id};`;

    return db.execute(sql);
  }



  updateStatus(status, id,) {
    const sql = `UPDATE articles SET status = ? WHERE id = ? ;`;
    return db.execute(sql, [ status, id] );
  }


  save() {
   
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let ms = d.getSeconds();
    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
  INSERT INTO articles(
    client_name,
    article_name,
    contractor,
    article_type,
    price,
    status,
    created_at,
    user_id
  )
  VALUES(?, ?, ?, ?, ?, ?, ?, ?)
`;

    let values = [
      this.clientName,
      this.articleName,
      this.contractor,
      this.articleType,
      this.price,
      this.status,
      createdAtDate,
      this.userId
    ];

    return db.execute(sql, values);
  }

  

  static async findAll(userId) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const sql = 'SELECT * FROM articles WHERE user_id = ? AND MONTH(created_at) = ? ORDER BY id DESC';
    return db.execute(sql, [userId, currentMonth]);
  }

  static getAlerts(userId) {
    let d = new Date();
    let mm = d.getMonth() + 1;
    let createdAtDate = `${mm}`;
    let sql = `SELECT COUNT(id) AS alerts
    FROM articles
    WHERE MONTH(created_at) < MONTH(CURRENT_DATE()) AND user_id = ? AND status != "הושלם"`;
    return db.execute(sql, [userId]);
  }


  static findById(id) {
    let sql = `SELECT * FROM articles WHERE id = ${id};`;

    return db.execute(sql);
  }



  static findByArticleByMonth(month, userId) {

    let sql = `SELECT * FROM articles WHERE MONTH(created_at) = ? AND user_id = ? ORDER BY id DESC`;
    return db.execute(sql, [month, userId]);


  }



  static displayAlerts(userId) {
    let sql = `SELECT * FROM articles WHERE MONTH(created_at) < MONTH(CURRENT_DATE()) 
    AND status != "הושלם" AND user_id = ? ORDER BY id DESC`;
    return db.execute(sql, [userId]);

  }

}



module.exports = Article;
