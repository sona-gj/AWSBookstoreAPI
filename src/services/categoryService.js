// services/categoryService.js

// Import the database connection
const db = require('../config/db');

// Function to fetch all categories from the database
const getAllCategories = async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM category');
        return rows;
    } catch (error) {
        throw new Error('Error fetching categories from database');
    }
};


// Function to fetch the name of the category by category id
const getCategoryName = async (categoryId) => {
    try {
        const [category] = await db.execute('SELECT name FROM category WHERE category_id = ?', [categoryId]);
        return category.length ? category[0].name : null;
    } catch (error) {
        throw new Error('Error fetching ID from database');
    }

};

// Function to fetch the ID of the category by category name
const getCategoryId = async (categoryName) => {
    try {
        const [category] = await db.execute('SELECT category_id FROM category WHERE name = ?', [categoryName]);
        return category.length ? category[0].category_id : null;
    } catch (error) {
        throw new Error('Error fetching ID from database');
    }

};

// Function to add a new category to the database
const addCategory = async (categoryName) => {
    try {
        await db.execute('INSERT INTO category (name) VALUES (?)', [categoryName]);

    } catch (error) {
        throw new Error('Error in adding category');
    }
};

module.exports = {
    getAllCategories,
    getCategoryName,
    getCategoryId,
    addCategory,
};
