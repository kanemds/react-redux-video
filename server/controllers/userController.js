const User = require('../models/user');
const createError = require('../utility/error');

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
  // req.user created by verifyToken middleware
  // the login user id === veryify token user.id
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set:req.body
        },
        {new: true}
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Not Authenicated!"));
  }
};

const deleteUser = async(req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Not Authenicated!"));
  }
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