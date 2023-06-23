const Users = require("../models/Users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");




exports.login = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'please provid valid information' });
    }

    const userExists = await Users.ifUserExist(email);
    if (!userExists) {

      return res.status(400).json({ message: 'המייל לא קיים במערכת' });
    }


    if (await bcrypt.compare(password, userExists[0].password)) {

      const id = userExists[0].id;
      const name = userExists[0].name;
      const email = userExists[0].email;
      const role = userExists[0].role;

      const token = jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      //console.log(token);

      return res.status(201).json({ token: token });
    } else {
      return res.status(400).json({ message: 'סיסמא לא תקינה' });
    }

  } catch (error) {

  }

  return res.status(201).json({ message: 'התחברת בהצלחה מועבר לדף הבית' });

};






exports.register = async (req, res) => {
  const { name, email, password, passwordConfirm, role, token } = req.body;


  try {
    if (name && !email && !password && role) {
      return res.status(400).json({ message: 'נא להזין פרטים נכונים' });
    }
    // Check if the user already exists in the database
    const userExists = await Users.ifUserExist(email);
    if (userExists) {
      return res.status(400).json({ message: 'המייל כבר קיים במערכת' });
    }

    if (password != passwordConfirm) {
      return res.status(400).json({ message: 'סיסמאות לא תואמות' });
    }

    if (!token) {
      return res.status(400).json({ message: 'נא לאשר אני א רובוט' });
    }

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
        console.log('gfhfgh');
        console.log(data);
        
      } else {
        
        return res.status(400).json({ message: 'האימות נכשל, נסה שוב' });
      }



    } catch (error) {

    }

    // If the user does not exist, create a new user
    let hashedpassword = await bcrypt.hash(password, 8);
    const status = 'PENDING';
    const user = new Users(name, email, hashedpassword, role, status);
    await user.save();

    return res.status(201).json({ message: 'נרשמת בהצלחה' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

