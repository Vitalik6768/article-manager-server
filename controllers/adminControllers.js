
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");



exports.getAllUsers = async (req, res, next) => {
  const id = req.params.userId;
  let [users] = await Users.getAllUsers(id);
  console.log('ok');

  //CHECK IF ADMIN
  let [isAdmin] = await Users.ifUsereIsAdmin(id);

  if (isAdmin[0].role != 'ADMIN') {

    return res.status(400).json({ message: 'Permission Denied' });
  }

  try {

    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};



exports.addNewUser = async (req, res, next) => {
  const admin = req.params.userId;
  const { name, email, password, passwordConfirm, role, token } = req.body;

  //CHECK IF ADMIN
  let [isAdmin] = await Users.ifUsereIsAdmin(admin);
 

  if (isAdmin[0].role != 'ADMIN') {

    return res.status(400).json({ message: 'Permission Denied' });
  };

  try {
    if (name && !email && !password && role) {
      return res.status(400).json({ message: 'נא להזין פרטים נכונים' });
    }
    // Check if the user already exists in the database
    const userExists = await Users.ifUserExist(email);
    if (userExists) {
      return res.status(400).json({ message: 'המייל כבר קיים במערכת' });
    };
   


    if (password != passwordConfirm) {
      return res.status(400).json({ message: 'תסיסמאות לא תואמות' });
    };

    if (!token) {
      return res.status(400).json({ message: 'נא לאשר אני א רובוט' });
    };

    try {
      const googleVarifayUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const secretKey = process.env.RECAPTCHA_KEY;
      const response = await fetch(googleVarifayUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${token}`
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);

      } else {

        return res.status(400).json({ message: 'האימות נכשל, נסה שוב' });
      };



    } catch (error) {

    }

    // If the user does not exist, create a new user
    let hashedpassword = await bcrypt.hash(password, 8);
    const status = 'APPROVED';
    const user = new Users(name, email, hashedpassword, role, status);
    await user.save();
    let [users] = await Users.getAllUsers(admin);


    return res.status(201).json({ users: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }

};






exports.updateRole = async (req, res, next) => {
  const id = req.params.id;
  const admin = req.params.userId;
  console.log('ok');

  let { role } = req.body;

  //CHECK IF ADMIN
  let [isAdmin] = await Users.ifUsereIsAdmin(admin);
 
  if (isAdmin[0].role != 'ADMIN') {

    return res.status(400).json({ message: 'Permission Denied' });
  }


  let [userTest] = await Users.updateUserPremition(role, id);
  

   let [users] = await Users.getAllUsers(admin);

  try {

    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};


exports.updateStatus = async (req, res, next) => {
  const id = req.params.id;
  const admin = req.params.userId;
  let { status } = req.body;
  console.log('ok');


  //CHECK IF ADMIN
  let [isAdmin] = await Users.ifUsereIsAdmin(admin);
  console.log(isAdmin);

  if (isAdmin[0].role != 'ADMIN') {

    return res.status(400).json({ message: 'Permission Denied' });
  }


  await Users.updateUserStatus(status, id);

  let [users] = await Users.getAllUsers(admin);

  try {

    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const admin = req.params.userId;
  const userId = req.params.id;

  //CHECK IF ADMIN

  let [isAdmin] = await Users.ifUsereIsAdmin(admin);

  if (isAdmin[0].role != 'ADMIN') {

    return res.status(400).json({ message: 'Permission Denied' });
  }


  await Users.deleteUser(userId);

  let [users] = await Users.getAllUsers(admin);

  try {

    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};