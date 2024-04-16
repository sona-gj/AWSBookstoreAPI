const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

async function addBook(title, author, description, price, rating, isPublic, isFeatured, categoryId) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('INSERT INTO book (title, author, description, price, rating, is_public, is_featured, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, author, description, price, rating, isPublic, isFeatured, categoryId]);
    } finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const { title, author, description, price, rating, isPublic, isFeatured, categoryId } = event.body;
        await addBook(title, author, description, price, rating, isPublic, isFeatured, categoryId);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Book added successfully' }),
        };
    } catch (error) {
        console.error('Error in adding book to database:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};