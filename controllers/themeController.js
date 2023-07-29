const { themeModel, postModel, userModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path: 'posts',
            populate: {
                path: 'userId'
            }
        })
        .then(theme => res.json(theme))
        .catch(next);
}
// title, category, img, time, ingredients, text
function createTheme(req, res, next) {
    const { title, category, img, time, ingredients, text } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ title, category, img, time, ingredients, text, userId, subscribers: [] })
        .then(theme => {
            newPost('', userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function deleteTheme(req, res, next) {
    const { themeId, postId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        themeModel.findOneAndDelete({ _id: themeId, userId }),
        userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { themes: themeId } }
        ),
        postModel.findOneAndUpdate(
            { _id: postId },
            { $pull: { themeId: themeId } }
        ),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}
function editTheme(req, res, next) {
    const { themeId } = req.params;
    const { title, category, img, time, ingredients, text } = req.body;
    const { _id: userId } = req.user;
  
    // if the userId is not the same as this one of the post, the post will not be updated
    themeModel.findOneAndUpdate(
      { _id: themeId, userId },
      { title, category, img, time, ingredients, text  },
      { new: true }
    )
      .then((updatedRecipe) => {
        if (updatedRecipe) {
          res.status(200).json(updatedRecipe);
        } else {
          res.status(401).json({ message: `Not allowed!` });
        }
      })
      .catch(next);
  }

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    deleteTheme,
    editTheme
}
