const router = require('express').Router();
const {signupRequest} = require('../controllers/authController');


router.post('/signup', signupRequest);
// router.post('/signin', postRequest);
// router.post('/signout', postRequest);


module.exports = router;