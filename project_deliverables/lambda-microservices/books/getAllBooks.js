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

async function getAllBooks() {
    const connection = await pool.getConnection();
    try {
        const [books] = await connection.execute('SELECT * FROM book');
        return books;
    } finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const books = await getAllBooks();
        return {
            statusCode: 200,
            body: JSON.stringify({ books }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};