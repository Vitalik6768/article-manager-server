const db = require("../config/db");

class Permission {




  static permissionCheak(role, permission) {
    let sql = `SELECT * FROM permissions where role = '${role}' AND permission = '${permission}'`;
    return db.execute(sql);
  }

  
}



module.exports = Permission;