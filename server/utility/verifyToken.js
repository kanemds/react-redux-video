const jwt = require('jsonwebtoken');
const createError = require('./error');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401,"User Is Not Authenticated!"));


  // user spot can be any name, its info from jwt.sign({info} ...))
  jwt.verify(token, process.env.JWT_SECRECT, (error, user) => {
    if (error) return next(createError(403,"Token Is Not Valid!"));
    // created an instant req.user: user
    req.user = user;
    
    next();
  });
};

module.exports = verifyToken;