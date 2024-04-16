// services/bookService.js

// Import the database connection
const db = require('../config/db');

// Function to fetch all books from the database
const getAllBooks = async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM book');
        return rows;
    } catch (error) {
        throw new Error("Error in fetching books");
    }

};

// Function to fetch a book by its ID
const getBookById = async (bookId) => {
    try {
        const [book] = await db.execute('SELECT * FROM book WHERE book_id = ?', [bookId]);
        return book.length ? book[0] : null;
    } catch (error) {
        throw new Error('Error in fetching ID');
    }

};

// Function to fetch all books of a given category ID
const getBooksByCategoryId = async (categoryId) => {
    try {
        const [books] = await db.execute('SELECT * FROM book WHERE category_id = ?', [categoryId]);
        return books;
    } catch (error) {
        throw new Error('Error in fetching all books');
    }

};

// Function to fetch all books of a given category name
const getBooksByCategoryName = async (categoryName) => {
    try {
        const [books] = await db.execute(`
            SELECT *
            FROM book
                     INNER JOIN category ON book.category_id = category.category_id
            WHERE category.name = ?`, [categoryName]);
        return books;
    } catch (error) {
        throw new Error('Error in fetching books');
    }

};

// Function to fetch 5 random books from the database
const getRandomBooks = async () => {
    try {
        const [randomBooks] = await db.execute('SELECT * FROM book ORDER BY RAND() LIMIT 5');
        return randomBooks;
    } catch (error) {
        throw new Error('Error while fetching books');
    }
};

// Function to add a new book to the database
const addBook = async (title, author, description, price, rating, isPublic, isFeatured, categoryId) => {
    try {
        await db.execute('INSERT INTO book (title, author, description, price, rating, is_public, is_featured, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, author, description, price, rating, isPublic, isFeatured, categoryId]);
    } catch (error) {
        throw new Error('Error in adding book');
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    getBooksByCategoryId,
    getBooksByCategoryName,
    getRandomBooks,
    addBook,
};
