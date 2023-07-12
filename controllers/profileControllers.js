
const Users = require("../models/Users");


exports.uploadFiles = async (req, res, next) => {
  const userid = req.params.userId;
  const fileName = req.file.filename;
  
  
  try {
    await Users.updateImage(fileName, userid);
    res.status(200).json({ message: `${fileName}` });

  } catch (error) {
    console.error(error);
    // pass error to global error handler middleware
    next(error);
  }
};



exports.profile = async (req, res, next) => {
  
  const userId = req.params.userid;

  try {
    const [images] = await Users.getUserImage(userId);

    res.status(200).json({ image: images[0].image });
  } catch (error) {
    next(error);
  }
};






exports.test = async (req, res, next) => {
  console.log(req.params.id);

  try {

    res.status(200).json({ message: 'routh working' });
  } catch (error) {
    next(error);
  }
};