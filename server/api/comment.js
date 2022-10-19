const router = require('express').Router();
const {getAllRequest} = require('../controllers/commentController');


router.get('/', getAllRequest);

module.exports = router;