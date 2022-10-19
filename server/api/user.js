const router = require('express').Router();
const {getAllRequest} = require('../controllers/userController');


router.get('/', getAllRequest);

module.exports = router;