const router = require('express').Router();
const {getAll, update, deleteUser, getUser, subscribe, unsubscribe, like, dislike} = require('../controllers/userController');
const verifyToken = require('../utility/verifyToken');


router.get('/find',getAll);
router.get('/find/:id', getUser);

router.put('/:id',verifyToken , update);

router.delete('/:id',verifyToken, deleteUser);

router.put('/sub/:id',verifyToken, subscribe);
router.put('/unsub/:id', verifyToken,unsubscribe);

// :videoId === req.params.videoId must match
router.put('/like/:videoId', verifyToken,like);
router.put('/dislike/:videoId',verifyToken, dislike);


module.exports = router;