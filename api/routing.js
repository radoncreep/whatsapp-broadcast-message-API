const { Router } = require('express');

const router = Router();

const postController = require('../controller/sendingMsg');

router.post('/post', postController.postMessage)

module.exports = router;