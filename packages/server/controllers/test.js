const express = require('express');

const testLib = require('../lib/test');

const router = express.Router();

async function testRoute(req, res) {
  try {
    const response = await testLib.getTestMessage();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: 'Internal Error',
    });
  }
}

router.get('/', testRoute);

module.exports = router;
