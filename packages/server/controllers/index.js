const express = require('express');

const accountRoutes = require('./account');
const transferRoutes = require('./transfer');

const router = express.Router();

router.use('/account', accountRoutes);
router.use('/transfer', transferRoutes);

module.exports = router;
