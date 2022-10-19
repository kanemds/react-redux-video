const User = require('../models/user');

const signupRequest = (req, res) => {
  console.log(req.body);
  // try {
  //   const newUser = new User(req.body);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json(error.message);
  // }
};

module.exports = {signupRequest};