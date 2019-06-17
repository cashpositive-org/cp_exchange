const express = require('express');

const placeholderRoutes = require('./placeholder.js');

const router = express.Router();

router.use('/placeholder', placeholderRoutes);

module.exports = router;
