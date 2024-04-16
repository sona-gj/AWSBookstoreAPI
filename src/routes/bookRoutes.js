// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books/all', bookController.getAllBook);
router.get('/books/:id',bookController.getBookById);
router.get('/books/category/:categoryId',bookController.getBookByCategoryId);
router.get('/books/category/name/:categoryName', bookController.getBookByCategoryName);
router.get('/books/random', bookController.getRandomBook);
router.post('/books', bookController.addBook);

module.exports = router;
