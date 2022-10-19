const router = require('express').Router();
const {getAllRequest} = require('../controllers/videoController');


router.get('/', getAllRequest);

module.exports = router;