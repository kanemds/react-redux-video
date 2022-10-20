const router = require('express').Router();
const {getAll, update, deleteUser, getUser, subscribe, unsubscribe, like, dislike} = require('../controllers/userController');


router.get('/find', getAll);
router.get('/find/:id', getUser);
router.put('/:id', update);
router.delete('/:id', deleteUser);
router.put('/sub/:id', subscribe);
router.put('/unsub/:id', unsubscribe);
router.put('/like/:video', like);
router.put('/dislike/:video', dislike);


module.exports = router;