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

async function getBookByCategoryId(categoryId) {
    const connection = await pool.getConnection();
    try {
        const [books] = await connection.execute('SELECT * FROM book WHERE category_id = ?', [categoryId]);
        return books.length ? books : null;
    }finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const categoryId = event.pathParameters.id;
        const books = await getBookByCategoryId(categoryId);
        return {
            statusCode: 200,
            body: JSON.stringify({ books }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message}),
        };
    }
};