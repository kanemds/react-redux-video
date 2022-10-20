const User = require('../models/user');

const getAll = async(req, res) => {
  
  try {
    const getAll = await User.find();
    res.status(200).json(getAll);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const update = async(req, res, next) => {
  
};
const deleteUser = async(req, res, next) => {
  
};

const getUser = async(req, res, next) => {
  
};
const subscribe = async(req, res, next) => {
  
};
const unsubscribe = async(req, res, next) => {
  
};
const like = async(req, res, next) => {
  
};
const dislike = async(req, res, next) => {
  
};

module.exports = {getAll, update, deleteUser, getUser, subscribe, unsubscribe, like, dislike};