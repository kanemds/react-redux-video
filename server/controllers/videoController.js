const Video = require('../models/video');

const getAllRequest = async(req, res) => {
  
  try {
    const getAll = await Video.find();
    res.status(200).json(getAll);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {getAllRequest};