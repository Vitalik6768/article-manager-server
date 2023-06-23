const db = require("../config/db");

class Profile {
  constructor(userid, fileName) {
    this.userid = userid;
    this.filename = fileName;
    

  }


  update(id, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const updates = fields.map((field, index) => `${field} = '${values[index]}'`).join(', ');
    console.log(updates);

    const sql = `UPDATE articles SET ${updates} WHERE id = ${id};`;
    return db.execute(sql);
  }



  static async ifUserExist(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
  
    try {
      const [rows] = await db.execute(sql, values);
      if (rows.length > 0) {
        //console.log(rows[0].password);
        return rows;
      } else {
        console.log('Email does not exist in database');
        
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  save() {


    let sql = `
    INSERT INTO profiles(
      user_id,
      image
    )
    VALUES(
      '${this.userid}',
      '${this.filename}'
    
    )
    `;

    return db.execute(sql);
  }







  static findById(id) {
    let sql = `SELECT * FROM articles WHERE id = ${id};`;

    return db.execute(sql);
  }

  static findByArticleByMonth(month) {
    let sql = `SELECT * FROM articles WHERE MONTH(created_at) = ?`;
    return db.execute(sql, month);
  }

  static alertCheaker() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${mm}`;

    //SELECT COUNT(*) FROM my_table WHERE status <> 'verified';

  }

  static displayAlerts() {
    let sql = `SELECT * FROM articles WHERE MONTH(created_at) < MONTH(CURRENT_DATE());`;
    return db.execute(sql);

  }

}



module.exports = Profile;