const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', themeController.getThemes);
router.post('/', auth(), themeController.createTheme);
router.delete('/:themeId', auth(), themeController.deleteTheme);
router.put('/:themeId', auth(), themeController.editTheme);


router.get('/:themeId', themeController.getTheme);
router.post('/:themeId', postController.createPost);
router.put('/:themeId', themeController.subscribe);
router.put('/:themeId/posts/:postId', postController.editPost);
router.delete('/:themeId/posts/:postId', postController.deletePost);



module.exports = router