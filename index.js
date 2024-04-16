// index.js
const serverless = require('serverless-http')
const express = require('express');
const app = express();
const categoryRoutes = require('./src/routes/categoryRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api', categoryRoutes);
app.use('/api', bookRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

module.exports.handler = serverless(app);