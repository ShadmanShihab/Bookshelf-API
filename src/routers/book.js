const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()


// Add a new book
router.post('/books', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        owner: req.user._id
    })

    try {
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})



//Updating Book Info
router.patch('/books/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'publishedYear']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        const book = await Book.findOne({ _id: req.params.id, userId: req.user._id })

        if (!book) {
            return res.status(404).send()
        }


        updates.forEach((update) => book[update] = req.body[update])
        await book.save()

        res.send(book)

    } catch (e) {
        res.status(400).send(e)
    }
})



//Delete books by id
router.delete('/books/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})


//Get book list publicly
router.get('/books', async (req, res) => {
    try {
        const book = await Book.find({})
        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router






