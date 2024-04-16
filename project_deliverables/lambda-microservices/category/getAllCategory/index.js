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

async function getCategories() {
    const connection = await pool.getConnection();
    try {
        const [categories] = await connection.execute('SELECT * FROM category');
        return categories;
    } finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const categories = await getCategories();
        return {
            statusCode: 200,
            body: JSON.stringify({ categories }),
        };
    } catch (error) {
        console.error('Error fetching categories from database:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};