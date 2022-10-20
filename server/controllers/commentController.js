const Comment = require('../models/comment');
const Video = require('../models/video');
const createError = require('../utility/error');


const addComment = async(req, res, next) => {
  const newComment = new Comment({userId:req.user.id, ...req.body});
  try {
    
    const savedComment =  newComment.save();

    res.status(200).josn(savedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async(req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);

    // check if comment from same user or owner of the video
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted Comment");
    } else {
      return next(createError(403, "Not Authenticated"));
    }
  } catch (error) {
    next(error);
  }
};

const getComment = async(req, res, next) => {
  try {
    const comments = await Comment.find({videoId: req.params.videoId});
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = {addComment, deleteComment, getComment};