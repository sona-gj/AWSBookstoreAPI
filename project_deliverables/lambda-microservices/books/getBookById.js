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

async function getBookById(bookId) {
    const connection = await pool.getConnection();
    try {
        const [book] = await connection.execute('SELECT * FROM book WHERE book_id = ?', [bookId]);
        return book.length ? book[0] : null;
    }finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const bookId = event.pathParameters.id;
        const book = await getBookById(bookId);
        return {
            statusCode: 200,
            body: JSON.stringify({ bookId: bookId,book: book }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message}),
        };
    }
};