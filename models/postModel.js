const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
	title: { type: String, required: true, minlength: [3, 'Title must be at least 3 characters long'] },
    ingredients: { type: String, required: true, minlength: [3, 'Ingredients must be at least 3 characters long'] },
    time: {
        type: Number, required: true, validate: {
            validator: value => value >= 0 && value <= 300,
            message: 'Time must be between 0 and 300 minutes'
        }
    },
	img: { type: String, required: [true, 'Image URL is required'] },
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    themeId: {
        type: ObjectId,
        ref: "Theme"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Post', postSchema);
