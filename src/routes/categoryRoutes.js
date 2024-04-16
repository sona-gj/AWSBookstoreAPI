// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/categories/all', categoryController.getAllCategory);
router.get('/categories/:id',categoryController.getCategoryName);
router.get('/categories/name/:name',categoryController.getCategoryId);
router.post('/categories',categoryController.addCategory);

module.exports = router;
