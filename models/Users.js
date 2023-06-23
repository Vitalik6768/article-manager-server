const db = require("../config/db");

class Users {
  constructor(name, email, password, role, status) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = status;

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
    INSERT INTO users(
      name,
      email,
      password,
      role,
      status
    )
    VALUES(
      '${this.name}',
      '${this.email}',
      '${this.password}',
      '${this.role}',
      '${this.status}'

    )
    `;

    return db.execute(sql);
  }


  static updateImage(image, id) {
   
    const sql = `UPDATE users SET image = ? WHERE id = ?`;
    //console.log(db.execute(sql, [image, id]));
    return db.execute(sql, [image, id]);
  }

  static getUserImage(id){
    const sql = `Select image From users WHERE id = ?`;
    return db.execute(sql, [id]);
  }

  static getUserCradantions(id){
    let sql = `SELECT * FROM users WHERE id = ?`;
    return db.execute(sql, [id]);

  }

  static async ifUsereIsAdmin(id){
    let sql = `SELECT role FROM users WHERE id = ?`;
    return db.execute(sql, [id]);
  }



   static  async getAllUsers(id) {
    
    let sql = `SELECT id, name, email, role, image, status FROM users WHERE id != ?`;
    return db.execute(sql, [id]);
  }

  static updateUserPremition(role, id) {
    
    let sql = `Update users SET role = ? WHERE id = ?`;
    return db.execute(sql, [role, id]);
  }

  static updateUserStatus(status, id) {
   
    let sql = `Update users SET status = ? WHERE id = ?`;
    return db.execute(sql, [status, id]);
  }

  static deleteUser(id) {
    console.log(id);
    let sql = `DELETE FROM users WHERE id = ?`;
    return db.execute(sql, [id]);
  }

  static ifUserExistInDb(id){
    let sql = `SELECT id FROM users WHERE id = ?`;
    return db.execute(sql, [id]);
  }



  // static findByArticleByMonth(month) {
  //   let sql = `SELECT * FROM articles WHERE MONTH(created_at) = ?`;
  //   return db.execute(sql, month);
  // }

  // static alertCheaker() {
  //   let d = new Date();
  //   let yyyy = d.getFullYear();
  //   let mm = d.getMonth() + 1;
  //   let dd = d.getDate();

  //   let createdAtDate = `${mm}`;

  //   //SELECT COUNT(*) FROM my_table WHERE status <> 'verified';

  // }

  // static displayAlerts() {
  //   let sql = `SELECT * FROM articles WHERE MONTH(created_at) < MONTH(CURRENT_DATE());`;
  //   return db.execute(sql);

  // }

}



module.exports = Users;