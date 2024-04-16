// controllers/bookController.js

const BookService = require('../services/bookService');

// Function to fetch all books
const getAllBook = async (req, res) => {
    try {
        const books = await BookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to fetch a book by ID
const getBookById = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await BookService.getBookById(bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to fetch all books of a given category ID
const getBookByCategoryId = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const books = await BookService.getBooksByCategoryId(categoryId);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to fetch all books of a given category name
const getBookByCategoryName = async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const books = await BookService.getBooksByCategoryName(categoryName);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to fetch 5 random books
const getRandomBook = async (req, res) => {
    try {
        const randomBooks = await BookService.getRandomBooks();
        res.json(randomBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to add a new book
const addBook = async (req, res) => {
    const { title, author, description, price, rating, isPublic, isFeatured, categoryId } = req.body;
    try {
        await BookService.addBook(title, author, description, price, rating, isPublic, isFeatured, categoryId);
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBook,
    getBookById,
    getBookByCategoryId,
    getBookByCategoryName,
    getRandomBook,
    addBook,
};
