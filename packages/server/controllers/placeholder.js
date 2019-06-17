const express = require('express');

const router = express.Router();

function placeholderRoute(req, res) {
  res.status(200).json({ info: 'Success!' });
}

router.get('/', placeholderRoute);

module.exports = router;
