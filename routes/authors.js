const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')


// All Authors route
router.get('/', async (req, res) => {
  let serachOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    serachOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(serachOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Author route
router.get('/new', (req, res) => {
  res.render('authors/new', {
    author: new author()
  })
})

// Create Athor route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })

  }
})

module.exports = router