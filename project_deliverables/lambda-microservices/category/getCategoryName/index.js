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

async function getCategoryName(categoryId) {
    const connection = await pool.getConnection();
    try {
        const [category] = await connection.execute('SELECT name FROM category WHERE category_id = ?', [categoryId]);
        return category.length ? category[0].name : null;
    } finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const categoryId = event.pathParameters.id;
        const categoryName = await getCategoryName(categoryId);
        return {
            statusCode: 200,
            body: JSON.stringify({ categoryId: categoryId, categoryName: categoryName }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message}),
        };
    }
};