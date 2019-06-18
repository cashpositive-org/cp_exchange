const express = require('express');

const accountRoutes = require('./account');

const router = express.Router();

router.use('/account', accountRoutes);

module.exports = router;
