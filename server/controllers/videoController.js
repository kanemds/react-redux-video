const Video = require('../models/video');
const createError = require('../utility/error');
const User = require('../models/user');

const getAll = async(req, res) => {
  
  try {
    const getAll = await Video.find();
    res.status(200).json(getAll);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const addVideo = async(req, res, next) => {
  const newVideo =  new Video({userId: req.user.id, ...req.body});
  try {
    const saveVideo = await newVideo.save();
    res.status(200).json(saveVideo);
  } catch (error) {
    next(error);
  }
};

const updateVideo = async(req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found"));
    if (req.user.id === video.userId) {
      const updated = await Video.findByIdAndUpdate(
        req.params.id,{
          $set: req.body
        },
        {new:true}
      );
      res.status(200).json(updated);
    } else {
      return next(createError(403, "Not Authenticated."));
    }
  } catch (error) {
    next(error);
  }
};
const deleteVideo = async(req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found"));
    if (req.user.id === video.userId) {
      const deleted = await Video.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json("Video Deleted");
    } else {
      return next(createError(403, "Not Authenticated."));
    }
  } catch (error) {
    next(error);
  }
};

const getVideo = async(req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

const viewVideo = async(req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id,{
      $inc: { views: 1}
    });
    res.status(200).json("The view has been increased.");
  } catch (error) {
    next(error);
  }
};

const trendVideo = async(req, res, next) => {
  try {
    const videos = await Video.find().sort({views:-1}); // -1 for descending order and 1 for ascending
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const randomVideo = async(req, res, next) => {
  try {
    // aggregate: return selected value
    // $sample:Randomly selects the specified number of documents
    const videos = await Video.aggregate([{$sample: {size:40}}]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const subVideo = async(req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(channelId =>{
        return Video.find({userId:channelId});
      })
    );
    res.status(200).json(list.flat().sort((a,b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

const findBySearch = async(req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      // find any letter match with query, $i: Case insensitivity to match upper and lower cases
      title:{$regex:query, $options:"i"}
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
const findByTags = async(req, res, next) => {
  // backendUrl/tags?tags=a,b,c
  // tags = a,b,c
  // tags = ["a", "b", "c"]
  const tags = req.query.tags.split(",");
  try {
    // The $in operator selects the documents where the value of a field equals any value in the specified array
    const videos = await Video.find({tags:{$in:tags}}).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

module.exports = {getAll, addVideo,updateVideo, deleteVideo, getVideo, viewVideo, trendVideo, randomVideo, subVideo, findBySearch, findByTags};