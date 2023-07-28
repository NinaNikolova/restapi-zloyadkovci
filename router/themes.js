const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController } = require('../controllers');



router.get('/', themeController.getThemes);
router.post('/', auth(), themeController.createTheme);

router.get('/:themeId', themeController.getTheme);
router.post('/:themeId', postController.createPost);
router.put('/:themeId/posts/:postId', postController.editPost);
router.delete('/:themeId/posts/:postId', postController.deletePost);



module.exports = router