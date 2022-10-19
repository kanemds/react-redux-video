const User = require('../models/user');

const getAllRequest = async(req, res) => {
  
  try {
    const getAll = await User.find();
    res.status(200).json(getAll);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {getAllRequest};