const db = require("../config/db");

class Contractors {

  static findArticlePriceByContractorName(name, type) {
     let sql = `SELECT price FROM contractors WHERE contractor_name = ? AND article_type =?`;

     return db.execute(sql,[name, type]);
  }
  
}


module.exports = Contractors;