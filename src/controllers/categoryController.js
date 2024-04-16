// controllers/categoryController.js

const CategoryService = require('../services/categoryService');

// Function to fetch all categories
const getAllCategory = async (request, response) => {
    try {
        const categories = await CategoryService.getAllCategories();
        response.json(categories);
    } catch (error) {
        console.log(error)
        // response.status(500).json({ error: error.message });
    }
};

// Function to fetch category name by ID
const getCategoryName = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const categoryName = await CategoryService.getCategoryName(categoryId);
        res.json({ categoryName });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to fetch category ID by name
const getCategoryId = async (req, res) => {
    const categoryName = req.params.name;
    try {
        const categoryId = await CategoryService.getCategoryId(categoryName);
        res.json({ categoryId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to add a new category
const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await CategoryService.addCategory(name);
        res.status(201).json({ message: 'Category added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCategory,
    getCategoryName,
    getCategoryId,
    addCategory,
};
