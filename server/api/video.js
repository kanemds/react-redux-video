const router = require('express').Router();
const verifyToken = require('../utility/verifyToken');
const {getAll, addVideo, updateVideo, deleteVideo, getVideo, viewVideo, trendVideo, randomVideo, subVideo} = require('../controllers/videoController');


router.get('/', getAll);
router.post('/',verifyToken, addVideo);
router.put('/:id',verifyToken, updateVideo);
router.delete('/:id',verifyToken, deleteVideo);
router.get('/find/:id', getVideo);
router.put('/view/:id', viewVideo);
router.get('/trend', trendVideo);
router.get('random', randomVideo);
router.get('sub',verifyToken, subVideo);

module.exports = router;