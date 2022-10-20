const User = require('../models/user');
const Video = require('../models/video');
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

  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }

};
const subscribe = async(req, res, next) => {
  try {
    // find current user as user.id and push the subUserId from req.params.id to current user model
    await User.findByIdAndUpdate(req.user.id, {
      $push: {subscribedUsers: req.params.id}
    });
    // increament 1 to subUser model
    await User.findByIdAndUpdate(req.params.id,{
      $inc:{subscribers:1}
    });
    res.status(200).json("Subscribed");
  } catch (error) {
    next(error);
  }
};
const unsubscribe = async(req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {subscribedUsers: req.params.id}
    });
    await User.findByIdAndUpdate(req.params.id,{
      $inc:{subscribers: -1}
    });
    res.status(200).json("Unsubscribed");
  } catch (error) {
    next(error);
  }
};

const like = async(req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      // instead of push may cause duplicate, use addToSet only one in array
      $addToSet: {likes:id},
      $pull:{dislikes:id}
    });
    res.status(200).json("Liked");
  } catch (error) {
    next(error);
  }
};

const dislike = async(req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      // instead of push may cause duplicate, use addToSet only one in array
      $addToSet: {dislikes:id},
      $pull:{likes:id}
    });
    res.status(200).json("Disliked");
  } catch (error) {
    next(error);
  }
};

module.exports = {getAll, update, deleteUser, getUser, subscribe, unsubscribe, like, dislike};