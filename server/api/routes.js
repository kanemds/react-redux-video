const express = require('express');
const router = express.Router();

// routes
const video = require('./video');
const user = require('./user');
const comment = require('./comment');
const auth = require('./auth');



router.use('/auth', auth);
router.use('/user', user);
router.use('/video', video);
router.use('/comment', comment);

module.exports = router;