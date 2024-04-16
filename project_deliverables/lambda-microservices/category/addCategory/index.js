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

async function addCategory(categoryId, categoryName) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('INSERT INTO category (category_id, name) VALUES (?, ?)', [categoryId, categoryName]);
    } finally {
        connection.release();
    }
}

exports.handler = async (event) => {
    try {
        const { categoryId, name } = event.body;
        await addCategory(categoryId,name);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Category added successfully',categoryId: categoryId, categoryName: name }),
        };
    } catch (error) {
        console.error('Error adding category to database:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};