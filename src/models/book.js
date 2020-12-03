const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String
    },
    publishedYear: {
        type: Number,
        default: 2010
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Book