const router = require('express').Router();
const verifyToken = require('../utility/verifyToken');
const {addComment, getComment, deleteComment} = require('../controllers/commentController');




router.post('/', verifyToken, addComment);
router.get('/:videoId', verifyToken, getComment);
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;