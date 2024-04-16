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

async function getCategoryId(categoryName) {
    const connection = await pool.getConnection();
    try {
        const [category] = await connection.execute('SELECT category_id FROM category WHERE name = ?', [categoryName]);
        return category.length ? category[0].id : null;
    } finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const categoryName = event.pathParameters.name;
        const categoryId = await getCategoryId(categoryName);
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