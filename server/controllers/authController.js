const User = require('../models/user');
const bcrypt = require('bcrypt');
const createError = require('../utility/error');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const signup = async(req, res, next) => {
 
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({...req.body, password:hash});

    await newUser.save();
    res.status(200).json("User has been created!");
  } catch (error) {
    next(error);
  }
};

const signin = async(req, res, next) => {
 
  try {
    const user = await User.findOne({name:req.body.name});
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRECT);

    // prevent sending password
    const {password, ...rest} = user._doc;
    
    res.cookie('access_token', token, {
      httpOnly:true
    }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const googleAuth = async(req, res, next) => {
  try {
    const user = await User.findOne({email:req.body.email});
    if (user) {
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRECT);
    
      res.cookie('access_token', token, {
        httpOnly:true
      }).status(200).json(user._doc);
      console.log(user);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle:true
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({id:savedUser._id}, process.env.JWT_SECRECT);
    
      res.cookie('access_token', token, {
        httpOnly:true
      }).status(200).json(savedUser._doc);
      console.log(savedUser._doc);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, googleAuth };